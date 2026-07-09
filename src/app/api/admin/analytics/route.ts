import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    // Fetch Supabase stats
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

    // Vercel deployment stats (from environment)
    const vercelStats = {
      deployment_url: process.env.VERCEL_URL || "N/A",
      environment: process.env.VERCEL_ENV || "development",
      region: process.env.VERCEL_REGION || "unknown",
      build_time: process.env.VERCEL_GIT_COMMIT_REF || "unknown",
    };

    // Build stats
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
      vercel: vercelStats,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
