import { Button } from "@/components/ui/button";
import { ManualRate } from "./types";
import { t } from "@/utils/translations";
import { Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MobileExchangeRatesListProps {
  rates: ManualRate[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (rate: ManualRate) => void;
}

export const MobileExchangeRatesList = ({ rates, onDelete, onEdit }: MobileExchangeRatesListProps) => {
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
    <div className="space-y-4 p-4">
      {rates.map((rate) => (
        <Card key={rate.id} className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-medium">
                {rate.base_currency} → {rate.target_currency}
              </div>
              <div className="text-2xl font-bold">
                {formatNumber(rate.rate)}
              </div>
            </div>
            <div className="flex gap-2">
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
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {rate.date}
          </div>
        </Card>
      ))}
    </div>
  );
};