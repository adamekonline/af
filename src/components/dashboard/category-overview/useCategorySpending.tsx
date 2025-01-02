import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Category, Transaction } from "@/types";
import { convertCurrency } from "@/utils/currencyConverter";
import { toast } from "sonner";
import { startOfMonth, endOfMonth } from "date-fns";

export interface CategorySpending {
  category: string;
  Adam: number;
  Natka: number;
  Adi: number;
  total: number;
}

const ALL_CATEGORIES: Category[] = [
  "Housing",
  "Zywnosc",
  "Transport",
  "Health",
  "Education",
  "Kredyty",
  "Credit Card",
  "Telefonia/Internet",
  "Restauracje/Rozrywka",
  "Other"
];

export const useCategorySpending = () => {
  const [categoryData, setCategoryData] = useState<CategorySpending[]>([]);

  const fetchCategorySpending = async () => {
    try {
      const startDate = startOfMonth(new Date());
      const endDate = endOfMonth(new Date());

      console.log("Fetching transactions between:", startDate, "and", endDate);

      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .lte('date', endDate.toISOString())
        .gte('date', startDate.toISOString());

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

      console.log("Updated category spending:", categories);
      // Convert to array and sort by total amount
      const sortedData = Object.values(categories).sort((a, b) => b.total - a.total);
      setCategoryData(sortedData);
    } catch (error) {
      console.error('Error fetching category spending:', error);
      toast.error("Failed to update category overview");
    }
  };

  useEffect(() => {
    fetchCategorySpending();

    const channel = supabase
      .channel('category-overview-changes')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'transactions'
        },
        (payload) => {
          console.log("Transaction changed, updating category overview...", payload);
          fetchCategorySpending();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { categoryData };
};