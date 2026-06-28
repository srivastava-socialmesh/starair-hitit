"use client";
import { motion } from "framer-motion";
import { Globe, Award, Users, Clock } from "lucide-react";

const stats = [
  { icon: Globe, label: "Destinations", value: "120+" },
  { icon: Award, label: "Awards", value: "24" },
  { icon: Users, label: "Happy Passengers", value: "4M+" },
  { icon: Clock, label: "On-Time Rate", value: "98%" },
];

export default function Stats() {
  return (
    <section className="py-20 px-4 bg-slate-800/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <stat.icon className="text-cyan-400" size={40} />
            <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">{stat.value}</h3>
            <p className="text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
