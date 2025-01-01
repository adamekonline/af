import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, Currency } from "@/types";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DashboardFiltersProps } from "./types";

const categories: Category[] = ["Housing", "Food", "Transport", "Health", "Education", "Credit", "Credit Card", "Income", "Other"];
const people = ["All", "Adam", "Natka", "Adi"];
const currencies: Currency[] = ["PLN", "EUR", "USD"];

export const DesktopFilters = ({
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
  activeFiltersCount,
}: DashboardFiltersProps) => {
  return (
    <div className="hidden lg:flex flex-wrap items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate && endDate ? (
              <>
                {format(startDate, "LLL dd, y")} - {format(endDate, "LLL dd, y")}
              </>
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={{
              from: startDate,
              to: endDate,
            }}
            onSelect={(range) => {
              onDateChange(range?.from, range?.to);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[180px]">
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

      <Select value={selectedPerson} onValueChange={onPersonChange}>
        <SelectTrigger className="w-[180px]">
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

      <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
        <SelectTrigger className="w-[180px]">
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

      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date-desc">Date (Newest First)</SelectItem>
          <SelectItem value="date-asc">Date (Oldest First)</SelectItem>
          <SelectItem value="amount-desc">Amount (Highest First)</SelectItem>
          <SelectItem value="amount-asc">Amount (Lowest First)</SelectItem>
        </SelectContent>
      </Select>

      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          onClick={() => {
            onDateChange(undefined, undefined);
            onCategoryChange("all");
            onPersonChange("All");
            onSortChange("date-desc");
          }}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear filters
        </Button>
      )}
    </div>
  );
};