import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    // ============================================================
    // 1. SUPABASE DATABASE PERFORMANCE & STATUS
    // ============================================================
    
    // Get row counts for main tables
    const [
      { count: userCount },
      { count: dealsCount },
      { count: productsCount },
      { count: blogsCount },
      { count: newsCount },
      { count: applicationsCount },
      { count: careersCount },
      { count: fareSheetsCount },
    ] = await Promise.all([
      supabaseAdmin.from("user_roles").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("deals").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("products").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("blogs").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("news").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("applications").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("careers").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("fare_sheets").select("*", { count: "exact", head: true }),
    ]);

    // Get table count
    const { data: tableSizes, error: tableSizeError } = await supabaseAdmin
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    // Get database size (simplified)
    let dbSize = "N/A";
    try {
      const { data, error } = await supabaseAdmin.rpc('pg_database_size', { database_name: 'postgres' });
      if (data && !error) {
        dbSize = formatBytes(data);
      }
    } catch (e) {
      // Silent fallback
    }

    // Get connection count (simplified)
    let connectionCount = 0;
    try {
      const { count, error } = await supabaseAdmin
        .from('pg_stat_activity')
        .select('*', { count: 'exact', head: true })
        .eq('state', 'active');
      if (!error && count !== null) {
        connectionCount = count || 0;
      }
    } catch (e) {
      // Silent fallback
    }

    // Format bytes helper
    function formatBytes(bytes: number): string {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // ============================================================
    // 2. VERCEL PERFORMANCE & STATUS
    // ============================================================

    const vercelStats = {
      deployment_url: process.env.VERCEL_URL || "N/A",
      environment: process.env.VERCEL_ENV || "development",
      region: process.env.VERCEL_REGION || "unknown",
      branch: process.env.VERCEL_GIT_COMMIT_REF || "main",
      commit: process.env.VERCEL_GIT_COMMIT_SHA || "unknown",
      framework: "Next.js 16.2.9",
      status: "active",
    };

    // ============================================================
    // 3. BUILD STATS
    // ============================================================

    const stats = {
      users: userCount || 0,
      deals: dealsCount || 0,
      products: productsCount || 0,
      blogs: blogsCount || 0,
      news: newsCount || 0,
      applications: applicationsCount || 0,
      careers: careersCount || 0,
      fareSheets: fareSheetsCount || 0,
      total_content: (dealsCount || 0) + (productsCount || 0) + (blogsCount || 0) + (newsCount || 0),
      
      database: {
        size: dbSize || "N/A",
        connections: connectionCount || 0,
        tables: tableSizes?.length || 0,
        status: "healthy",
        last_check: new Date().toISOString(),
      },
      
      vercel: vercelStats,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error("Analytics error:", error);
    return NextResponse.json({ 
      error: error.message,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
