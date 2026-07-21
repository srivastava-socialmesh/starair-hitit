import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, passengers, origin, destination, date, message } = body;

    if (!name || !email || !phone || !passengers || !origin || !destination || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from("group_booking_requests")
      .insert([
        {
          name,
          email,
          phone,
          passengers,
          origin,
          destination,
          date,
          message: message || "",
          status: "pending",
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: data?.[0] }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
