import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { t } from "@/utils/translations";
import { PersonalSpendingItem } from "./PersonalSpendingItem";
import { usePersonalSpending } from "./usePersonalSpending";

export const PersonalSpending = () => {
  const { personalSpending } = usePersonalSpending();

  // Calculate percentages based on total spending
  const totalSpending = Object.values(personalSpending).reduce((a, b) => a + b, 0);
  const getPercentage = (amount: number) => {
    return totalSpending > 0 ? Math.round((amount / totalSpending) * 100) : 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("personalSpendingOverview")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Object.entries(personalSpending).map(([person, amount]) => (
            <PersonalSpendingItem
              key={person}
              person={person}
              amount={amount}
              percentage={getPercentage(amount)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};