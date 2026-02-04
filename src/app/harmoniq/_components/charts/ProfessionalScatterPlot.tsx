"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import BrandIcon from "../BrandIcon";

interface ScatterPoint {
  id: string;
  name: string;
  x: number; // Accuracy (50-100)
  y: number; // Naturalness (3.2-3.8)
  color: string;
  brandId: string;
}

interface ProfessionalScatterPlotProps {
  data: ScatterPoint[];
  title?: string;
  subtitle?: string;
}

export default function ProfessionalScatterPlot({
  data,
  title,
  subtitle
}: ProfessionalScatterPlotProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Scaling functions
  const padding = 100;
  const width = 1200; // Increased width for full-span
  const height = 700; // Increased height for better distribution

  const scaleX = (val: number) => {
    const min = 40; // Wider range
    const max = 100;
    return padding + ((val - min) / (max - min)) * (width - 2 * padding);
  };

  const scaleY = (val: number) => {
    const min = 3.0; // Wider range
    const max = 4.0;
    // Invert Y for SVG (higher values at top)
    return height - (padding + ((val - min) / (max - min)) * (height - 2 * padding));
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-4">
      {(title || subtitle) && (
        <div className="flex flex-col items-center gap-3 mb-8 text-center max-w-2xl">
          <div className="flex items-center gap-3">
             <h3 className="text-xl md:text-2xl font-black uppercase tracking-[0.3em] text-white leading-none">{title}</h3>
          </div>
          {subtitle && <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{subtitle}</p>}
        </div>
      )}

      <div className="relative group/scatter w-full px-4" style={{ maxWidth: '1400px' }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible drop-shadow-2xl">
          {/* Subtle Grid System */}
          <g className="opacity-[0.03]">
             {[40, 50, 60, 70, 80, 90, 100].map(x => (
               <line key={x} x1={scaleX(x)} y1={padding} x2={scaleX(x)} y2={height-padding} stroke="white" strokeWidth="1" />
             ))}
             {[3.0, 3.2, 3.4, 3.6, 3.8, 4.0].map(y => (
               <line key={y} x1={padding} y1={scaleY(y)} x2={width-padding} y2={scaleY(y)} stroke="white" strokeWidth="1" />
             ))}
          </g>

          {/* Quadrant Lines (The "Correlation Gap" Visual) */}
          <g className="opacity-10">
             <line x1={scaleX(70)} y1={padding} x2={scaleX(70)} y2={height-padding} stroke="white" strokeWidth="1" strokeDasharray="10 10" />
             <line x1={padding} y1={scaleY(3.5)} x2={width-padding} y2={scaleY(3.5)} stroke="white" strokeWidth="1" strokeDasharray="10 10" />
          </g>

          {/* Axes */}
          <g className="opacity-30">
             <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="white" strokeWidth="2" strokeLinecap="round" />
             <line x1={padding} y1={padding} x2={padding} y2={height-padding} stroke="white" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Axis Markings */}
          {[40, 60, 80, 100].map(x => (
            <text key={x} x={scaleX(x)} y={height-padding+25} textAnchor="middle" className="fill-white/30 font-mono font-black text-[10px] uppercase tracking-widest">{x}%</text>
          ))}
          {[3.0, 3.5, 4.0].map(y => (
            <text key={y} x={padding-25} y={scaleY(y)+4} textAnchor="end" className="fill-white/30 font-mono font-black text-[10px] uppercase tracking-widest">{y}</text>
          ))}

          {/* Axis Labels */}
          <text x={width/2} y={height-10} textAnchor="middle" className="fill-white font-mono font-black text-xs uppercase tracking-[0.5em]">Logical Accuracy (%)</text>
          <text x={-height/2} y={20} transform="rotate(-90)" textAnchor="middle" className="fill-white font-mono font-black text-xs uppercase tracking-[0.5em]">Vocal Naturalness (MOS)</text>

          {/* Points */}
          {data.map((point, i) => {
            const isHovered = hoveredId === point.id;
            const cx = scaleX(point.x);
            const cy = scaleY(point.y);

            return (
              <g 
                key={point.id}
                onMouseEnter={() => setHoveredId(point.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer"
              >
                {/* Connection to Axes on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <line x1={padding} y1={cy} x2={cx} y2={cy} stroke={point.color} strokeWidth="1.5" strokeDasharray="6 6" className="opacity-40" />
                      <line x1={cx} y1={cy} x2={cx} y2={height-padding} stroke={point.color} strokeWidth="1.5" strokeDasharray="6 6" className="opacity-40" />
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* The Point - High End Glassmorphism Marker */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: "backOut" }}
                >
                  {/* Outer Glow Ring */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 28 : 22}
                    fill="transparent"
                    stroke={point.color}
                    strokeWidth="1.5"
                    className="transition-all duration-500 opacity-20"
                  />

                  {/* Glass Circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 24 : 18}
                    fill="#000"
                    stroke={point.color}
                    strokeWidth={isHovered ? 3 : 2}
                    className="transition-all duration-500"
                    style={{ 
                      filter: isHovered ? `drop-shadow(0 0 25px ${point.color})` : `drop-shadow(0 0 10px ${point.color}44)`,
                      fillOpacity: 0.9
                    }}
                  />
                  
                  <foreignObject x={cx - (isHovered ? 14 : 10)} y={cy - (isHovered ? 14 : 10)} width={isHovered ? 28 : 20} height={isHovered ? 28 : 20}>
                     <div className="w-full h-full flex items-center justify-center pointer-events-none transition-all duration-500">
                        <BrandIcon brandId={point.brandId} size={isHovered ? 18 : 12} className="text-white" />
                     </div>
                  </foreignObject>

                  {/* Technical Readout (Static but visible) */}
                  {!isHovered && (
                    <g className="pointer-events-none opacity-40">
                       <text x={cx} y={cy + 35} textAnchor="middle" className="fill-white font-mono font-black text-[8px] uppercase tracking-widest">{point.name}</text>
                    </g>
                  )}
                </motion.g>

                {/* Hover Readout - Floating Stats */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.g
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                       <text x={cx} y={cy - 40} textAnchor="middle" className="fill-white font-black text-[14px] uppercase tracking-tighter shadow-2xl">{point.name}</text>
                    </motion.g>
                  )}
                </AnimatePresence>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip - Redesigned */}
        <AnimatePresence>
          {hoveredId && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute pointer-events-none bg-black border border-white/20 p-5 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden"
              style={{ 
                left: `${(scaleX(data.find(d => d.id === hoveredId)!.x) / width) * 100}%`,
                top: scaleY(data.find(d => d.id === hoveredId)!.y) - 60,
                marginLeft: data.find(d => d.id === hoveredId)!.x > 70 ? '-260px' : '60px',
                minWidth: '180px'
              }}
            >
               {/* Internal Glow Backdrop */}
               <div 
                 className="absolute inset-0 opacity-10 blur-2xl -z-10" 
                 style={{ backgroundColor: data.find(d => d.id === hoveredId)!.color }} 
               />
               
               <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                     <BrandIcon brandId={data.find(d => d.id === hoveredId)!.brandId} size={16} className="text-white" />
                     <p className="text-xs font-mono font-black text-white uppercase tracking-widest">{data.find(d => d.id === hoveredId)!.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-[10px] font-mono font-black text-white/40 uppercase tracking-widest mb-1">Accuracy</p>
                        <p className="text-lg font-black text-white leading-none">{data.find(d => d.id === hoveredId)!.x}<span className="text-[10px] ml-1">%</span></p>
                     </div>
                     <div>
                        <p className="text-[10px] font-mono font-black text-white/40 uppercase tracking-widest mb-1">Naturalness</p>
                        <p className="text-lg font-black text-white leading-none">{data.find(d => d.id === hoveredId)!.y.toFixed(2)}<span className="text-[10px] ml-1 uppercase">mos</span></p>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}