"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, BarChart3, FlaskConical, Lightbulb, FastForward, Info, Star } from "lucide-react";
import Hero from "./_components/Hero";
import Results from "./_components/Results";
import Analysis from "./_components/Analysis";
import Experiment from "./_components/Experiment";
import Future from "./_components/Future";
import { HARMONIQ_DATA } from "./data";

const stages = [
  { id: "hero", label: "Harmoniq", icon: Star },
  { id: "results", label: "Results", icon: BarChart3 },
  { id: "analysis", label: "Analysis", icon: Lightbulb },
  { id: "experiment", label: "Experiment", icon: FlaskConical },
  { id: "future", label: "Future", icon: FastForward },
];

export default function HarmoniqPage() {
  const [currentStage, setCurrentStage] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    if (currentStage + newDirection >= 0 && currentStage + newDirection < stages.length) {
      setDirection(newDirection);
      setCurrentStage(prev => prev + newDirection);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStage]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] text-slate-900 selection:bg-blue-600/10 overflow-hidden font-sans">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm overflow-hidden relative group">
            <span className="text-white font-bold text-lg tracking-tighter relative z-10 transition-transform group-hover:scale-110">H.</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Harmoniq<span className="text-blue-600">.</span></h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Midcentury Labs</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50 backdrop-blur-2xl relative">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = currentStage === idx;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  setDirection(idx > currentStage ? 1 : -1);
                  setCurrentStage(idx);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest transition-all duration-300 relative group ${
                  isActive 
                    ? "text-slate-900" 
                    : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="header-active-pill"
                    className="absolute inset-0 bg-white rounded-full z-0 shadow-sm border border-slate-200/50"
                    transition={{ 
                      type: "spring", 
                      stiffness: 350, 
                      damping: 25, 
                      mass: 0.6,
                      restDelta: 0.001
                    }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 transition-colors relative z-10 ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"}`} />
                <span className="relative z-10">{stage.label.toUpperCase()}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Navigation - Scrollable Pill Bar */}
        <div className="md:hidden fixed top-[88px] left-0 w-full overflow-x-auto custom-scrollbar-hide bg-white/90 backdrop-blur-md border-y border-slate-100 py-3 px-6 flex items-center gap-2 z-40">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = currentStage === idx;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  setDirection(idx > currentStage ? 1 : -1);
                  setCurrentStage(idx);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-bold tracking-widest transition-all shrink-0 ${
                  isActive 
                    ? "bg-slate-900 text-white shadow-md" 
                    : "bg-slate-50 text-slate-400 border border-slate-200"
                }`}
              >
                <Icon className={`w-3 h-3 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                <span>{stage.label.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden lg:block text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Benchmark Version</p>
            <p className="text-xs font-mono text-slate-500">v1.0.4-beta</p>
          </div>
          <button className="bg-blue-50 hover:bg-blue-100 px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-blue-100 text-blue-600 text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase transition-all shadow-sm">
            Dataset
          </button>
        </div>
      </header>


      {/* Main Content Stepper */}
      <div className="relative w-full h-screen overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentStage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.4, ease: "easeOut" },
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-0 w-full h-full overflow-y-auto custom-scrollbar flex flex-col pt-40 md:pt-24 z-10"
          >
            {currentStage === 0 && <Hero onNext={() => paginate(1)} />}
            {currentStage === 1 && <Results onNavigate={(stageId: string) => {
              const index = stages.findIndex(s => s.id === stageId);
              if (index !== -1) {
                setDirection(index > currentStage ? 1 : -1);
                setCurrentStage(index);
              }
            }} />}
            {currentStage === 2 && <Analysis />}
            {currentStage === 3 && <Experiment />}
            {currentStage === 4 && <Future />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 md:bottom-10 left-0 w-full flex justify-between items-center px-6 md:px-10 z-40 pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          {currentStage > 0 && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-200 bg-white/80 backdrop-blur-xl flex items-center justify-center hover:bg-white transition-all group shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </motion.button>
          )}
        </div>

        <div className="flex gap-2 pointer-events-auto">
          {currentStage < stages.length - 1 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => paginate(1)}
              className="group relative flex items-center gap-3 md:gap-4 px-6 md:px-8 py-3 md:py-4 rounded-full bg-white text-slate-900 border border-slate-200 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
            >
              <div className="flex flex-col items-start leading-none">
                <span className="text-[8px] md:text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-0.5 md:mb-1">Next Stage</span>
                <span className="text-xs md:text-sm font-bold tracking-wide text-slate-900 group-hover:text-blue-600 transition-all">
                  {stages[currentStage + 1]?.label}
                </span>
              </div>

              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
            </motion.button>
          )}
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-50/30 blur-[100px] rounded-full" />

        {/* Decorative Animated Waves - Only on Hero Stage */}
        <AnimatePresence>
          {currentStage === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-0 left-0 w-full h-[400px] overflow-hidden"
            >
              <div className="absolute inset-0">
                <motion.svg 
                  className="absolute bottom-0 w-[200%] h-full"
                  viewBox="0 0 1000 100" 
                  preserveAspectRatio="none"
                  initial={{ x: 0 }}
                  animate={{ x: "-50%" }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <path 
                    d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,100 L0,100 Z" 
                    className="fill-blue-50/50"
                  />
                  <path 
                    d="M1000,50 C1150,100 1350,0 1500,50 C1650,100 1850,0 2000,50 L2000,100 L1000,100 Z" 
                    className="fill-blue-50/50"
                  />
                </motion.svg>

                <motion.svg 
                  className="absolute bottom-0 w-[200%] h-[80%]"
                  viewBox="0 0 1000 100" 
                  preserveAspectRatio="none"
                  initial={{ x: "-50%" }}
                  animate={{ x: 0 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <path 
                    d="M0,50 C200,0 300,100 500,50 C700,0 800,100 1000,50 L1000,100 L0,100 Z" 
                    className="fill-blue-100/30"
                  />
                  <path 
                    d="M1000,50 C1200,0 1300,100 1500,50 C1700,0 1800,100 2000,50 L2000,100 L1000,100 Z" 
                    className="fill-blue-100/30"
                  />
                </motion.svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </main>
  );
}
