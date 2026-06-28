"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Award, Users, Clock, Crown } from "lucide-react";

const stats = [
  { icon: Globe, label: "Destinations", value: 120, suffix: "+" },
  { icon: Award, label: "Awards", value: 24 },
  { icon: Users, label: "Happy Passengers", value: 4, suffix: "M+" },
  { icon: Clock, label: "On-Time Rate", value: 98, suffix: "%" },
];

export default function Stats() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#111827] to-[#0a0e1a]"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center p-6 rounded-2xl border border-white/5 hover:border-amber-500/30 transition bg-white/5 backdrop-blur-sm"
            >
              <stat.icon className="text-amber-400" size={40} />
              <h3 className="text-4xl md:text-5xl font-bold text-white mt-3">
                {count}
                <span className="text-amber-400">{stat.suffix || ""}</span>
              </h3>
              <p className="text-slate-400 text-sm uppercase tracking-wider mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
