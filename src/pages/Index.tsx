
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <Layout>
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="dashboard" className="flex-1">Dashboard</TabsTrigger>
          <TabsTrigger value="resources" className="flex-1">Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
        <TabsContent value="resources">
          <ResourceLibrary />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}

export default Index;
