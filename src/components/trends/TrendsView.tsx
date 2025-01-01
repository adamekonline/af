import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from "@/types";
import { convertCurrency } from "@/utils/currencyConverter";

const mockTransactions: Transaction[] = [
  { id: 1, date: "2024-03-15", description: "Rent Payment - Poznan", amount: -2000, currency: "PLN", category: "Housing", person: "Adam", property: "Poznań" },
  { id: 2, date: "2024-02-14", description: "Grocery Shopping", amount: -200, currency: "PLN", category: "Food", person: "Natka" },
  { id: 3, date: "2024-01-13", description: "Salary", amount: 8000, currency: "PLN", category: "Income", person: "Adam" },
  { id: 4, date: "2023-12-12", description: "Transport", amount: -500, currency: "PLN", category: "Transport", person: "Adi" },
  { id: 5, date: "2023-11-11", description: "Healthcare", amount: -300, currency: "PLN", category: "Health", person: "Natka" },
];

const aggregateByMonth = (transactions: Transaction[], displayCurrency: string) => {
  const monthlyData = transactions.reduce((acc, curr) => {
    const date = new Date(curr.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    const convertedAmount = convertCurrency(Math.abs(curr.amount), curr.currency, displayCurrency);
    
    if (!acc[monthYear]) {
      acc[monthYear] = { month: monthYear, Adam: 0, Natka: 0, Adi: 0 };
    }
    
    if (curr.amount < 0) {
      acc[monthYear][curr.person] += convertedAmount;
    }
    
    return acc;
  }, {} as Record<string, { month: string; Adam: number; Natka: number; Adi: number; }>);

  return Object.values(monthlyData).sort((a, b) => 
    new Date(a.month).getTime() - new Date(b.month).getTime()
  );
};

const aggregateByYear = (transactions: Transaction[], displayCurrency: string) => {
  const yearlyData = transactions.reduce((acc, curr) => {
    const year = new Date(curr.date).getFullYear().toString();
    const convertedAmount = convertCurrency(Math.abs(curr.amount), curr.currency, displayCurrency);
    
    if (!acc[year]) {
      acc[year] = { year, Adam: 0, Natka: 0, Adi: 0 };
    }
    
    if (curr.amount < 0) {
      acc[year][curr.person] += convertedAmount;
    }
    
    return acc;
  }, {} as Record<string, { year: string; Adam: number; Natka: number; Adi: number; }>);

  return Object.values(yearlyData).sort((a, b) => a.year.localeCompare(b.year));
};

export const TrendsView = () => {
  const [displayCurrency, setDisplayCurrency] = useState<string>("PLN");
  const monthlyData = aggregateByMonth(mockTransactions, displayCurrency);
  const yearlyData = aggregateByYear(mockTransactions, displayCurrency);

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

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '0.75rem'
                }}
              />
              <Bar dataKey="Adam" stackId="a" fill="#8B5CF6" />
              <Bar dataKey="Natka" stackId="a" fill="#D946EF" />
              <Bar dataKey="Adi" stackId="a" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Yearly Expenses</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '0.75rem'
                }}
              />
              <Bar dataKey="Adam" stackId="a" fill="#8B5CF6" />
              <Bar dataKey="Natka" stackId="a" fill="#D946EF" />
              <Bar dataKey="Adi" stackId="a" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};