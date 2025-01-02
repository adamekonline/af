export const translations = {
  // Navigation & Common
  dashboard: "Panel główny",
  transactions: "Transakcje",
  exchangeRates: "Kursy walut",
  addTransaction: "Dodaj transakcję",
  logout: "Wyloguj",
  clear: "Wyczyść",
  clearAll: "Wyczyść wszystko",
  clearFilters: "Wyczyść filtry",
  edit: "Edytuj",
  delete: "Usuń",
  save: "Zapisz",
  cancel: "Anuluj",
  loading: "Ładowanie...",
  success: "Sukces",
  error: "Błąd",

  // Summary Cards
  totalBalance: "Saldo całkowite",
  monthlyIncome: "Przychody miesięczne",
  monthlyExpenses: "Wydatki miesięczne",

  // Budget Tracking
  budgetTracking: "Śledzenie budżetu",
  personalSpendingOverview: "Przegląd wydatków osobistych",
  housing: "Mieszkanie",
  food: "Jedzenie",
  transport: "Transport",
  spent: "wydano",
  budget: "budżet",

  // Transaction Form
  date: "Data",
  description: "Opis",
  amount: "Kwota",
  currency: "Waluta",
  category: "Kategoria",
  person: "Osoba",
  property: "Nieruchomość",
  add: "Dodaj",
  update: "Aktualizuj",
  selectDate: "Wybierz datę",
  pickDateRange: "Wybierz zakres dat",
  filterByCategory: "Filtruj po kategorii",
  filterByPerson: "Filtruj po osobie",
  displayCurrency: "Wyświetl walutę",
  sortBy: "Sortuj po",
  filters: "Filtry",
  allCategories: "Wszystkie kategorie",
  allProperties: "Wszystkie nieruchomości",

  // Properties
  poznan: "Poznań",
  leuven: "Leuven",
  original: "Oryginalna kwota",

  // Categories
  income: "Przychód",
  health: "Zdrowie",
  education: "Edukacja",
  credit: "Kredyt",
  creditCard: "Karta kredytowa",
  other: "Inne",

  // Sort options
  dateNewest: "Data (od najnowszych)",
  dateOldest: "Data (od najstarszych)",
  amountHighest: "Kwota (od najwyższej)",
  amountLowest: "Kwota (od najniższej)",

  // Exchange Rates
  manualExchangeRates: "Ręczne kursy walut",
  addRate: "Dodaj kurs",
  baseCurrency: "Waluta bazowa",
  targetCurrency: "Waluta docelowa",
  rate: "Kurs",

  // Messages
  transactionAdded: "Transakcja została dodana",
  transactionUpdated: "Transakcja została zaktualizowana",
  transactionDeleted: "Transakcja została usunięta",
  rateAdded: "Kurs został dodany",
  rateDeleted: "Kurs został usunięty",
  fillAllFields: "Wypełnij wszystkie wymagane pola",
  errorFetchingTransactions: "Błąd podczas pobierania transakcji",
  failedToDeleteTransaction: "Nie udało się usunąć transakcji",

  // Auth
  login: "Zaloguj się",
  email: "Email",
  password: "Hasło",
  signIn: "Zaloguj",
  loginError: "Błąd logowania",
};

export type TranslationKey = keyof typeof translations;

export const t = (key: TranslationKey): string => {
  return translations[key];
};