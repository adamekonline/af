import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { t } from "@/utils/translations";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Transaction } from "@/types";
import { convertCurrency } from "@/utils/currencyConverter";
import { toast } from "sonner";

export const PersonalSpending = () => {
  const [personalSpending, setPersonalSpending] = useState({
    Adam: 0,
    Natka: 0,
    Adi: 0
  });

  const fetchPersonalSpending = async () => {
    try {
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .lt('date', new Date().toISOString())
        .gt('date', new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString());

      if (error) throw error;

      const spending = {
        Adam: 0,
        Natka: 0,
        Adi: 0
      };

      // Process transactions
      for (const transaction of transactions as Transaction[]) {
        if (transaction.amount < 0) { // Only count expenses (negative amounts)
          const convertedAmount = await convertCurrency(
            Math.abs(transaction.amount),
            transaction.currency,
            'PLN'
          );
          
          spending[transaction.person] += convertedAmount;
        }
      }

      setPersonalSpending(spending);
    } catch (error) {
      console.error('Error fetching personal spending:', error);
      toast.error("Failed to update personal spending overview");
    }
  };

  useEffect(() => {
    fetchPersonalSpending();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('personal-spending')
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

  // Calculate percentages based on total spending
  const totalSpending = Object.values(personalSpending).reduce((a, b) => a + b, 0);
  const getPercentage = (amount: number) => {
    return totalSpending > 0 ? Math.round((amount / totalSpending) * 100) : 0;
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('pl-PL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("personalSpendingOverview")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Object.entries(personalSpending).map(([person, amount]) => (
            <div key={person} className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{person}</p>
                <p className="text-sm text-muted-foreground">
                  {formatAmount(amount)} zł
                </p>
              </div>
              <div className="ml-auto font-medium">
                {getPercentage(amount)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};