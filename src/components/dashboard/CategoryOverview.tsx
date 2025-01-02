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
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Adam</span>
                  <span className="text-muted-foreground">{formatAmount(category.Adam)} zł</span>
                </div>
                <Progress value={(category.Adam / (category.total || 1)) * 100} className="h-2 [&>div]:bg-[#9b87f5]" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Natka</span>
                  <span className="text-muted-foreground">{formatAmount(category.Natka)} zł</span>
                </div>
                <Progress value={(category.Natka / (category.total || 1)) * 100} className="h-2 [&>div]:bg-[#0EA5E9]" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Adi</span>
                  <span className="text-muted-foreground">{formatAmount(category.Adi)} zł</span>
                </div>
                <Progress value={(category.Adi / (category.total || 1)) * 100} className="h-2 [&>div]:bg-[#D946EF]" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};