import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { t } from "@/utils/translations";

const PersonalSpending = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("personalSpendingOverview")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{t("housing")}</p>
              <p className="text-sm text-muted-foreground">2100 zł</p>
            </div>
            <div className="ml-auto font-medium">+84%</div>
          </div>
          <div className="flex items-center">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{t("food")}</p>
              <p className="text-sm text-muted-foreground">1200 zł</p>
            </div>
            <div className="ml-auto font-medium">+80%</div>
          </div>
          <div className="flex items-center">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{t("transport")}</p>
              <p className="text-sm text-muted-foreground">300 zł</p>
            </div>
            <div className="ml-auto font-medium">+60%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalSpending;