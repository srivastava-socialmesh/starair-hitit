import { NextRequest, NextResponse } from "next/server";
import { hititClient } from "@/lib/hitit/client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const flightNo = searchParams.get("flightNo") || "";
    const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

    const data = await hititClient<any>({
      endpoint: "/flights/status",
      params: { flightNumber: flightNo, departureDate: date },
    });

    // Transform to match your UI table
    const formatted = (data.flights || []).map((f: any) => ({
      id: f.recordId || Math.random(),
      flight_no: f.flightDesignator || "AI-101",
      origin: f.departureAirport || "DEL",
      destination: f.arrivalAirport || "LHR",
      departure_time: f.scheduledDeparture || new Date().toISOString(),
      status: f.statusCode || "On Time",
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch status", details: error.message },
      { status: 500 }
    );
  }
}
