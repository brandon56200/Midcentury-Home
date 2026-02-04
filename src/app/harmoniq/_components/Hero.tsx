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
    <div className="flex-1 flex flex-col items-center justify-center relative px-6 py-8 md:py-12 bg-transparent min-h-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto flex flex-col items-center relative z-10 w-full"
      >
        {/* Top Indicator */}
        <motion.div variants={itemVariants} className="mb-6 md:mb-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-blue-200" />
            <span className="text-blue-600 font-mono text-[10px] font-bold tracking-[0.4em] uppercase">
              The New Standard for Voice AI
            </span>
            <div className="h-px w-8 bg-blue-200" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <div className="max-w-5xl text-center space-y-3 md:space-y-4">
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] md:leading-[0.9] text-slate-900"
          >
            {meta.title}<span className="text-blue-600">.</span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            {meta.subtitle}
          </motion.p>
        </div>

        {/* Primary Action */}
        <motion.div
          variants={itemVariants}
          className="mt-6 md:mt-8 flex flex-col md:flex-row items-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="group relative flex items-center gap-4 md:gap-5 px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-3xl bg-white text-slate-900 border border-slate-200 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
          >
            <span className="relative z-10 text-lg md:text-xl font-bold tracking-tight">Explore Benchmark</span>
            
            <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </motion.button>
        </motion.div>

        {/* Bento-style Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 md:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full"
        >
          {[
            { icon: Database, value: "13,205", label: "Audio Samples", detail: "End-to-End Evaluation" },
            { icon: Layers, value: "11|5", label: "Total Models | STS Models", detail: "Broad Scope, Deep Rigor" },
            { icon: BarChart3, value: "11", label: "Distinct Tasks", detail: "Multidimensional Testing" },
          ].map((stat, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="bg-white border border-slate-100 p-5 md:p-6 rounded-3xl flex flex-col items-center text-center group hover:shadow-md transition-all hover:border-slate-200 shadow-sm"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <stat.icon className="w-5 h-5 md:w-7 md:h-7 text-blue-600" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-1 md:mb-2 text-slate-900">
                {stat.value.includes('|') ? (
                  <>
                    {stat.value.split('|')[0]}
                    <span className="text-blue-200 mx-2 font-extralight">|</span>
                    {stat.value.split('|')[1]}
                  </>
                ) : stat.value}
              </h3>
              <p className="text-sm md:text-slate-500 font-medium mb-1">{stat.label}</p>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 font-bold">{stat.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>

  );
}
