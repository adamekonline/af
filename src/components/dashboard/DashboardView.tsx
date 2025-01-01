import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { Transaction } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { convertCurrency } from "@/utils/currencyConverter";
import { BudgetTracker } from "./BudgetTracker";
import { PersonalSpending } from "./PersonalSpending";

const mockTransactions: Transaction[] = [
  { id: 1, date: "2024-03-15", description: "Rent Payment - Poznan", amount: -2000, currency: "PLN", category: "Housing", person: "Adam", property: "Poznań" },
  { id: 2, date: "2024-03-14", description: "Grocery Shopping", amount: -200, currency: "PLN", category: "Food", person: "Natka" },
  { id: 3, date: "2024-03-13", description: "Salary", amount: 8000, currency: "PLN", category: "Income", person: "Adam" },
  { id: 4, date: "2024-03-12", description: "Transport", amount: -500, currency: "PLN", category: "Transport", person: "Adi" },
  { id: 5, date: "2024-03-11", description: "Healthcare", amount: -300, currency: "PLN", category: "Health", person: "Natka" },
];

const aggregateByCategory = (transactions: Transaction[], displayCurrency: string) => {
  return transactions
    .filter(t => t.amount < 0)
    .reduce((acc, curr) => {
      const convertedAmount = convertCurrency(Math.abs(curr.amount), curr.currency, displayCurrency);
      const existing = acc.find(item => item.name === curr.category);
      if (existing) {
        existing.amount += convertedAmount;
      } else {
        acc.push({ name: curr.category, amount: convertedAmount, currency: displayCurrency });
      }
      return acc;
    }, [] as Array<{ name: string; amount: number; currency: string }>);
};

export const DashboardView = () => {
  const [displayCurrency, setDisplayCurrency] = useState<string>("PLN");

  const convertedBalance = mockTransactions.reduce((sum, t) => {
    return sum + convertCurrency(t.amount, t.currency, displayCurrency);
  }, 0);

  const convertedIncome = mockTransactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + convertCurrency(t.amount, t.currency, displayCurrency), 0);

  const convertedExpenses = mockTransactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(convertCurrency(t.amount, t.currency, displayCurrency)), 0);

  const expensesByCategory = aggregateByCategory(mockTransactions, displayCurrency);

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Select value={displayCurrency} onValueChange={setDisplayCurrency}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PLN">PLN</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5" />
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {convertedBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5" />
              Monthly Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              +{convertedIncome.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingDown className="h-5 w-5" />
              Monthly Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              -{convertedExpenses.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-full hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <BarChart className="h-5 w-5" />
              Expenses by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expensesByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [
                    `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${displayCurrency}`, 
                    'Amount'
                  ]} 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    padding: '0.75rem'
                  }}
                />
                <Bar dataKey="amount" fill="#9b87f5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <BudgetTracker transactions={mockTransactions} displayCurrency={displayCurrency} />
        <PersonalSpending transactions={mockTransactions} displayCurrency={displayCurrency} />
      </div>
    </div>
  );
};