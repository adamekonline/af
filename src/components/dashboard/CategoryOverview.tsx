import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Transaction } from "@/types";
import { convertCurrency } from "@/utils/currencyConverter";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { t } from "@/utils/translations";

interface CategorySpending {
  category: string;
  Adam: number;
  Natka: number;
  Adi: number;
  total: number;
}

export const CategoryOverview = () => {
  const [categoryData, setCategoryData] = useState<CategorySpending[]>([]);

  useEffect(() => {
    const fetchCategorySpending = async () => {
      try {
        const { data: transactions, error } = await supabase
          .from('transactions')
          .select('*')
          .lt('date', new Date().toISOString())
          .gt('date', new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString());

        if (error) throw error;

        const categories: { [key: string]: CategorySpending } = {};

        // Process transactions
        for (const transaction of transactions as Transaction[]) {
          if (transaction.amount < 0 && transaction.category !== 'Income') {
            const convertedAmount = await convertCurrency(
              Math.abs(transaction.amount),
              transaction.currency,
              'PLN'
            );

            if (!categories[transaction.category]) {
              categories[transaction.category] = {
                category: transaction.category,
                Adam: 0,
                Natka: 0,
                Adi: 0,
                total: 0
              };
            }

            categories[transaction.category][transaction.person] += convertedAmount;
            categories[transaction.category].total += convertedAmount;
          }
        }

        // Convert to array and sort by total amount
        const sortedData = Object.values(categories).sort((a, b) => b.total - a.total);
        setCategoryData(sortedData);
      } catch (error) {
        console.error('Error fetching category spending:', error);
      }
    };

    fetchCategorySpending();
  }, []);

  const formatAmount = (value: number) => {
    return value.toLocaleString('pl-PL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{data.category}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="inline-block w-16">Adam:</span>
              {formatAmount(data.Adam)} zł
            </p>
            <p className="text-sm">
              <span className="inline-block w-16">Natka:</span>
              {formatAmount(data.Natka)} zł
            </p>
            <p className="text-sm">
              <span className="inline-block w-16">Adi:</span>
              {formatAmount(data.Adi)} zł
            </p>
            <div className="border-t mt-2 pt-2">
              <p className="text-sm font-medium">
                <span className="inline-block w-16">Total:</span>
                {formatAmount(data.total)} zł
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>{t("categoryOverview")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryData}
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              barSize={40}
            >
              <XAxis
                dataKey="category"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={formatAmount}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Adam" stackId="a" fill="#9b87f5" />
              <Bar dataKey="Natka" stackId="a" fill="#0EA5E9" />
              <Bar dataKey="Adi" stackId="a" fill="#D946EF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};