"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProfessionalArticleSectionProps {
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  stacked?: boolean;
}

export default function ProfessionalArticleSection({
  number,
  title,
  subtitle,
  description,
  children,
  className = "",
  stacked = false
}: ProfessionalArticleSectionProps) {
  if (stacked) {
    return (
      <section className={`max-w-6xl mx-auto px-6 py-24 md:py-32 space-y-16 ${className}`}>
        <div className="space-y-8 max-w-3xl">
          <div className="flex items-center gap-4">
             <span className="font-mono text-sm md:text-base font-black text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-xl border border-blue-400/20">
               SECTION {number}
             </span>
             {subtitle && (
               <span className="font-mono text-[11px] md:text-xs font-black uppercase tracking-[0.4em] text-white/70">
                 {subtitle}
               </span>
             )}
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] text-white uppercase">
            {title}
          </h2>

          <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium">
            {description}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          {children}
        </motion.div>
      </section>
    );
  }

  return (
    <section className={`max-w-6xl mx-auto px-6 py-24 md:py-32 space-y-20 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5 space-y-8">
          <div className="flex items-center gap-4">
             <span className="font-mono text-sm md:text-base font-black text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-xl border border-blue-400/20">
               SECTION {number}
             </span>
             {subtitle && (
               <span className="font-mono text-[11px] md:text-xs font-black uppercase tracking-[0.4em] text-white/70">
                 {subtitle}
               </span>
             )}
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] text-white uppercase">
            {title}
          </h2>

          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg font-medium">
            {description}
          </p>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
