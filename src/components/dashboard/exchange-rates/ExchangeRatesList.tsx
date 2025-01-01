import { Button } from "@/components/ui/button";
import { ManualRate } from "./types";

interface ExchangeRatesListProps {
  rates: ManualRate[];
  onDelete: (id: number) => Promise<void>;
}

export const ExchangeRatesList = ({ rates, onDelete }: ExchangeRatesListProps) => {
  return (
    <div className="space-y-4">
      {rates.map((rate) => (
        <div key={rate.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-1">
            <p className="text-sm font-medium">{rate.date}</p>
            <p className="text-sm text-muted-foreground">
              1 {rate.base_currency} = {rate.rate} {rate.target_currency}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onDelete(rate.id)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};