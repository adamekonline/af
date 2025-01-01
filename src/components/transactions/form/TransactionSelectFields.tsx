import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn, useWatch } from "react-hook-form";
import { Category, Currency, Person, PropertyLocation, TransactionFormData } from "../types";

const categories: Category[] = ["Housing", "Food", "Transport", "Health", "Education", "Credit", "Credit Card", "Income", "Other"];
const currencies: Currency[] = ["PLN", "USD", "EUR", "GBP"];
const people: Person[] = ["Natka", "Adam", "Adi"];
const properties: PropertyLocation[] = ["Poznań", "Leuven"];

interface TransactionSelectFieldsProps {
  form: UseFormReturn<TransactionFormData>;
}

export const TransactionSelectFields = ({ form }: TransactionSelectFieldsProps) => {
  const category = useWatch({
    control: form.control,
    name: "category"
  });

  return (
    <>
      <FormField
        control={form.control}
        name="currency"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
            <FormLabel className="text-sm font-medium">Currency</FormLabel>
            <div>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
            <FormLabel className="text-sm font-medium">Category</FormLabel>
            <div>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="person"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
            <FormLabel className="text-sm font-medium">Person</FormLabel>
            <div>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select person" />
                  </SelectTrigger>
                  <SelectContent>
                    {people.map((person) => (
                      <SelectItem key={person} value={person}>
                        {person}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      
      {category === "Housing" && (
        <FormField
          control={form.control}
          name="property"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
              <FormLabel className="text-sm font-medium">Property</FormLabel>
              <div>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property} value={property}>
                          {property}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      )}
    </>
  );
};