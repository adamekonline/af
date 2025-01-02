import { ManualExchangeRates } from "@/components/dashboard/ManualExchangeRates";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { t } from "@/utils/translations";

export const ExchangeRates = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{t("exchangeRates")}</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <ManualExchangeRates />
      </div>
    </div>
  );
};