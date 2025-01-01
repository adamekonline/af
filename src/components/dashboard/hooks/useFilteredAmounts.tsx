import { useEffect, useState } from "react";
import { Transaction, Currency } from "@/types";
import { convertCurrency } from "@/utils/currencyConverter";

export const useFilteredAmounts = (filteredTransactions: Transaction[], displayCurrency: Currency) => {
  const [convertedBalance, setConvertedBalance] = useState<number>(0);
  const [convertedIncome, setConvertedIncome] = useState<number>(0);
  const [convertedExpenses, setConvertedExpenses] = useState<number>(0);

  useEffect(() => {
    const updateConvertedAmounts = async () => {
      try {
        // Calculate converted balance
        const balancePromises = filteredTransactions.map(t => 
          convertCurrency(t.amount, t.currency, displayCurrency)
        );
        const convertedAmounts = await Promise.all(balancePromises);
        const totalBalance = convertedAmounts.reduce((sum, amount) => sum + amount, 0);
        setConvertedBalance(totalBalance);

        // Calculate converted income (positive amounts)
        const incomePromises = filteredTransactions
          .filter(t => t.amount > 0)
          .map(t => convertCurrency(t.amount, t.currency, displayCurrency));
        const convertedIncomes = await Promise.all(incomePromises);
        const totalIncome = convertedIncomes.reduce((sum, amount) => sum + amount, 0);
        setConvertedIncome(totalIncome);

        // Calculate converted expenses (negative amounts)
        const expensePromises = filteredTransactions
          .filter(t => t.amount < 0)
          .map(t => convertCurrency(Math.abs(t.amount), t.currency, displayCurrency));
        const convertedExpenses = await Promise.all(expensePromises);
        const totalExpenses = convertedExpenses.reduce((sum, amount) => sum + amount, 0);
        setConvertedExpenses(-totalExpenses); // Make expenses negative
      } catch (error) {
        console.error('Error converting amounts:', error);
      }
    };

    updateConvertedAmounts();
  }, [filteredTransactions, displayCurrency]);

  return { convertedBalance, convertedIncome, convertedExpenses };
};