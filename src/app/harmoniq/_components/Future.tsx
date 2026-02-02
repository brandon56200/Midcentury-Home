"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { 
  Rocket, 
  Waves, 
  Sparkles, 
  Headphones, 
  CheckCircle2, 
  Mic2, 
  Volume2, 
  Layers, 
  Users, 
  BarChart3, 
  ShieldAlert,
  ArrowRight,
  ChevronDown,
  LayoutGrid
} from "lucide-react";

export default function Future() {
  const roadmapItems = [
    {
      id: "background",
      title: "Background Comprehension",
      subtitle: "Real-world audio understanding.",
      icon: Waves,
      oneLiner: "Testing the full audio scene, not just the words.",
      details: [
        {
          label: "Beyond Speech",
          content: "Current benchmarks test clean, isolated speech. But real users talk in noisy environments—cars, cafes, crowds. We're adding tasks that test whether models can filter distractions and focus on what matters."
        },
        {
          label: "Scene Understanding",
          content: "Can a model tell if you're at home or in a restaurant? Can it hear urgency in sirens or calm in ambient music? Background Comprehension will test audio scene awareness."
        },
        {
          label: "Contextual Inference",
          content: "The best voice AI doesn't just hear words—it understands situations. We'll test whether models can use environmental cues to inform their responses."
        }
      ],
      graphic: "waveform"
    },
    {
      id: "human",
      title: "Human Trials",
      subtitle: "Grounding naturalness in real human judgment.",
      icon: Users,
      oneLiner: "Human validation for human-sounding AI.",
      details: [
        {
          label: "Beyond Automated Scores",
          content: "Our current naturalness scores use UTMOSv2, an automated system trained to predict human ratings. But automated isn't the same as authentic. We're adding human evaluator trials."
        },
        {
          label: "What We'll Add",
          content: "Real listeners rating audio quality on the MOS scale. A/B preference tests comparing models head-to-head. Correlation studies to validate our automated methodology."
        },
        {
          label: "Why It Matters",
          content: "The goal of voice AI is to sound human to humans. Human trials will ensure our naturalness rankings reflect what people actually hear."
        }
      ],
      graphic: "mos"
    },
    {
      id: "voice",
      title: "Expanding Voice Understanding",
      subtitle: "Mapping exactly where models hear.",
      icon: LayoutGrid,
      oneLiner: "Mapping the full landscape of voice perception.",
      details: [
        {
          label: "Going Deeper",
          content: "Our current tasks revealed that some models can't detect gender better than a coin flip. We want to understand the full landscape: which paralinguistic features do models perceive, and which do they miss entirely?"
        },
        {
          label: "What We'll Add",
          content: "Fine-grained emotion detection (sarcasm, hesitation, frustration). Speaker characteristic inference (age, accent, speaking style). Prosodic understanding (emphasis, pacing, uncertainty). Harder edge cases with ambiguous or subtle cues."
        },
        {
          label: "The Goal",
          content: "A complete map of voice perception capabilities—so developers know exactly what their models can and cannot hear."
        }
      ],
      graphic: "capability"
    },
    {
      id: "instructions",
      title: "Instruction-Embedded Datasets",
      subtitle: "Voice AI as it's actually used.",
      icon: Mic2,
      oneLiner: "From text+audio to pure audio interaction.",
      details: [
        {
          label: "The Text Crutch Problem",
          content: "Most benchmarks provide task instructions via text or system prompts. But real users don't type instructions—they speak. 'Hey, what emotion is this?' 'Can you transcribe what she said?' The task itself comes through audio."
        },
        {
          label: "What We'll Build",
          content: "Datasets where instructions are spoken, not written. Natural conversational framing that mirrors real use. Pure audio-in evaluation—no text shortcuts."
        },
        {
          label: "Why It Matters",
          content: "If we want benchmarks that predict real-world performance, we need to test in real-world conditions. That means audio-only interaction from start to finish."
        }
      ],
      graphic: "comparison"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.5 } }
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-10 overflow-y-auto custom-scrollbar bg-transparent relative selection:bg-blue-600/30">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto w-full space-y-12 md:space-y-16 pb-32 pt-8"
      >
        
        {/* Simple, High-Impact Header */}
        <div className="space-y-6 text-center md:text-left">
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            The Roadmap. <br />
            <span className="text-blue-600">What's Next for Harmoniq.</span>
          </h3>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl font-medium">
            Harmoniq is a living benchmark. We are actively expanding coverage, deepening rigor, and pushing toward a true standard for voice AI evaluation.
          </p>
        </div>

        {/* Focus: The Four Panels in Rows */}
        <div className="flex flex-col gap-6 md:gap-8 w-full">
          {roadmapItems.map((item) => (
            <RoadmapCard key={item.id} item={item} />
          ))}
        </div>

        <div className="pt-12 text-center">
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.4em] opacity-60">Driving the next generation of Voice AI</p>
        </div>

      </motion.div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function RoadmapCard({ item }: { item: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className={`relative bg-[#050505] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl transition-all duration-500 ${isExpanded ? 'ring-1 ring-blue-500/30 bg-[#080808]' : 'hover:border-white/20'}`}
    >
      {/* Row-based Layout for Card */}
      <div className="p-8 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
        
        {/* Left Side: Summary & Icon */}
        <div className="lg:w-1/2 space-y-8 flex flex-col">
          <div className="flex justify-between items-start">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center transition-transform duration-500 shadow-xl">
              <item.icon className="w-7 h-7 text-blue-500" />
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-600/5 border border-blue-500/10 text-blue-500 text-[8px] font-bold uppercase tracking-[0.2em]">
              Roadmap Item
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="text-3xl font-bold text-white tracking-tight">{item.title}</h4>
            <p className="text-blue-500/80 text-[11px] font-bold uppercase tracking-widest">{item.subtitle}</p>
          </div>

          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden lg:flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-auto hover:text-white transition-colors group/btn w-fit"
          >
            <span>{isExpanded ? 'Collapse Details' : 'Deep Dive Details'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? 'rotate-180 text-blue-500' : 'group-hover/btn:translate-y-0.5'}`} />
          </button>
        </div>

        {/* Right Side: Micro-Graphic */}
        <div className="lg:w-1/2 min-h-[180px] bg-black/40 rounded-2xl border border-white/5 p-8 flex items-center justify-center relative overflow-hidden group/graphic">
          <div className="absolute inset-0 bg-grid-white/[0.01]" />
          <RoadmapGraphic type={item.graphic} label={item.oneLiner} />
        </div>

        {/* Mobile Expand Button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden w-full flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest py-2 hover:text-white transition-colors"
        >
          <span>Deep Dive Details</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden bg-black/20"
          >
            <div className="p-8 md:p-10 pt-0 border-t border-white/5 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
                {item.details.map((detail: any, idx: number) => (
                  <div key={idx} className="space-y-3 relative">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      <h5 className="text-xs font-bold text-white uppercase tracking-widest">{detail.label}</h5>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">{detail.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none" />
    </motion.div>
  );
}

function RoadmapGraphic({ type, label }: { type: string, label: string }) {
  if (type === "waveform") {
    return (
      <div className="flex flex-col items-center gap-4 w-full h-full justify-center">
        <div className="flex items-end gap-1.5 h-16">
          {[0.2, 0.5, 0.8, 0.4, 0.9, 0.3, 0.6, 0.2, 0.7, 0.4, 0.8, 0.3].map((h, i) => (
            <React.Fragment key={i}>
              {/* Foreground Speech */}
              <motion.div 
                animate={{ height: [`${h * 40}px`, `${h * 100}%`, `${h * 40}px`] }}
                transition={{ duration: 1.5 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
              />
              {/* Background Noise Layer */}
              <motion.div 
                animate={{ height: [`${h * 10}px`, `${h * 30}%`, `${h * 10}px`] }}
                transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-0.5 bg-blue-900/30 rounded-full" 
              />
            </React.Fragment>
          ))}
        </div>
        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] transition-colors group-hover/graphic:text-blue-400">{label}</p>
      </div>
    );
  }

  if (type === "mos") {
    return (
      <div className="flex flex-col items-center gap-6 w-full h-full justify-center">
        <div className="flex items-center gap-10 relative">
          <div className="relative">
            <Headphones className="w-10 h-10 text-slate-600" />
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-full"
            />
          </div>
          
          {/* Knob & Slider System */}
          <div className="flex flex-col gap-4 w-32">
            <div className="h-1 w-full bg-white/5 rounded-full relative">
              <motion.div 
                animate={{ left: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10"
              />
              <div className="absolute inset-0 bg-blue-500/20 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full bg-blue-500/40"
                />
              </div>
            </div>
            <div className="flex justify-between gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <motion.div 
                  key={s}
                  animate={{ 
                    backgroundColor: ["rgba(255,255,255,0.05)", "rgba(59,130,246,0.8)", "rgba(255,255,255,0.05)"],
                    boxShadow: ["none", "0 0 10px rgba(59,130,246,0.4)", "none"]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: s * 0.2, ease: "easeInOut" }}
                  className="w-3 h-3 rounded-xs border border-white/5"
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] group-hover/graphic:text-blue-400 transition-colors">{label}</p>
      </div>
    );
  }

  if (type === "capability") {
    return (
      <div className="flex flex-col items-center gap-6 w-full h-full justify-center relative">
        <div className="grid grid-cols-3 gap-3 relative">
          {[
            { label: "Emotion" }, { label: "Gender" }, { label: "Sarcasm" },
            { label: "Age" }, { label: "Accent" }, { label: "Tone" }
          ].map((cap, i) => (
            <motion.div 
              key={i} 
              animate={{ 
                borderColor: ["rgba(255,255,255,0.1)", "rgba(59,130,246,0.4)", "rgba(255,255,255,0.1)"],
                background: ["rgba(255,255,255,0.05)", "rgba(59,130,246,0.1)", "rgba(255,255,255,0.05)"]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
              className="border px-3 py-2 rounded-lg flex items-center gap-2"
            >
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                className="w-1.5 h-1.5 rounded-full bg-blue-500" 
              />
              <span className="text-[7px] font-bold uppercase tracking-widest text-white">{cap.label}</span>
            </motion.div>
          ))}
          
          {/* Scanning Line */}
          <motion.div 
            animate={{ top: ["-10%", "110%", "-10%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-px bg-blue-500/40 blur-[2px] z-20 pointer-events-none"
          />
        </div>
        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] group-hover/graphic:text-blue-400 transition-colors">{label}</p>
      </div>
    );
  }

  if (type === "comparison") {
    return (
      <div className="flex flex-col items-center gap-6 w-full h-full justify-center">
        <div className="flex items-center gap-6 w-full max-w-[240px] relative h-20">
          {/* Current Panel */}
          <motion.div 
            animate={{ opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col items-center gap-2 grayscale"
          >
            <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden relative">
              <motion.div 
                animate={{ left: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 w-1/2 h-full bg-slate-500/20"
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[5px] font-mono text-slate-500 uppercase tracking-tighter">prompt://</span>
              <Mic2 className="w-3 h-3 text-slate-500" />
            </div>
          </motion.div>

          {/* Connection Pulse */}
          <div className="relative flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-slate-700" />
            <motion.div 
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute w-4 h-4 bg-blue-500/20 rounded-full"
            />
          </div>

          {/* Future Panel */}
          <motion.div 
            animate={{ 
              borderColor: ["rgba(59,130,246,0.3)", "rgba(59,130,246,0.6)", "rgba(59,130,246,0.3)"],
              boxShadow: ["0 0 10px rgba(59,130,246,0.1)", "0 0 20px rgba(59,130,246,0.3)", "0 0 10px rgba(59,130,246,0.1)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex-1 bg-blue-600/10 border p-3 rounded-xl flex flex-col items-center gap-2"
          >
            <div className="w-full h-1 bg-blue-500/20 rounded-full overflow-hidden relative">
              <motion.div 
                animate={{ left: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 w-1/2 h-full bg-blue-400/40 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
              />
            </div>
            <Volume2 className="w-4 h-4 text-blue-500" />
          </motion.div>
        </div>
        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] group-hover/graphic:text-blue-400 transition-colors">{label}</p>
      </div>
    );
  }

  return null;
}
