"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface CapabilityItem {
  name: string;
  value: number;
}

interface ProfessionalCapabilityWheelProps {
  data: CapabilityItem[];
  title?: string;
  subtitle?: string;
  size?: number;
  color?: string;
}

export default function ProfessionalCapabilityWheel({ 
  data, 
  title, 
  subtitle,
  size = 450,
  color = "#6366f1" // harmoniq-indigo
}: ProfessionalCapabilityWheelProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const center = size / 2;
  const radius = (size / 2) - 60;
  const angleStep = (Math.PI * 2) / data.length;

  const points = data.map((item, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = center + radius * (item.value / 100) * Math.cos(angle);
    const y = center + radius * (item.value / 100) * Math.sin(angle);
    return { x, y, name: item.name, value: item.value, angle };
  });

  const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center space-y-12">
      {(title || subtitle) && (
        <div className="flex flex-col items-center gap-2 border-b border-slate-100 pb-6 w-full max-w-md">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full shadow-sm" style={{ backgroundColor: color }} />
            <h3 className="text-sm font-mono font-black uppercase tracking-[0.2em] text-slate-900">{title}</h3>
          </div>
          {subtitle && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{subtitle}</p>}
        </div>
      )}

      <div className="relative group/wheel" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="overflow-visible">
          <defs>
            <radialGradient id="wheel-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={`${color}4D`} />
              <stop offset="100%" stopColor={`${color}05`} />
            </radialGradient>
            <filter id="glow-wheel">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Grid */}
          {[25, 50, 75, 100].map((r) => (
            <circle
              key={r}
              cx={center}
              cy={center}
              r={(r / 100) * radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="0.5"
              strokeDasharray="4 4"
              className="opacity-40"
            />
          ))}

          {/* Spokes */}
          {points.map((p, i) => (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(p.angle)}
              y2={center + radius * Math.sin(p.angle)}
              stroke="#e2e8f0"
              strokeWidth="1"
              className="opacity-20 transition-opacity group-hover/wheel:opacity-40"
            />
          ))}

          {/* The Data Shape */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d={pathData}
            fill="url(#wheel-gradient)"
            stroke={color}
            strokeWidth="3"
            style={{ filter: `drop-shadow(0 0 10px ${color}40)` }}
          />

          {/* Data Points & Interactive Areas */}
          {points.map((p, i) => (
            <g 
              key={i} 
              onMouseEnter={() => setHoveredIdx(i)} 
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer"
            >
              <motion.circle
                cx={p.x}
                cy={p.y}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: hoveredIdx === i ? 1.5 : 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1.5 + (i * 0.1) }}
                fill={color}
                className={`transition-all duration-300`}
                style={{ filter: hoveredIdx === i ? `drop-shadow(0 0 8px ${color})` : `drop-shadow(0 0 4px ${color}40)` }}
              />
              
              {/* Invisible touch target */}
              <circle cx={p.x} cy={p.y} r="20" fill="transparent" />

              <motion.text
                x={center + (radius + 40) * Math.cos(p.angle)}
                y={center + (radius + 40) * Math.sin(p.angle)}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 2 + (i * 0.05) }}
                textAnchor="middle"
                alignmentBaseline="middle"
                className={`transition-all duration-300 font-mono font-black uppercase text-[10px] ${hoveredIdx === i ? 'fill-slate-900' : 'fill-slate-400'}`}
              >
                {p.name}
              </motion.text>
            </g>
          ))}
        </svg>

        {/* Dynamic Tooltip */}
        <AnimatePresence>
          {hoveredIdx !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center bg-white/90 backdrop-blur-xl border border-slate-200 p-6 rounded-3xl shadow-xl z-20"
            >
              <p className="text-[10px] font-mono font-black uppercase tracking-widest mb-1" style={{ color }}>
                {points[hoveredIdx]?.name}
              </p>
              <p className="text-4xl font-black text-slate-900 tracking-tighter">
                {points[hoveredIdx]?.value}
                <span className="text-xl text-slate-400 ml-1">%</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>

  );
}
