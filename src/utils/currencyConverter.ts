import { supabase } from "@/integrations/supabase/client";
import { Currency } from "@/types";

// Cache for exchange rates
let exchangeRatesCache: {
  [key: string]: {
    rate: number;
    timestamp: number;
  };
} = {};

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

const FALLBACK_RATES: Record<Currency, number> = {
  PLN: 1,
  USD: 4.05,
  EUR: 4.32,
  GBP: 5.05
};

export const convertCurrency = (amount: number, fromCurrency: Currency, toCurrency: Currency): number => {
  if (fromCurrency === toCurrency) return amount;
  
  // Use fallback rates for now
  const fromRate = FALLBACK_RATES[fromCurrency];
  const toRate = FALLBACK_RATES[toCurrency];
  
  return (amount * toRate) / fromRate;
};

// Function to trigger exchange rates update
export const updateExchangeRates = async () => {
  try {
    await supabase.functions.invoke('fetch-exchange-rates');
    // Clear cache to force fresh rates on next conversion
    exchangeRatesCache = {};
  } catch (error) {
    console.error('Failed to update exchange rates:', error);
  }
};