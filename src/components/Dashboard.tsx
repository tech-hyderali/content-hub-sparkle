
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, File, FileImage, FileVideo, Film, Layout } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function Dashboard() {
  const { toast } = useToast();
  const [stats, setStats] = useState([
    { name: "Total Resources", value: "128", icon: Layout, color: "text-blue-500" },
    { name: "Documents", value: "64", icon: File, color: "text-amber-500" },
    { name: "Images", value: "43", icon: FileImage, color: "text-green-500" },
    { name: "Videos", value: "21", icon: FileVideo, color: "text-red-500" },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [recentActivities, setRecentActivities] = useState([
    { text: "Image uploaded: product-photo.jpg", time: "1 hour ago", icon: FileImage },
    { text: "Document updated: Q1 Report.pdf", time: "2 hours ago", icon: File },
    { text: "Video shared: intro-video.mp4", time: "3 hours ago", icon: FileVideo }
  ]);

  const refreshDashboard = () => {
    setIsLoading(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Dashboard Updated",
        description: "Latest statistics have been loaded.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your content resources</p>
        </div>
        <Button 
          onClick={refreshDashboard} 
          disabled={isLoading} 
          variant="outline"
          className="flex items-center gap-2"
        >
          {isLoading ? "Refreshing..." : "Refresh Stats"}
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent content activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-center gap-4 pb-4 border-b last:border-0">
                  <div className={`h-8 w-8 rounded-full bg-muted flex items-center justify-center ${activity.icon === FileImage ? "text-green-500" : activity.icon === FileVideo ? "text-red-500" : "text-amber-500"}`}>
                    <activity.icon size={14} />
                  </div>
                  <div>
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Content Types</CardTitle>
            <CardDescription>Distribution of your resources</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <div className="h-60 w-60 relative rounded-full border-8 border-muted flex items-center justify-center">
              <div className="absolute inset-0 border-t-8 border-blue-500 rounded-full rotate-45"></div>
              <div className="absolute inset-0 border-t-8 border-green-500 rounded-full rotate-[170deg]"></div>
              <div className="absolute inset-0 border-t-8 border-amber-500 rounded-full rotate-[260deg]"></div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
