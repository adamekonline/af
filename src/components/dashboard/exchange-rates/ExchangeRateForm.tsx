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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
              <FormItem>
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
              <FormItem>
                <FormLabel>{t("exchangeRate")}</FormLabel>
                <FormControl>
                  <Input type="number" step="0.0001" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-end">
            <Button type="submit" className="w-full">{t("addRate")}</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};