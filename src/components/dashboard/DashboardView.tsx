import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { Transaction } from "@/types";

const mockTransactions: Transaction[] = [
  { id: 1, date: "2024-03-15", description: "Rent Payment - Poznan", amount: -2000, currency: "PLN", category: "Housing", person: "Adam", property: "Poznań" },
  { id: 2, date: "2024-03-14", description: "Grocery Shopping", amount: -200, currency: "PLN", category: "Food", person: "Natka" },
  { id: 3, date: "2024-03-13", description: "Salary", amount: 8000, currency: "PLN", category: "Income", person: "Adam" },
  { id: 4, date: "2024-03-12", description: "Transport", amount: -500, currency: "PLN", category: "Transport", person: "Adi" },
  { id: 5, date: "2024-03-11", description: "Healthcare", amount: -300, currency: "PLN", category: "Health", person: "Natka" },
];

const aggregateByCategory = (transactions: Transaction[]) => {
  return transactions
    .filter(t => t.amount < 0) // Only expenses
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) {
        existing.amount += Math.abs(curr.amount);
      } else {
        acc.push({ name: curr.category, amount: Math.abs(curr.amount), currency: curr.currency });
      }
      return acc;
    }, [] as Array<{ name: string; amount: number; currency: string }>);
};

export const DashboardView = () => {
  const totalBalance = mockTransactions.reduce((sum, t) => sum + t.amount, 0);
  const monthlyIncome = mockTransactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpenses = mockTransactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const expensesByCategory = aggregateByCategory(mockTransactions);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Total Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalBalance.toLocaleString()} PLN</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Monthly Income
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">
            +{monthlyIncome.toLocaleString()} PLN
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4" />
            Monthly Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-600">
            -{monthlyExpenses.toLocaleString()} PLN
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expensesByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};