"use client";

import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ProfessionalStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  detail?: string;
  trend?: string;
  color?: "cyan" | "blue" | "indigo" | "violet" | "purple";
}

export default function ProfessionalStatCard({
  icon: Icon,
  label,
  value,
  detail,
  trend,
  color = "blue"
}: ProfessionalStatCardProps) {
  const colorMap = {
    cyan: { text: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/20", glow: "bg-cyan-500" },
    blue: { text: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", glow: "bg-blue-500" },
    indigo: { text: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20", glow: "bg-indigo-500" },
    violet: { text: "text-[#8b5cf6]", bg: "bg-[#8b5cf6]/10", border: "border-[#8b5cf6]/20", glow: "bg-[#8b5cf6]" },
    purple: { text: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20", glow: "bg-purple-500" },
  };

  const selected = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/1 border border-white/5 p-8 rounded-3xl group relative overflow-hidden flex flex-col justify-between h-full backdrop-blur-sm transition-all hover:bg-white/2 hover:border-white/10"
    >
      <div className="space-y-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-110 ${selected.text} ${selected.bg} ${selected.border}`}>
            <Icon size={24} />
          </div>
          {trend && (
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-white/30 bg-white/5 px-2 py-1 rounded">
              {trend}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <p className="font-mono text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">
            {label}
          </p>
          <h4 className="text-4xl font-black text-white tracking-tighter">
            {value}
          </h4>
        </div>
      </div>

      {detail && (
        <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight italic leading-relaxed">
            "{detail}"
          </p>
        </div>
      )}

      {/* Subtle corner glow */}
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 blur-[60px] opacity-10 rounded-full transition-opacity group-hover:opacity-20 ${selected.glow}`} />
    </motion.div>
  );
}
