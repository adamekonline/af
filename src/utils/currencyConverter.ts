// Exchange rates as of a fixed date (in production, these would come from an API)
const exchangeRates = {
  PLN: 1,
  USD: 4.05,
  EUR: 4.32,
  GBP: 5.05
};

export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to PLN first (our base currency)
  const amountInPLN = fromCurrency === 'PLN' ? amount : amount * exchangeRates[fromCurrency as keyof typeof exchangeRates];
  
  // Then convert to target currency
  return toCurrency === 'PLN' ? amountInPLN : amountInPLN / exchangeRates[toCurrency as keyof typeof exchangeRates];
};