"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Percent,           // ← added
  Package, 
  FileText, 
  Newspaper, 
  BookOpen, 
  Table, 
  LogOut,
  Menu,
  X
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Deals", href: "/admin/deals", icon: Percent },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Media Coverage", href: "/admin/media", icon: Newspaper },
  { name: "Magazines", href: "/admin/magazines", icon: BookOpen },
  { name: "Fare Sheets", href: "/admin/fare-sheets", icon: Table },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111827] border-r border-amber-500/10 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex-shrink-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-amber-500/10">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              StarAir Admin
            </h1>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-amber-500/20 text-amber-400"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-amber-500/10">
            <button className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition w-full px-4 py-3 rounded-lg hover:bg-red-500/10">
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-amber-500/10 bg-[#0a0e1a]/95 backdrop-blur-xl sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} className="text-amber-400" />
          </button>
          <h1 className="text-lg font-bold text-amber-400">StarAir Admin</h1>
          <div className="w-6"></div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
