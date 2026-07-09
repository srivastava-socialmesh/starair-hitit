"use client";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Users, 
  Package, 
  FileText, 
  Newspaper, 
  Percent, 
  Briefcase, 
  Table,
  TrendingUp,
  Clock,
  Server,
  Activity,
  Database,
} from "lucide-react";

interface AnalyticsData {
  users: number;
  deals: number;
  products: number;
  blogs: number;
  news: number;
  applications: number;
  careers: number;
  fareSheets: number;
  total_content: number;
  vercel: {
    deployment_url: string;
    environment: string;
    region: string;
    build_time: string;
  };
  timestamp: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/admin/analytics");
        if (!res.ok) throw new Error("Failed to fetch analytics");
        const data = await res.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const statCards = [
    { label: "Users", value: stats?.users || 0, icon: Users, color: "bg-blue-100 text-blue-600" },
    { label: "Deals", value: stats?.deals || 0, icon: Percent, color: "bg-red-100 text-red-600" },
    { label: "Products", value: stats?.products || 0, icon: Package, color: "bg-green-100 text-green-600" },
    { label: "Blogs", value: stats?.blogs || 0, icon: FileText, color: "bg-purple-100 text-purple-600" },
    { label: "News", value: stats?.news || 0, icon: Newspaper, color: "bg-amber-100 text-amber-600" },
    { label: "Applications", value: stats?.applications || 0, icon: Briefcase, color: "bg-indigo-100 text-indigo-600" },
    { label: "Careers", value: stats?.careers || 0, icon: TrendingUp, color: "bg-teal-100 text-teal-600" },
    { label: "Fare Sheets", value: stats?.fareSheets || 0, icon: Table, color: "bg-rose-100 text-rose-600" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back! Here's what's happening.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse h-24"></div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
            Error loading analytics: {error}
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((card) => (
                <div
                  key={card.label}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{card.label}</p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${card.color}`}>
                      <card.icon size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Content Card */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">Total Content</p>
                  <p className="text-3xl font-bold mt-1">{stats?.total_content || 0}</p>
                  <p className="text-amber-100 text-sm mt-1">Deals + Products + Blogs + News</p>
                </div>
                <Activity size={48} className="text-amber-200 opacity-50" />
              </div>
            </div>

            {/* Vercel Deployment Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <Server size={20} className="text-gray-500" />
                Deployment Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Environment</p>
                  <p className="font-medium text-gray-800 capitalize">{stats?.vercel.environment || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Region</p>
                  <p className="font-medium text-gray-800">{stats?.vercel.region || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Deployment URL</p>
                  <p className="font-medium text-gray-800 truncate">{stats?.vercel.deployment_url || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Last Updated</p>
                  <p className="font-medium text-gray-800">{stats?.timestamp ? new Date(stats.timestamp).toLocaleString() : "N/A"}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
