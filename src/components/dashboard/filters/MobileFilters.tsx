import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, Currency } from "@/types";
import { DashboardFiltersProps } from "./types";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

const categories: Category[] = ["Housing", "Food", "Transport", "Health", "Education", "Credit", "Credit Card", "Income", "Other"];
const people = ["All", "Adam", "Natka", "Adi"];
const currencies: Currency[] = ["PLN", "EUR", "USD"];

export const MobileFilters = ({
  startDate,
  endDate,
  onDateChange,
  selectedCategory,
  onCategoryChange,
  selectedPerson,
  onPersonChange,
  sortBy,
  onSortChange,
  selectedCurrency,
  onCurrencyChange,
}: Omit<DashboardFiltersProps, 'activeFiltersCount'>) => {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Date Range</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground">Start Date</label>
              <Input
                type="date"
                value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : undefined;
                  onDateChange(date, endDate);
                }}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">End Date</label>
              <Input
                type="date"
                value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : undefined;
                  onDateChange(startDate, date);
                }}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Person</label>
          <Select value={selectedPerson} onValueChange={onPersonChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by person" />
            </SelectTrigger>
            <SelectContent>
              {people.map((person) => (
                <SelectItem key={person} value={person}>
                  {person}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Display Currency</label>
          <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
            <SelectTrigger>
              <SelectValue placeholder="Display currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Sort By</label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Date (Newest First)</SelectItem>
              <SelectItem value="date-asc">Date (Oldest First)</SelectItem>
              <SelectItem value="amount-desc">Amount (Highest First)</SelectItem>
              <SelectItem value="amount-asc">Amount (Lowest First)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full mt-4"
          variant="outline"
          onClick={() => {
            onDateChange(undefined, undefined);
            onCategoryChange("all");
            onPersonChange("All");
            onSortChange("date-desc");
          }}
        >
          Clear all filters
        </Button>
      </div>
    </>
  );
};