import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, User, FolderPlus, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Vue d'ensemble", href: "/dashboard" },
  { icon: User, label: "Mon Profil", href: "/dashboard/profile" },
  { icon: FolderPlus, label: "Mes Projets", href: "/dashboard/projects" },
  { icon: Settings, label: "Paramètres", href: "/dashboard/settings" },
];

export function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col fixed h-full">
        <div className="p-6 border-b">
          <Link to="/" className="text-2xl font-bold text-primary">
            Portfola
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut size={20} className="mr-2" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
