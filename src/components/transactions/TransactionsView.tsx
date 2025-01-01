import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const mockTransactions = [
  {
    id: 1,
    date: "2024-03-15",
    description: "Rent Payment - Poznan",
    amount: -2000,
    currency: "PLN",
    category: "Housing",
    person: "Adam"
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
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Person</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                {transaction.amount} {transaction.currency}
              </TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.person}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};