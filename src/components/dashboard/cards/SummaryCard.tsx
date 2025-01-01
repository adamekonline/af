import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  amount: number;
  currency: string;
  icon?: LucideIcon;
  variant?: 'default' | 'income' | 'expense';
}

export const SummaryCard = ({ title, amount, currency, icon: Icon, variant = 'default' }: SummaryCardProps) => {
  const getGradientClass = () => {
    switch (variant) {
      case 'income':
        return 'from-green-50 to-white dark:from-green-950 dark:to-gray-950';
      case 'expense':
        return 'from-red-50 to-white dark:from-red-950 dark:to-gray-950';
      default:
        return amount < 0 
          ? 'from-red-50 to-white dark:from-red-950 dark:to-gray-950'
          : 'from-green-50 to-white dark:from-green-950 dark:to-gray-950';
    }
  };

  const getTextColorClass = () => {
    switch (variant) {
      case 'income':
        return 'text-green-600';
      case 'expense':
        return 'text-red-600';
      default:
        return amount < 0 ? 'text-red-600' : 'text-green-600';
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('pl-PL', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <Card className={`hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br ${getGradientClass()} p-3 md:p-6`}>
      <CardHeader className="space-y-1 p-2 md:p-6">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          {Icon && <Icon className={`h-4 w-4 md:h-5 md:w-5 ${getTextColorClass()}`} />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 md:p-6">
        <p className={`text-lg md:text-2xl font-bold ${getTextColorClass()}`}>
          {amount < 0 ? '-' : '+'}
          {formatNumber(Math.abs(amount))} {currency}
        </p>
      </CardContent>
    </Card>
  );
};