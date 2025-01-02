import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, Currency } from "@/types";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DashboardFiltersProps } from "./types";
import { t } from "@/utils/translations";

const categories: Category[] = ["Housing", "Zywnosc", "Transport", "Health", "Education", "Kredyty", "Credit Card", "Income", "Telefonia/Internet", "Restauracje/Rozrywka", "Other"];
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
              <span>{t("pickDateRange")}</span>
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
          <SelectValue placeholder={t("filterByCategory")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("allCategories")}</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {t(category)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedPerson} onValueChange={onPersonChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t("filterByPerson")} />
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
          <SelectValue placeholder={t("displayCurrency")} />
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
          <SelectValue placeholder={t("sortBy")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date-desc">{t("dateNewestFirst")}</SelectItem>
          <SelectItem value="date-asc">{t("dateOldestFirst")}</SelectItem>
          <SelectItem value="amount-desc">{t("amountHighestFirst")}</SelectItem>
          <SelectItem value="amount-asc">{t("amountLowestFirst")}</SelectItem>
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
          {t("clearFilters")}
        </Button>
      )}
    </div>
  );
};