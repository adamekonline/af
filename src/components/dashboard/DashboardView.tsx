import { TrendingUp, TrendingDown } from "lucide-react";
import { BudgetTracker } from "./BudgetTracker";
import { PersonalSpending } from "./personal-spending/PersonalSpending";
import { CategoryOverview } from "./category-overview/CategoryOverview";
import { DashboardFilters } from "./DashboardFilters";
import { SummaryCard } from "./cards/SummaryCard";
import { useTransactions } from "./hooks/useTransactions";
import { useFilters } from "./hooks/useFilters";
import { useFilteredAmounts } from "./hooks/useFilteredAmounts";
import { Skeleton } from "@/components/ui/skeleton";
import { t } from "@/utils/translations";

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
          title={t("totalBalance")}
          amount={convertedBalance}
          currency="PLN"
        />
        <SummaryCard
          title={t("monthlyIncome")}
          amount={convertedIncome}
          currency="PLN"
          icon={TrendingUp}
          variant="income"
        />
        <SummaryCard
          title={t("monthlyExpenses")}
          amount={convertedExpenses}
          currency="PLN"
          icon={TrendingDown}
          variant="expense"
        />

        <BudgetTracker />
        <PersonalSpending />
        <CategoryOverview />
      </div>
    </div>
  );
};