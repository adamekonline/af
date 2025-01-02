import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { MobileFilters } from "./filters/MobileFilters";
import { DesktopFilters } from "./filters/DesktopFilters";
import { DashboardFiltersProps } from "./filters/types";
import { t } from "@/utils/translations";

export const DashboardFilters = (props: DashboardFiltersProps) => {
  const { activeFiltersCount } = props;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Mobile Filters */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            {t("filters")}
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[85vh] px-4">
          <SheetHeader>
            <SheetTitle>{t("filters")}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 mt-4 overflow-y-auto pb-safe">
            <MobileFilters {...props} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Filters */}
      <div className="hidden lg:block w-full">
        <DesktopFilters {...props} />
      </div>
    </div>
  );
};