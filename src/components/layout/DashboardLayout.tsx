import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, User, FolderPlus, Settings, LogOut, BarChart2, Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Tableau de bord", href: "/dashboard" },
  { icon: User, label: "Mon Portfolio", href: "/dashboard/profile" },
  { icon: FolderPlus, label: "Mes Projets", href: "/dashboard/projects" },
  { icon: BarChart2, label: "Statistiques", href: "/dashboard/stats" },
  { icon: Settings, label: "Paramètres", href: "/dashboard/settings" },
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        setUserProfile(data || { full_name: user.email?.split('@')[0], username: 'user' });
      }
    }
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-secondary flex font-sans">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-30 shadow-sm">
        <Link to="/" className="text-2xl font-extrabold text-primary tracking-tight">
          Portfola<span className="text-accent">.</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "w-72 bg-white border-r border-gray-100 flex flex-col fixed h-full shadow-sm z-20 transition-transform duration-300 ease-in-out pt-16 md:pt-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-8 border-b border-gray-50 hidden md:block">
          <Link to="/" className="text-3xl font-extrabold text-primary tracking-tight hover:opacity-80 transition-opacity">
            Portfola<span className="text-accent">.</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-200 group",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/25 translate-x-1" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-primary hover:translate-x-1"
                )}
              >
                <item.icon size={22} className={cn("transition-colors", isActive ? "text-white" : "text-gray-400 group-hover:text-primary")} />
                <span className="font-medium text-base">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-50 bg-gray-50/50">
          {userProfile && (
            <div className="flex items-center space-x-3 mb-6 px-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {userProfile.full_name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{userProfile.full_name}</p>
                <div className="flex items-center mt-0.5">
                  <span className="text-xs text-gray-500 truncate block max-w-[80px]">@{userProfile.username}</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wide">Free</span>
                </div>
              </div>
            </div>
          )}

          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 rounded-2xl py-6 px-4"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-3" />
            <span className="font-medium">Déconnexion</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-6 md:p-12 pt-24 md:pt-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-10 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
