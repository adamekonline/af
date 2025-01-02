export const translations = {
  // Navigation and main sections
  dashboard: "Panel główny",
  transactions: "Transakcje",
  budgets: "Budżety",
  exchangeRates: "Kursy walut",
  manualExchangeRates: "Kursy walut",
  logout: "Wyloguj",

  // Error messages
  error: "Wystąpił błąd",
  errorFetchingTransactions: "Błąd podczas pobierania transakcji",
  transactionDeleted: "Transakcja usunięta",
  failedToDeleteTransaction: "Nie udało się usunąć transakcji",
  failedToAddTransaction: "Nie udało się dodać transakcji",
  failedToUpdateTransaction: "Nie udało się zaktualizować transakcji",
  failedToAddExchangeRate: "Nie udało się dodać kursu walutowego",
  failedToDeleteExchangeRate: "Nie udało się usunąć kursu walutowego",
  failedToFetchExchangeRates: "Nie udało się pobrać kursów walutowych",
  exchangeRateAdded: "Dodano kurs walutowy",
  exchangeRateDeleted: "Usunięto kurs walutowy",

  // Dashboard labels
  totalBalance: "Całkowite saldo",
  monthlyIncome: "Miesięczny przychód",
  monthlyExpenses: "Miesięczne wydatki",
  budgetTracking: "Śledzenie budżetu",
  categoryOverview: "Przegląd kategorii",
  expenseCategoryOverview: "Przegląd kategorii wydatków",
  personalSpendingOverview: "Przegląd wydatków osobistych",

  // Form fields and labels
  date: "Data",
  description: "Opis",
  amount: "Kwota",
  currency: "Waluta",
  category: "Kategoria",
  person: "Osoba",
  property: "Nieruchomość",
  email: "Email",
  password: "Hasło",
  delete: "Usuń",
  spent: "wydane",
  budget: "budżet",
  fromCurrency: "Z waluty",
  toCurrency: "Na walutę",
  exchangeRate: "Kurs wymiany",
  addRate: "Dodaj kurs",
  selectCurrency: "Wybierz walutę",

  // Categories - exact matches for filters
  Housing: "Mieszkanie",
  Zywnosc: "Żywność",
  Transport: "Transport",
  Health: "Zdrowie",
  Education: "Edukacja",
  Kredyty: "Kredyty",
  "Credit Card": "Karta kredytowa",
  Income: "Przychód",
  "Telefonia/Internet": "Telefonia/Internet",
  "Restauracje/Rozrywka": "Restauracje/Rozrywka",
  Other: "Inne",

  // Categories - lowercase versions (if needed elsewhere)
  housing: "mieszkanie",
  zywnosc: "żywność",
  transport: "transport",
  health: "zdrowie",
  education: "edukacja",
  kredyty: "kredyty",
  "credit card": "karta kredytowa",
  income: "przychód",
  "telefonia/internet": "telefonia/internet",
  "restauracje/rozrywka": "restauracje/rozrywka",
  other: "inne",

  // Budget related
  budgetAdded: "Dodano budżet",
  budgetDeleted: "Usunięto budżet",
  addBudget: "Dodaj budżet",
  enterAmount: "Wprowadź kwotę",
  selectCategory: "Wybierz kategorię",

  // Properties
  allProperties: "Wszystkie nieruchomości",
  poznan: "Poznań",
  leuven: "Leuven",

  // Filter related
  filters: "Filtruj",
  clearFilters: "Wyczyść filtry",
  clearAllFilters: "Wyczyść wszystkie filtry",
  filterByCategory: "Filtruj według kategorii",
  filterByPerson: "Filtruj według osoby",
  allCategories: "Wszystkie kategorie",
  pickDateRange: "Wybierz zakres dat",
  displayCurrency: "Wyświetlana waluta",

  // Sort options
  sortBy: "Sortuj według",
  dateNewestFirst: "Data (od najnowszych)",
  dateOldestFirst: "Data (od najstarszych)",
  amountHighestFirst: "Kwota (od najwyższej)",
  amountLowestFirst: "Kwota (od najniższej)",

  // Actions and messages
  addTransaction: "Dodaj transakcję",
  editTransaction: "Edytuj transakcję",
  transactionAdded: "Transakcja została dodana",
  enterDescription: "Wprowadź opis",
  selectPerson: "Wybierz osobę",
  selectProperty: "Wybierz nieruchomość",
  apply: "Zastosuj",
  reset: "Reset",
  signIn: "Zaloguj się",
  login: "Logowanie",
  
  // Date range
  from: "Od",
  to: "Do",
  dateRange: "Zakres dat",

  // Status messages
  loading: "Ładowanie...",
  noData: "Brak danych",
  success: "Sukces",
  warning: "Ostrzeżenie",
  info: "Informacja",

  // Exchange rates
  original: "Kwota oryginalna",
  noRatesFound: "Nie znaleziono kursów walutowych",

  // Actions
  actions: "Akcje",
} as const;

type TranslationKey = keyof typeof translations | (string & {});

export const t = (key: TranslationKey): string => {
  if (key in translations) {
    return translations[key as keyof typeof translations];
  }
  return key;
};
