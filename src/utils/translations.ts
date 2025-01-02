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
  categoryOverview: "Przegląd kategorii",
  expenseCategoryOverview: "Przegląd kategorii wydatków",
  personalSpendingOverview: "Przegląd wydatków osobistych",
  manualExchangeRates: "Ręczne kursy walut",
  exchangeRateAdded: "Dodano kurs walutowy",
  exchangeRateDeleted: "Usunięto kurs walutowy",
  failedToAddExchangeRate: "Nie udało się dodać kursu walutowego",
  failedToDeleteExchangeRate: "Nie udało się usunąć kursu walutowego",
  failedToFetchExchangeRates: "Nie udało się pobrać kursów walutowych",

  // Form fields and labels
  date: "Data",
  description: "Opis",
  amount: "Kwota",
  currency: "Waluta",
  category: "Kategoria",
  person: "Osoba",
  property: "Nieruchomość",
  
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
  
  // Actions and messages
  addTransaction: "Dodaj transakcję",
  editTransaction: "Edytuj transakcję",
  transactionAdded: "Transakcja została dodana",
  selectCategory: "Wybierz kategorię",
  selectCurrency: "Wybierz walutę",
  selectPerson: "Wybierz osobę",
  selectProperty: "Wybierz nieruchomość",
  success: "Sukces"
};

export const t = (key: keyof typeof translations): string => {
  return translations[key] || key;
};