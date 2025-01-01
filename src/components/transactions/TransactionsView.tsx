import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Transaction, PropertyLocation, Currency } from "@/types";
import { PropertyFilter } from "./PropertyFilter";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convertCurrency } from "@/utils/currencyConverter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const TransactionsView = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [propertyFilter, setPropertyFilter] = useState<PropertyLocation | "all">("all");
  const [displayCurrency, setDisplayCurrency] = useState<Currency>("PLN");
  const [convertedAmounts, setConvertedAmounts] = useState<Record<number, number>>({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Fetch initial transactions
    fetchTransactions();

    // Set up real-time subscription
    const channel = supabase
      .channel('public:transactions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        (payload) => {
          console.log('Change received!', payload);
          fetchTransactions(); // Refresh the list when changes occur
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
      setTransactions(data || []);
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
          {filteredTransactions.map((transaction) => {
            const convertedAmount = convertedAmounts[transaction.id] || 0;
            return (
              <Card key={transaction.id} className="w-full">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`text-right ${convertedAmount > 0 ? "text-green-600" : "text-red-600"}`}>
                        <p className="font-semibold">
                          {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
                        </p>
                        <p className="text-xs opacity-75">
                          {transaction.amount.toLocaleString()} {transaction.currency}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(transaction.id)}
                        className="text-muted-foreground hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                    <span>{transaction.category}</span>
                    <span>{transaction.person}</span>
                    <span>{transaction.property || '-'}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <ScrollArea className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead className="min-w-[200px]">Description</TableHead>
                <TableHead className="w-[120px]">Amount</TableHead>
                <TableHead className="w-[120px]">Original</TableHead>
                <TableHead className="w-[100px]">Category</TableHead>
                <TableHead className="w-[100px]">Person</TableHead>
                <TableHead className="w-[100px]">Property</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => {
                const convertedAmount = convertedAmounts[transaction.id] || 0;
                return (
                  <TableRow key={transaction.id}>
                    <TableCell className="whitespace-nowrap">{transaction.date}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{transaction.description}</TableCell>
                    <TableCell className={`whitespace-nowrap ${convertedAmount > 0 ? "text-green-600" : "text-red-600"}`}>
                      <span className="flex items-center gap-1">
                        {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
                      </span>
                    </TableCell>
                    <TableCell className={`whitespace-nowrap ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                      <span className="flex items-center gap-1">
                        {transaction.amount.toLocaleString()} {transaction.currency}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{transaction.category}</TableCell>
                    <TableCell className="whitespace-nowrap">{transaction.person}</TableCell>
                    <TableCell className="whitespace-nowrap">{transaction.property || '-'}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(transaction.id)}
                        className="text-muted-foreground hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      )}
    </div>
  );
};