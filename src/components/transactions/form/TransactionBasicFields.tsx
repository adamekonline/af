import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { TransactionFormData } from "../types";

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
          <FormItem className="space-y-1">
            <FormLabel className="text-sm font-medium">Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-sm font-medium">Description</FormLabel>
            <FormControl>
              <Input {...field} className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-sm font-medium">Amount</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" {...field} className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};