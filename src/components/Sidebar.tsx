
import { 
  LayoutDashboard, 
  FileText, 
  Upload, 
  FolderOpen, 
  Settings, 
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();
  
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Resources", icon: FileText, path: "/resources" },
    { name: "Upload", icon: Upload, path: "/upload" },
    { name: "Collections", icon: FolderOpen, path: "/collections" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];
  
  return (
    <aside
      className={cn(
        "bg-sidebar-background text-sidebar-foreground h-screen transition-all duration-300 overflow-hidden flex flex-col",
        open ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <h1 className={cn("font-bold text-xl transition-opacity", open ? "opacity-100" : "opacity-0")}>
          ContentHub
        </h1>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setOpen(!open)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>
      
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "sidebar-link",
                  location.pathname === item.path && "active",
                  !open && "justify-center px-0"
                )}
              >
                <item.icon size={20} />
                {open && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <span>U</span>
          </div>
          {open && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">User</span>
              <span className="text-xs text-muted-foreground">user@example.com</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
