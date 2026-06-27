import { NextRequest, NextResponse } from "next/server";
import { hititClient } from "@/lib/hitit/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origin, destination, date, passengers } = body;

    const results = await hititClient<any>({
      endpoint: "/flights/search",
      method: "POST",
      body: {
        originDestinations: [{ origin, destination, departureDate: date }],
        travelerCount: passengers || 1,
        cabinClass: "ECONOMY",
      },
    });

    return NextResponse.json({
      success: true,
      offers: results.offers || [],
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Search failed", details: error.message },
      { status: 500 }
    );
  }
}
