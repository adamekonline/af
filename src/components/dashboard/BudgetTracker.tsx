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

  useEffect(() => {
    const updateAmounts = async () => {
      const newSpentAmounts: Record<string, Record<string, number>> = {};
      const newConvertedLimits: Record<string, number> = {};

      // Calculate converted limits
      for (const budget of mockBudgets) {
        const limit = await convertCurrency(budget.limit, budget.currency, displayCurrency);
        newConvertedLimits[budget.category] = limit;
      }

      // Calculate spent amounts per person and category
      for (const budget of mockBudgets) {
        newSpentAmounts[budget.category] = {};
        for (const person of people) {
          const personTransactions = transactions
            .filter(t => t.category === budget.category && t.person === person);
          
          let total = 0;
          for (const t of personTransactions) {
            // Only treat income as positive, everything else is an expense
            const isIncome = t.category === 'Income';
            const amount = isIncome ? t.amount : Math.abs(t.amount);
            const converted = await convertCurrency(amount, t.currency, displayCurrency);
            total += isIncome ? converted : -converted;
          }
          
          if (total !== 0) {
            newSpentAmounts[budget.category][person] = Math.abs(total); // Always show absolute value for display
          }
        }
      }

      setSpentAmounts(newSpentAmounts);
      setConvertedLimits(newConvertedLimits);
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
          const convertedLimit = convertedLimits[budget.category] || 0;
          const totalSpent = calculateTotalSpentAmount(budget.category);
          const percentage = Math.min((totalSpent / convertedLimit) * 100, 100);
          
          return (
            <div key={budget.category} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">{budget.category}</span>
                <span className="text-sm">
                  <span className="font-semibold">
                    {totalSpent.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-muted-foreground mx-1">/</span>
                  <span>
                    {convertedLimit.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
                  </span>
                </span>
              </div>
              <div className="relative h-2.5 overflow-hidden rounded-full bg-secondary">
                {people.map((person, index) => {
                  const personSpent = spentAmounts[budget.category]?.[person] || 0;
                  const previousTotal = people
                    .slice(0, index)
                    .reduce((sum, p) => sum + (spentAmounts[budget.category]?.[p] || 0), 0);
                  const personPercentage = (personSpent / convertedLimit) * 100;
                  const previousPercentage = (previousTotal / convertedLimit) * 100;

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
                  return personSpent > 0 ? (
                    <div key={person} className="flex items-center gap-1.5">
                      <div 
                        className="h-2.5 w-2.5 rounded-full" 
                        style={{ backgroundColor: personColors[person as keyof typeof personColors] || '#94a3b8' }}
                      />
                      <span className="font-medium">{person}:</span>
                      <span>{personSpent.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}</span>
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