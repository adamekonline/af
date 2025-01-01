import { Transaction, MonthlyData, CategoryData } from "@/types";
import { convertCurrency } from "@/utils/currencyConverter";

export const aggregateByMonth = (transactions: Transaction[], displayCurrency: string): MonthlyData[] => {
  const monthlyData = transactions.reduce((acc: Record<string, MonthlyData>, curr) => {
    const date = new Date(curr.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = {
        month: monthYear,
        timestamp: date.getTime(),
        Adam: 0,
        Natka: 0,
        Adi: 0,
        income: 0,
        expenses: 0
      };
    }
    
    const convertedAmount = convertCurrency(Math.abs(curr.amount), curr.currency, displayCurrency as any);
    
    if (curr.amount < 0) {
      acc[monthYear][curr.person] += convertedAmount;
      acc[monthYear].expenses += convertedAmount;
    } else {
      acc[monthYear].income += convertedAmount;
    }
    
    return acc;
  }, {});

  return Object.values(monthlyData).sort((a, b) => a.timestamp - b.timestamp);
};

export const aggregateByCategory = (transactions: Transaction[], displayCurrency: string): CategoryData[] => {
  const categoryData: Record<string, CategoryData> = {};

  transactions
    .filter(t => t.amount < 0)
    .forEach((t) => {
      const convertedAmount = convertCurrency(Math.abs(t.amount), t.currency, displayCurrency as any);
      
      if (!categoryData[t.category]) {
        categoryData[t.category] = { category: t.category, total: 0, transactions: 0 };
      }
      
      categoryData[t.category].total += convertedAmount;
      categoryData[t.category].transactions += 1;
    });

  return Object.values(categoryData).sort((a, b) => b.total - a.total);
};