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
    cyan: { text: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-100", glow: "bg-cyan-600" },
    blue: { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", glow: "bg-blue-600" },
    indigo: { text: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", glow: "bg-indigo-600" },
    violet: { text: "text-[#7c3aed]", bg: "bg-[#f5f3ff]", border: "border-[#ddd6fe]", glow: "bg-[#7c3aed]" },
    purple: { text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", glow: "bg-purple-600" },
  };

  const selected = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border border-slate-100 p-8 rounded-3xl group relative overflow-hidden flex flex-col justify-between h-full shadow-sm transition-all hover:bg-slate-50 hover:border-slate-200"
    >
      <div className="space-y-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-110 ${selected.text} ${selected.bg} ${selected.border}`}>
            <Icon size={24} />
          </div>
          {trend && (
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded">
              {trend}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <p className="font-mono text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
            {label}
          </p>
          <h4 className="text-4xl font-black text-slate-900 tracking-tighter">
            {value}
          </h4>
        </div>
      </div>

      {detail && (
        <div className="mt-8 pt-6 border-t border-slate-100 relative z-10">
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
