import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Budget, Transaction } from "@/types";
import { convertCurrency } from "@/utils/currencyConverter";

const mockBudgets: Budget[] = [
  { category: "Housing", limit: 3000, currency: "PLN" },
  { category: "Food", limit: 1500, currency: "PLN" },
  { category: "Transport", limit: 800, currency: "PLN" },
];

interface BudgetTrackerProps {
  transactions: Transaction[];
  displayCurrency: string;
}

export const BudgetTracker = ({ transactions, displayCurrency }: BudgetTrackerProps) => {
  const calculateSpentAmount = (category: string) => {
    return transactions
      .filter(t => t.amount < 0 && t.category === category)
      .reduce((sum, t) => sum + Math.abs(convertCurrency(t.amount, t.currency, displayCurrency)), 0);
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Budget Tracking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockBudgets.map(budget => {
          const convertedLimit = convertCurrency(budget.limit, budget.currency, displayCurrency);
          const spentAmount = calculateSpentAmount(budget.category);
          const percentage = Math.min((spentAmount / convertedLimit) * 100, 100);
          
          return (
            <div key={budget.category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{budget.category}</span>
                <span>
                  {spentAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} / {convertedLimit.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
                </span>
              </div>
              <Progress 
                value={percentage} 
                className={percentage >= 90 ? "bg-red-200" : percentage >= 75 ? "bg-yellow-200" : "bg-gray-200"}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};