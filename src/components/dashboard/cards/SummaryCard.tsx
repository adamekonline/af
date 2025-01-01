import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  amount: number;
  currency: string;
  icon?: LucideIcon;
  variant?: 'income' | 'expense';
}

export const SummaryCard = ({ title, amount, currency, icon: Icon, variant }: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", {
          'text-green-600': variant === 'income',
          'text-red-600': variant === 'expense'
        })}>
          {amount.toLocaleString('pl-PL')} {currency}
        </div>
      </CardContent>
    </Card>
  );
};