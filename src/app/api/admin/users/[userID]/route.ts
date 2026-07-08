import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function DELETE(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!roleData || roleData.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete user from auth
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(params.userId);
    if (deleteError) {
      console.error("Delete error:", deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const { role, isActive, fullName, email } = await request.json();

    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!roleData || roleData.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update role if provided
    if (role) {
      await supabaseAdmin
        .from("user_roles")
        .upsert({ user_id: params.userId, role }, { onConflict: "user_id" });
    }

    // Update profile if provided
    if (fullName !== undefined || email !== undefined || isActive !== undefined) {
      const updateData: any = {};
      if (fullName !== undefined) updateData.full_name = fullName;
      if (email !== undefined) updateData.email = email;
      if (isActive !== undefined) updateData.is_active = isActive;
      updateData.updated_at = new Date();

      await supabaseAdmin
        .from("user_profiles")
        .update(updateData)
        .eq("user_id", params.userId);
    }

    // If isActive is false, disable the user in auth
    if (isActive !== undefined) {
      await supabaseAdmin.auth.admin.updateUserById(params.userId, {
        banned: !isActive,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
