import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    const { data: userData, error: userError } = await supabaseAdmin.auth.admin
      .getUserById(userId);
    if (userError) throw userError;

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
      is_active: !(userData.user as any).banned,
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
      // Using updateUserById with banned flag
      const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        banned: !isActive,
      } as any);
      if (error) throw error;
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

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) throw error;

    await supabaseAdmin.from("user_roles").delete().eq("user_id", userId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
