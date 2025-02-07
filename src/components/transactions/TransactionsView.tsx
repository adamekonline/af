import { Table, TableBody } from "@/components/ui/table";
import { Transaction, Currency, Category, Person, PropertyLocation } from "@/types";
import { PropertyFilter } from "./PropertyFilter";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convertCurrency } from "@/utils/currencyConverter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TransactionTableHeader } from "./components/TransactionTableHeader";
import { TransactionTableRow } from "./components/TransactionTableRow";
import { TransactionMobileCard } from "./components/TransactionMobileCard";
import { t } from "@/utils/translations";

export const TransactionsView = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [propertyFilter, setPropertyFilter] = useState<Transaction["property"] | "all">("all");
  const [displayCurrency, setDisplayCurrency] = useState<Currency>("PLN");
  const [convertedAmounts, setConvertedAmounts] = useState<Record<number, number>>({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    fetchTransactions();

    const channel = supabase
      .channel('public:transactions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        () => {
          fetchTransactions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        toast.error(t("errorFetchingTransactions"));
        throw error;
      }
      
      const typedData: Transaction[] = data.map(item => ({
        ...item,
        currency: item.currency as Currency,
        category: item.category as Category,
        person: item.person as Person,
        property: (item.property || undefined) as PropertyLocation | undefined,
        amount: Number(item.amount)
      }));
      
      setTransactions(typedData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error(t("errorFetchingTransactions"));
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success(t("transactionDeleted"));
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error(t("failedToDeleteTransaction"));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const updateConvertedAmounts = async () => {
      const amounts: Record<number, number> = {};
      for (const transaction of transactions) {
        const converted = await convertCurrency(transaction.amount, transaction.currency, displayCurrency);
        amounts[transaction.id] = converted;
      }
      setConvertedAmounts(amounts);
    };

    updateConvertedAmounts();
  }, [transactions, displayCurrency]);

  const handleCurrencyChange = (value: string) => {
    setDisplayCurrency(value as Currency);
  };

  const filteredTransactions = transactions.filter(transaction => 
    propertyFilter === "all" || transaction.property === propertyFilter
  );

  return (
    <div className="space-y-4 px-2 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold">{t("transactions")}</h2>
        <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
          <Select value={displayCurrency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={t("currency")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PLN">PLN</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
          <PropertyFilter value={propertyFilter} onChange={setPropertyFilter} />
        </div>
      </div>

      {isMobile ? (
        <div className="space-y-4 w-full overflow-x-hidden">
          {filteredTransactions.map((transaction) => (
            <TransactionMobileCard
              key={transaction.id}
              transaction={transaction}
              convertedAmount={convertedAmounts[transaction.id] || 0}
              displayCurrency={displayCurrency}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <ScrollArea className="rounded-md border w-full overflow-x-auto">
          <Table>
            <TransactionTableHeader />
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TransactionTableRow
                  key={transaction.id}
                  transaction={transaction}
                  convertedAmount={convertedAmounts[transaction.id] || 0}
                  displayCurrency={displayCurrency}
                  onDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      )}
    </div>
  );
};