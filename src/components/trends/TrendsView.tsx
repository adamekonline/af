import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area } from 'recharts';
import { Transaction } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { aggregateByMonth, aggregateByCategory } from "./aggregateData";
import { ChartTooltip } from "./ChartTooltip";
import { IncomeExpensesChart } from "./charts/IncomeExpensesChart";
import { PersonalSpendingChart } from "./charts/PersonalSpendingChart";
import { CategorySpendingChart } from "./charts/CategorySpendingChart";

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

      setTransactions(data as Transaction[]);
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const updateData = async () => {
      try {
        const monthly = await aggregateByMonth(transactions, displayCurrency);
        const category = await aggregateByCategory(transactions, displayCurrency);
        setMonthlyData(monthly);
        setCategoryData(category);
      } catch (error) {
        console.error('Error aggregating data:', error);
        toast({
          title: "Error updating charts",
          description: "Failed to update the charts with the new currency",
          variant: "destructive",
        });
      }
    };

    updateData();
  }, [transactions, displayCurrency]);

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

      <IncomeExpensesChart data={monthlyData} displayCurrency={displayCurrency} />
      <PersonalSpendingChart data={monthlyData} displayCurrency={displayCurrency} />
      <CategorySpendingChart data={categoryData} displayCurrency={displayCurrency} />
    </div>
  );
};