import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, Currency } from "@/types";
import { DashboardFiltersProps } from "./types";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { t } from "@/utils/translations";

const categories: Category[] = ["Housing", "Zywnosc", "Transport", "Health", "Education", "Kredyty", "Credit Card", "Income", "Telefonia/Internet", "Restauracje/Rozrywka", "Other"];
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
          <label className="text-sm font-medium">{t("dateRange")}</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground">{t("from")}</label>
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
              <label className="text-xs text-muted-foreground">{t("to")}</label>
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
          <label className="text-sm font-medium">{t("category")}</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
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
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t("person")}</label>
          <Select value={selectedPerson} onValueChange={onPersonChange}>
            <SelectTrigger>
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
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t("displayCurrency")}</label>
          <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
            <SelectTrigger>
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
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t("sortBy")}</label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue placeholder={t("sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">{t("dateNewestFirst")}</SelectItem>
              <SelectItem value="date-asc">{t("dateOldestFirst")}</SelectItem>
              <SelectItem value="amount-desc">{t("amountHighestFirst")}</SelectItem>
              <SelectItem value="amount-asc">{t("amountLowestFirst")}</SelectItem>
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
          {t("clearAllFilters")}
        </Button>
      </div>
    </>
  );
};