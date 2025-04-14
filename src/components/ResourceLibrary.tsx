
import { useState, useEffect } from "react";
import { ResourceCard, ResourceType } from "./ResourceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid, List, Plus, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ResourceLibrary() {
  const { toast } = useToast();
  // This would come from Supabase in a real implementation
  const mockResources: ResourceType[] = [
    {
      id: "1",
      name: "Annual Report 2023.pdf",
      type: "document",
      size: "2.4 MB",
      updatedAt: "2 days ago",
    },
    {
      id: "2",
      name: "product-hero-image.jpg",
      type: "image",
      size: "3.8 MB",
      updatedAt: "3 days ago",
      thumbnail: "https://images.unsplash.com/photo-1555421689-3f034debb7a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b2ZmaWNlfGVufDB8fDB8fHww",
    },
    {
      id: "3",
      name: "company-intro.mp4",
      type: "video",
      size: "24.8 MB",
      updatedAt: "1 week ago",
    },
    {
      id: "4",
      name: "team-photo.jpg",
      type: "image",
      size: "1.2 MB",
      updatedAt: "2 weeks ago",
      thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRlYW18ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "5",
      name: "marketing-strategy.docx",
      type: "document",
      size: "845 KB",
      updatedAt: "3 weeks ago",
    },
    {
      id: "6",
      name: "product-tutorial.mp4",
      type: "video",
      size: "18.5 MB",
      updatedAt: "1 month ago",
    },
    {
      id: "7",
      name: "logo-dark-version.png",
      type: "image",
      size: "245 KB",
      updatedAt: "1 month ago",
      thumbnail: "https://images.unsplash.com/photo-1606113944644-89f6c7a343e0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZ298ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "8",
      name: "user-research.pdf",
      type: "document",
      size: "1.8 MB",
      updatedAt: "1 month ago",
    },
  ];

  const recentResources = mockResources.slice(0, 3);
  const favoriteResources = [mockResources[1], mockResources[3], mockResources[6]];
  const sharedResources = [mockResources[0], mockResources[7]];

  const [resources, setResources] = useState<ResourceType[]>(mockResources);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["document", "image", "video", "other"]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleResourceClick = (resource: ResourceType) => {
    toast({
      title: `${resource.name}`,
      description: `Type: ${resource.type}, Size: ${resource.size}`,
    });
  };

  const handleAddResource = () => {
    toast({
      title: "Add Resource",
      description: "This would open a file upload dialog in a real implementation.",
    });
  };

  const handleTabChange = (value: string) => {
    setIsLoading(true);
    setActiveTab(value);
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const filteredResources = (activeResources: ResourceType[]) => {
    return activeResources.filter((resource) => {
      const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedTypes.includes(resource.type);
      return matchesSearch && matchesType;
    });
  };

  const getActiveResources = () => {
    switch (activeTab) {
      case "recent":
        return filteredResources(recentResources);
      case "favorites":
        return filteredResources(favoriteResources);
      case "shared":
        return filteredResources(sharedResources);
      default:
        return filteredResources(resources);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
          <p className="text-muted-foreground">Manage your content resources</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddResource} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Resource
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Resource Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={selectedTypes.includes("document")}
                onCheckedChange={(checked) => {
                  setSelectedTypes(
                    checked
                      ? [...selectedTypes, "document"]
                      : selectedTypes.filter((t) => t !== "document")
                  );
                }}
              >
                Documents
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedTypes.includes("image")}
                onCheckedChange={(checked) => {
                  setSelectedTypes(
                    checked
                      ? [...selectedTypes, "image"]
                      : selectedTypes.filter((t) => t !== "image")
                  );
                }}
              >
                Images
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedTypes.includes("video")}
                onCheckedChange={(checked) => {
                  setSelectedTypes(
                    checked
                      ? [...selectedTypes, "video"]
                      : selectedTypes.filter((t) => t !== "video")
                  );
                }}
              >
                Videos
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedTypes.includes("other")}
                onCheckedChange={(checked) => {
                  setSelectedTypes(
                    checked
                      ? [...selectedTypes, "other"]
                      : selectedTypes.filter((t) => t !== "other")
                  );
                }}
              >
                Other
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden sm:flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              className="px-2"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              className="px-2"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <TabsContent value={activeTab} className="mt-6">
            {getActiveResources().length > 0 ? (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" 
                : "flex flex-col gap-4"
              }>
                {getActiveResources().map((resource) => (
                  <ResourceCard 
                    key={resource.id} 
                    resource={resource} 
                    onClick={() => handleResourceClick(resource)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-muted rounded-lg">
                <Search className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No resources found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button variant="outline" className="mt-4" onClick={handleAddResource}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Resource
                </Button>
              </div>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
