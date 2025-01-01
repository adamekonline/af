import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { TransactionsView } from "@/components/transactions/TransactionsView";
import { LayoutDashboard, LogOut, Menu, Plus, Receipt } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TransactionFormDialog } from "@/components/transactions/TransactionFormDialog";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[280px]">
                <nav className="flex flex-col gap-4">
                  <Button 
                    variant="ghost" 
                    className="justify-start text-sm" 
                    onClick={() => handleTabChange("dashboard")}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-sm" 
                    onClick={() => handleTabChange("transactions")}
                  >
                    <Receipt className="mr-2 h-4 w-4" />
                    Transactions
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          
            <h1 className="text-base md:text-lg lg:text-xl font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent ml-2 md:ml-4 truncate max-w-[200px] md:max-w-none">
              AF
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <TransactionFormDialog onAddTransaction={() => {}} />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="hidden md:flex justify-start border-b w-full text-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Transactions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <DashboardView />
          </TabsContent>
          
          <TabsContent value="transactions">
            <TransactionsView />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;