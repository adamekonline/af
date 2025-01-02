import { FC } from 'react';

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  displayCurrency: string;
}

export const ChartTooltip: FC<ChartTooltipProps> = ({ active, payload, label, displayCurrency }) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString('pl-PL', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatNumber(entry.value)} {displayCurrency}
          </p>
        ))}
      </div>
    );
  }
  return null;
};