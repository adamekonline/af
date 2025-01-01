import { Transaction, MonthlyData, CategoryData } from "@/types";
import { convertCurrency } from "@/utils/currencyConverter";

export const aggregateByMonth = async (transactions: Transaction[], displayCurrency: string): Promise<MonthlyData[]> => {
  const monthlyData: Record<string, MonthlyData> = {};

  for (const transaction of transactions) {
    const date = new Date(transaction.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = {
        month: monthYear,
        timestamp: date.getTime(),
        Adam: 0,
        Natka: 0,
        Adi: 0,
        income: 0,
        expenses: 0
      };
    }
    
    const convertedAmount = await convertCurrency(Math.abs(transaction.amount), transaction.currency, displayCurrency as any);
    
    if (transaction.amount < 0) {
      monthlyData[monthYear][transaction.person] += convertedAmount;
      monthlyData[monthYear].expenses += convertedAmount;
    } else {
      monthlyData[monthYear].income += convertedAmount;
    }
  }

  return Object.values(monthlyData).sort((a, b) => a.timestamp - b.timestamp);
};

export const aggregateByCategory = async (transactions: Transaction[], displayCurrency: string): Promise<CategoryData[]> => {
  const categoryData: Record<string, CategoryData> = {};

  for (const transaction of transactions) {
    if (transaction.amount < 0) {
      const convertedAmount = await convertCurrency(Math.abs(transaction.amount), transaction.currency, displayCurrency as any);
      
      if (!categoryData[transaction.category]) {
        categoryData[transaction.category] = { category: transaction.category, total: 0, transactions: 0 };
      }
      
      categoryData[transaction.category].total += convertedAmount;
      categoryData[transaction.category].transactions += 1;
    }
  }

  return Object.values(categoryData).sort((a, b) => b.total - a.total);
};