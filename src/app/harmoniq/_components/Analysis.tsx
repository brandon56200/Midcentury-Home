"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import ReactECharts from "echarts-for-react";
import { HARMONIQ_DATA } from "../data";
import { 
  Brain, 
  Heart, 
  Ear, 
  TrendingUp, 
  Mic, 
  Maximize2, 
  CheckCircle2, 
  Ban, 
  X, 
  Sparkles,
  Zap,
  Target,
  Activity,
  ArrowRight
} from "lucide-react";

// --- CONSISTENT THEME (Exact Copy from Results.tsx) ---
const THEME = {
  blue: ["#172554", "#1e3a8a", "#1e40af", "#1d4ed8", "#2563eb"], 
  slate: ["#020617", "#0f172a", "#1e293b", "#334155", "#475569"],
  primary: "#2563eb",
  bg: "#050505",
  border: "rgba(37, 99, 235, 0.08)",
  textDim: "#475569"
};

// --- DATA ADAPTED FROM HARMONIQ_INSIGHTS_ANALYSIS.md ---

const pillars = [
  {
    id: "speech-understanding",
    title: "Speech Understanding",
    tagline: "Can the model comprehend what was said?",
    icon: Ear,
    desc: "The ability to accurately receive and process spoken content—the words themselves.",
    status: "Essentially Solved",
    statusDesc: "All models achieve 95%+ on SQA. Table stakes for 2025."
  },
  {
    id: "voice-understanding",
    title: "Voice Understanding",
    tagline: "Can the model perceive WHO is speaking and HOW they feel?",
    icon: Heart,
    desc: "Extracting information from voice texture, tone, and speaker characteristics beyond the words.",
    status: "Highly Variable",
    statusDesc: "The biggest capability gap. Performance ranges from perfect to random chance."
  },
  {
    id: "speech-reasoning",
    title: "Speech Reasoning",
    tagline: "Can the model THINK about what it heard?",
    icon: Brain,
    desc: "Logical reasoning when questions are delivered via audio—maintaining IQ through modality.",
    status: "The Frontier",
    statusDesc: "Only one model has closed the 'speech reasoning gap' (92% text vs 66% audio)."
  }
];

interface FindingClaim {
  id: string;
  title: string;
  text: string;
  metric: string;
  implication: string;
  inverted?: boolean;
  highlight?: boolean;
}

interface FindingGroup {
  id: string;
  group: string;
  claims: FindingClaim[];
}

const findings: FindingGroup[] = [
  {
    id: "reasoning-revolution",
    group: "The Reasoning Revolution",
    claims: [
      {
        id: "gap",
        title: "Native IQ Parity",
        text: "Gemini eliminates the historical 'modality tax,' demonstrating that native audio models can achieve cognitive parity with state-of-the-art text reasoning.",
        metric: "91.2% IQ",
        inverted: true,
        implication: "Cognitive parity between text and native audio."
      },
      {
        id: "dominance",
        title: "Reasoning Dominance",
        text: "Gemini leads every reasoning task by 6-21 points. No other model comes close to the text baseline.",
        metric: "+21.5 Gap",
        implication: "Gemini leads reasoning benchmarks by 20+ points."
      }
    ]
  },
  {
    id: "perception-paradox",
    group: "The Perception Paradox",
    claims: [
      {
        id: "monolithic",
        title: "The Monolithic Fallacy",
        text: "Models can excel at emotion but fail gender entirely. Paralinguistic perception varies wildly.",
        metric: "Independent",
        implication: "Voice understanding is not a single score."
      },
      {
        id: "cliff",
        title: "The Identity Cliff",
        text: "Grok, Ultravox, and Hume perform at or below random chance (50%) on binary gender detection.",
        metric: "50% Cliff",
        highlight: true,
        implication: "Identity detection remains a major bottleneck."
      }
    ]
  },
  {
    id: "comprehension-baseline",
    group: "The Comprehension Baseline",
    claims: [
      {
        id: "asr",
        title: "Unified Dialogue Efficiency",
        text: "Integrated audio-to-audio architectures have achieved a level of dialogue comprehension that matches dedicated transcription specialists, enabling more efficient unified pipelines.",
        metric: "1.9% WER",
        inverted: true,
        implication: "Unified architecture matching specialist precision."
      },
      {
        id: "saturation",
        title: "Semantic Saturation",
        text: "Spoken question answering (SQA) has reached a performance ceiling across all major providers, establishing a high baseline for basic comprehension.",
        metric: "95%+ Baseline",
        implication: "Literal comprehension has reached a ceiling."
      }
    ]
  }
];

const modelProfiles: Record<string, { 
  id: string,
  name: string, 
  provider: string,
  overall: string,
  pillars: { label: string, val: string }[],
  nat: string,
  rel: string,
  strengths: string[],
  weaknesses: string[],
  personality: string,
  radarData: number[] 
}> = {
  "gemini": {
    id: "gemini",
    name: "Gemini Live",
    provider: "Google",
    overall: "94.2%",
    pillars: [{ label: "Reasoning", val: "91.2%" }, { label: "Voice Und.", val: "96.4%" }, { label: "Speech Und.", val: "97.8%" }],
    nat: "3.68 (1st)",
    rel: "94.8%",
    strengths: ["Highest overall accuracy", "Closes the reasoning gap", "Best naturalness", "Near-perfect identity detection"],
    weaknesses: ["5.2% content filtering rate", "Occasional silent responses"],
    personality: "The valedictorian—leads every academic metric but sometimes refuses to answer.",
    radarData: [94, 91, 96, 98, 95, 95]
  },
  "openai": {
    id: "openai",
    name: "OpenAI Realtime",
    provider: "OpenAI",
    overall: "82.2%",
    pillars: [{ label: "Reasoning", val: "68.4%" }, { label: "Voice Und.", val: "93.8%" }, { label: "Speech Und.", val: "98.3%" }],
    nat: "3.35 (4th)",
    rel: "100%",
    strengths: ["Perfect reliability", "Best emotion recognition (97.5%)", "Strong ASR (2.5% WER)"],
    weaknesses: ["Middling reasoning (68.4%)", "Lower naturalness"],
    personality: "The dependable workhorse—always shows up, does solid work.",
    radarData: [82, 68, 94, 98, 80, 100]
  },
  "grok": {
    id: "grok",
    name: "Grok Realtime",
    provider: "xAI",
    overall: "80.4%",
    pillars: [{ label: "Reasoning", val: "76.6%" }, { label: "Voice Und.", val: "70.1%" }, { label: "Speech Und.", val: "98.1%" }],
    nat: "3.34 (5th)",
    rel: "100%",
    strengths: ["Perfect reliability", "Second-best reasoning (76.6%)", "Strong spatial performance"],
    weaknesses: ["Guessing on gender (50.5%)", "Lowest naturalness"],
    personality: "The speedster—reliable and capable but misses voice nuances.",
    radarData: [80, 77, 70, 98, 78, 100]
  },
  "hume": {
    id: "hume",
    name: "Hume EVI3",
    provider: "Hume AI",
    overall: "57.3%",
    pillars: [{ label: "Reasoning", val: "39.9%" }, { label: "Voice Und.", val: "52.6%" }, { label: "Speech Und.", val: "96.8%" }],
    nat: "3.59 (2nd)",
    rel: "96.7%",
    strengths: ["Best transcription (1.9% WER)", "Second-highest naturalness", "Empathetic generation"],
    weaknesses: ["Lowest reasoning", "Poor emotion detection", "Guessing on gender"],
    personality: "The empath—makes you feel heard but may not solve your problem.",
    radarData: [57, 40, 53, 97, 92, 97]
  },
  "ultravox": {
    id: "ultravox",
    name: "Ultravox",
    provider: "Fixie.ai",
    overall: "75.1%",
    pillars: [{ label: "Reasoning", val: "65.9%" }, { label: "Voice Und.", val: "70.9%" }, { label: "Speech Und.", val: "97.6%" }],
    nat: "3.30 (3rd)",
    rel: "100%",
    strengths: ["Open-weight (self-hostable)", "Perfect reliability", "Highest SQA (99.5%)"],
    weaknesses: ["Guessing on gender (48.1%)", "Lower overall accuracy"],
    personality: "The open alternative—freedom and transparency at the cost of polish.",
    radarData: [75, 66, 71, 98, 79, 100]
  }
};

const expandedContent: Record<string, { title: string, subtitle: string, context?: string, insight: string, details: string[], metric: string, table?: { headers: string[], rows: any[][] } }> = {
  "gap": {
    title: "Native IQ Parity",
    subtitle: "Gemini establishes the first instance of a native audio model matching its text-based counterpart in complex reasoning.",
    context: "Historically, moving from text to audio incurred a significant 'modality tax'—often as high as 26 IQ points—due to the degradation of information in traditional ASR pipelines.",
    insight: "Gemini's 'all-native' architecture preserves cognitive fidelity, proving that the reasoning gap was a symptom of modular pipelines, not a fundamental limit of audio modeling.",
    details: [
      "Gemini scores 91.2% on reasoning, nearly matching the 92% text baseline (-0.8 points).",
      "Formal Fallacies: Gemini 89.8% vs OpenAI 68.3% (+21.5 point gap).",
      "Spatial Navigation: Gemini 88.9% vs OpenAI 64.7% (+24.2 point gap)."
    ],
    metric: "91.2% IQ",
    table: {
      headers: ["Model", "Reasoning Avg", "Gap from Text (92%)"],
      rows: [
        ["Gemini", "91.2%", "-0.8 pts"],
        ["Grok", "76.6%", "-15.4 pts"],
        ["OpenAI", "68.4%", "-23.6 pts"],
        ["Ultravox", "65.9%", "-26.1 pts"],
        ["Hume", "39.9%", "-52.1 pts"]
      ]
    }
  },
  "cliff": {
    title: "The Identity Cliff",
    subtitle: "Three major models are effectively guessing.",
    insight: "If a model can't extract basic speaker attributes like pitch and timbre, it's missing the most salient audio features humans perceive.",
    details: [
      "Gender recognition is a binary task; random guessing yields 50%.",
      "Grok, Ultravox, and Hume hover between 46% and 50.5%.",
      "This suggests limited paralinguistic feature extraction in current architectures."
    ],
    metric: "50% Baseline",
    table: {
      headers: ["Model", "Gender Recognition", "vs. Random (50%)"],
      rows: [
        ["Gemini", "98.8%", "+48.8"],
        ["OpenAI", "90.1%", "+40.1"],
        ["Grok", "50.5%", "+0.5"],
        ["Ultravox", "48.1%", "-1.9"],
        ["Hume", "46.0%", "-4.0"]
      ]
    }
  },
  "asr": {
    title: "Unified Dialogue Efficiency",
    subtitle: "Native dialogue understanding now matches the precision of dedicated STT specialists.",
    insight: "Native audio-to-audio models provide a more efficient path to dialogue comprehension, capturing nuances that are often lost in traditional transcription-then-processing pipelines.",
    details: [
      "Hume's 1.9% WER is the best overall, beating all dedicated STT providers.",
      "Integrated ASR within STS models provides a competitive alternative to modular pipelines.",
      "Integrated solutions capture intent better than text-only representations."
    ],
    metric: "1.9% WER",
    table: {
      headers: ["Provider", "WER", "Type"],
      rows: [
        ["Hume EVI3", "1.9%", "Native STS"],
        ["OpenAI Realtime", "2.5%", "Native STS"],
        ["ElevenLabs", "3.1%", "Dedicated STT"],
        ["Deepgram", "4.5%", "Dedicated STT"]
      ]
    }
  },
  "saturation": {
    title: "Semantic Saturation",
    subtitle: "Basic comprehension is no longer a differentiator.",
    insight: "With all models achieving 95%+ accuracy on Spoken Question Answering (SQA), the ability to understand literal words is now a commodity.",
    details: [
      "All five models tested scored above 95% on SQA tasks.",
      "Ultravox led with 99.5% accuracy, followed closely by Grok (99.4%) and OpenAI (99.0%).",
      "The performance ceiling suggests that 'hearing' is solved; 'interpreting' is the new frontier."
    ],
    metric: "95%+ Baseline",
    table: {
      headers: ["Model", "SQA Accuracy", "Status"],
      rows: [
        ["Ultravox", "99.5%", "Saturated"],
        ["Grok", "99.4%", "Saturated"],
        ["OpenAI", "99.0%", "Saturated"],
        ["Gemini", "98.6%", "Saturated"],
        ["Hume", "95.4%", "Saturated"]
      ]
    }
  }
};

const getRadarOptions = (data: number[]) => ({
  backgroundColor: "transparent",
  radar: {
    indicator: [
      { name: 'Accuracy', max: 100 },
      { name: 'Reasoning', max: 100 },
      { name: 'Voice Und.', max: 100 },
      { name: 'Speech Und.', max: 100 },
      { name: 'Naturalness', max: 100 },
      { name: 'Reliability', max: 100 }
    ],
    shape: 'circle',
    splitNumber: 4,
    axisName: { color: THEME.textDim, fontSize: 9, fontWeight: '700' },
    splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } },
    splitArea: { show: false },
    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } }
  },
  series: [{
    type: 'radar',
    data: [{
      value: data,
      itemStyle: { color: THEME.primary },
      areaStyle: { color: 'rgba(37, 99, 235, 0.2)' },
      lineStyle: { width: 2, color: THEME.primary },
      symbol: 'none'
    }],
    animationDuration: 1000
  }]
});

const getModelRingOptions = (accuracyStr: string, isActive: boolean, isVisible: boolean) => {
  const accuracy = parseFloat(accuracyStr);
  return {
    backgroundColor: "transparent",
    series: [{ 
      type: 'gauge', 
      startAngle: 90, 
      endAngle: -270, 
      center: ["50%", "50%"], 
      radius: "100%",
      pointer: { show: false }, 
      progress: { show: true, roundCap: true, width: 3, itemStyle: { color: isActive ? THEME.primary : "rgba(255,255,255,0.05)" } }, 
      axisLine: { lineStyle: { width: 3, color: [[1, "rgba(255,255,255,0.03)"]] } }, 
      splitLine: { show: false }, 
      axisTick: { show: false }, 
      axisLabel: { show: false }, 
      data: isVisible ? [{ value: accuracy }] : [], 
      animationDuration: 1500,
      detail: { 
        formatter: (value: number) => `${Math.round(value)}%`,
        color: (isActive ? '#fff' : THEME.textDim) as string, 
        fontSize: 10, 
        fontWeight: '800' as const, 
        offsetCenter: [0, 0] 
      } 
    }]
  };
};

export default function Analysis() {
  const [selectedProfileId, setSelectedProfileId] = useState<string>("gemini");
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const modelSelectorRef = useRef(null);
  const isModelSelectorInView = useInView(modelSelectorRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, duration: 0.5 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-10 overflow-y-auto custom-scrollbar bg-transparent relative selection:bg-blue-600/30">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto w-full space-y-16 md:space-y-24 pb-24">
        
        {/* SECTION 1: THE THREE PILLARS */}
        <section className="space-y-6 md:space-y-8">
          <SectionHeader number="01" title="The Three Pillars" description="A conceptual framework for measuring the ceiling of Voice AI." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pillars.map(p => (
              <PillarCard key={p.id} pillar={p} />
            ))}
          </div>
        </section>

        {/* SECTION 2: THE FINDINGS */}
        <section className="space-y-12">
          <SectionHeader number="02" title="The Discovery Report" description="Claims backed by the evaluation of 13,205 production samples." />
          
          <div className="space-y-16">
            {findings.map(group => (
              <div key={group.id} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em]">{group.group}</h3>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.claims.map(claim => (
                    <ChartCard 
                      key={claim.id} 
                      title={claim.title} 
                      description={claim.implication} 
                      onExpand={claim.id === 'gap' || claim.id === 'cliff' || claim.id === 'asr' || claim.id === 'saturation' ? () => setSelectedClaimId(claim.id) : undefined}
                      highlight={claim.highlight}
                      inverted={claim.inverted}
                      className="h-[300px]"
                    >
                      <div className="flex flex-col items-center justify-center gap-4 text-center px-6">
                        <p className={`text-5xl font-bold tracking-tighter text-white`}>{claim.metric}</p>
                        <p className={`text-xs font-medium leading-relaxed ${claim.inverted ? 'text-white/60' : 'text-slate-400'}`}>{claim.text}</p>
                      </div>
                    </ChartCard>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: MODEL PROFILES */}
        <section className="space-y-6 md:space-y-8">
          <SectionHeader number="03" title="Model Deep-Dives" description="Individual profiles explaining who to choose and why." />
          
          <div ref={modelSelectorRef} className="grid grid-cols-3 sm:grid-cols-5 gap-2 md:gap-3">
             {Object.values(modelProfiles).map((model) => (
               <motion.button 
                 key={model.id} 
                 variants={itemVariants} 
                 onClick={() => setSelectedProfileId(model.id)} 
                 className={`bg-white/1 border border-white/5 rounded-xl p-3 md:p-4 flex flex-col items-center group transition-colors relative ${selectedProfileId === model.id ? 'bg-white/3' : 'hover:bg-white/2'}`}
               >
                  {selectedProfileId === model.id && (
                    <>
                      <motion.div layoutId="active-outline" className="absolute inset-0 border border-blue-600/50 rounded-xl z-20 pointer-events-none" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                      <motion.div layoutId="active-glow" className="absolute inset-0 bg-blue-600/10 blur-xl rounded-xl z-0 pointer-events-none" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                    </>
                  )}
                  <div className="h-10 w-10 md:h-14 md:w-14 mb-2 relative z-10">
                     <ReactECharts 
                       option={getModelRingOptions(model.overall, selectedProfileId === model.id, isModelSelectorInView)} 
                       style={{ height: "100%", width: "100%" }} 
                       theme="dark" 
                       notMerge={true} 
                     />
                  </div>
                  <p className="text-[7px] md:text-[8px] font-bold tracking-wider text-slate-500 uppercase mb-0.5 relative z-10">{model.provider}</p>
                  <h4 className="font-semibold text-[9px] md:text-[10px] tracking-tight relative z-10 text-white">{model.name}</h4>
               </motion.button>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-6">
            <div className="lg:col-span-12">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedProfileId} 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="bg-linear-to-br from-blue-950/20 via-[#050505] to-black border border-white/10 rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative overflow-hidden shadow-[0_0_50px_rgba(23,37,84,0.1)]"
                >
                  <div className="lg:col-span-7 space-y-8 relative z-10">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-blue-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-white tracking-tight">{modelProfiles[selectedProfileId]?.name}</h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-8 border-y border-white/5">
                      {modelProfiles[selectedProfileId]?.pillars.map(p => (
                        <div key={p.label} className="space-y-1">
                          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">{p.label}</p>
                          <p className="text-2xl font-bold text-white">{p.val}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                          <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Core Strengths</p>
                        </div>
                        <ul className="space-y-3">
                          {modelProfiles[selectedProfileId]?.strengths.map(s => (
                            <li key={s} className="text-xs text-slate-400 font-medium leading-relaxed flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-blue-500/50 mt-1.5 shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Ban className="w-3.5 h-3.5 text-slate-500" />
                          <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Limitations</p>
                        </div>
                        <ul className="space-y-3">
                          {modelProfiles[selectedProfileId]?.weaknesses.map(w => (
                            <li key={w} className="text-xs text-slate-400 font-medium leading-relaxed flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-slate-500/50 mt-1.5 shrink-0" />
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-8 relative z-10">
                    <div className="bg-white/1 border border-white/5 rounded-2xl p-6 w-full text-center backdrop-blur-md">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Overall Accuracy</p>
                      <p className="text-5xl font-bold text-white tracking-tighter">{modelProfiles[selectedProfileId]?.overall}</p>
                    </div>
                    <div className="w-full aspect-square md:h-[300px]">
                      <ReactECharts option={getRadarOptions(modelProfiles[selectedProfileId]?.radarData ?? [])} style={{ height: "100%", width: "100%" }} theme="dark" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-grid-white opacity-[0.005] pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* SECTION 4: THE VERDICT */}
        <section className="space-y-12">
          <SectionHeader number="04" title="The Verdict" description="What these results mean for researchers, developers, and builders." />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 bg-white/1 border border-white/5 rounded-2xl p-8 space-y-8 group hover:bg-white/2 transition-colors h-full">
              <h4 className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Decision Matrix</h4>
              <div className="space-y-4">
                <MatrixRow label="Highest Accuracy" value="Gemini" reason="91.2% reasoning IQ." />
                <MatrixRow label="Perfect Reliability" value="Ultravox / Grok" reason="100% success rate." />
                <MatrixRow label="Best Transcription" value="Hume" reason="1.9% WER record." />
                <MatrixRow label="Emotion Awareness" value="OpenAI" reason="97.5% detection peak." />
              </div>
            </div>
            
            <div className="md:col-span-7 min-h-[300px] md:h-full">
               <ChartCard 
                 title="The Conclusion" 
                 description="Final Synthesis" 
                 className="h-full" 
                 inverted
               >
                 <div className="flex flex-col items-center justify-center text-center space-y-3 px-2">
                    <p className="text-white font-bold text-lg md:text-2xl leading-tight tracking-tight">The Era of Native Audio Intelligence</p>
                    <p className="text-white/60 text-[11px] md:text-sm leading-relaxed font-medium max-w-lg">
                      Harmoniq establishes that we have entered a new epoch of AI: one where audio is a primary, high-IQ modality. The benchmark reveals that native audio models now rival text-level reasoning and specialist transcription, while beginning to decode the complex paralinguistic signals of human interaction. The future of AI lies in this unified architecture where comprehension, reasoning, and emotional intelligence converge.
                    </p>
                 </div>
               </ChartCard>
            </div>
          </div>
        </section>

      </motion.div>

      {/* CLAIM OVERLAY */}
      <AnimatePresence>
        {selectedClaimId && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-start pt-36 md:pt-40 pb-20 overflow-y-auto custom-scrollbar"
          >
            <div className="w-full max-w-5xl px-6 md:px-10 space-y-12">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-white/5 pb-10">
                <div className="space-y-2">
                  <h3 className="text-blue-600 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">Intelligence Report</h3>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">{expandedContent[selectedClaimId]?.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedClaimId(null)} 
                  className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all shrink-0 ml-4 group"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-white" />
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                <div className="lg:col-span-7 space-y-12">
                  <p className="text-xl md:text-2xl text-slate-300 font-bold leading-relaxed">{expandedContent[selectedClaimId]?.subtitle}</p>
                  
                  <div className="space-y-8">
                    <div className="bg-white/1 border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
                      <p className="text-white font-bold mb-3 uppercase tracking-[0.2em] text-[10px]">Primary Insight</p>
                      <p className="text-slate-200 text-base md:text-lg leading-relaxed font-medium">{expandedContent[selectedClaimId]?.insight}</p>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-white font-bold text-[10px] uppercase tracking-widest flex items-center gap-3">
                        <div className="w-8 h-px bg-white/10" />
                        Key Discoveries
                      </h4>
                      <div className="space-y-6">
                        {expandedContent[selectedClaimId]?.details.map((detail, idx) => (
                          <div key={idx} className="flex gap-6 group">
                            <span className="text-blue-600 font-mono font-bold text-2xl leading-none">0{idx + 1}</span>
                            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium group-hover:text-slate-200 transition-colors">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {expandedContent[selectedClaimId]?.context && (
                    <div className="bg-white/1 border border-white/5 p-6 rounded-2xl">
                       <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-2">Historical Context</p>
                       <p className="text-slate-400 text-xs leading-relaxed italic font-medium">
                        "{expandedContent[selectedClaimId]?.context}"
                       </p>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5 space-y-8">
                <div className="bg-linear-to-br from-blue-950/20 via-[#050505] to-black border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center space-y-4 shadow-2xl relative overflow-hidden">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Aggregate Metric</p>
                  <p className="text-6xl md:text-7xl font-bold text-white tracking-tighter">{expandedContent[selectedClaimId]?.metric}</p>
                  <div className="pt-4">
                    <span className="px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-500 text-[9px] font-bold uppercase tracking-widest">Benchmark Confirmed</span>
                  </div>
                  <div className="absolute inset-0 bg-grid-white opacity-[0.005] pointer-events-none" />
                </div>

                  {expandedContent[selectedClaimId]?.table && (
                    <div className="bg-white/1 border border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-white/5">
                            {expandedContent[selectedClaimId]?.table?.headers.map(h => (
                              <th key={h} className="p-4 text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {expandedContent[selectedClaimId]?.table?.rows.map((row, i) => (
                            <tr key={i} className="border-t border-white/5 hover:bg-white/2 transition-colors">
                              {row.map((cell, j) => (
                                <td key={j} className={`p-4 text-xs md:text-sm font-medium ${j === 0 ? 'text-white' : 'text-slate-400'} ${cell.toString().includes('+') || cell.toString().includes('-0.8') ? 'text-blue-400' : ''}`}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS (Exact Copy from Results.tsx patterns) ---

function MiniStat({ icon: Icon, label, value, detail, className }: any) {
  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div variants={itemVariants} className={`bg-white/1 border border-white/5 rounded-2xl p-8 flex flex-col justify-center group hover:bg-white/2 transition-colors relative overflow-hidden h-full ${className}`}>
       <div className={`w-8 h-8 md:w-10 md:h-10 bg-blue-900/10 rounded-xl flex items-center justify-center mb-3 md:mb-4 border border-blue-900/20`}>
          <Icon className={`w-4 h-4 md:w-5 md:h-5 text-blue-600`} />
       </div>
       <p className="text-[8px] md:text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-1 md:mb-1.5">{label}</p>
       <div className="flex items-baseline gap-2">
          <p className="text-xl md:text-2xl font-bold tracking-tight text-white">{value}</p>
          <p className="text-[8px] md:text-[9px] font-bold text-slate-600 uppercase">{detail}</p>
       </div>
    </motion.div>
  );
}

function PillarCard({ pillar }: { pillar: any }) {
  const Icon = pillar.icon;
  return (
    <div className="bg-white/1 border border-white/5 rounded-2xl p-8 flex flex-col h-full group hover:bg-white/2 transition-colors relative overflow-hidden">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-900/10 rounded-xl flex items-center justify-center mb-6 border border-blue-900/20 group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
      </div>
      <div className="space-y-2 mb-6">
        <h4 className="text-2xl font-bold text-white tracking-tight">{pillar.title}</h4>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] leading-none">{pillar.tagline}</p>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed mb-8 grow font-medium">{pillar.desc}</p>
      
      <div className="mt-auto p-4 rounded-xl bg-blue-600/5 border border-blue-500/10 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-3 h-3 text-blue-500" />
          <p className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[9px]">{pillar.status}</p>
        </div>
        <p className="text-slate-300 text-[11px] font-medium leading-relaxed italic">"{pillar.statusDesc}"</p>
      </div>
    </div>
  );
}

function SectionHeader({ number, title, description }: any) {
  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };
  return (
    <motion.div variants={itemVariants} className="flex flex-col gap-2 border-b border-white/5 pb-4 md:pb-6 w-full">
      <div className="flex items-center gap-3">
        <span className="text-blue-600 font-mono text-[10px] md:text-xs font-bold">[{number}]</span>
        <h2 className="text-lg md:text-xl font-bold tracking-tight uppercase text-white">{title}</h2>
      </div>
      <p className="text-slate-500 font-medium text-[10px] md:text-[11px] max-w-xl">{description}</p>
    </motion.div>
  );
}

function ChartCard({ title, className, description, onExpand, highlight, children, inverted }: any) {
  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };
  return (
    <motion.div variants={itemVariants} className={`relative border rounded-2xl overflow-hidden group transition-colors flex flex-col items-center justify-center ${className} 
        ${inverted 
          ? 'bg-linear-to-br from-blue-950 via-[#050505] to-black border-white/10 shadow-[0_0_50px_rgba(23,37,84,0.2)]' 
          : 'bg-white/1 border-white/5 hover:border-white/8'
        } ${highlight && !inverted ? 'bg-white/2 border-white/8' : ''}`}>
      <div className="absolute top-6 md:top-8 left-6 md:left-8 right-6 md:right-8 flex justify-between items-start z-20 pointer-events-none">
        <div className="space-y-1 pointer-events-auto flex-1 mr-4">
          <h3 className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] ${inverted ? 'text-white/60' : 'text-slate-500'}`}>{title}</h3>
          {description && <p className={`text-[8px] md:text-[9px] font-semibold uppercase tracking-tight line-clamp-2 ${inverted ? 'text-white/40' : 'text-slate-600'}`}>{description}</p>}
        </div>
        {onExpand && (
          <button onClick={onExpand} className={`w-7 h-7 md:w-8 md:h-8 border rounded-lg flex items-center justify-center hover:scale-105 transition-all pointer-events-auto shadow-xl backdrop-blur-md shrink-0 
              ${inverted ? 'bg-white/10 border-white/20' : 'bg-white/3 border-white/10 hover:bg-white/10'}`}>
            <Maximize2 className={`w-3.5 h-3.5 transition-colors ${inverted ? 'text-white/60 group-hover:text-white' : 'text-slate-500 group-hover:text-white'}`} />
          </button>
        )}
      </div>
      
      {/* Content Container - Truly centered using Flexbox */}
      <div className="w-full h-full flex items-center justify-center p-4 md:p-8 pt-10 md:pt-12 relative z-10 overflow-visible">
        <div className="w-full h-full flex items-center justify-center">
            {children}
        </div>
      </div>

      <div className="absolute inset-0 bg-grid-white opacity-[0.005] pointer-events-none" />
    </motion.div>
  );
}

function MatrixRow({ label, value, reason }: any) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-3">
      <div>
        <p className="text-[8px] font-bold text-blue-500 uppercase tracking-[0.2em]">{label}</p>
        <p className="text-white font-bold text-base tracking-tight">{value}</p>
      </div>
      <p className="text-[10px] text-slate-500 font-medium italic">"{reason}"</p>
    </div>
  );
}
