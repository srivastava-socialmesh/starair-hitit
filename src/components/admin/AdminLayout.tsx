"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Percent, 
  Package, 
  FileText, 
  Newspaper, 
  BookOpen, 
  Table, 
  LogOut,
  Menu,
  X,
  Crown
} from "lucide-react";

const LOGO_URL = "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logo/starair_logo.png";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Deals", href: "/admin/deals", icon: Percent },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Media Coverage", href: "/admin/media", icon: Newspaper },
  { name: "Magazines", href: "/admin/magazines", icon: BookOpen },
  { name: "Fare Sheets", href: "/admin/fare-sheets", icon: Table },
  { name: "News", href: "/admin/news", icon: Newspaper },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#111827] to-[#0a0e1a] text-white flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111827]/95 backdrop-blur-xl border-r border-amber-500/10 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex-shrink-0 shadow-2xl shadow-amber-500/5`}
      >
        <div className="flex flex-col h-full">
          {/* Logo + Brand */}
          <div className="p-6 border-b border-amber-500/10 flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
              {!logoError ? (
                <Image
                  src={LOGO_URL}
                  alt="StarAir Admin"
                  fill
                  className="object-contain"
                  priority
                  unoptimized
                  onError={() => setLogoError(true)}
                />
              ) : (
                <Crown className="text-amber-400" size={32} />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                StarAir
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-400 shadow-lg shadow-amber-500/10"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon size={20} className={isActive ? "text-amber-400" : "group-hover:text-amber-400"} />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-8 bg-amber-400 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sign Out */}
          <div className="p-4 border-t border-amber-500/10">
            <button className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition w-full px-4 py-3 rounded-lg hover:bg-red-500/10 group">
              <LogOut size={20} className="group-hover:text-red-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
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
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image src={LOGO_URL} alt="StarAir Admin" fill className="object-contain" unoptimized />
            </div>
            <h1 className="text-lg font-bold text-amber-400">StarAir</h1>
          </div>
          <div className="w-6"></div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
