import { Table, TableBody } from "@/components/ui/table";
import { Transaction, Currency } from "@/types";
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

      if (error) throw error;
      
      // Ensure the data matches our Transaction type
      const typedData: Transaction[] = data.map(item => ({
        ...item,
        currency: item.currency as Currency,
        category: item.category,
        person: item.person,
        property: item.property || undefined
      }));
      
      setTransactions(typedData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to fetch transactions');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Transaction deleted successfully');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error('Failed to delete transaction');
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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold">Transactions</h2>
        <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
          <Select value={displayCurrency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Currency" />
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
        <div className="space-y-4">
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
        <ScrollArea className="rounded-md border">
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