"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Zap, Shield, Brain, Headphones, Ear, Activity } from "lucide-react";
import BrandIcon from "./BrandIcon";
import ProfessionalSpotlightRadar from "./charts/ProfessionalSpotlightRadar";

interface ModelBreakdownProps {
  models: any[];
  rankings: any[];
  accuracyByTask: any;
  palette: any;
}

export default function ModelBreakdown({ models, rankings, accuracyByTask, palette }: ModelBreakdownProps) {
  const [selectedModelId, setSelectedModelId] = useState("gemini");

  const selectedModel = models.find(m => m.id === selectedModelId)!;
  const selectedRank = rankings.find(r => r.modelId === selectedModelId)!;
  
  const calculatePillarScores = (modelId: string) => {
    const scores = accuracyByTask[modelId] || {};
    return {
      speechUnd: ((scores.sqa || 0) + (scores.asr || 0)) / 2,
      voiceUnd: ((scores.er || 0) + (scores.gr || 0)) / 2,
      speechReasoning: ((scores.ff || 0) + (scores.na || 0) + (scores.oc || 0) + (scores.wol || 0)) / 4,
    };
  };

  const pillars = calculatePillarScores(selectedModelId);
  const radarData = [
    { name: "Speech Understanding", value: pillars.speechUnd },
    { name: "Voice Understanding", value: pillars.voiceUnd },
    { name: "Speech Reasoning", value: pillars.speechReasoning },
    { name: "Naturalness", value: Math.min(100, Math.max(0, (selectedRank.naturalness - 3.0) / (4.1 - 3.0) * 100)) },
    { name: "Reliability", value: selectedRank.reliability },
  ];

  const characterizations: Record<string, { desc: string; pros: string[]; cons: string[] }> = {
    gemini: {
      desc: "The technical ceiling of current Voice AI. Gemini Live represents a breakthrough in native multi-modal reasoning, maintaining high-IQ logic even when processing complex audio prompts.",
      pros: ["Highest Overall Reasoning", "Superior Multi-modal Perception", "Elite Naturalness Profile"],
      cons: ["Occasional silent responses", "Higher cost-per-token"]
    },
    openai: {
      desc: "The balanced industry workhorse. GPT-4o Realtime offers elite reliability and the highest fidelity in emotional perception, making it the safest choice for production environments.",
      pros: ["100% Production Reliability", "Leading Emotion Recognition", "Optimized Inference Latency"],
      cons: ["Trailing Gemini in raw logic", "Closed-weight proprietary stack"]
    },
    grok: {
      desc: "A speed-first reasoning engine. Grok Realtime excels at spatial navigation and rapid logic, though it currently trails in paralinguistic nuance and speaker attribute detection.",
      pros: ["Blazing Fast Response Times", "Strong Spatial Reasoning", "Competitive Reliability"],
      cons: ["Gender Recognition Failure", "Inconsistent Emotional Depth"]
    },
    hume: {
      desc: "The aesthetic and empathetic specialist. Hume EVI3 prioritizes the 'feel' of the interaction, leading the industry in transcription accuracy and prosodic sub-harmonics.",
      pros: ["Industry-Leading 1.9% WER", "Elite Prosody & Naturalness", "Built-in Affective State Engine"],
      cons: ["Weakest logical reasoning", "High response latency"]
    },
    ultravox: {
      desc: "The open-weight champion. Ultravox provides a highly capable, fully hostable alternative for organizations requiring maximum control and data privacy without sacrificing reliability.",
      pros: ["Open-Weight Architecture", "Fully Self-Hostable", "Excellent 100% Uptime"],
      cons: ["Slower median response time", "Lower reasoning ceiling"]
    }
  };

  const currentChars = characterizations[selectedModelId] || characterizations.gemini;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[800px]">
      {/* Left Column: Circular Menu & Radar */}
      <div className="lg:col-span-8 flex flex-col items-center justify-center relative min-h-[800px]">
        {/* The Outer Ring (Dotted connecting line) */}
      <svg className="absolute w-[700px] h-[700px] pointer-events-none" viewBox="0 0 700 700">
        <circle 
          cx="350" 
          cy="350" 
          r="340" 
          fill="none" 
          stroke="#94a3b8" 
          strokeWidth="1.5" 
          strokeDasharray="6 10" 
          className="opacity-50"
        />
      </svg>

        {/* Model Icons around the circle */}
        {models.map((m, i) => {
          const angle = (i * (360 / models.length) - 90) * (Math.PI / 180);
          const r = 340; // Consistent radius
          const x = r * Math.cos(angle);
          const y = r * Math.sin(angle);
          const isActive = selectedModelId === m.id;

          return (
            <button
              key={m.id}
              onClick={() => setSelectedModelId(m.id)}
              className="absolute z-30 group"
              style={{ 
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className={`w-[70px] h-[70px] rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${
                isActive 
                  ? 'bg-white border-slate-900 shadow-xl scale-110' 
                  : 'bg-white border-slate-100 hover:border-slate-300 shadow-sm'
              }`}>
                <BrandIcon brandId={m.id} size={32} className="text-slate-900" />
              </div>
              
              {/* Label */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 whitespace-nowrap transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <span className="text-[10px] font-mono font-black text-slate-900 uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-slate-200 backdrop-blur-md shadow-sm">
                  {m.shortName}
                </span>
              </div>
            </button>
          );
        })}

        {/* Central Radar Chart */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedModelId}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="z-10"
          >
            <ProfessionalSpotlightRadar
              data={radarData}
              size={400} // Slightly shrunken to ensure gap
              colors={[selectedModel.color || palette.blue, palette.indigo]}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Column: Characterization & Analysis */}
      <div className="lg:col-span-4 flex flex-col justify-center lg:pl-12 min-h-[600px]">
        <div className="h-[500px] flex flex-col justify-center"> {/* Container height restriction */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedModelId}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center px-2 shadow-sm">
                    <BrandIcon brandId={selectedModelId} size={20} className="text-slate-900" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-widest">{selectedModel.provider}</p>
                    <h4 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none">{selectedModel.fullName}</h4>
                  </div>
                </div>
                <p className="text-base text-slate-500 font-bold leading-relaxed max-w-sm">
                  {currentChars?.desc}
                </p>
              </div>

              {/* High-Level Pros/Cons */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Key Strengths</span>
                  </div>
                  <ul className="space-y-2">
                    {currentChars?.pros.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm font-bold leading-snug">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-red-600">
                    <XCircle className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Areas for Improvement</span>
                  </div>
                  <ul className="space-y-2">
                    {currentChars?.cons.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm font-bold leading-snug">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Stats Banner - Minimal */}
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                <div>
                  <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-1">Rank</p>
                  <p className="text-xl font-black text-slate-900">#{selectedRank.rank}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-1">Accuracy</p>
                  <p className="text-xl font-black text-slate-900">{selectedRank.accuracy}%</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
