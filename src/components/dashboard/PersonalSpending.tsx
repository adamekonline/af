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
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Personal Spending Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {people.map(person => {
          const spentAmount = calculatePersonalSpending(person);
          const percentage = totalSpending > 0 ? (spentAmount / totalSpending) * 100 : 0;
          const colors = personColors[person] || { bg: '#94a3b8', text: '#64748b' };
          
          return (
            <div key={person} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span style={{ color: colors.text }}>{person}</span>
                <span>
                  {spentAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
                  <span className="text-muted-foreground ml-2">
                    ({percentage.toFixed(1)}%)
                  </span>
                </span>
              </div>
              <Progress 
                value={percentage} 
                className="h-2"
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