import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, FolderOpen, CreditCard, Settings, LogOut, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Vue générale", href: "/admin/overview" },
  { icon: Users, label: "Utilisateurs", href: "/admin/users" },
  { icon: FolderOpen, label: "Projets", href: "/admin/projects" },
  { icon: CreditCard, label: "Paiements", href: "/admin/payments" },
  { icon: Settings, label: "Paramètres", href: "/admin/settings" },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-gray-800">
          <Link to="/admin/overview" className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <span className="text-red-500">Portfola</span> Admin
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
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-red-600 text-white shadow-lg shadow-red-900/20" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link to="/" target="_blank" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
            <Globe size={20} />
            <span className="font-medium">Voir le site</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
