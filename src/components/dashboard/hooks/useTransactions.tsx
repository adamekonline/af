import { useState, useEffect } from "react";
import { Transaction } from "@/types";
import { supabase } from "@/integrations/supabase/client";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactions();

    const channel = supabase
      .channel('public:transactions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        () => {
          fetchTransactions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      const typedData = data.map(item => ({
        ...item,
        amount: Number(item.amount)
      })) as Transaction[];

      setTransactions(typedData);
      setFilteredTransactions(typedData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return { transactions, filteredTransactions, setFilteredTransactions };
};