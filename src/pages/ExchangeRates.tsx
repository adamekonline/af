import { Button } from "@/components/ui/button";
import { ArrowLeft, BookmarkPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ManualExchangeRates } from "@/components/dashboard/ManualExchangeRates";
import { t } from "@/utils/translations";

export const ExchangeRates = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
              <BookmarkPlus className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-semibold">{t("manualExchangeRates")}</h1>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="space-y-6">
            <ManualExchangeRates />
          </div>
        </div>
      </div>
    </div>
  );
};