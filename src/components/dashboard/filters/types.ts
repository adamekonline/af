import { Currency } from "@/types";

export interface DashboardFiltersProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onDateChange: (start: Date | undefined, end: Date | undefined) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedPerson: string;
  onPersonChange: (person: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  activeFiltersCount: number;
}