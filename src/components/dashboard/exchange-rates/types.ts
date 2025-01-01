import { Currency } from "@/types";

export interface ManualRate {
  id: number;
  date: string;
  base_currency: Currency;
  target_currency: Currency;
  rate: number;
}

export interface ManualRateForm {
  date: string;
  base_currency: Currency;
  target_currency: Currency;
  rate: string;
}

export interface SupabaseManualRate {
  id: number;
  date: string;
  base_currency: string;
  target_currency: string;
  rate: number;
  created_at: string;
}