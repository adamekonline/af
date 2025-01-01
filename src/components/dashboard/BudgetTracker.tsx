import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Budget, Transaction } from "@/types";
import { convertCurrency } from "@/utils/currencyConverter";

const mockBudgets: Budget[] = [
  { category: "Housing", limit: 3000, currency: "PLN" },
  { category: "Food", limit: 1500, currency: "PLN" },
  { category: "Transport", limit: 800, currency: "PLN" },
];

const personColors = {
  'Adam': '#F2FCE2',
  'Natka': '#FEF7CD',
  'Adi': '#FEC6A1'
};

interface BudgetTrackerProps {
  transactions: Transaction[];
  displayCurrency: string;
}

export const BudgetTracker = ({ transactions, displayCurrency }: BudgetTrackerProps) => {
  const calculateSpentAmountByPerson = (category: string, person: string) => {
    return transactions
      .filter(t => t.amount < 0 && t.category === category && t.person === person)
      .reduce((sum, t) => sum + Math.abs(convertCurrency(t.amount, t.currency, displayCurrency)), 0);
  };

  const calculateTotalSpentAmount = (category: string) => {
    return transactions
      .filter(t => t.amount < 0 && t.category === category)
      .reduce((sum, t) => sum + Math.abs(convertCurrency(t.amount, t.currency, displayCurrency)), 0);
  };

  const people = Array.from(new Set(transactions.map(t => t.person)));

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Budget Tracking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockBudgets.map(budget => {
          const convertedLimit = convertCurrency(budget.limit, budget.currency, displayCurrency);
          const totalSpent = calculateTotalSpentAmount(budget.category);
          const percentage = Math.min((totalSpent / convertedLimit) * 100, 100);
          
          return (
            <div key={budget.category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{budget.category}</span>
                <span>
                  {totalSpent.toLocaleString(undefined, { maximumFractionDigits: 2 })} / {convertedLimit.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
                </span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
                {people.map((person, index) => {
                  const previousTotal = people
                    .slice(0, index)
                    .reduce((sum, p) => sum + calculateSpentAmountByPerson(budget.category, p), 0);
                  const personSpent = calculateSpentAmountByPerson(budget.category, person);
                  const personPercentage = (personSpent / convertedLimit) * 100;
                  const previousPercentage = (previousTotal / convertedLimit) * 100;

                  return personSpent > 0 ? (
                    <div
                      key={person}
                      className="absolute h-full transition-all"
                      style={{
                        backgroundColor: personColors[person as keyof typeof personColors] || '#94a3b8',
                        width: `${personPercentage}%`,
                        left: `${previousPercentage}%`
                      }}
                    />
                  ) : null;
                })}
              </div>
              <div className="flex justify-end gap-4 text-xs">
                {people.map(person => {
                  const personSpent = calculateSpentAmountByPerson(budget.category, person);
                  return personSpent > 0 ? (
                    <div key={person} className="flex items-center gap-1">
                      <div 
                        className="h-2 w-2 rounded-full" 
                        style={{ backgroundColor: personColors[person as keyof typeof personColors] || '#94a3b8' }}
                      />
                      <span>{person}: {personSpent.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}</span>
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