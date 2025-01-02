import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { TransactionsView } from "@/components/transactions/TransactionsView";
import { LayoutDashboard, LogOut, Menu, Receipt, BookmarkPlus, DollarSign } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveTransactionFormDialog } from "@/components/transactions/ResponsiveTransactionFormDialog";
import { BudgetView } from "@/components/budget/BudgetView";
import { ManualExchangeRates } from "@/components/dashboard/ManualExchangeRates";
import { t } from "@/utils/translations";

// ... keep existing code (imports and component start)

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
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
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
            
            <div className="hidden md:flex">
              <ResponsiveTransactionFormDialog />
            </div>
          </div>
          
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-6 w-6" />
          </Button>
        </div>
      </header>
      
      <main className="container py-6">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                {t("dashboard")}
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                {t("transactions")}
              </TabsTrigger>
              <TabsTrigger value="budgets" className="flex items-center gap-2">
                <BookmarkPlus className="h-4 w-4" />
                {t("budgets")}
              </TabsTrigger>
              <TabsTrigger value="exchange-rates" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                {t("exchangeRates")}
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <div className="md:hidden">
                <ResponsiveTransactionFormDialog />
              </div>
            </div>
          </div>
          
          <TabsContent value="dashboard">
            <DashboardView />
          </TabsContent>
          
          <TabsContent value="transactions">
            <TransactionsView />
          </TabsContent>
          
          <TabsContent value="budgets">
            <BudgetView />
          </TabsContent>

          <TabsContent value="exchange-rates">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">{t("exchangeRates")}</h2>
              </div>
              <ManualExchangeRates />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
