interface PersonalSpendingItemProps {
  person: string;
  amount: number;
  percentage: number;
}

export const PersonalSpendingItem = ({ person, amount, percentage }: PersonalSpendingItemProps) => {
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('pl-PL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="flex items-center">
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{person}</p>
        <p className="text-sm text-muted-foreground">
          {formatAmount(amount)} zł
        </p>
      </div>
      <div className="ml-auto font-medium">
        {percentage}%
      </div>
    </div>
  );
};