import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Budget, Transaction, Currency } from "@/types";
import { convertCurrency } from "@/utils/currencyConverter";
import { PieChart } from "lucide-react";
import { useEffect, useState } from "react";

const mockBudgets: Budget[] = [
  { category: "Housing", limit: 3000, currency: "PLN" as Currency },
  { category: "Food", limit: 1500, currency: "PLN" as Currency },
  { category: "Transport", limit: 800, currency: "PLN" as Currency },
];

const personColors = {
  'Adam': '#9b87f5',
  'Natka': '#D946EF',
  'Adi': '#F97316'
};

interface BudgetTrackerProps {
  transactions: Transaction[];
  displayCurrency: Currency;
}

export const BudgetTracker = ({ transactions, displayCurrency }: BudgetTrackerProps) => {
  const [spentAmounts, setSpentAmounts] = useState<Record<string, Record<string, number>>>({});
  const [convertedLimits, setConvertedLimits] = useState<Record<string, number>>({});
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const updateAmounts = async () => {
      const newSpentAmounts: Record<string, Record<string, number>> = {};
      const newConvertedLimits: Record<string, number> = {};
      let newTotalBudget = 0;
      let newTotalSpent = 0;

      // Calculate converted limits
      for (const budget of mockBudgets) {
        const limit = await convertCurrency(budget.limit, budget.currency, displayCurrency);
        newConvertedLimits[budget.category] = limit;
        newTotalBudget += limit;
      }

      // Calculate spent amounts per person and category
      for (const budget of mockBudgets) {
        newSpentAmounts[budget.category] = {};
        for (const person of people) {
          const personTransactions = transactions
            .filter(t => t.category === budget.category && t.person === person);
          
          let total = 0;
          for (const t of personTransactions) {
            const converted = await convertCurrency(Math.abs(t.amount), t.currency, displayCurrency);
            // Only add to spending if it's not an income transaction
            if (t.category !== 'Income') {
              total += converted;
            }
          }
          
          if (total !== 0) {
            newSpentAmounts[budget.category][person] = total;
            newTotalSpent += total;
          }
        }
      }

      setSpentAmounts(newSpentAmounts);
      setConvertedLimits(newConvertedLimits);
      setTotalBudget(newTotalBudget);
      setTotalSpent(newTotalSpent);
    };

    updateAmounts();
  }, [transactions, displayCurrency]);

  const people = Array.from(new Set(transactions.map(t => t.person)));

  const calculateTotalSpentAmount = (category: string): number => {
    return Object.values(spentAmounts[category] || {}).reduce((sum, amount) => sum + amount, 0);
  };

  return (
    <Card className="col-span-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <PieChart className="h-5 w-5" />
          Budget Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockBudgets.map(budget => {
          const totalSpent = calculateTotalSpentAmount(budget.category);
          const percentage = (totalSpent / totalBudget) * 100;
          
          return (
            <div key={budget.category} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">{budget.category}</span>
                <div className="text-sm">
                  <span className="font-semibold">
                    {totalSpent.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    ({percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="relative h-2.5 overflow-hidden rounded-full bg-secondary">
                {people.map((person, index) => {
                  const personSpent = spentAmounts[budget.category]?.[person] || 0;
                  const previousTotal = people
                    .slice(0, index)
                    .reduce((sum, p) => sum + (spentAmounts[budget.category]?.[p] || 0), 0);
                  const personPercentage = (personSpent / totalBudget) * 100;
                  const previousPercentage = (previousTotal / totalBudget) * 100;

                  return personSpent > 0 ? (
                    <div
                      key={person}
                      className="absolute h-full transition-all duration-300"
                      style={{
                        backgroundColor: personColors[person as keyof typeof personColors] || '#94a3b8',
                        width: `${personPercentage}%`,
                        left: `${previousPercentage}%`
                      }}
                    />
                  ) : null;
                })}
              </div>
              <div className="flex flex-wrap gap-4 text-xs">
                {people.map(person => {
                  const personSpent = spentAmounts[budget.category]?.[person] || 0;
                  const personPercentage = (personSpent / totalBudget) * 100;
                  return personSpent > 0 ? (
                    <div key={person} className="flex items-center gap-1.5">
                      <div 
                        className="h-2.5 w-2.5 rounded-full" 
                        style={{ backgroundColor: personColors[person as keyof typeof personColors] || '#94a3b8' }}
                      />
                      <span className="font-medium">{person}:</span>
                      <span>
                        {personSpent.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
                        <span className="text-muted-foreground ml-1">
                          ({personPercentage.toFixed(1)}%)
                        </span>
                      </span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};