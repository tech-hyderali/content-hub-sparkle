
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FileText, FileImage, FileVideo, MoreVertical, Download, Trash, Share2 } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ResourceType {
  id: string;
  name: string;
  type: "document" | "image" | "video" | "other";
  size: string;
  updatedAt: string;
  thumbnail?: string;
}

interface ResourceCardProps {
  resource: ResourceType;
  onClick?: () => void;
}

export function ResourceCard({ resource, onClick }: ResourceCardProps) {
  const getIcon = () => {
    switch (resource.type) {
      case "document":
        return <FileText className="h-6 w-6 text-blue-500" />;
      case "image":
        return <FileImage className="h-6 w-6 text-green-500" />;
      case "video":
        return <FileVideo className="h-6 w-6 text-red-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };
  
  const getTypeColor = () => {
    switch (resource.type) {
      case "document":
        return "bg-blue-100 text-blue-800";
      case "image":
        return "bg-green-100 text-green-800";
      case "video":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card 
      className="resource-card cursor-pointer overflow-hidden" 
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div 
          className="h-36 bg-muted flex items-center justify-center relative"
          style={resource.thumbnail ? { backgroundImage: `url(${resource.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          {!resource.thumbnail && getIcon()}
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2">
          <div className="overflow-hidden">
            <h3 className="font-medium truncate" title={resource.name}>
              {resource.name}
            </h3>
            <p className="text-sm text-muted-foreground">{resource.size}</p>
          </div>
          <Badge className={cn("capitalize", getTypeColor())}>
            {resource.type}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
        Updated {resource.updatedAt}
      </CardFooter>
    </Card>
  );
}
