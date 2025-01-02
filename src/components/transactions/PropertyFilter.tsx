import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropertyLocation } from "@/types";
import { t } from "@/utils/translations";

interface PropertyFilterProps {
  value: PropertyLocation | "all";
  onChange: (value: PropertyLocation | "all") => void;
}

export const PropertyFilter = ({ value, onChange }: PropertyFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder={t("property")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{t("allProperties")}</SelectItem>
        <SelectItem value="Poznań">{t("poznan")}</SelectItem>
        <SelectItem value="Leuven">{t("leuven")}</SelectItem>
      </SelectContent>
    </Select>
  );
};