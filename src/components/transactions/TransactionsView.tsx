import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign } from "lucide-react";
import { Transaction } from "@/types";
import { TransactionFormDialog } from "./TransactionFormDialog";
import { useState } from "react";

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

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <TransactionFormDialog onAddTransaction={handleAddTransaction} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Person</TableHead>
            <TableHead>Property</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {transaction.amount} {transaction.currency}
                </span>
              </TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.person}</TableCell>
              <TableCell>{transaction.property || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};