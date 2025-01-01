export const translations = {
  // Dashboard
  dashboard: "Panel główny",
  transactions: "Transakcje",
  exchangeRates: "Kursy walut",
  addTransaction: "Dodaj transakcję",
  logout: "Wyloguj",

  // Summary Cards
  totalBalance: "Saldo",
  monthlyIncome: "Przychody miesięczne",
  monthlyExpenses: "Wydatki miesięczne",

  // Budget Tracking
  budgetTracking: "Śledzenie budżetu",
  housing: "Mieszkanie",
  food: "Jedzenie",
  transport: "Transport",

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
  cancel: "Anuluj",

  // Categories
  income: "Przychód",
  health: "Zdrowie",
  education: "Edukacja",
  credit: "Kredyt",
  creditCard: "Karta kredytowa",
  other: "Inne",

  // Exchange Rates
  manualExchangeRates: "Ręczne kursy walut",
  addRate: "Dodaj kurs",
  baseCurrency: "Waluta bazowa",
  targetCurrency: "Waluta docelowa",
  rate: "Kurs",
  delete: "Usuń",

  // Messages
  transactionAdded: "Transakcja została dodana",
  transactionUpdated: "Transakcja została zaktualizowana",
  transactionDeleted: "Transakcja została usunięta",
  rateAdded: "Kurs został dodany",
  rateDeleted: "Kurs został usunięty",
  fillAllFields: "Wypełnij wszystkie wymagane pola",
  error: "Wystąpił błąd",

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