interface CategorySpendingLegendProps {
  Adam: number;
  Natka: number;
  Adi: number;
}

export const CategorySpendingLegend = ({ Adam, Natka, Adi }: CategorySpendingLegendProps) => {
  const formatAmount = (value: number) => {
    return value.toLocaleString('pl-PL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="flex flex-wrap gap-2 text-sm mb-1">
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-[#9b87f5]" />
        <span>Adam: {formatAmount(Adam)} zł</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-[#0EA5E9]" />
        <span>Natka: {formatAmount(Natka)} zł</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-[#D946EF]" />
        <span>Adi: {formatAmount(Adi)} zł</span>
      </div>
    </div>
  );
};