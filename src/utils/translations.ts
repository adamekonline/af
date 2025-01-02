export const translations: Record<string, string> = {
  dashboard: "Panel główny",
  transactions: "Transakcje",
  budgets: "Budżety",
  exchangeRates: "Kursy walut",
  logout: "Wylogowano pomyślnie",
  error: "Wystąpił błąd",
  errorFetchingTransactions: "Błąd podczas pobierania transakcji",
  transactionDeleted: "Transakcja usunięta",
  failedToDeleteTransaction: "Nie udało się usunąć transakcji",
  currency: "Waluta",
  categoryOverview: "Przegląd kategorii",
  personalSpendingOverview: "Przegląd wydatków osobistych",
  addTransaction: "Dodaj transakcję",
  editTransaction: "Edytuj transakcję",
  deleteTransaction: "Usuń transakcję",
  confirmDelete: "Czy na pewno chcesz usunąć tę transakcję?",
  cancel: "Anuluj",
  delete: "Usuń",
  save: "Zapisz",
  description: "Opis",
  amount: "Kwota",
  category: "Kategoria",
  person: "Osoba",
  property: "Nieruchomość",
  date: "Data",
  all: "Wszystkie",
  loading: "Ładowanie...",
  noData: "Brak danych",
  filters: "Filtry",
  clearFilters: "Wyczyść filtry",
  sortBy: "Sortuj według",
  ascending: "Rosnąco",
  descending: "Malejąco",
  dateRange: "Zakres dat",
  from: "Od",
  to: "Do",
  apply: "Zastosuj",
  reset: "Reset",
  success: "Sukces",
  warning: "Ostrzeżenie",
  info: "Informacja",
  budgetAdded: "Dodano budżet",
  budgetDeleted: "Usunięto budżet",
  selectCategory: "Wybierz kategorię",
  enterAmount: "Wprowadź kwotę",
  addBudget: "Dodaj budżet",
  email: "Email",
  password: "Hasło",
  signIn: "Zaloguj się",
  login: "Logowanie",
  original: "Kwota oryginalna",
  allProperties: "Wszystkie nieruchomości",
  poznan: "Poznań",
  leuven: "Leuven",
  housing: "Mieszkanie",
  food: "Jedzenie",
  transport: "Transport",
  spent: "Wydane",
  budget: "Budżet",
  budgetTracking: "Śledzenie budżetu",
  totalBalance: "Całkowite saldo",
  monthlyIncome: "Miesięczny przychód",
  monthlyExpenses: "Miesięczne wydatki",
  pickDateRange: "Wybierz zakres dat",
  filterByCategory: "Filtruj według kategorii",
  filterByPerson: "Filtruj według osoby",
  displayCurrency: "Wyświetlana waluta",
  allCategories: "Wszystkie kategorie",
  dateNewestFirst: "Data (od najnowszych)",
  dateOldestFirst: "Data (od najstarszych)",
  amountHighestFirst: "Kwota (od najwyższej)",
  amountLowestFirst: "Kwota (od najniższej)",
  clearAllFilters: "Wyczyść wszystkie filtry",
  health: "Zdrowie",
  education: "Edukacja",
  credit: "Kredyt",
  creditCard: "Karta kredytowa",
  income: "Przychód",
  other: "Inne",
  manualExchangeRates: "Ręczne kursy walut",
  exchangeRateAdded: "Dodano kurs walutowy",
  exchangeRateDeleted: "Usunięto kurs walutowy",
  failedToAddExchangeRate: "Nie udało się dodać kursu walutowego",
  failedToDeleteExchangeRate: "Nie udało się usunąć kursu walutowego",
  failedToFetchExchangeRates: "Nie udało się pobrać kursów walutowych",
  
  // Category translations
  Housing: "Mieszkanie",
  Food: "Jedzenie",
  Transport: "Transport",
  Health: "Zdrowie",
  Education: "Edukacja",
  Credit: "Kredyt",
  "Credit Card": "Karta kredytowa",
  Income: "Przychód",
  Other: "Inne",
};

export const t = (key: keyof typeof translations): string => {
  return translations[key] || key;
};
