"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface RadarItem {
  name: string;
  value: number;
}

interface RadarDataset {
  name: string;
  data: RadarItem[];
  color: string;
}

interface ProfessionalRadarChartProps {
  datasets: RadarDataset[];
  size?: number;
  hoveredIndex?: number | null;
  onHoverChange?: (index: number | null) => void;
}

export default function ProfessionalRadarChart({ 
  datasets, 
  size = 480,
  hoveredIndex = null,
  onHoverChange
}: ProfessionalRadarChartProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const center = size / 2;
  const radius = (size / 2) - 60;
  
  // Shift factor to visually center a 3-point radar (which is top-heavy)
  const vOffset = 35; 
  
  // Use the first dataset to define the axis/points
  const axisPoints = datasets[0]?.data.length || 0;
  const angleStep = axisPoints > 0 ? (Math.PI * 2) / axisPoints : 0;

  // Function to calculate path data for a specific dataset
  const getPathData = (dataset: RadarDataset) => {
    return dataset.data.map((item, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = center + radius * (item.value / 100) * Math.cos(angle);
      const y = center + vOffset + radius * (item.value / 100) * Math.sin(angle);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ") + " Z";
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center w-full h-full min-h-full">
      <div className="relative group/radar w-full aspect-square flex items-center justify-center max-h-full" style={{ maxWidth: size }}>
        {/* Tooltip Overlay - Positioned inside to prevent clipping */}
        <AnimatePresence>
          {(hoveredIndex !== null && datasets[hoveredIndex]) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute top-0 right-0 z-50 pointer-events-none hidden lg:block"
            >
              <div className="bg-black/95 backdrop-blur-2xl border border-white/20 p-5 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-3 min-w-[210px]">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-3 h-3 rounded-full shadow-[0_0_15px_currentColor]" style={{ backgroundColor: datasets[hoveredIndex].color }} />
                  <span className="text-sm font-black text-white uppercase tracking-[0.1em]">
                    {datasets[hoveredIndex].name}
                  </span>
                </div>
                <div className="space-y-2.5 border-t border-white/10 pt-3">
                  {datasets[hoveredIndex].data.map((item) => (
                    <div key={item.name} className="flex justify-between items-center gap-8">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">{item.name}</span>
                      <span className="text-sm font-mono font-black text-white">{item.value.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <svg 
          viewBox={`0 0 ${size} ${size}`} 
          className="overflow-visible w-full h-auto max-w-full block mx-auto"
          style={{ maxWidth: size }}
        >
          <defs>
            <filter id="ultra-glow">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Concentric Polygons */}
          {[25, 50, 75, 100].map((r) => {
            const rPoints = Array.from({ length: axisPoints }).map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const x = center + radius * (r / 100) * Math.cos(angle);
              const y = center + vOffset + radius * (r / 100) * Math.sin(angle);
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            }).join(" ") + " Z";
            return (
              <path
                key={r}
                d={rPoints}
                fill="none"
                stroke="white"
                strokeWidth="1"
                className="opacity-5"
              />
            );
          })}

          {/* Spokes */}
          {Array.from({ length: axisPoints }).map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            return (
              <line
                key={i}
                x1={center}
                y1={center + vOffset}
                x2={center + radius * Math.cos(angle)}
                y2={center + vOffset + radius * Math.sin(angle)}
                stroke="white"
                strokeWidth="1"
                className="opacity-10"
              />
            );
          })}

          {/* Datasets */}
          {datasets.map((dataset, idx) => {
            const pathData = getPathData(dataset);
            const isHovered = hoveredIndex === idx;
            const isAnythingHovered = hoveredIndex !== null;
            
            return (
              <g 
                key={dataset.name} 
                className="transition-all duration-500 cursor-pointer"
                style={{ opacity: isAnythingHovered && !isHovered ? 0.1 : 1 }}
                onMouseEnter={() => onHoverChange?.(idx)}
                onMouseLeave={() => onHoverChange?.(null)}
              >
                {/* Fill Shape */}
                <motion.path
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: isHovered ? 0.45 : 0.15, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.2 }}
                  d={pathData}
                  fill={dataset.color}
                />

                {/* The Outline */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.2 }}
                  d={pathData}
                  fill="none"
                  stroke={dataset.color}
                  strokeWidth={isHovered ? "4" : "2"}
                  style={{ filter: isHovered ? `drop-shadow(0 0 25px ${dataset.color})` : 'none' }}
                />

                {/* Vertices / Dots */}
                {dataset.data.map((p, i) => {
                  const angle = i * angleStep - Math.PI / 2;
                  const x = center + radius * (p.value / 100) * Math.cos(angle);
                  const y = center + vOffset + radius * (p.value / 100) * Math.sin(angle);
                  
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={isHovered ? 6 : 4}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ delay: 1.5 + (idx * 0.1) + (i * 0.05) }}
                      fill={dataset.color}
                      className="drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] stroke-black/20"
                      strokeWidth="1"
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Axis Labels */}
          {datasets[0]?.data.map((p, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = center + (radius + 50) * Math.cos(angle);
            const y = center + vOffset + (radius + 50) * Math.sin(angle);
            
            return (
              <motion.text
                key={i}
                x={x}
                y={y}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 2 }}
                textAnchor="middle"
                alignmentBaseline="middle"
                className="font-mono font-black uppercase text-[11px] tracking-[0.2em] fill-white"
              >
                {p.name}
              </motion.text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
