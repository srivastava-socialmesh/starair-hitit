"use client";
import Image from "next/image";
import { Plane } from "lucide-react";

const fleet = [
  {
    name: "Embraer E175",
    desc: "8 aircraft",
    image: "https://starair.in/Content/Images/Fleet/Aircraft_ERJ175_sm.jpg",
  },
  {
    name: "Embraer ERJ145",
    desc: "4 aircraft",
    image: "https://starair.in/Content/Images/Fleet/Aircraft_ERJ145_sm.jpg",
  },
];

export default function Fleet() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fleet.map((aircraft) => (
        <div key={aircraft.name} className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-accent/30 transition group">
          <div className="relative h-48">
            <Image
              src={aircraft.image}
              alt={aircraft.name}
              fill
              className="object-contain group-hover:scale-105 transition duration-500"
              unoptimized
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="text-xl font-bold text-white">{aircraft.name}</h3>
            <p className="text-text-secondary text-sm">{aircraft.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
