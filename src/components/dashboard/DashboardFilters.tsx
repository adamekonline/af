import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, Currency } from "@/types";
import { CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface DashboardFiltersProps {
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

const categories: Category[] = ["Housing", "Food", "Transport", "Health", "Education", "Credit", "Credit Card", "Income", "Other"];
const people = ["All", "Adam", "Natka", "Adi"];
const currencies: Currency[] = ["PLN", "EUR", "USD"];

export const DashboardFilters = ({
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
  activeFiltersCount
}: DashboardFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {/* Mobile Filters */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 mt-4">
            <MobileFilters
              startDate={startDate}
              endDate={endDate}
              onDateChange={onDateChange}
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
              selectedPerson={selectedPerson}
              onPersonChange={onPersonChange}
              sortBy={sortBy}
              onSortChange={onSortChange}
              selectedCurrency={selectedCurrency}
              onCurrencyChange={onCurrencyChange}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Filters */}
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
    </div>
  );
};

// Mobile version of the filters
const MobileFilters = ({
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
          <Calendar
            mode="range"
            selected={{
              from: startDate,
              to: endDate,
            }}
            onSelect={(range) => {
              onDateChange(range?.from, range?.to);
            }}
          />
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