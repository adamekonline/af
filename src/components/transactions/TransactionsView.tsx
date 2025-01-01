import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Transaction, PropertyLocation, Currency } from "@/types";
import { TransactionFormDialog } from "./TransactionFormDialog";
import { PropertyFilter } from "./PropertyFilter";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convertCurrency } from "@/utils/currencyConverter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

const initialTransactions: Transaction[] = [
  {
    id: 1,
    date: "2024-03-15",
    description: "Rent Payment - Poznan",
    amount: -2000,
    currency: "PLN" as Currency,
    category: "Housing",
    person: "Adam",
    property: "Poznań"
  },
  {
    id: 2,
    date: "2024-03-14",
    description: "Grocery Shopping",
    amount: -200,
    currency: "PLN" as Currency,
    category: "Food",
    person: "Natka"
  },
  {
    id: 3,
    date: "2024-03-13",
    description: "Salary",
    amount: 8000,
    currency: "PLN" as Currency,
    category: "Income",
    person: "Adam"
  }
];

export const TransactionsView = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [propertyFilter, setPropertyFilter] = useState<PropertyLocation | "all">("all");
  const [displayCurrency, setDisplayCurrency] = useState<Currency>("PLN");
  const [convertedAmounts, setConvertedAmounts] = useState<Record<number, number>>({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
  };

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
                    <div className={`text-right ${convertedAmount > 0 ? "text-green-600" : "text-red-600"}`}>
                      <p className="font-semibold">
                        {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
                      </p>
                      <p className="text-xs opacity-75">
                        {transaction.amount.toLocaleString()} {transaction.currency}
                      </p>
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