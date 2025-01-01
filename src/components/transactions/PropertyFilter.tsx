import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropertyLocation } from "@/types";

const properties: PropertyLocation[] = ["Poznań", "Leuven"];

interface PropertyFilterProps {
  value: PropertyLocation | "all";
  onChange: (value: PropertyLocation | "all") => void;
}

export const PropertyFilter = ({ value, onChange }: PropertyFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by property" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Properties</SelectItem>
        {properties.map((property) => (
          <SelectItem key={property} value={property}>
            {property}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};