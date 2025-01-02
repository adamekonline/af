export const translations = {
  // Navigation and main sections
  dashboard: "Panel główny",
  transactions: "Transakcje",
  budgets: "Budżety",
  exchangeRates: "Kursy walut",
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

  // Dashboard labels
  totalBalance: "Całkowite saldo",
  monthlyIncome: "Miesięczny przychód",
  monthlyExpenses: "Miesięczne wydatki",
  budgetTracking: "Śledzenie budżetu",
  categoryOverview: "Przegląd kategorii",
  expenseCategoryOverview: "Przegląd kategorii wydatków",
  personalSpendingOverview: "Przegląd wydatków osobistych",
  manualExchangeRates: "Ręczne kursy walut",

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

  // Categories
  Housing: "Mieszkanie",
  Food: "Jedzenie",
  Transport: "Transport",
  Health: "Zdrowie",
  Education: "Edukacja",
  Credit: "Kredyt",
  "Credit Card": "Karta kredytowa",
  Income: "Przychód",
  "Telefonia/Internet": "Telefonia/Internet",
  Other: "Inne",
  housing: "Mieszkanie",
  food: "Jedzenie",
  transport: "Transport",
  health: "Zdrowie",
  education: "Edukacja",
  credit: "Kredyt",

  // Budget related
  spent: "Wydane",
  budget: "Budżet",
  budgetAdded: "Dodano budżet",
  budgetDeleted: "Usunięto budżet",
  addBudget: "Dodaj budżet",

  // Properties
  allProperties: "Wszystkie nieruchomości",
  poznan: "Poznań",
  leuven: "Leuven",

  // Filter related
  filters: "Filtry",
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
  enterAmount: "Wprowadź kwotę",
  selectCategory: "Wybierz kategorię",
  selectCurrency: "Wybierz walutę",
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
  exchangeRateAdded: "Dodano kurs walutowy",
  exchangeRateDeleted: "Usunięto kurs walutowy",
  original: "Kwota oryginalna",

  // Misc
  all: "Wszystkie",
  ascending: "Rosnąco",
  descending: "Malejąco"
};

export const t = (key: keyof typeof translations): string => {
  return translations[key] || key;
};