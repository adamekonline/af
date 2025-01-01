import { Category, Currency, Person, PropertyLocation } from "@/types";

export interface TransactionFormData {
  date: string;
  description: string;
  amount: string;
  currency: Currency;
  category: Category;
  person: Person;
  property?: PropertyLocation;
}

export { type Category, type Currency, type Person, type PropertyLocation };