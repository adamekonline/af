import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ManualRateForm } from "./types";
import { t } from "@/utils/translations";

interface ExchangeRateFormProps {
  form: UseFormReturn<ManualRateForm>;
  onSubmit: (values: ManualRateForm) => Promise<void>;
}

export const ExchangeRateForm = ({ form, onSubmit }: ExchangeRateFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap items-end gap-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex-1 min-w-[200px]">
              <FormLabel>{t("date")}</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="base_currency"
          render={({ field }) => (
            <FormItem className="flex-1 min-w-[150px]">
              <FormLabel>{t("fromCurrency")}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectCurrency")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PLN">PLN</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="target_currency"
          render={({ field }) => (
            <FormItem className="flex-1 min-w-[150px]">
              <FormLabel>{t("toCurrency")}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectCurrency")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PLN">PLN</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rate"
          render={({ field }) => (
            <FormItem className="flex-1 min-w-[150px]">
              <FormLabel>{t("exchangeRate")}</FormLabel>
              <FormControl>
                <Input type="number" step="0.0001" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="min-w-[120px]">{t("addRate")}</Button>
      </form>
    </Form>
  );
};