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
        let totalIncome = 0;
        let totalExpenses = 0;

        // Process each transaction
        for (const transaction of filteredTransactions) {
          const converted = await convertCurrency(Math.abs(transaction.amount), transaction.currency, displayCurrency);
          
          if (transaction.category === 'Income') {
            totalIncome += converted;
          } else {
            totalExpenses += converted;
          }
        }

        // Calculate balance as income - expenses (positive means we have more income than expenses)
        const balance = totalIncome - totalExpenses;
        
        setConvertedBalance(balance);
        setConvertedIncome(totalIncome);
        setConvertedExpenses(totalExpenses);
      } catch (error) {
        console.error('Error converting amounts:', error);
      }
    };

    updateConvertedAmounts();
  }, [filteredTransactions, displayCurrency]);

  return { convertedBalance, convertedIncome, convertedExpenses };
};