import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Transaction } from "@/types";
import { convertCurrency } from "@/utils/currencyConverter";
import { toast } from "sonner";
import { startOfMonth, endOfMonth } from "date-fns";

interface PersonalSpendingData {
  Adam: number;
  Natka: number;
  Adi: number;
}

export const usePersonalSpending = () => {
  const [personalSpending, setPersonalSpending] = useState<PersonalSpendingData>({
    Adam: 0,
    Natka: 0,
    Adi: 0
  });

  const fetchPersonalSpending = async () => {
    try {
      const startDate = startOfMonth(new Date());
      const endDate = endOfMonth(new Date());

      console.log("Fetching personal spending between:", startDate.toISOString().split('T')[0], "and", endDate.toISOString().split('T')[0]);

      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*');

      if (error) throw error;

      console.log("Fetched transactions:", transactions);

      const spending = {
        Adam: 0,
        Natka: 0,
        Adi: 0
      };

      // Process transactions
      for (const transaction of transactions as Transaction[]) {
        // Only process expenses (negative amounts) and non-income categories
        if (transaction.category !== 'Income') {
          const convertedAmount = await convertCurrency(
            Math.abs(transaction.amount),
            transaction.currency,
            'PLN'
          );
          
          spending[transaction.person] += convertedAmount;
        }
      }

      console.log("Updated personal spending:", spending);
      setPersonalSpending(spending);
    } catch (error) {
      console.error('Error fetching personal spending:', error);
      toast.error("Failed to update personal spending overview");
    }
  };

  useEffect(() => {
    fetchPersonalSpending();

    const channel = supabase
      .channel('personal-spending-changes')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'transactions'
        },
        (payload) => {
          console.log("Transaction changed, updating personal spending...", payload);
          fetchPersonalSpending();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { personalSpending };
};