import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    // Fetch all users from Auth
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      console.error("Auth listUsers error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get all user roles
    const { data: roles, error: rolesError } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, role");

    const roleMap: Record<string, string> = {};
    if (roles) {
      roles.forEach((r: any) => {
        roleMap[r.user_id] = r.role;
      });
    }

    const formattedUsers = data.users.map((user: any) => ({
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, password, and role are required" },
        { status: 400 }
      );
    }

    // Create user
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (userError) {
      console.error("Create user error:", userError);
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    // Assign role
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userData.user.id, role });

    if (roleError) {
      console.error("Role insert error:", roleError);
      // Optionally delete the user if role assignment fails? Not necessary for now.
      return NextResponse.json({ error: roleError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, user: userData.user });
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
