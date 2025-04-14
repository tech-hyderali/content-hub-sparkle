
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, File, FileImage, FileVideo, Film, Layout } from "lucide-react";

export function Dashboard() {
  // Mock stats - these would come from Supabase in the real implementation
  const stats = [
    { name: "Total Resources", value: "128", icon: Layout, color: "text-blue-500" },
    { name: "Documents", value: "64", icon: File, color: "text-amber-500" },
    { name: "Images", value: "43", icon: FileImage, color: "text-green-500" },
    { name: "Videos", value: "21", icon: FileVideo, color: "text-red-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your content resources</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
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
              {["Image uploaded: product-photo.jpg", 
                "Document updated: Q1 Report.pdf", 
                "Video shared: intro-video.mp4"].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 pb-4 border-b last:border-0">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <Layout size={14} />
                  </div>
                  <div>
                    <p className="text-sm">{activity}</p>
                    <p className="text-xs text-muted-foreground">{i + 1} hour ago</p>
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
