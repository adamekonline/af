import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/types";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface DashboardFiltersProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onDateChange: (start: Date | undefined, end: Date | undefined) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const categories: Category[] = ["Housing", "Food", "Transport", "Health", "Education", "Credit", "Credit Card", "Income", "Other"];

export const DashboardFilters = ({
  startDate,
  endDate,
  onDateChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange
}: DashboardFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
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
    </div>
  );
};