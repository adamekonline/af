import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { t } from "@/utils/translations";
import { CategoryProgressBar } from "./CategoryProgressBar";
import { CategorySpendingLegend } from "./CategorySpendingLegend";
import { useCategorySpending } from "./useCategorySpending";

export const CategoryOverview = () => {
  const { categoryData } = useCategorySpending();

  const formatAmount = (value: number) => {
    return value.toLocaleString('pl-PL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>{t("expenseCategoryOverview")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {categoryData.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className="font-medium">{t(category.category)}</span>
              </div>
              <span className="text-muted-foreground">
                {formatAmount(category.total)} zł
              </span>
            </div>
            <div className="space-y-1">
              <CategorySpendingLegend
                Adam={category.Adam}
                Natka={category.Natka}
                Adi={category.Adi}
              />
              <CategoryProgressBar
                Adam={category.Adam}
                Natka={category.Natka}
                Adi={category.Adi}
                total={category.total}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};