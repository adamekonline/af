import { supabase } from "@/integrations/supabase/client";

// Cache for exchange rates
let exchangeRatesCache: {
  [key: string]: {
    rate: number;
    timestamp: number;
  };
} = {};

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const convertCurrency = async (amount: number, fromCurrency: string, toCurrency: string): Promise<number> => {
  if (fromCurrency === toCurrency) return amount;
  
  const cacheKey = `${fromCurrency}-${toCurrency}`;
  const now = Date.now();
  
  // Check cache first
  if (
    exchangeRatesCache[cacheKey] &&
    now - exchangeRatesCache[cacheKey].timestamp < CACHE_DURATION
  ) {
    return amount * exchangeRatesCache[cacheKey].rate;
  }
  
  try {
    // Fetch from Supabase
    const { data: rates, error } = await supabase
      .from('exchange_rates')
      .select('rate')
      .eq('base_currency', fromCurrency)
      .eq('target_currency', toCurrency)
      .order('date', { ascending: false })
      .limit(1);

    if (error) throw error;
    
    if (rates && rates.length > 0) {
      // Update cache
      exchangeRatesCache[cacheKey] = {
        rate: rates[0].rate,
        timestamp: now,
      };
      return amount * rates[0].rate;
    }
    
    // If no direct conversion found, try reverse
    const { data: reverseRates, error: reverseError } = await supabase
      .from('exchange_rates')
      .select('rate')
      .eq('base_currency', toCurrency)
      .eq('target_currency', fromCurrency)
      .order('date', { ascending: false })
      .limit(1);

    if (reverseError) throw reverseError;
    
    if (reverseRates && reverseRates.length > 0) {
      const rate = 1 / reverseRates[0].rate;
      exchangeRatesCache[cacheKey] = {
        rate,
        timestamp: now,
      };
      return amount * rate;
    }

    throw new Error(`No exchange rate found for ${fromCurrency} to ${toCurrency}`);
  } catch (error) {
    console.error('Error converting currency:', error);
    // Fallback to approximate rates if API fails
    const fallbackRates = {
      PLN: 1,
      USD: 4.05,
      EUR: 4.32,
      GBP: 5.05
    };
    
    const fromRate = fallbackRates[fromCurrency as keyof typeof fallbackRates];
    const toRate = fallbackRates[toCurrency as keyof typeof fallbackRates];
    
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