import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Budget, Transaction, Currency } from "@/types";
import { convertCurrency } from "@/utils/currencyConverter";
import { PieChart } from "lucide-react";

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
    <Card className="col-span-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <PieChart className="h-5 w-5" />
          Budget Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockBudgets.map(budget => {
          const convertedLimit = convertCurrency(budget.limit, budget.currency, displayCurrency);
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
                  const previousTotal = people
                    .slice(0, index)
                    .reduce((sum, p) => sum + calculateSpentAmountByPerson(budget.category, p), 0);
                  const personSpent = calculateSpentAmountByPerson(budget.category, person);
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
                  const personSpent = calculateSpentAmountByPerson(budget.category, person);
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