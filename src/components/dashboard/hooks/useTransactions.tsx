import { useState, useEffect } from "react";
import { Transaction } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        toast.error('Error fetching transactions');
        throw error;
      }

      // Ensure amount is treated as a number
      const typedData = data.map(item => ({
        ...item,
        amount: Number(item.amount)
      })) as Transaction[];
      
      setTransactions(typedData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('public:transactions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        () => {
          fetchTransactions();
          toast.success('Dashboard updated');
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { transactions, isLoading };
};