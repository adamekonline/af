import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { ExchangeRateForm } from "./exchange-rates/ExchangeRateForm";
import { ExchangeRatesList } from "./exchange-rates/ExchangeRatesList";
import { ManualRate, ManualRateForm, SupabaseManualRate } from "./exchange-rates/types";
import { t } from "@/utils/translations";

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
      toast.error(t("failedToFetchExchangeRates"));
      return;
    }
    
    const typedRates: ManualRate[] = (data as SupabaseManualRate[]).map(rate => ({
      id: rate.id,
      date: rate.date,
      base_currency: rate.base_currency as ManualRate['base_currency'],
      target_currency: rate.target_currency as ManualRate['target_currency'],
      rate: rate.rate,
    }));
    
    setRates(typedRates);
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

      toast.success(t("exchangeRateAdded"));
      form.reset({
        date: new Date().toISOString().split('T')[0],
        base_currency: 'PLN',
        target_currency: 'EUR',
        rate: '',
      });
      fetchRates();
    } catch (error) {
      toast.error(t("failedToAddExchangeRate"));
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('manual_exchange_rates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success(t("exchangeRateDeleted"));
      fetchRates();
    } catch (error) {
      toast.error(t("failedToDeleteExchangeRate"));
    }
  };

  const handleEdit = (rate: ManualRate) => {
    form.reset({
      date: rate.date,
      base_currency: rate.base_currency,
      target_currency: rate.target_currency,
      rate: rate.rate.toString(),
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8">
        <div className="rounded-lg border bg-card">
          <ExchangeRateForm form={form} onSubmit={onSubmit} />
        </div>
        
        <div className="rounded-lg border bg-card">
          <ExchangeRatesList 
            rates={rates} 
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};