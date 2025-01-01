import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { t } from "@/utils/translations";

const BudgetTracker = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("budgetTracking")}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <span>{t("housing")}</span>
            </div>
            <span className="text-muted-foreground">
              2100 zł {t("spent")} / 2500 zł {t("budget")}
            </span>
          </div>
          <Progress value={84} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <span>{t("food")}</span>
            </div>
            <span className="text-muted-foreground">
              1200 zł {t("spent")} / 1500 zł {t("budget")}
            </span>
          </div>
          <Progress value={80} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <span>{t("transport")}</span>
            </div>
            <span className="text-muted-foreground">
              300 zł {t("spent")} / 500 zł {t("budget")}
            </span>
          </div>
          <Progress value={60} />
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;