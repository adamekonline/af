import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { TransactionsView } from "@/components/transactions/TransactionsView";
import { TrendsView } from "@/components/trends/TrendsView";
import { Bookmark, LayoutDashboard, Menu, Plus, Receipt } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { TransactionFormDialog } from "@/components/transactions/TransactionFormDialog";
import { useState } from "react";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px]">
              <nav className="flex flex-col gap-4">
                <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                  <Receipt className="mr-2 h-4 w-4" />
                  Transactions
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  Trends
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          
          <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent ml-4">
            Family Finance Manager
          </h1>

          <div className="flex-1" />

          <TransactionFormDialog onAddTransaction={() => {}} />
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="hidden md:flex justify-start border-b w-full">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Trends
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <DashboardView />
          </TabsContent>
          
          <TabsContent value="transactions">
            <TransactionsView />
          </TabsContent>

          <TabsContent value="trends">
            <TrendsView />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;