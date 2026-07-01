"use client";
import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Airport coordinates (simplified)
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
};

interface Flight {
  id: number;
  flight_no: string;
  origin: string;
  destination: string;
  departure_time: string;
  status: string;
}

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
      className="rounded-xl"
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

        return (
          <div key={flight.id}>
            {/* Route line */}
            <Polyline
              positions={[originCoords, destCoords]}
              color="red"
              weight={2}
              opacity={0.6}
              dashArray="5,10"
            />
            {/* Moving aircraft marker */}
            <Marker position={flightPos}>
              <Popup>
                <strong>{flight.flight_no}</strong><br />
                {flight.origin} → {flight.destination}<br />
                Status: {flight.status}
              </Popup>
            </Marker>
          </div>
        );
      })}
    </MapContainer>
  );
}
