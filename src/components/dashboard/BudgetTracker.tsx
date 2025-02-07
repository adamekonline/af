import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { t } from "@/utils/translations";

export const BudgetTracker = () => {
  // Fetch budgets
  const { data: budgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("budgets")
        .select("*")
        .order("category");
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch transactions for expense calculation
  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Calculate expenses per category
  const calculateExpenses = (category: string) => {
    if (!transactions) return 0;
    
    // Filter transactions for the specific category and sum their amounts
    const expenses = transactions
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    console.log(`Calculated expenses for ${category}:`, expenses);
    return expenses;
  };

  // Calculate progress percentage safely
  const calculateProgress = (spent: number, budget: number) => {
    if (budget <= 0) return 0;
    const progress = (spent / budget) * 100;
    console.log(`Progress calculation - Spent: ${spent}, Budget: ${budget}, Progress: ${progress}%`);
    return Math.min(progress, 100); // Cap at 100%
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('pl-PL', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("budgetTracking")}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {budgets?.map(budget => {
          const spent = calculateExpenses(budget.category);
          const progress = calculateProgress(spent, budget.limit_amount);
          
          return (
            <div key={budget.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span>{t(budget.category)}</span>
                </div>
                <span className="text-muted-foreground">
                  {formatNumber(spent)} zł / {formatNumber(budget.limit_amount)} zł
                </span>
              </div>
              <Progress 
                value={progress} 
                className={progress > 100 ? "bg-red-200" : undefined}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};