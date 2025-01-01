import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartTooltip } from "../ChartTooltip";

interface Props {
  data: any[];
  displayCurrency: string;
}

export const CategorySpendingChart = ({ data, displayCurrency }: Props) => {
  const formatNumber = (value: number) => {
    return value.toLocaleString('de-DE', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Spending by Category</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" tickFormatter={formatNumber} />
            <YAxis dataKey="category" type="category" width={100} />
            <Tooltip content={<ChartTooltip displayCurrency={displayCurrency} />} />
            <Bar 
              dataKey="total" 
              fill="#8B5CF6"
              radius={[0, 4, 4, 0]}
              label={{ 
                position: 'right',
                formatter: (value: number) => `${formatNumber(value)} ${displayCurrency}`,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};