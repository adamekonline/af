import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign } from "lucide-react";
import { Transaction, PropertyLocation } from "@/types";
import { TransactionFormDialog } from "./TransactionFormDialog";
import { PropertyFilter } from "./PropertyFilter";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convertCurrency } from "@/utils/currencyConverter";

const initialTransactions: Transaction[] = [
  {
    id: 1,
    date: "2024-03-15",
    description: "Rent Payment - Poznan",
    amount: -2000,
    currency: "PLN",
    category: "Housing",
    person: "Adam",
    property: "Poznań"
  },
  {
    id: 2,
    date: "2024-03-14",
    description: "Grocery Shopping",
    amount: -200,
    currency: "PLN",
    category: "Food",
    person: "Natka"
  },
  {
    id: 3,
    date: "2024-03-13",
    description: "Salary",
    amount: 8000,
    currency: "PLN",
    category: "Income",
    person: "Adam"
  }
];

export const TransactionsView = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [propertyFilter, setPropertyFilter] = useState<PropertyLocation | "all">("all");
  const [displayCurrency, setDisplayCurrency] = useState<string>("PLN");

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const filteredTransactions = transactions.filter(transaction => 
    propertyFilter === "all" || transaction.property === propertyFilter
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold">Transactions</h2>
        <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
          <Select value={displayCurrency} onValueChange={setDisplayCurrency}>
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

      <div className="overflow-x-auto">
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
              const convertedAmount = convertCurrency(transaction.amount, transaction.currency, displayCurrency);
              return (
                <TableRow key={transaction.id}>
                  <TableCell className="whitespace-nowrap">{transaction.date}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{transaction.description}</TableCell>
                  <TableCell className={`whitespace-nowrap ${convertedAmount > 0 ? "text-green-600" : "text-red-600"}`}>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
                    </span>
                  </TableCell>
                  <TableCell className={`whitespace-nowrap ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
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
      </div>
    </div>
  );
};