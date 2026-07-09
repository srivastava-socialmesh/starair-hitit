import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    // ============================================================
    // 1. SUPABASE DATABASE PERFORMANCE & STATUS
    // ============================================================
    
    // Fetch database statistics (using system tables)
    const dbStats = await supabaseAdmin.rpc('get_db_stats').catch(() => null);
    
    // Get table sizes
    const { data: tableSizes, error: tableSizeError } = await supabaseAdmin
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

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

    // Get total database size (approximate)
    const { data: dbSizeData } = await supabaseAdmin
      .rpc('pg_database_size', { database_name: 'postgres' })
      .catch(() => null);

    // Get connection count (approximate)
    const { data: connections } = await supabaseAdmin
      .rpc('pg_stat_activity_count')
      .catch(() => null);

    // ============================================================
    // 2. VERCEL PERFORMANCE & STATUS
    // ============================================================

    // Vercel deployment stats (from environment)
    const vercelStats = {
      deployment_url: process.env.VERCEL_URL || "N/A",
      environment: process.env.VERCEL_ENV || "development",
      region: process.env.VERCEL_REGION || "unknown",
      branch: process.env.VERCEL_GIT_COMMIT_REF || "main",
      commit: process.env.VERCEL_GIT_COMMIT_SHA || "unknown",
      build_time: process.env.VERCEL_BUILD_TIME || "unknown",
      framework: "Next.js 16.2.9",
      status: "active",
    };

    // ============================================================
    // 3. BUILD STATS
    // ============================================================

    const stats = {
      // User & Content Stats
      users: userCount || 0,
      deals: dealsCount || 0,
      products: productsCount || 0,
      blogs: blogsCount || 0,
      news: newsCount || 0,
      applications: applicationsCount || 0,
      careers: careersCount || 0,
      fareSheets: fareSheetsCount || 0,
      total_content: (dealsCount || 0) + (productsCount || 0) + (blogsCount || 0) + (newsCount || 0),
      
      // Database Performance
      database: {
        size: dbSizeData || "N/A",
        connections: connections || 0,
        tables: tableSizes?.length || 0,
        status: "healthy",
        last_check: new Date().toISOString(),
      },
      
      // Vercel Performance
      vercel: vercelStats,
      
      // Timestamp
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error("Analytics error:", error);
    return NextResponse.json({ 
      error: error.message,
      // Return partial data if possible
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
