export type Currency = 'PLN' | 'USD' | 'EUR' | 'GBP';
export type PropertyLocation = 'Poznań' | 'Leuven';
export type Person = 'Natka' | 'Adam' | 'Adi';
export type Category = 
  | 'Housing' 
  | 'Food' 
  | 'Transport' 
  | 'Health' 
  | 'Education' 
  | 'Credit' 
  | 'Credit Card'
  | 'Income'
  | 'Other';

export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  currency: Currency;
  category: Category;
  person: Person;
  property?: PropertyLocation;
  created_at?: string;
}

export interface Budget {
  category: Category;
  limit: number;
  currency: Currency;
}

export interface MonthlyData {
  month: string;
  timestamp: number;
  Adam: number;
  Natka: number;
  Adi: number;
  income: number;
  expenses: number;
}

export interface CategoryData {
  category: string;
  total: number;
  transactions: number;
}