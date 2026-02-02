"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { HARMONIQ_DATA } from "../data";
import { ArrowRight, Database, Layers, BarChart3 } from "lucide-react";

interface HeroProps {
  onNext: () => void;
}

export default function Hero({ onNext }: HeroProps) {
  const { meta } = HARMONIQ_DATA;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start md:justify-start md:pt-32 relative px-6 pb-20 overflow-y-auto md:overflow-hidden bg-transparent custom-scrollbar">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto flex flex-col items-center relative z-10 w-full"
      >
        {/* Top Indicator */}
        <motion.div variants={itemVariants} className="mb-10 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-blue-500/50" />
            <span className="text-blue-500 font-mono text-[10px] font-bold tracking-[0.4em] uppercase">
              The New Standard for Voice AI
            </span>
            <div className="h-px w-8 bg-blue-500/50" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <div className="max-w-5xl text-center space-y-4 md:space-y-6">
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.95] md:leading-[0.9] text-white"
          >
            {meta.title}<span className="text-blue-600">.</span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            {meta.subtitle}
          </motion.p>
        </div>

        {/* Primary Action */}
        <motion.div
          variants={itemVariants}
          className="mt-8 md:mt-12 flex flex-col md:flex-row items-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="group relative flex items-center gap-4 md:gap-5 px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-3xl bg-black border border-blue-500/30 text-white transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.1)] hover:shadow-[0_0_50px_rgba(37,99,235,0.3)] hover:border-blue-400/50 overflow-hidden"
          >
            {/* Internal Shine Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="relative z-10 text-lg md:text-xl font-bold tracking-tight">Explore Benchmark</span>
            
            <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/40 group-hover:scale-110 group-hover:bg-blue-500 transition-all">
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>

            {/* Pulsing Glow Ring */}
            <div className="absolute -inset-px rounded-2xl md:rounded-3xl bg-linear-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />
          </motion.button>
        </motion.div>

        {/* Bento-style Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full"
        >
          {[
            { icon: Database, value: "13,205", label: "Audio Samples", detail: "End-to-End Evaluation" },
            { icon: Layers, value: "11|5", label: "Total Models | STS Models", detail: "Broad Scope, Deep Rigor" },
            { icon: BarChart3, value: "11", label: "Distinct Tasks", detail: "Multidimensional Testing" },
          ].map((stat, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="bg-white/1 border border-white/5 p-5 md:p-6 rounded-3xl flex flex-col items-center text-center group hover:bg-white/2 transition-all hover:border-white/10"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-900/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <stat.icon className="w-5 h-5 md:w-7 md:h-7 text-blue-600" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-1 md:mb-2 text-white">
                {stat.value.includes('|') ? (
                  <>
                    {stat.value.split('|')[0]}
                    <span className="text-blue-500/40 mx-2 font-extralight">|</span>
                    {stat.value.split('|')[1]}
                  </>
                ) : stat.value}
              </h3>
              <p className="text-sm md:text-slate-400 font-medium mb-1">{stat.label}</p>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-600 font-bold">{stat.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
