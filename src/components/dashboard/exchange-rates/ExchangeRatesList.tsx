import { Button } from "@/components/ui/button";
import { ManualRate } from "./types";
import { t } from "@/utils/translations";
import { Pencil, Trash2 } from "lucide-react";

interface ExchangeRatesListProps {
  rates: ManualRate[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (rate: ManualRate) => void;
}

export const ExchangeRatesList = ({ rates, onDelete, onEdit }: ExchangeRatesListProps) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString('de-DE', { 
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    });
  };

  if (rates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-sm text-muted-foreground">
          {t("noRatesFound")}
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs bg-muted/50">
          <tr>
            <th scope="col" className="px-6 py-4">{t("date")}</th>
            <th scope="col" className="px-6 py-4">{t("fromCurrency")}</th>
            <th scope="col" className="px-6 py-4">{t("toCurrency")}</th>
            <th scope="col" className="px-6 py-4">{t("exchangeRate")}</th>
            <th scope="col" className="px-6 py-4 text-right">{t("actions")}</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rates.map((rate) => (
            <tr 
              key={rate.id} 
              className="hover:bg-muted/50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">{rate.date}</td>
              <td className="px-6 py-4">{rate.base_currency}</td>
              <td className="px-6 py-4">{rate.target_currency}</td>
              <td className="px-6 py-4">{formatNumber(rate.rate)}</td>
              <td className="px-6 py-4 text-right space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onEdit(rate)}
                  className="hover:text-primary hover:bg-primary/10"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onDelete(rate.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};