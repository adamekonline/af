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
        let totalBalance = 0;
        let totalIncome = 0;
        let totalExpenses = 0;

        // Process each transaction
        for (const transaction of filteredTransactions) {
          const converted = await convertCurrency(Math.abs(transaction.amount), transaction.currency, displayCurrency);
          
          if (transaction.category === 'Income') {
            totalIncome += converted;
            totalBalance += converted;
          } else {
            totalExpenses += converted;
            totalBalance -= converted;
          }
        }

        setConvertedBalance(totalBalance);
        setConvertedIncome(totalIncome);
        setConvertedExpenses(-totalExpenses); // Make expenses negative
      } catch (error) {
        console.error('Error converting amounts:', error);
      }
    };

    updateConvertedAmounts();
  }, [filteredTransactions, displayCurrency]);

  return { convertedBalance, convertedIncome, convertedExpenses };
};