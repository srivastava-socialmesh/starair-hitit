"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Award, Users, Clock } from "lucide-react";

const stats = [
  { icon: Globe, label: "Destinations", value: 120, suffix: "+" },
  { icon: Award, label: "Awards", value: 24 },
  { icon: Users, label: "Happy Passengers", value: 4, suffix: "M+" },
  { icon: Clock, label: "On-Time Rate", value: 98, suffix: "%" },
];

export default function Stats() {
  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
        {stats.map((stat, i) => {
          const [count, setCount] = useState(0);

          useEffect(() => {
            const duration = 2000;
            const steps = 60;
            const increment = stat.value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                setCount(stat.value);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, duration / steps);
            return () => clearInterval(timer);
          }, [stat.value]);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center p-6 rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition"
            >
              <stat.icon className="text-red-500" size={40} />
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                {count}
                <span className="text-red-500">{stat.suffix || ""}</span>
              </h3>
              <p className="text-gray-500 text-sm uppercase tracking-wider mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
