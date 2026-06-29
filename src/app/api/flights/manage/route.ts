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

    // Call Hitit middleware to retrieve booking
    const response = await hititClient<any>({
      endpoint: "/bookings/retrieve",
      method: "POST",
      body: { pnr: bookingRef, lastName },
    });

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Manage booking error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to retrieve booking" },
      { status: 500 }
    );
  }
}
