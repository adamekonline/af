import { TrendingUp, TrendingDown } from "lucide-react";
import { BudgetTracker } from "./BudgetTracker";
import { PersonalSpending } from "./PersonalSpending";
import { DashboardFilters } from "./DashboardFilters";
import { SummaryCard } from "./cards/SummaryCard";
import { useTransactions } from "./hooks/useTransactions";
import { useFilters } from "./hooks/useFilters";
import { useFilteredAmounts } from "./hooks/useFilteredAmounts";
import { Skeleton } from "@/components/ui/skeleton";

export const DashboardView = () => {
  const { transactions, isLoading } = useTransactions();
  const {
    startDate,
    endDate,
    selectedCategory,
    selectedPerson,
    sortBy,
    displayCurrency,
    filteredTransactions,
    setStartDate,
    setEndDate,
    setSelectedCategory,
    setSelectedPerson,
    setSortBy,
    setDisplayCurrency,
    getActiveFiltersCount,
  } = useFilters(transactions);

  const { convertedBalance, convertedIncome, convertedExpenses } = useFilteredAmounts(
    filteredTransactions,
    "PLN"
  );

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="grid gap-3 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[140px] w-full" />
          <Skeleton className="h-[140px] w-full" />
          <Skeleton className="h-[140px] w-full" />
          <Skeleton className="h-[400px] w-full col-span-full" />
          <Skeleton className="h-[400px] w-full col-span-full" />
        </div>
      </div>
    );
  }

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
          selectedCurrency="PLN"
          onCurrencyChange={() => {}} // Disable currency selection
          activeFiltersCount={getActiveFiltersCount()}
        />
      </div>

      <div className="grid gap-3 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Total Balance"
          amount={convertedBalance}
          currency="PLN"
        />
        <SummaryCard
          title="Monthly Income"
          amount={convertedIncome}
          currency="PLN"
          icon={TrendingUp}
          variant="income"
        />
        <SummaryCard
          title="Monthly Expenses"
          amount={convertedExpenses}
          currency="PLN"
          icon={TrendingDown}
          variant="expense"
        />

        <BudgetTracker transactions={filteredTransactions} displayCurrency="PLN" />
        <PersonalSpending transactions={filteredTransactions} displayCurrency="PLN" />
      </div>
    </div>
  );
};