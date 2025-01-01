import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Currency } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface ManualRate {
  id: number;
  date: string;
  base_currency: Currency;
  target_currency: Currency;
  rate: number;
}

interface ManualRateForm {
  date: string;
  base_currency: Currency;
  target_currency: Currency;
  rate: string;
}

export const ManualExchangeRates = () => {
  const [rates, setRates] = useState<ManualRate[]>([]);
  const form = useForm<ManualRateForm>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      base_currency: 'PLN',
      target_currency: 'EUR',
      rate: '',
    },
  });

  const fetchRates = async () => {
    const { data, error } = await supabase
      .from('manual_exchange_rates')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      toast.error('Failed to fetch exchange rates');
      return;
    }
    
    setRates(data);
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const onSubmit = async (values: ManualRateForm) => {
    try {
      const { error } = await supabase
        .from('manual_exchange_rates')
        .insert({
          date: values.date,
          base_currency: values.base_currency,
          target_currency: values.target_currency,
          rate: parseFloat(values.rate),
        });

      if (error) throw error;

      toast.success('Exchange rate added successfully');
      form.reset();
      fetchRates();
    } catch (error) {
      toast.error('Failed to add exchange rate');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('manual_exchange_rates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Exchange rate deleted successfully');
      fetchRates();
    } catch (error) {
      toast.error('Failed to delete exchange rate');
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Manual Exchange Rates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
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
                    <FormLabel>From Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
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
                    <FormLabel>To Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
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
                    <FormLabel>Exchange Rate</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.0001" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Add Rate</Button>
          </form>
        </Form>

        <div className="space-y-4">
          {rates.map((rate) => (
            <div key={rate.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">{rate.date}</p>
                <p className="text-sm text-muted-foreground">
                  1 {rate.base_currency} = {rate.rate} {rate.target_currency}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(rate.id)}>
                Delete
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};