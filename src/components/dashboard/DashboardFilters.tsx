import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { MobileFilters } from "./filters/MobileFilters";
import { DesktopFilters } from "./filters/DesktopFilters";
import { DashboardFiltersProps } from "./filters/types";

export const DashboardFilters = (props: DashboardFiltersProps) => {
  const { activeFiltersCount } = props;

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {/* Mobile Filters */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 mt-4">
            <MobileFilters {...props} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Filters */}
      <DesktopFilters {...props} />
    </div>
  );
};