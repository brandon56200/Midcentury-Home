"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface RadarItem {
  name: string;
  value: number;
}

interface ProfessionalSpotlightRadarProps {
  data: RadarItem[];
  title?: string;
  subtitle?: string;
  size?: number;
  colors?: string[];
  mainStat?: {
    value: string | number;
    label: string;
    unit?: string;
  };
}

export default function ProfessionalSpotlightRadar({ 
  data, 
  title, 
  subtitle,
  size = 500,
  colors = ["#3b82f6", "#6366f1"],
  mainStat
}: ProfessionalSpotlightRadarProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const center = size / 2;
  const radius = (size / 2) - 80; // Slightly more padding for labels
  const angleStep = (Math.PI * 2) / data.length;

  const points = data.map((item, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = center + radius * (item.value / 100) * Math.cos(angle);
    const y = center + radius * (item.value / 100) * Math.sin(angle);
    return { x, y, name: item.name, value: item.value, angle };
  });

  const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  // Calculate average for main display
  const averageValue = (data.reduce((acc, curr) => acc + curr.value, 0) / data.length).toFixed(1);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center w-full">
      <div className="relative group/radar" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="overflow-visible select-none">
          <defs>
            <linearGradient id="spotlight-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="100%" stopColor={colors[1] || colors[0]} />
            </linearGradient>
            <filter id="spotlight-glow">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Grid - Polygons */}
          {[25, 50, 75, 100].map((r) => {
            const rPoints = Array.from({ length: data.length }).map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const x = center + radius * (r / 100) * Math.cos(angle);
              const y = center + radius * (r / 100) * Math.sin(angle);
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            }).join(" ") + " Z";
            return (
              <path
                key={r}
                d={rPoints}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1"
                className="opacity-60 transition-opacity group-hover/radar:opacity-80"
              />
            );
          })}

          {/* Radial Spokes */}
          {points.map((p, i) => (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(p.angle)}
              y2={center + radius * Math.sin(p.angle)}
              stroke="#cbd5e1"
              strokeWidth="1"
              className="opacity-40"
            />
          ))}


          {/* Inner Glow Polygon */}
          <motion.path
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 2, ease: "easeOut" }}
            d={pathData}
            fill="url(#spotlight-grad)"
            className="blur-[25px]"
          />

          {/* The Data Polygon Outline */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d={pathData}
            fill="rgba(0, 0, 0, 0.02)"
            stroke="url(#spotlight-grad)"
            strokeWidth="3"
            style={{ filter: `drop-shadow(0 0 10px ${colors[0]}40)` }}
          />

          {/* Axis Labels & Points */}
          {points.map((p, i) => (
            <g 
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer group/node"
            >
              <motion.circle
                cx={p.x}
                cy={p.y}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: hoveredIdx === i ? 1.8 : 1 } : { scale: 0 }}
                transition={{ duration: 0.3 }}
                className="fill-slate-900 shadow-sm"
                r="4"
              />
              <motion.text
                x={center + (radius + 55) * Math.cos(p.angle)}
                y={center + (radius + 55) * Math.sin(p.angle)}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1 }}
                textAnchor="middle"
                alignmentBaseline="middle"
                className={`font-mono font-black uppercase text-[9px] tracking-[0.2em] transition-all duration-300 ${hoveredIdx === i ? 'fill-slate-900' : 'fill-slate-400'}`}
              >
                {p.name}
              </motion.text>
            </g>
          ))}
        </svg>

        {/* Center Stat Readout */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-none">
          <AnimatePresence mode="wait">
            {hoveredIdx === null ? (
              <motion.div
                key="default"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-1"
              >
                <div className="flex flex-col items-center">
                   <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-1">Mean Score</p>
                   <p className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
                     {averageValue}<span className="text-xl text-slate-400 ml-1">%</span>
                   </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="hovered"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className="space-y-1"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-1">
                  {points[hoveredIdx]?.name}
                </p>
                <p className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter">
                  {points[hoveredIdx]?.value.toFixed(1)}<span className="text-2xl text-slate-400 ml-1">%</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


        {/* Triple Atmospheric Glow Layers */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-[100px] rounded-full pointer-events-none z-[-1]"
          style={{ backgroundColor: colors[0] }}
        />
      </div>
    </div>
  );
}
