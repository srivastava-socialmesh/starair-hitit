import { NextRequest, NextResponse } from "next/server";

// Mock flight data
const mockFlights = [
  {
    id: 1,
    flight_no: "AI-101",
    origin: "DEL",
    destination: "LHR",
    departure_time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: "On Time",
  },
  {
    id: 2,
    flight_no: "AI-202",
    origin: "BOM",
    destination: "DXB",
    departure_time: new Date(Date.now() + 1000 * 60 * 45).toISOString(),
    status: "Boarding",
  },
  {
    id: 3,
    flight_no: "AI-303",
    origin: "BLR",
    destination: "SIN",
    departure_time: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: "Delayed",
  },
  {
    id: 4,
    flight_no: "AI-404",
    origin: "MAA",
    destination: "CDG",
    departure_time: new Date(Date.now() + 1000 * 60 * 120).toISOString(),
    status: "Scheduled",
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const flightNo = searchParams.get("flightNumber") || "";
    const date = searchParams.get("date") || "";

    let filtered = mockFlights;

    if (flightNo) {
      filtered = filtered.filter(f => f.flight_no.toLowerCase().includes(flightNo.toLowerCase()));
    }
    if (date) {
      filtered = filtered.filter(f => f.departure_time.startsWith(date));
    }

    return NextResponse.json(filtered);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch status", details: error.message },
      { status: 500 }
    );
  }
}
