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
  const [selectedPerson, setSelectedPerson] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  
  // Filtered transactions
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(mockTransactions);

  // Calculate active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (startDate && endDate) count++;
    if (selectedCategory !== "all") count++;
    if (selectedPerson !== "All") count++;
    if (sortBy !== "date-desc") count++;
    if (displayCurrency !== "PLN") count++;
    return count;
  };

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

    // Person filter
    if (selectedPerson !== "All") {
      filtered = filtered.filter(t => t.person === selectedPerson);
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
  }, [startDate, endDate, selectedCategory, selectedPerson, sortBy]);

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

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4">
        <DashboardFilters
          startDate={startDate}
          endDate={endDate}
          onDateChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedPerson={selectedPerson}
          onPersonChange={setSelectedPerson}
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedCurrency={displayCurrency}
          onCurrencyChange={setDisplayCurrency}
          activeFiltersCount={getActiveFiltersCount()}
        />
      </div>

      <div className="grid gap-3 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-violet-50 to-white dark:from-violet-950 dark:to-gray-950 p-3 md:p-6">
          <CardHeader className="space-y-1 p-2 md:p-6">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6">
            <p className="text-lg md:text-2xl font-bold">
              {convertedBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-gray-950 p-3 md:p-6">
          <CardHeader className="space-y-1 p-2 md:p-6">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
              Monthly Income
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6">
            <p className="text-lg md:text-2xl font-bold text-green-600">
              +{convertedIncome.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-red-50 to-white dark:from-red-950 dark:to-gray-950 p-3 md:p-6">
          <CardHeader className="space-y-1 p-2 md:p-6">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <TrendingDown className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
              Monthly Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6">
            <p className="text-lg md:text-2xl font-bold text-red-600">
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