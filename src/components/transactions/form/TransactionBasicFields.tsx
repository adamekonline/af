import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { TransactionFormData } from "../types";
import { t } from "@/utils/translations";

interface TransactionBasicFieldsProps {
  form: UseFormReturn<TransactionFormData>;
}

export const TransactionBasicFields = ({ form }: TransactionBasicFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
            <FormLabel className="text-sm font-medium">{t("date")}</FormLabel>
            <div>
              <FormControl>
                <Input type="date" {...field} className="h-8" />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
            <FormLabel className="text-sm font-medium">{t("description")}</FormLabel>
            <div>
              <FormControl>
                <Input {...field} className="h-8" />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
            <FormLabel className="text-sm font-medium">{t("amount")}</FormLabel>
            <div>
              <FormControl>
                <Input type="number" step="0.01" {...field} className="h-8" />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </>
  );
};