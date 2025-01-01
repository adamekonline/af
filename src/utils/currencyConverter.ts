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

export const convertCurrency = async (amount: number, fromCurrency: Currency, toCurrency: Currency): Promise<number> => {
  if (fromCurrency === toCurrency) return amount;

  const cacheKey = `${fromCurrency}_${toCurrency}`;
  const now = Date.now();

  // Check cache first
  if (
    exchangeRatesCache[cacheKey] &&
    now - exchangeRatesCache[cacheKey].timestamp < CACHE_DURATION
  ) {
    return amount * exchangeRatesCache[cacheKey].rate;
  }

  try {
    // Fetch latest rate from Supabase
    const { data: rateData, error } = await supabase
      .from('exchange_rates')
      .select('rate')
      .eq('base_currency', fromCurrency)
      .eq('target_currency', toCurrency)
      .order('date', { ascending: false })
      .limit(1)
      .maybeSingle(); // Changed from single() to maybeSingle()

    if (error) throw error;

    if (rateData) {
      // Update cache
      exchangeRatesCache[cacheKey] = {
        rate: rateData.rate,
        timestamp: now,
      };
      return amount * rateData.rate;
    }

    // If no rate found, try reverse conversion
    const { data: reverseRateData, error: reverseError } = await supabase
      .from('exchange_rates')
      .select('rate')
      .eq('base_currency', toCurrency)
      .eq('target_currency', fromCurrency)
      .order('date', { ascending: false })
      .limit(1)
      .maybeSingle(); // Changed from single() to maybeSingle()

    if (reverseError) throw reverseError;

    if (reverseRateData) {
      const rate = 1 / reverseRateData.rate;
      exchangeRatesCache[cacheKey] = {
        rate,
        timestamp: now,
      };
      return amount * rate;
    }

    console.warn(`Using fallback rates for conversion from ${fromCurrency} to ${toCurrency}`);
    // Fallback to hardcoded rates if no data is available
    const fromRate = FALLBACK_RATES[fromCurrency];
    const toRate = FALLBACK_RATES[toCurrency];
    return (amount * toRate) / fromRate;

  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    // Fallback to hardcoded rates
    const fromRate = FALLBACK_RATES[fromCurrency];
    const toRate = FALLBACK_RATES[toCurrency];
    return (amount * toRate) / fromRate;
  }
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