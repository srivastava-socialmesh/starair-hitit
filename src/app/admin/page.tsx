"use client";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { createClient } from "@/lib/supabase/client";
import { 
  Percent, 
  Package, 
  FileText, 
  Newspaper, 
  BookOpen, 
  Table,
  TrendingUp,
  Clock
} from "lucide-react";

interface Stats {
  deals: number;
  products: number;
  blogs: number;
  media: number;
  magazines: number;
  fareSheets: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          { count: deals },
          { count: products },
          { count: blogs },
          { count: media },
          { count: magazines },
          { count: fareSheets },
        ] = await Promise.all([
          supabase.from("deals").select("*", { count: "exact", head: true }),
          supabase.from("products").select("*", { count: "exact", head: true }),
          supabase.from("blogs").select("*", { count: "exact", head: true }),
          supabase.from("media").select("*", { count: "exact", head: true }),
          supabase.from("magazines").select("*", { count: "exact", head: true }),
          supabase.from("fare_sheets").select("*", { count: "exact", head: true }),
        ]);

        setStats({
          deals: deals || 0,
          products: products || 0,
          blogs: blogs || 0,
          media: media || 0,
          magazines: magazines || 0,
          fareSheets: fareSheets || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: "Deals", value: stats?.deals || 0, icon: Percent, color: "from-red-500 to-orange-500" },
    { label: "Products", value: stats?.products || 0, icon: Package, color: "from-blue-500 to-cyan-500" },
    { label: "Blogs", value: stats?.blogs || 0, icon: FileText, color: "from-green-500 to-emerald-500" },
    { label: "Media Coverage", value: stats?.media || 0, icon: Newspaper, color: "from-purple-500 to-pink-500" },
    { label: "Magazines", value: stats?.magazines || 0, icon: BookOpen, color: "from-amber-500 to-yellow-500" },
    { label: "Fare Sheets", value: stats?.fareSheets || 0, icon: Table, color: "from-indigo-500 to-blue-500" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Welcome back! Here's what's happening with your content.
            </p>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Clock size={16} />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#111827]/50 animate-pulse rounded-2xl p-6 h-28"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="group bg-[#111827]/50 backdrop-blur-sm border border-white/5 hover:border-amber-500/30 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">{card.label}</p>
                    <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
                  </div>
                  <div className={`bg-gradient-to-br ${card.color} p-3 rounded-xl shadow-lg shadow-${card.color.split(' ')[0]}/20`}>
                    <card.icon size={24} className="text-white" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-green-400">
                  <TrendingUp size={14} />
                  <span>+12% from last month</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions / Recent Activity (placeholder) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111827]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Add Deal", href: "/admin/deals", icon: Percent },
                { label: "Add Product", href: "/admin/products", icon: Package },
                { label: "Write Blog", href: "/admin/blogs", icon: FileText },
                { label: "Upload Magazine", href: "/admin/magazines", icon: BookOpen },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-amber-500/10 rounded-xl transition border border-white/5 hover:border-amber-500/20"
                >
                  <action.icon size={18} className="text-amber-400" />
                  <span className="text-sm text-slate-300">{action.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-[#111827]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>New deal added: "Summer Sale"</span>
                <span className="ml-auto text-xs">2h ago</span>
              </div>
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Product updated: "Business Class"</span>
                <span className="ml-auto text-xs">5h ago</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                <span>New blog published: "Luxury Travel Tips"</span>
                <span className="ml-auto text-xs">1d ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
