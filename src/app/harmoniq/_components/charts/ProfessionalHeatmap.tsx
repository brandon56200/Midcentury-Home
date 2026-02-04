"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BrandIcon from "../BrandIcon";

interface HeatmapProps {
  models: { id: string; name: string; brandId: string }[];
  tasks: { id: string; name: string; abbreviation: string }[];
  data: Record<string, Record<string, number>>;
  title?: string;
  subtitle?: string;
  color?: string;
}

export default function ProfessionalHeatmap({ 
  models, 
  tasks, 
  data, 
  title, 
  subtitle,
  color = "#8b5cf6" // harmoniq-violet
}: HeatmapProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <div ref={containerRef} className="w-full space-y-8 md:space-y-12">
      {(title || subtitle) && (
        <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 md:pb-6 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 rounded-full shadow-sm" style={{ backgroundColor: color }} />
            <h3 className="text-sm md:text-base font-mono font-black uppercase tracking-[0.3em] text-slate-900">{title}</h3>
          </div>
          {subtitle && <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-5">{subtitle}</p>}
        </div>
      )}

      {/* Main Heatmap Container - No scrolling, dynamic sizing */}
      <div className="w-full pt-2">
        <div className="w-full">
          
          {/* Rows */}
          <div className="space-y-2 md:space-y-3">
            {models.map((model, i) => (
              <div key={model.id} className="flex items-center group/row w-full">
                
                {/* Model ID Card - Shrinks on mobile to just logo */}
                <div className="w-10 md:w-56 shrink-0 flex items-center gap-3 md:gap-5 pr-2 md:pr-8">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl border border-slate-100 flex items-center justify-center bg-white shadow-sm transition-all duration-500 group-hover/row:border-slate-300 group-hover/row:shadow-md">
                    <BrandIcon brandId={model.brandId} size={16} className="text-slate-900 transition-colors" />
                  </div>
                  <div className="hidden md:flex flex-col overflow-hidden">
                    <span className="text-[11px] md:text-[13px] font-black text-slate-900 group-hover/row:opacity-80 transition-colors truncate uppercase tracking-tight">
                      {model.name}
                    </span>
                    <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest mt-0.5">Native STS</span>
                  </div>
                </div>

                {/* Heatmap Row Track - Responsive gaps */}
                <div className="flex-1 flex justify-between gap-1 md:gap-3 p-1.5 md:p-2 bg-slate-50/50 border border-slate-100 rounded-xl md:rounded-2xl group-hover/row:bg-slate-50 group-hover/row:border-slate-200 transition-all duration-500 shadow-sm overflow-hidden">
                  {tasks.map((task, j) => {
                    const score = data[model.id]?.[task.id] ?? 0;
                    const normalizedScore = Math.max(0, (score - 40) / 60);
                    const opacity = 0.15 + (normalizedScore * 0.85);

                    // Convert hex to rgb for rgba usage
                    const hexToRgb = (hex: string) => {
                      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                      if (!result || !result[1] || !result[2] || !result[3]) return "139, 92, 246";
                      return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
                    };

                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: (i * 0.05) + (j * 0.02) }}
                        className="flex-1 aspect-square rounded-sm md:rounded-lg flex items-center justify-center relative group/cell cursor-default overflow-hidden"
                        style={{
                          backgroundColor: score === 0 ? 'transparent' : `rgba(${hexToRgb(color)}, ${opacity})`,
                        }}
                      >
                        {normalizedScore > 0.8 && (
                          <motion.div 
                            animate={{ opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-0 w-full h-full bg-linear-to-tr from-white/20 to-transparent"
                          />
                        )}

                        <span className={`text-[9px] md:text-xs font-mono font-black relative z-10 transition-all duration-300 ${normalizedScore > 0.6 ? 'text-white' : 'text-slate-900 group-hover/cell:text-slate-900'}`}>
                          {score === 0 ? '-' : Math.round(score)}
                        </span>

                        <div className="absolute inset-0 bg-white opacity-0 group-hover/cell:opacity-10 transition-opacity" />
                        
                        {normalizedScore > 0.9 && (
                          <div className="absolute inset-0 rounded-sm md:rounded-xl border border-white/20 shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] pointer-events-none" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Labels - Using exactly the same grid structure as rows */}
          <div className="flex mt-6 md:mt-8 w-full items-start">
            {/* Exactly the same spacer as the Model ID Card */}
            <div className="w-10 md:w-56 shrink-0 pr-2 md:pr-8" />
            
            {/* Exactly the same flex container as the Heatmap Row Track */}
            <div className="flex-1 flex justify-between gap-1 md:gap-3 px-1.5 md:px-2">
              {tasks.map((task) => (
                <div key={task.id} className="flex-1 text-center min-w-0">
                  <span className="text-[8px] md:text-[11px] font-mono font-black text-slate-400 uppercase tracking-tighter md:tracking-widest block -rotate-45 origin-top-left translate-y-2 md:translate-y-4 transition-colors hover:text-slate-900 truncate">
                    {task.abbreviation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Heatmap Legend - Reduced spacing */}
      <div className="flex flex-row items-center justify-center gap-4 md:gap-8 pt-6 md:pt-8">
         <div className="flex items-center gap-2">
            <span className="text-[8px] md:text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">Baseline (40%)</span>
            <div className="w-6 md:w-12 h-1 md:h-2 rounded-full" style={{ backgroundColor: `${color}33` }} />
         </div>
         <div className="flex items-center gap-2">
            <div className="w-6 md:w-12 h-1 md:h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}40` }} />
            <span className="text-[8px] md:text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">Saturated (100%)</span>
         </div>
      </div>
    </div>

  );
}
