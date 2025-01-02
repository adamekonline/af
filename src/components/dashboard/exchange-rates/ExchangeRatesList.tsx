import { Button } from "@/components/ui/button";
import { ManualRate } from "./types";
import { t } from "@/utils/translations";

interface ExchangeRatesListProps {
  rates: ManualRate[];
  onDelete: (id: number) => Promise<void>;
}

export const ExchangeRatesList = ({ rates, onDelete }: ExchangeRatesListProps) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString('de-DE', { 
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    });
  };

  if (rates.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        {t("noRatesFound")}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4 py-2 px-4 font-medium text-sm text-muted-foreground">
        <div>{t("date")}</div>
        <div>{t("fromCurrency")}</div>
        <div>{t("toCurrency")}</div>
        <div>{t("exchangeRate")}</div>
      </div>
      {rates.map((rate) => (
        <div key={rate.id} className="grid grid-cols-4 gap-4 items-center p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
          <div>{rate.date}</div>
          <div>{rate.base_currency}</div>
          <div>{rate.target_currency}</div>
          <div className="flex items-center justify-between">
            <span>{formatNumber(rate.rate)}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDelete(rate.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              {t("delete")}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};