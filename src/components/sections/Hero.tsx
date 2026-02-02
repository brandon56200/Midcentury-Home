"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronRight, Zap, Shield, Globe } from "lucide-react";
import DataSphere from "../canvas/DataSphere";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Match the 3D art parallax factor perfectly (0.008 in 3D units ~= 0.5 in CSS pixels)
  const yRange = useTransform(scrollY, [0, 1000], [0, -500]);

  return (
    <div ref={containerRef} className="relative isolate min-h-screen pt-14 flex items-center justify-center">
      <DataSphere />
      
      <motion.div 
        style={{ y: yRange }}
        className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10"
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1.5 }}
          >
            <div className="mb-12 flex justify-center">
              <div className="relative rounded-full px-6 py-2 text-sm leading-6 text-indigo-300 ring-1 ring-white/10 glass bg-indigo-500/5 animate-pulse-slow">
                Defining the synaptic layer of artificial intelligence.
              </div>
            </div>
            <h1 className="text-6xl font-semibold tracking-tight text-white sm:text-8xl mb-8">
              MIDCENTURY <span className="text-gradient block sm:inline">LABS</span>
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-gray-400 max-w-2xl mx-auto font-light tracking-wide italic">
              "The synthesis of human intent and multimodal intelligence."
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:scale-105">
                Start Building
              </button>
              <button className="text-sm font-semibold leading-6 text-white flex items-center gap-1 group">
                Live Demo <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          <div className="flex items-center gap-2 text-gray-400">
            <Zap className="h-5 w-5 text-indigo-400" />
            <span className="text-sm font-medium">Ultra Low Latency</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Shield className="h-5 w-5 text-indigo-400" />
            <span className="text-sm font-medium">Enterprise Security</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Globe className="h-5 w-5 text-indigo-400" />
            <span className="text-sm font-medium">Global Scale</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
