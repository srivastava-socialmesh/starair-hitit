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
    <section className="py-16 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
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
              className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-rose-500/30 transition"
            >
              <stat.icon className="text-rose-400" size={36} />
              <h3 className="text-4xl font-bold text-white mt-3">
                {count}
                <span className="text-rose-400">{stat.suffix || ""}</span>
              </h3>
              <p className="text-slate-400 text-sm uppercase tracking-wider mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
