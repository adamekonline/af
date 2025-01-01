import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { TransactionsView } from "@/components/transactions/TransactionsView";
import { TrendsView } from "@/components/trends/TrendsView";
import { Bookmark, LayoutDashboard, Receipt } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Family Finance Manager</h1>
      
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="w-full flex justify-start border-b">
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
    </div>
  );
};

export default Index;