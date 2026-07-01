import { NextRequest, NextResponse } from "next/server";

// ============================================================
// 1. MOCK DATA – realistic flights
// ============================================================
const AIRPORTS = {
  DEL: { code: "DEL", name: "Delhi", coords: [28.7041, 77.1025] },
  BOM: { code: "BOM", name: "Mumbai", coords: [19.0760, 72.8777] },
  BLR: { code: "BLR", name: "Bengaluru", coords: [12.9716, 77.5946] },
  MAA: { code: "MAA", name: "Chennai", coords: [13.0827, 80.2707] },
  LHR: { code: "LHR", name: "London", coords: [51.4700, -0.4543] },
  DXB: { code: "DXB", name: "Dubai", coords: [25.2048, 55.2708] },
  SIN: { code: "SIN", name: "Singapore", coords: [1.3521, 103.8198] },
  CDG: { code: "CDG", name: "Paris", coords: [49.0097, 2.5479] },
  JFK: { code: "JFK", name: "New York", coords: [40.6413, -73.7781] },
  SYD: { code: "SYD", name: "Sydney", coords: [-33.8688, 151.2093] },
  NRT: { code: "NRT", name: "Tokyo", coords: [35.7720, 140.3929] },
  FRA: { code: "FRA", name: "Frankfurt", coords: [50.1109, 8.6821] },
};

const STATUSES = ["On Time", "Boarding", "Delayed", "Scheduled", "Landed"];

function randomStatus() {
  return STATUSES[Math.floor(Math.random() * STATUSES.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomAirport() {
  const keys = Object.keys(AIRPORTS);
  return keys[Math.floor(Math.random() * keys.length)];
}

function generateMockFlights(count: number = 8) {
  const flights = [];
  for (let i = 0; i < count; i++) {
    const origin = randomAirport();
    let destination = randomAirport();
    while (destination === origin) destination = randomAirport();

    // Random departure time within ±3 hours from now
    const offset = randomInt(-180, 180) * 60 * 1000;
    const depTime = new Date(Date.now() + offset);

    flights.push({
      id: i + 1,
      flight_no: `AI-${String(100 + i).padStart(3, "0")}`,
      origin,
      destination,
      departure_time: depTime.toISOString(),
      status: randomStatus(),
    });
  }
  return flights;
}

// ============================================================
// 2. API HANDLER
// ============================================================
export async function GET(request: NextRequest) {
  try {
    // --------------------------------------------
    // 👇 SWAP THIS BLOCK WITH REAL HITIT CALL
    // --------------------------------------------
    const useHitit = process.env.HITIT_API_URL && process.env.HITIT_API_KEY;
    if (useHitit) {
      // Example Hitit call (you'll need to implement hititClient)
      // const data = await hititClient({ endpoint: '/flights/status', ... });
      // return NextResponse.json(data);
      console.warn("Hitit is configured but not implemented yet – using mock.");
    }
    // --------------------------------------------

    // Generate mock data
    let flights = generateMockFlights(10);

    // Apply filters from query params
    const searchParams = request.nextUrl.searchParams;
    const flightNo = searchParams.get("flightNumber") || "";
    const date = searchParams.get("date") || "";

    if (flightNo) {
      flights = flights.filter(f =>
        f.flight_no.toLowerCase().includes(flightNo.toLowerCase())
      );
    }
    if (date) {
      flights = flights.filter(f => f.departure_time.startsWith(date));
    }

    return NextResponse.json(flights);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch flight status", details: error.message },
      { status: 500 }
    );
  }
}
