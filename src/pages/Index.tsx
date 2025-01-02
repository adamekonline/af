import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { TransactionsView } from "@/components/transactions/TransactionsView";
import { LayoutDashboard, LogOut, Menu, Receipt, BookmarkPlus, DollarSign } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveTransactionFormDialog } from "@/components/transactions/ResponsiveTransactionFormDialog";
import { BudgetView } from "@/components/budget/BudgetView";
import { ManualExchangeRates } from "@/components/dashboard/ManualExchangeRates";
import { t } from "@/utils/translations";
import { Skeleton } from "@/components/ui/skeleton";

const TabContent = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-[200px]">
    <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
      {children}
    </Suspense>
  </div>
);

export const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    // Logout logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-50">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[280px]">
                <nav className="flex flex-col gap-2">
                  <Button 
                    variant="ghost" 
                    className="justify-start text-sm" 
                    onClick={() => handleTabChange("dashboard")}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    {t("dashboard")}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-sm" 
                    onClick={() => handleTabChange("transactions")}
                  >
                    <Receipt className="mr-2 h-4 w-4" />
                    {t("transactions")}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-sm" 
                    onClick={() => handleTabChange("budgets")}
                  >
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    {t("budgets")}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-sm" 
                    onClick={() => handleTabChange("exchange-rates")}
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    {t("exchangeRates")}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="flex items-center gap-2">
            <ResponsiveTransactionFormDialog />
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container py-4 md:py-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <TabsList className="h-auto p-1 grid grid-cols-2 sm:flex sm:grid-cols-none gap-2">
              <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:font-semibold">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">{t("dashboard")}</span>
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center gap-2 data-[state=active]:font-semibold">
                <Receipt className="h-4 w-4" />
                <span className="hidden sm:inline">{t("transactions")}</span>
              </TabsTrigger>
              <TabsTrigger value="budgets" className="flex items-center gap-2 data-[state=active]:font-semibold">
                <BookmarkPlus className="h-4 w-4" />
                <span className="hidden sm:inline">{t("budgets")}</span>
              </TabsTrigger>
              <TabsTrigger value="exchange-rates" className="flex items-center gap-2 data-[state=active]:font-semibold">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">{t("exchangeRates")}</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="dashboard">
            <TabContent>
              <DashboardView />
            </TabContent>
          </TabsContent>
          
          <TabsContent value="transactions">
            <TabContent>
              <TransactionsView />
            </TabContent>
          </TabsContent>
          
          <TabsContent value="budgets">
            <TabContent>
              <BudgetView />
            </TabContent>
          </TabsContent>

          <TabsContent value="exchange-rates">
            <TabContent>
              <div className="rounded-lg border bg-card p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <DollarSign className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-semibold">{t("exchangeRates")}</h2>
                </div>
                <ManualExchangeRates />
              </div>
            </TabContent>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};