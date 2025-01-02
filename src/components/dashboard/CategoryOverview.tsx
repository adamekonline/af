import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Category, Transaction } from "@/types";
import { convertCurrency } from "@/utils/currencyConverter";
import { t } from "@/utils/translations";

interface CategorySpending {
  category: string;
  Adam: number;
  Natka: number;
  Adi: number;
  total: number;
}

const ALL_CATEGORIES: Category[] = [
  "Housing",
  "Food",
  "Transport",
  "Health",
  "Education",
  "Credit",
  "Credit Card",
  "Other"
];

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

        // Initialize categories with zero values
        const categories: { [key: string]: CategorySpending } = {};
        ALL_CATEGORIES.forEach(category => {
          categories[category] = {
            category,
            Adam: 0,
            Natka: 0,
            Adi: 0,
            total: 0
          };
        });

        // Process transactions
        for (const transaction of transactions as Transaction[]) {
          if (transaction.amount < 0 && transaction.category !== 'Income') {
            const convertedAmount = await convertCurrency(
              Math.abs(transaction.amount),
              transaction.currency,
              'PLN'
            );

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

  const calculatePercentage = (value: number, total: number) => {
    return total === 0 ? 0 : (value / total) * 100;
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>{t("categoryOverview")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {categoryData.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className="font-medium">{category.category}</span>
              </div>
              <span className="text-muted-foreground">
                {formatAmount(category.total)} zł
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap gap-2 text-sm mb-1">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#9b87f5]" />
                  <span>Adam: {formatAmount(category.Adam)} zł</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#0EA5E9]" />
                  <span>Natka: {formatAmount(category.Natka)} zł</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#D946EF]" />
                  <span>Adi: {formatAmount(category.Adi)} zł</span>
                </div>
              </div>
              <div className="flex h-2 overflow-hidden rounded-full bg-secondary">
                <div 
                  className="bg-[#9b87f5] transition-all"
                  style={{ width: `${calculatePercentage(category.Adam, category.total)}%` }}
                />
                <div 
                  className="bg-[#0EA5E9] transition-all"
                  style={{ width: `${calculatePercentage(category.Natka, category.total)}%` }}
                />
                <div 
                  className="bg-[#D946EF] transition-all"
                  style={{ width: `${calculatePercentage(category.Adi, category.total)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};