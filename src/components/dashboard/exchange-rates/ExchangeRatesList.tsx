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
      {rates.map((rate) => (
        <div key={rate.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
          <div className="space-y-1">
            <p className="text-sm font-medium">{rate.date}</p>
            <p className="text-sm text-muted-foreground">
              1 {rate.base_currency} = {formatNumber(rate.rate)} {rate.target_currency}
            </p>
          </div>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onDelete(rate.id)}
            className="ml-4"
          >
            {t("delete")}
          </Button>
        </div>
      ))}
    </div>
  );
};