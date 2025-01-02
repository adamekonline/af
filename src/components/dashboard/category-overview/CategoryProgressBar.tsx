interface CategoryProgressBarProps {
  Adam: number;
  Natka: number;
  Adi: number;
  total: number;
}

export const CategoryProgressBar = ({ Adam, Natka, Adi, total }: CategoryProgressBarProps) => {
  const calculatePercentage = (value: number) => {
    return total === 0 ? 0 : (value / total) * 100;
  };

  return (
    <div className="flex h-2 overflow-hidden rounded-full bg-secondary">
      <div 
        className="bg-[#9b87f5] transition-all"
        style={{ width: `${calculatePercentage(Adam)}%` }}
      />
      <div 
        className="bg-[#0EA5E9] transition-all"
        style={{ width: `${calculatePercentage(Natka)}%` }}
      />
      <div 
        className="bg-[#D946EF] transition-all"
        style={{ width: `${calculatePercentage(Adi)}%` }}
      />
    </div>
  );
};