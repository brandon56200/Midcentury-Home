"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BrandIcon from "../BrandIcon";

interface BarItem {
  id: string;
  name: string;
  value: number;
  brandId?: string;
  color?: string;
  secondaryValue?: string;
  type?: string;
}

interface ProfessionalBarChartProps {
  data: BarItem[];
  maxValue?: number;
  unit?: string;
  title?: string;
  subtitle?: string;
  isCenterpiece?: boolean;
  referenceLine?: {
    value: number;
    label: string;
    color?: string;
  };
  showDivider?: boolean;
  orientation?: 'horizontal' | 'vertical';
  hideScale?: boolean;
  disableInternalSort?: boolean;
}

export default function ProfessionalBarChart({ 
  data, 
  maxValue = 100, 
  unit = "%", 
  title,
  subtitle,
  isCenterpiece = false,
  referenceLine,
  showDivider = false,
  orientation = 'horizontal',
  hideScale = false,
  disableInternalSort = false
}: ProfessionalBarChartProps) {
  const sortedData = (showDivider || disableInternalSort) ? data : [...data].sort((a, b) => b.value - a.value);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  if (orientation === 'vertical') {
    return (
      <div ref={containerRef} className="w-full h-[450px] flex flex-col">
        {(title || subtitle) && (
          <div className="flex flex-col gap-2 mb-12 border-b border-slate-100 pb-6">
            <h3 className="text-sm font-mono font-black uppercase tracking-[0.3em] text-slate-900">{title}</h3>
            {subtitle && <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{subtitle}</p>}
          </div>
        )}

        <div className="flex-1 flex items-end justify-center gap-4 md:gap-10 px-4 relative">
          {/* Horizontal Grid Lines */}
          {!hideScale && (
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-20">
              {[100, 75, 50, 25, 0].map((v) => (
                <div key={v} className="w-full border-t border-slate-100 relative">
                  <span className="absolute -top-2.5 -left-8 text-[10px] font-mono font-black text-slate-400">{v}</span>
                </div>
              ))}
            </div>
          )}

          {/* Reference Line */}
          {referenceLine && (
            <div 
              className="absolute w-full border-t-2 border-dashed z-20 pointer-events-none transition-all duration-1000 pb-20"
              style={{ 
                bottom: `${(referenceLine.value / maxValue) * 100}%`,
                borderColor: referenceLine.color || 'rgba(0,0,0,0.2)',
                opacity: isInView ? 1 : 0
              }}
            >
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-white border border-slate-200 text-slate-900 whitespace-nowrap shadow-sm">
                  {referenceLine.label}
                </span>
              </div>
            </div>
          )}

          {sortedData.map((item, i) => (
            <div key={item.id} className="relative w-[60px] md:w-[80px] flex flex-col items-center group h-full justify-end pb-20">
              {/* Value Label */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="mb-3"
              >
                <span className="text-sm md:text-base font-mono font-black text-slate-900">{item.value.toFixed(1)}{unit}</span>
              </motion.div>

              {/* Vertical Bar */}
              <div className="relative w-full max-w-[40px] md:max-w-[50px] flex-1 flex flex-col justify-end">
                <div className="absolute inset-0 bg-slate-50 rounded-t-lg" />
                <motion.div
                  initial={{ height: 0 }}
                  animate={isInView ? { height: `${(item.value / maxValue) * 100}%` } : { height: 0 }}
                  transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1], delay: i * 0.1 }}
                  className="w-full rounded-t-lg relative z-10"
                  style={{ 
                    backgroundColor: item.color ?? "#3b82f6",
                    boxShadow: `0 0 20px ${(item.color ?? "#3b82f6")}30`
                  }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent opacity-20 rounded-t-lg" />
                </motion.div>
              </div>

              {/* Footer Model Label */}
              <div className="absolute bottom-0 flex flex-col items-center gap-2 pt-6 w-full">
                 {item.brandId && <BrandIcon brandId={item.brandId} size={16} className="text-slate-400 group-hover:text-slate-900 transition-colors" />}
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter group-hover:text-slate-900 transition-colors text-center leading-tight w-full px-1 min-h-[2.5em] flex items-center justify-center">
                   {item.name}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`w-full overflow-hidden ${isCenterpiece ? 'pt-4 pb-6' : 'space-y-8'}`}>
      {(title || subtitle) && (
        <div className={`flex flex-col gap-3 mb-8 ${isCenterpiece ? 'text-center items-center' : 'border-b border-slate-100 pb-6'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-1.5 h-8 bg-blue-600 rounded-full shadow-sm ${isCenterpiece ? 'hidden' : ''}`} />
            <h3 className={`${isCenterpiece ? 'text-2xl md:text-3xl' : 'text-sm'} font-mono font-black uppercase tracking-[0.3em] text-slate-900`}>
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className={`${isCenterpiece ? 'text-xs max-w-xl' : 'text-[11px]'} font-bold text-slate-500 uppercase tracking-[0.2em] leading-relaxed`}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="relative space-y-10 md:space-y-12">
        {/* Modern Vertical Grid Lines */}
        <div className="absolute inset-0 flex justify-between pointer-events-none px-1">
          {[0, 25, 50, 75, 100].map((v) => (
            <div key={v} className="h-full border-l border-slate-200 relative">
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">{v}</span>
            </div>
          ))}
        </div>

        {/* Reference Line */}
        {referenceLine && (
          <div 
            className="absolute h-full border-l-2 border-dashed z-20 pointer-events-none transition-all duration-1000"
            style={{ 
              left: `${(referenceLine.value / maxValue) * 100}%`,
              borderColor: referenceLine.color || 'rgba(0,0,0,0.2)',
              opacity: isInView ? 1 : 0
            }}
          >
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-white text-slate-900 border border-slate-200 shadow-sm">
                {referenceLine.label}: {referenceLine.value}{unit}
              </span>
            </div>
          </div>
        )}

        <div className={`relative z-10 ${isCenterpiece ? 'space-y-3 md:space-y-4' : 'space-y-6 md:space-y-8'}`}>
          {sortedData.map((item, i) => {
            const isDivider = showDivider && i > 0 && item.type !== sortedData[i-1]?.type;
            
            return (
              <React.Fragment key={item.id}>
                {isDivider && (
                  <div className="py-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-slate-100" />
                    <span className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Dedicated STT Specialists</span>
                    <div className="h-px flex-1 bg-slate-100" />
                  </div>
                )}
                <div className="group relative">
                  {/* Row Header - High Contrast Labels */}
                  <div className="flex justify-between items-end mb-2.5 px-1">
                    <div className="flex items-center gap-4">
                      {item.brandId && (
                        <div className="w-10 h-10 rounded-lg border border-slate-100 flex items-center justify-center bg-white shadow-sm transition-all duration-500 group-hover:border-slate-300">
                           <BrandIcon brandId={item.brandId} size={18} className="text-slate-900 group-hover:scale-110 transition-transform" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight">
                          {item.name}
                        </span>
                        {item.secondaryValue && (
                           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                             {item.secondaryValue}
                           </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <motion.div 
                        initial={{ opacity: 0, x: -5 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                        className="flex items-baseline gap-1.5"
                      >
                        <span className="text-xl md:text-2xl font-mono font-black text-slate-900">
                          {item.value.toFixed(1)}
                        </span>
                        <span className="text-xs font-black text-slate-400 uppercase">{unit}</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Advanced Bar System */}
                  <div className="relative h-4 md:h-5 w-full">
                    {/* Background Track */}
                    <div className="absolute inset-0 bg-slate-50 border border-slate-100 rounded-full overflow-hidden" />

                    {/* Primary Data Bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${(item.value / maxValue) * 100}%` } : { width: 0 }}
                      transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1], delay: i * 0.1 }}
                      className="absolute h-full left-0 top-0 rounded-full z-10"
                      style={{
                        backgroundColor: item.color ?? "#3b82f6",
                        boxShadow: `0 0 20px ${(item.color ?? "#3b82f6")}30`
                      }}
                    >
                      <div className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent opacity-20 rounded-full" />
                      
                      {/* Enhanced Idle Animation */}
                      <motion.div 
                        animate={{ left: ["-20%", "120%"], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                        className="absolute top-0 bottom-0 w-32 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-20"
                      />
                    </motion.div>
                  </div>

                  {/* Individual Row Hover State */}
                  <div className="absolute -inset-x-4 -inset-y-4 bg-slate-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-slate-100" />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>

  );
}
