import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    // Get user details from auth
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin
      .getUserById(userId);
    if (userError) throw userError;

    // Get user role
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();

    if (roleError && roleError.code !== "PGRST116") throw roleError;

    return NextResponse.json({
      id: userData.user.id,
      email: userData.user.email,
      role: roleData?.role || null,
      is_active: !userData.user.banned,
      created_at: userData.user.created_at,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const body = await request.json();
    const { role, isActive } = body;

    // Update role if provided
    if (role) {
      const { error: roleError } = await supabaseAdmin
        .from("user_roles")
        .upsert(
          { user_id: userId, role },
          { onConflict: "user_id" }
        );
      if (roleError) throw roleError;
    }

    // Update active status (ban/unban)
    if (isActive !== undefined) {
      if (isActive) {
        // Unban user
        await supabaseAdmin.auth.admin.unbanUserById(userId);
      } else {
        // Ban user
        await supabaseAdmin.auth.admin.banUserById(userId);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    // Delete user from auth
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) throw error;

    // Also delete from user_roles (cascade will handle if FK is set)
    // Optionally, you can manually delete if not cascading
    await supabaseAdmin.from("user_roles").delete().eq("user_id", userId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
