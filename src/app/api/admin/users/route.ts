import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    // Fetch all users from Auth
    const { data: users, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      console.error("Auth listUsers error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get all user roles in one query
    const { data: roles, error: rolesError } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, role");

    if (rolesError && rolesError.code !== "PGRST116") {
      console.error("Roles fetch error:", rolesError);
      // Continue without roles – we'll show null for role
    }

    // Build a map of user_id -> role
    const roleMap: Record<string, string> = {};
    if (roles) {
      roles.forEach((r: any) => {
        roleMap[r.user_id] = r.role;
      });
    }

    // Format response
    const formattedUsers = users.users.map((user: any) => ({
      id: user.id,
      email: user.email,
      role: roleMap[user.id] || null,
      is_active: !user.banned,
      created_at: user.created_at,
    }));

    return NextResponse.json(formattedUsers);
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
