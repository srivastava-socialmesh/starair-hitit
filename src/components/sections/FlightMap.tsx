"use client";
import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons – use CDN URLs
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ============================================================
// 1. CUSTOM PLANE ICON (pink plane)
// ============================================================
const planeIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Fallback – we'll use a better one
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// You can replace with a real plane SVG/PNG if available.
// For now, we'll use a small circle with a plane emoji as fallback:
const planeDivIcon = L.divIcon({
  className: "custom-plane-icon",
  html: "✈️",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// ============================================================
// 2. ENHANCED AIRPORT COORDINATES
// ============================================================
const airportCoords: Record<string, [number, number]> = {
  DEL: [28.7041, 77.1025],
  BOM: [19.0760, 72.8777],
  BLR: [12.9716, 77.5946],
  MAA: [13.0827, 80.2707],
  LHR: [51.4700, -0.4543],
  DXB: [25.2048, 55.2708],
  SIN: [1.3521, 103.8198],
  CDG: [49.0097, 2.5479],
  JFK: [40.6413, -73.7781],
  SYD: [-33.8688, 151.2093],
  NRT: [35.7720, 140.3929],
  FRA: [50.1109, 8.6821],
  BKK: [13.7563, 100.5018],
  HND: [35.5494, 139.7798],
};

interface Flight {
  id: number;
  flight_no: string;
  origin: string;
  destination: string;
  departure_time: string;
  status: string;
}

const statusColors: Record<string, string> = {
  "On Time": "#22c55e",
  Boarding: "#f59e0b",
  Delayed: "#ef4444",
  Scheduled: "#3b82f6",
  Landed: "#8b5cf6",
};

export default function FlightMap({ flights }: { flights: Flight[] }) {
  const [positions, setPositions] = useState<Record<number, [number, number]>>({});
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate flight movement
  useEffect(() => {
    const updatePositions = () => {
      const now = Date.now();
      const newPositions: Record<number, [number, number]> = {};

      flights.forEach((flight) => {
        const dep = new Date(flight.departure_time).getTime();
        const duration = 3600 * 1000; // 1 hour flight
        const elapsed = now - dep;
        const progress = Math.min(Math.max(elapsed / duration, 0), 1);

        const originCoords = airportCoords[flight.origin];
        const destCoords = airportCoords[flight.destination];
        if (!originCoords || !destCoords) return;

        // Interpolate position
        const lat = originCoords[0] + (destCoords[0] - originCoords[0]) * progress;
        const lng = originCoords[1] + (destCoords[1] - originCoords[1]) * progress;
        newPositions[flight.id] = [lat, lng];
      });

      setPositions(newPositions);
    };

    updatePositions();
    animationRef.current = setInterval(updatePositions, 2000);

    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [flights]);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "500px", width: "100%" }}
      className="rounded-xl shadow-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {flights.map((flight) => {
        const originCoords = airportCoords[flight.origin];
        const destCoords = airportCoords[flight.destination];
        if (!originCoords || !destCoords) return null;

        const flightPos = positions[flight.id] || originCoords;
        const color = statusColors[flight.status] || "#6b7280";

        return (
          <div key={flight.id}>
            {/* Route line with status color */}
            <Polyline
              positions={[originCoords, destCoords]}
              color={color}
              weight={2}
              opacity={0.5}
              dashArray={flight.status === "Scheduled" ? "8,8" : "none"}
            />
            {/* Moving aircraft marker with plane emoji */}
            <Marker position={flightPos} icon={planeDivIcon}>
              <Popup>
                <div className="text-sm">
                  <p className="font-bold text-gray-800">{flight.flight_no}</p>
                  <p className="text-gray-600">
                    {flight.origin} → {flight.destination}
                  </p>
                  <p className="text-gray-600">
                    Departure: {new Date(flight.departure_time).toLocaleTimeString()}
                  </p>
                  <p className="font-semibold" style={{ color }}>
                    Status: {flight.status}
                  </p>
                </div>
              </Popup>
            </Marker>
          </div>
        );
      })}
    </MapContainer>
  );
}
