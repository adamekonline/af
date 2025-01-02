import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, Currency } from "@/types";
import { toast } from "sonner";
import { t } from "@/utils/translations";

const categories: Category[] = [
  "Housing", 
  "Food", 
  "Transport", 
  "Health", 
  "Education", 
  "Credit", 
  "Credit Card", 
  "Income", 
  "Telefonia/Internet",
  "Other"
];
const currencies: Currency[] = ["PLN", "EUR", "USD", "GBP"];

export const BudgetView = () => {
  const [category, setCategory] = useState<Category>("Other");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("PLN");

  const { data: budgets, refetch } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("budgets")
        .select("*")
        .order("category");
      
      if (error) throw error;
      return data;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from("budgets")
        .insert({
          category,
          limit_amount: parseFloat(amount),
          currency
        });

      if (error) throw error;

      toast.success(t("budgetAdded"));
      setAmount("");
      setCategory("Other");
      setCurrency("PLN");
      refetch();
    } catch (error) {
      console.error("Error adding budget:", error);
      toast.error(t("error"));
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from("budgets")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success(t("budgetDeleted"));
      refetch();
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast.error(t("error"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{t("budgets")}</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
          <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t("selectCategory")} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {t(cat)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t("enterAmount")}
            className="w-[150px]"
            step="0.01"
            min="0"
            required
          />

          <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder={t("currency")} />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((curr) => (
                <SelectItem key={curr} value={curr}>
                  {curr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type="submit">{t("addBudget")}</Button>
        </form>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {budgets?.map((budget) => (
          <div
            key={budget.id}
            className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{t(budget.category)}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(budget.id)}
                className="text-destructive hover:text-destructive"
              >
                {t("delete")}
              </Button>
            </div>
            <p className="text-2xl font-bold">
              {budget.limit_amount} {budget.currency}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};