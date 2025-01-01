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
}

export interface Budget {
  category: Category;
  limit: number;
  currency: Currency;
}