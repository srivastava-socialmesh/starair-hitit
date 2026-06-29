
import { NextRequest, NextResponse } from "next/server";
import { hititClient } from "@/lib/hitit/client";

export async function POST(request: NextRequest) {
  try {
    const { bookingRef, lastName } = await request.json();

    if (!bookingRef || !lastName) {
      return NextResponse.json(
        { error: "Booking reference and last name are required" },
        { status: 400 }
      );
    }

    // Call Hitit middleware for check-in
    const response = await hititClient<any>({
      endpoint: "/checkin",
      method: "POST",
      body: { pnr: bookingRef, lastName },
    });

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Check-in error:", error);
    return NextResponse.json(
      { error: error.message || "Check-in failed" },
      { status: 500 }
    );
  }
}
