"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
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
  Briefcase,
} from "lucide-react";

const LOGO_URL = "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logo/starair_logo.png";

// Define all menu items with required roles
const allNavItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, roles: ['admin', 'hr', 'marketing', 'revenue'] },
  { name: "Deals", href: "/admin/deals", icon: Percent, roles: ['admin'] },
  { name: "Products", href: "/admin/products", icon: Package, roles: ['admin', 'marketing'] },
  { name: "Blogs", href: "/admin/blogs", icon: FileText, roles: ['admin', 'marketing'] },
  { name: "Media Coverage", href: "/admin/media", icon: Newspaper, roles: ['admin', 'marketing'] },
  { name: "Magazines", href: "/admin/magazines", icon: BookOpen, roles: ['admin', 'marketing'] },
  { name: "Fare Sheets", href: "/admin/fare-sheets", icon: Table, roles: ['admin', 'revenue'] },
  { name: "Careers", href: "/admin/careers", icon: Briefcase, roles: ['admin', 'hr'] },
  { name: "Applications", href: "/admin/applications", icon: FileText, roles: ['admin', 'hr'] },
  { name: "News", href: "/admin/news", icon: Newspaper, roles: ['admin', 'marketing'] },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    // Fetch user role
    fetch('/api/user/role')
      .then(res => res.json())
      .then(data => {
        setUserRole(data.role || null);
        setLoadingRole(false);
      })
      .catch(() => {
        setUserRole(null);
        setLoadingRole(false);
      });
  }, []);

  // Filter nav items based on user role
  const navItems = userRole
    ? allNavItems.filter(item => item.roles.includes(userRole))
    : []; // If no role, show nothing (or fallback to dashboard)

  // Sign out handler
  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!isMounted || loadingRole) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111827] border-r border-white/5 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex-shrink-0 shadow-2xl shadow-black/50`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="py-3 px-2 border-b border-white/5 flex justify-center items-center bg-gradient-to-b from-amber-500/10 to-transparent">
            <div className="relative w-48 h-48 md:w-52 md:h-52 flex-shrink-0">
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
                <span className="text-8xl font-bold text-amber-400">✈️</span>
              )}
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-400 shadow-lg shadow-amber-500/10 border border-amber-500/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon size={20} className={isActive ? "text-amber-400" : "group-hover:text-amber-400"} />
                  <span className="font-medium text-sm">{item.name}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-6 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sign Out */}
          <div className="p-4 border-t border-white/5">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition w-full px-4 py-3 rounded-xl hover:bg-red-500/10 group"
            >
              <LogOut size={20} className="group-hover:text-red-400" />
              <span className="text-sm font-medium">Sign Out</span>
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
        <header className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#0a0e1a]/95 backdrop-blur-xl sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} className="text-amber-400" />
          </button>
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <Image src={LOGO_URL} alt="StarAir Admin" fill className="object-contain" unoptimized />
            </div>
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
