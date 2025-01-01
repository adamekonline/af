import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area } from 'recharts';
import { Transaction } from "@/types";
import { convertCurrency } from "@/utils/currencyConverter";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const aggregateByMonth = async (transactions: Transaction[], displayCurrency: string) => {
  const monthlyData = await Promise.all(
    transactions.reduce((acc, curr) => {
      const date = new Date(curr.date);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = {
          month: monthYear,
          timestamp: date.getTime(), // For sorting
          Adam: 0,
          Natka: 0,
          Adi: 0,
          income: 0,
          expenses: 0,
          promises: []
        };
      }
      
      const promise = convertCurrency(Math.abs(curr.amount), curr.currency, displayCurrency)
        .then(convertedAmount => {
          if (curr.amount < 0) {
            acc[monthYear][curr.person] += convertedAmount;
            acc[monthYear].expenses += convertedAmount;
          } else {
            acc[monthYear].income += convertedAmount;
          }
        });
      
      acc[monthYear].promises.push(promise);
      return acc;
    }, {} as Record<string, any>)
  ).then(async (data) => {
    // Wait for all currency conversions to complete
    for (const monthData of Object.values(data)) {
      await Promise.all(monthData.promises);
      delete monthData.promises;
    }
    return Object.values(data);
  });

  return monthlyData.sort((a, b) => a.timestamp - b.timestamp);
};

const aggregateByCategory = async (transactions: Transaction[], displayCurrency: string) => {
  const categoryData: Record<string, { category: string; total: number; transactions: number }> = {};

  await Promise.all(
    transactions.filter(t => t.amount < 0).map(async (t) => {
      const convertedAmount = await convertCurrency(Math.abs(t.amount), t.currency, displayCurrency);
      
      if (!categoryData[t.category]) {
        categoryData[t.category] = { category: t.category, total: 0, transactions: 0 };
      }
      
      categoryData[t.category].total += convertedAmount;
      categoryData[t.category].transactions += 1;
    })
  );

  return Object.values(categoryData).sort((a, b) => b.total - a.total);
};

export const TrendsView = () => {
  const [displayCurrency, setDisplayCurrency] = useState<string>("PLN");
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching transactions",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const updateData = async () => {
      const monthly = await aggregateByMonth(transactions, displayCurrency);
      const category = await aggregateByCategory(transactions, displayCurrency);
      setMonthlyData(monthly);
      setCategoryData(category);
    };

    updateData();
  }, [transactions, displayCurrency]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any) => (
            <p key={entry.name} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(2)} {displayCurrency}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
          <CardTitle className="text-xl font-semibold">Monthly Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="income" 
                stroke="#22c55e" 
                fillOpacity={1} 
                fill="url(#colorIncome)" 
                name="Income"
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorExpenses)" 
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Personal Spending Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Adam" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="Natka" 
                stroke="#D946EF" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="Adi" 
                stroke="#F97316" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Spending by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" />
              <YAxis dataKey="category" type="category" width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="total" 
                fill="#8B5CF6"
                radius={[0, 4, 4, 0]}
                label={{ 
                  position: 'right',
                  formatter: (value: number) => `${value.toFixed(2)} ${displayCurrency}`,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};