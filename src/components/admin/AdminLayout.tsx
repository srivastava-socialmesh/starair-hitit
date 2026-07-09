"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard,
  Percent,
  Package,
  FileText,
  Newspaper,
  BookOpen,
  Table,
  Users,
  Briefcase,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  Home,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const LOGO_URL = "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logo/starair_logo.png";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  roles: string[];
  category: string;
}

const allNavItems: NavItem[] = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, roles: ['admin', 'hr', 'marketing', 'revenue'], category: "Overview" },
  { name: "Deals", href: "/admin/deals", icon: Percent, roles: ['admin', 'marketing'], category: "Content" },
  { name: "Products", href: "/admin/products", icon: Package, roles: ['admin', 'marketing'], category: "Content" },
  { name: "Blogs", href: "/admin/blogs", icon: FileText, roles: ['admin', 'marketing'], category: "Content" },
  { name: "Media Coverage", href: "/admin/media", icon: Newspaper, roles: ['admin', 'marketing'], category: "Content" },
  { name: "Magazines", href: "/admin/magazines", icon: BookOpen, roles: ['admin', 'marketing'], category: "Content" },
  { name: "News", href: "/admin/news", icon: Newspaper, roles: ['admin', 'marketing'], category: "Content" },
  { name: "Fare Sheets", href: "/admin/fare-sheets", icon: Table, roles: ['admin', 'revenue'], category: "Operations" },
  { name: "Careers", href: "/admin/careers", icon: Briefcase, roles: ['admin', 'hr'], category: "HR" },
  { name: "Applications", href: "/admin/applications", icon: FileText, roles: ['admin', 'hr'], category: "HR" },
  { name: "Users", href: "/admin/users", icon: Users, roles: ['admin'], category: "System" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
        // Fetch role from API
        try {
          const res = await fetch("/api/user/role");
          if (res.ok) {
            const data = await res.json();
            setUserRole(data.role);
          }
        } catch (e) {}
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Filter nav items based on role
  const filteredItems = userRole
    ? allNavItems.filter(item => item.roles.includes(userRole))
    : allNavItems.filter(item => item.roles.includes('admin')); // fallback

  // Group by category
  const categories = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex-shrink-0 shadow-lg`}
      >
        <div className="flex flex-col h-full">
          {/* Logo – compact */}
          <div className="p-4 border-b border-gray-200 flex justify-center items-center">
            <Link href="/" className="relative w-28 h-16">
              {!logoError ? (
                <Image
                  src={LOGO_URL}
                  alt="StarAir"
                  fill
                  className="object-contain"
                  priority
                  unoptimized
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="text-3xl font-bold text-amber-500">✈️</span>
              )}
            </Link>
          </div>

          {/* Navigation – with categories */}
          <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
            {Object.keys(categories).map((cat) => (
              <div key={cat}>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {cat}
                </h3>
                <div className="space-y-1">
                  {categories[cat].map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition ${
                          isActive
                            ? "bg-amber-100 text-amber-800 font-semibold"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <item.icon size={20} className={isActive ? "text-amber-600" : "text-gray-400"} />
                        <span className="text-sm">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 hidden sm:block">Dashboard</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition"
              >
                <span className="text-sm hidden sm:inline">{userEmail || "User"}</span>
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-semibold">
                  {userEmail ? userEmail[0].toUpperCase() : "U"}
                </div>
                <ChevronDown size={16} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                  <Link
                    href="/admin/profile"
                    className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <User size={16} /> Profile
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Settings size={16} /> Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition w-full text-left border-t border-gray-100"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
