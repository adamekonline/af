import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Transaction, Currency } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { convertCurrency } from "@/utils/currencyConverter";
import { BudgetTracker } from "./BudgetTracker";
import { PersonalSpending } from "./PersonalSpending";
import { DashboardFilters } from "./DashboardFilters";
import { isWithinInterval, parseISO } from "date-fns";

const mockTransactions: Transaction[] = [
  { id: 1, date: "2024-03-15", description: "Rent Payment - Poznan", amount: -2000, currency: "PLN" as Currency, category: "Housing", person: "Adam", property: "Poznań" },
  { id: 2, date: "2024-03-14", description: "Grocery Shopping", amount: -200, currency: "PLN" as Currency, category: "Food", person: "Natka" },
  { id: 3, date: "2024-03-13", description: "Salary", amount: 8000, currency: "PLN" as Currency, category: "Income", person: "Adam" },
  { id: 4, date: "2024-03-12", description: "Transport", amount: -500, currency: "PLN" as Currency, category: "Transport", person: "Adi" },
  { id: 5, date: "2024-03-11", description: "Healthcare", amount: -300, currency: "PLN" as Currency, category: "Health", person: "Natka" },
];

export const DashboardView = () => {
  const [displayCurrency, setDisplayCurrency] = useState<Currency>("PLN" as Currency);
  const [convertedBalance, setConvertedBalance] = useState<number>(0);
  const [convertedIncome, setConvertedIncome] = useState<number>(0);
  const [convertedExpenses, setConvertedExpenses] = useState<number>(0);
  
  // Filter states
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  
  // Filtered transactions
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(mockTransactions);

  useEffect(() => {
    // Apply filters and sorting
    let filtered = [...mockTransactions];

    // Date range filter
    if (startDate && endDate) {
      filtered = filtered.filter(t => {
        const transactionDate = parseISO(t.date);
        return isWithinInterval(transactionDate, { start: startDate, end: endDate });
      });
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-desc":
          return b.amount - a.amount;
        case "amount-asc":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    setFilteredTransactions(filtered);
  }, [startDate, endDate, selectedCategory, sortBy]);

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

        // Calculate converted income
        const incomePromises = filteredTransactions
          .filter(t => t.amount > 0)
          .map(t => convertCurrency(t.amount, t.currency, displayCurrency));
        const convertedIncomes = await Promise.all(incomePromises);
        const totalIncome = convertedIncomes.reduce((sum, amount) => sum + amount, 0);
        setConvertedIncome(totalIncome);

        // Calculate converted expenses
        const expensePromises = filteredTransactions
          .filter(t => t.amount < 0)
          .map(t => convertCurrency(Math.abs(t.amount), t.currency, displayCurrency));
        const convertedExpenses = await Promise.all(expensePromises);
        const totalExpenses = convertedExpenses.reduce((sum, amount) => sum + amount, 0);
        setConvertedExpenses(totalExpenses);
      } catch (error) {
        console.error('Error converting amounts:', error);
      }
    };

    updateConvertedAmounts();
  }, [filteredTransactions, displayCurrency]);

  const handleCurrencyChange = (value: string) => {
    setDisplayCurrency(value as Currency);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <Select value={displayCurrency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PLN">PLN</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DashboardFilters
          startDate={startDate}
          endDate={endDate}
          onDateChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-violet-50 to-white dark:from-violet-950 dark:to-gray-950">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {convertedBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-gray-950">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Monthly Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              +{convertedIncome.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-red-50 to-white dark:from-red-950 dark:to-gray-950">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingDown className="h-5 w-5 text-red-600" />
              Monthly Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              -{convertedExpenses.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
            </p>
          </CardContent>
        </Card>

        <BudgetTracker transactions={filteredTransactions} displayCurrency={displayCurrency} />
        <PersonalSpending transactions={filteredTransactions} displayCurrency={displayCurrency} />
      </div>
    </div>
  );
};