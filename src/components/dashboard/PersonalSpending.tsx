import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/types";
import { convertCurrency } from "@/utils/currencyConverter";
import { Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PersonalSpendingProps {
  transactions: Transaction[];
  displayCurrency: string;
}

const personColors: Record<string, { bg: string, text: string }> = {
  'Adam': { bg: '#9b87f5', text: '#6E59A5' },
  'Natka': { bg: '#D946EF', text: '#BE3FD3' },
  'Adi': { bg: '#F97316', text: '#EA6C15' }
};

export const PersonalSpending = ({ transactions, displayCurrency }: PersonalSpendingProps) => {
  const calculatePersonalSpending = (person: string) => {
    return transactions
      .filter(t => t.amount < 0 && t.person === person)
      .reduce((sum, t) => sum + Math.abs(convertCurrency(t.amount, t.currency, displayCurrency)), 0);
  };

  const totalSpending = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(convertCurrency(t.amount, t.currency, displayCurrency)), 0);

  const people = Array.from(new Set(transactions.map(t => t.person)));

  return (
    <Card className="col-span-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <Users className="h-5 w-5" />
          Personal Spending Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {people.map(person => {
          const spentAmount = calculatePersonalSpending(person);
          const percentage = totalSpending > 0 ? (spentAmount / totalSpending) * 100 : 0;
          const colors = personColors[person] || { bg: '#94a3b8', text: '#64748b' };
          
          return (
            <div key={person} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm" style={{ color: colors.text }}>{person}</span>
                <div className="text-sm">
                  <span className="font-semibold">
                    {spentAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    ({percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
              <Progress 
                value={percentage} 
                className="h-2.5 rounded-full"
                style={{ 
                  '--progress-background': colors.bg,
                } as React.CSSProperties}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};