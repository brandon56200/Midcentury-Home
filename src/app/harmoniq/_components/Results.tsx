"use client";

import React from "react";
import { motion } from "framer-motion";
import { HARMONIQ_DATA } from "../data";
import { 
  Target, 
  Brain, 
  Heart,
  Zap, 
  Award, 
  Activity,
  Layers,
  ShieldCheck,
  TrendingUp,
  Headphones,
  Waves,
  Ear,
  CheckCircle2,
  ArrowRight,
  Shield,
  Search,
  Users,
  ChevronDown,
  Database,
  Globe
} from "lucide-react";

import ProfessionalArticleSection from "./ProfessionalArticleSection";
import ProfessionalStatCard from "./ProfessionalStatCard";
import ProfessionalBarChart from "./charts/ProfessionalBarChart";
import ProfessionalHeatmap from "./charts/ProfessionalHeatmap";
import ProfessionalRadarChart from "./charts/ProfessionalRadarChart";
import ProfessionalSpotlightRadar from "./charts/ProfessionalSpotlightRadar";
import ProfessionalScatterPlot from "./charts/ProfessionalScatterPlot";
import ModelBreakdown from "./ModelBreakdown";
import BrandIcon from "./BrandIcon";

interface ResultsProps {
  onNavigate?: (stageId: string) => void;
}

export default function Results({ onNavigate }: ResultsProps) {
  const { rankings, accuracyByTask, models, tasks, asrWer, sttProviders } = HARMONIQ_DATA;
  const [hoveredRadarIdx, setHoveredRadarIdx] = React.useState<number | null>(null);
  const [modularViewMode, setModularViewMode] = React.useState<'sort' | 'group'>('sort');
  const [showGaps, setShowGaps] = React.useState(false);

  const palette = {
    cyan: "#06b6d4",
    blue: "#3b82f6",
    indigo: "#6366f1",
    violet: "#8b5cf6",
    purple: "#a855f7",
  };

  const centerpiecePalette = [
    palette.cyan,
    palette.blue,
    palette.indigo,
    palette.violet,
    palette.purple,
  ];

  // Helper: Calculation for pillars
  const calculatePillarScores = (modelId: string) => {
    const scores = accuracyByTask[modelId] || {};
    return {
      speechUnd: ((scores.sqa || 0) + (scores.asr || 0)) / 2,
      voiceUnd: ((scores.er || 0) + (scores.gr || 0)) / 2,
      speechReasoning: ((scores.ff || 0) + (scores.na || 0) + (scores.oc || 0) + (scores.wol || 0)) / 4,
    };
  };

  // 1. Executive Leaderboard Data
  const executiveData = rankings.map((r, idx) => {
    const model = models.find(m => m.id === r.modelId);
    return {
      id: r.modelId,
      name: model?.fullName ?? "Unknown",
      value: r.accuracy,
      brandId: r.modelId,
      color: centerpiecePalette[idx % centerpiecePalette.length],
      secondaryValue: model?.provider ?? "Unknown"
    };
  });

  // 2. Radar Data (Multi-model, 3 axes)
  const radarDatasets = models.map(m => {
    const pillars = calculatePillarScores(m.id);
    return {
      name: m.shortName,
      color: m.color || palette.blue,
      data: [
        { name: "Speech Understanding", value: pillars.speechUnd },
        { name: "Voice Understanding", value: pillars.voiceUnd },
        { name: "Speech Reasoning", value: pillars.speechReasoning },
      ]
    };
  });

  // 3. Insight 1: Reasoning Gap Data
  const reasoningGapData = models.map(m => ({
    id: m.id,
    name: m.shortName,
    value: calculatePillarScores(m.id).speechReasoning,
    brandId: m.id,
    color: palette.blue
  }));

  // 4. Insight 2: Gender Recognition Data
  const genderRecognitionData = models.map(m => ({
    id: m.id,
    name: m.shortName,
    value: accuracyByTask[m.id]?.gr || 0,
    brandId: m.id,
    color: palette.indigo
  }));

  // 5. Insight 3: Scatter Data
  const scatterData = rankings.map(r => {
    const m = models.find(mod => mod.id === r.modelId)!;
    return {
      id: r.modelId,
      name: m.shortName,
      x: r.accuracy,
      y: r.naturalness,
      color: m.color || palette.blue,
      brandId: r.modelId
    };
  });

  // 6. Insight 4: ASR WER Data (split)
  const baseAsrData = [
    ...models.map(m => ({
      id: m.id,
      name: m.shortName as string,
      value: asrWer[m.id] || 0,
      brandId: m.id,
      color: palette.blue,
      type: 'sts'
    })),
    ...sttProviders.map(p => ({
      id: p.id,
      name: p.name as string,
      value: p.wer,
      brandId: p.id,
      color: palette.indigo,
      type: 'dedicated'
    }))
  ];

  const asrWerChartData = modularViewMode === 'sort' 
    ? [...baseAsrData].sort((a, b) => a.value - b.value)
    : [...baseAsrData].sort((a, b) => {
        if (a.type === b.type) return a.value - b.value;
        return a.type === 'sts' ? -1 : 1;
      });

  // 7. Naturalness Benchmarking Data
  const baseNaturalnessData = [
    ...rankings.map(r => {
      const m = models.find(mod => mod.id === r.modelId)!;
      return {
        id: r.modelId,
        name: m.shortName as string,
        value: r.naturalness,
        brandId: r.modelId,
        color: palette.blue,
        type: 'sts'
      };
    }),
    { id: 'elevenlabs', name: 'ElevenLabs', value: 4.06, brandId: 'elevenlabs', color: palette.indigo, type: 'tts' },
    { id: 'cartesia', name: 'Cartesia Sonic', value: 3.89, brandId: 'cartesia', color: palette.indigo, type: 'tts' },
    { id: 'openai-tts', name: 'OpenAI TTS', value: 3.35, brandId: 'openai', color: palette.indigo, type: 'tts' },
    { id: 'deepgram-tts', name: 'Deepgram TTS', value: 3.3, brandId: 'deepgram', color: palette.indigo, type: 'tts' }
  ];

  const naturalnessData = modularViewMode === 'sort'
    ? [...baseNaturalnessData].sort((a, b) => b.value - a.value)
    : [...baseNaturalnessData].sort((a, b) => {
        if (a.type === b.type) return b.value - a.value;
        return a.type === 'sts' ? -1 : 1;
      });

  return (
    <div className="flex-1 flex flex-col bg-transparent selection:bg-blue-600/10">
      <div className="pb-32 space-y-0">
        
        {/* BLOCK 1: THE NARRATIVE & PROBLEM STATEMENT */}
        <section className="relative pt-32 pb-48 px-6 overflow-hidden min-h-[800px] flex flex-col justify-center bg-[#fcfcfc]">
           {/* Refined Technical Spotlight Grid */}
           <div className="absolute inset-0 pointer-events-none select-none">
              <div 
                className="absolute inset-0" 
                style={{ 
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)`,
                  backgroundSize: '50px 50px',
                  maskImage: 'radial-gradient(circle at 50% 50%, white 0%, transparent 70%)',
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, white 0%, transparent 70%)'
                }} 
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-blue-50/40 blur-[120px] rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl aspect-square bg-slate-50/30 blur-[160px] rounded-full" />
              <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-white" />
              <div className="absolute inset-0 bg-linear-to-r from-white via-transparent to-white" />
           </div>

           <div className="max-w-5xl mx-auto relative z-10 space-y-24">
             <div className="space-y-12 text-center">
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.7, ease: "easeOut" }}
                   className="space-y-12"
                 >
                   <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9] max-w-4xl mx-auto">
                      The Full-Suite <br />
                      Speech-to-Speech Benchmark<span className="text-blue-600"> .</span>
                   </h1>

                   <div className="max-w-3xl mx-auto">
                      <p className="text-xl md:text-3xl text-slate-900 font-semibold tracking-tight leading-tight">
                       Assessing how STS models perform across a complete capability suite: reasoning, speech, paralinguistic perception, and response naturalness. Evaluated end-to-end with human speech, multi-model LLM consensus, and 13,000+ samples.
                      </p>
                   </div>
                </motion.div>
               </div>

              {/* Problem Statement Section - High-Efficiency Technical Grid */}
              <section className="py-20 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                  <div className="max-w-4xl space-y-4">
                    <div className="flex items-center gap-3">
                       <span className="w-8 h-px bg-blue-600" />
                       <h3 className="text-blue-600 font-mono text-[10px] font-black uppercase tracking-[0.4em]">3-Pronged Problem Statement</h3>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.95]">
                       Benchmarks Miss Critical Failures <br />
                       That Emerge in Real Interaction
                    </h2>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-4xl overflow-hidden shadow-sm">
                    {/* Layer 1: Topic Sentences (Always Visible) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 border-b border-slate-100">
                      {[
                        { 
                          id: "01", 
                          title: "Fragmented Evaluation", 
                          topic: "Current benchmarks evaluate capabilities in isolation, missing failures that emerge at the intersection of reasoning, perception, and generation.", 
                          icon: Layers, 
                          color: "blue" 
                        },
                        { 
                          id: "02", 
                          title: "Generic Data", 
                          topic: "Repurposed datasets and synthetic audio lack the controlled ground truth necessary for rigorous paralinguistic evaluation.", 
                          icon: Database, 
                          color: "indigo" 
                        },
                        { 
                          id: "03", 
                          title: "Lab vs. Production", 
                          topic: "Evaluating research prototypes with text-based shortcuts produces results that don't transfer to real user conditions.", 
                          icon: Globe, 
                          color: "cyan" 
                        }
                      ].map((prong) => (
                        <div key={prong.id} className="p-8 md:p-10 space-y-6 hover:bg-slate-50/50 transition-colors duration-300 group">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-${prong.color}-50 border border-${prong.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <prong.icon className={`w-5 h-5 text-${prong.color}-600`} />
                            </div>
                            <p className={`text-[10px] font-mono font-black text-${prong.color}-600 uppercase tracking-widest`}>Prong {prong.id}</p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-tight">{prong.title}</h4>
                            <p className="text-slate-900 text-base font-bold tracking-tight leading-snug">{prong.topic}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Layer 2: The Problem (Expanded) */}
                    <motion.div 
                      initial={false}
                      animate={{ height: showGaps ? "auto" : 0, opacity: showGaps ? 1 : 0 }}
                      className="overflow-hidden bg-slate-50/30"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 border-b border-slate-100">
                        {[
                          { 
                            id: "01", 
                            color: "slate", 
                            label: "The Problem",
                            text: "Some benchmarks measure reasoning accuracy. Others measure paralinguistic perception. Few measure output naturalness. When these dimensions are tested separately, models that excel on individual metrics can still fail due to the subtle breakdowns that occur at the seams between capabilities, not within them. A fragmented evalutation is unable to fully capture the abilities and inabilities of a model." 
                          },
                          { 
                            id: "02", 
                            color: "slate", 
                            label: "The Problem",
                            text: "Exisitng audio benchmarks usually repurpose existing speech corpora or leverage synthetic audio generation. Neither approach provides verified ground truth for paralinguistic attributes. When the \"correct\" emotion or speaker characteristic is inferred rather than recorded, measurement error propagates into the final scores—inflating or deflating accuracy in ways that don't reflect true model capability." 
                          },
                          { 
                            id: "03", 
                            color: "slate", 
                            label: "The Problem",
                            text: "The most ciritical goal of every benchmark should be to simulate as close to reality as possible. Current benchmarks test models that aren't publicly available, or take shortcuts via text input/output to avoid web-socket and audio generation constraints. When evaluation bypasses the actual production interface, the resulting scores often describe a different system than the one users will experience." 
                          }
                        ].map((item) => (
                          <div key={item.id} className="p-8 md:p-10 space-y-4">
                            <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.2em]">{item.label}</p>
                            <p className="text-[13px] text-slate-500 font-bold leading-relaxed">{item.text}</p>
                          </div>
                        ))}
                      </div>

                      {/* Layer 3: Our Approach (Expanded) */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                        {[
                          { 
                            id: "01", 
                            color: "blue", 
                            label: "Our Approach",
                            text: "Evaluating reasoning, voice understanding, and naturalness within a single framework makes interaction effects measurable. When a model's reasoning degrades under emotional speech, or when accurate responses sound robotic, these failures surface in the results rather than hiding in the gaps between separate benchmarks." 
                          },
                          { 
                            id: "02", 
                            color: "indigo", 
                            label: "Our Approach",
                            text: "Professional voice actors recorded each emotion and speaker-attribute sample following controlled prompts, creating verified ground truth for every test case. This eliminates label ambiguity: when a model misidentifies an emotion, the error reflects the model's perception, not uncertainty in the data." 
                          },
                          { 
                            id: "03", 
                            color: "cyan", 
                            label: "Our Approach",
                            text: "Testing only production APIs through their real-time audio interfaces means the benchmark measures results that can be seen and verified by users in the real world. Models that score well have demonstrated that performance under the same conditions end users will encounter—latency, voice synthesis, and all." 
                          }
                        ].map((item) => (
                          <div key={item.id} className="p-8 md:p-10 space-y-4">
                            <p className={`text-[10px] font-mono font-black text-${item.color}-600 uppercase tracking-[0.2em]`}>{item.label}</p>
                            <p className="text-[13px] text-slate-500 font-bold leading-relaxed">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Single Toggle Button */}
                    <button 
                      onClick={() => setShowGaps(!showGaps)}
                      className="w-full bg-slate-50/50 border-t border-slate-100 p-6 flex items-center justify-between group hover:bg-slate-100/80 transition-all"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${showGaps ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border border-slate-200 text-blue-600'}`}>
                           <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-widest leading-none mb-1">Technical Audit</p>
                          <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Deep Dive & Methodology</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{showGaps ? 'Hide Details' : 'Show Details'}</span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-500 ${showGaps ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                  </div>
                </div>
              </section>

              {/* Transition to Pillars */}
              <div className="pt-32 space-y-20">
                 <div className="text-center space-y-8">
                    <div className="flex items-center justify-center gap-6">
                       <span className="font-mono text-sm md:text-base font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                         METHODOLOGY
                       </span>
                       <h3 className="text-[11px] md:text-xs font-mono font-black text-slate-400 uppercase tracking-[0.5em]">Evaluation Taxonomy</h3>
                    </div>
                    <p className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">Core Pillars</p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { 
                        title: "Speech Understanding", 
                        subtitle: "Can it comprehend what was said?", 
                        tags: "SQA · ASR", 
                        icon: Ear,
                        color: "blue" 
                      },
                      { 
                        title: "Voice Understanding", 
                        subtitle: "Can it perceive WHO and HOW?", 
                        tags: "ER · GR", 
                        icon: Heart,
                        color: "indigo" 
                      },
                      { 
                        title: "Speech Reasoning", 
                        subtitle: "Can it THINK about what it heard?", 
                        tags: "FF · Na · OC · WoL", 
                        icon: Brain,
                        color: "cyan" 
                      }
                    ].map((p) => (
                      <div key={p.title} className="bg-white border border-slate-100 p-8 md:p-10 rounded-4xl space-y-8 hover:bg-slate-50/50 transition-all duration-300 group shadow-sm hover:shadow-md relative overflow-hidden flex flex-col h-full">
                         <div className={`w-14 h-14 rounded-2xl bg-${p.color}-50 border border-${p.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                            <p.icon className={`w-7 h-7 text-${p.color}-600`} />
                         </div>
                         <div className="space-y-3">
                            <h4 className="text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">{p.title}</h4>
                            <p className={`text-${p.color}-600 text-xs font-bold uppercase tracking-widest leading-snug`}>{p.subtitle}</p>
                         </div>
                         <div className="pt-6 border-t border-slate-100 mt-auto">
                            <p className="text-sm font-mono font-black text-slate-400 uppercase tracking-[0.3em]">{p.tags}</p>
                         </div>
                      </div>
                    ))}
            </div>
              </div>
          </div>
        </section>


        {/* BLOCK 3: THE RANKINGS */}
        <ProfessionalArticleSection
          number="01"
          subtitle="Leaderboard"
          title="Native Models Closing the Modality Gap"
          description="The transition to native speech-to-speech architectures has historically incurred a 'modality tax'—a measurable drop in reasoning capability when processing audio. Our benchmark confirms this gap is finally closing, with Gemini Live demonstrating cognitive parity between text and audio. However, a persistent tension remains between human-like naturalness and logical depth as the industry navigates the trade-off between delivery and structural reasoning."
          stacked={true}
        >
          <div className="space-y-20">
             <div className="bg-white border border-slate-200 px-8 md:px-14 pt-4 md:pt-6 pb-7 md:pb-8 rounded-2xl shadow-sm relative overflow-hidden">
               <div className="pt-4">
                 <ProfessionalBarChart
                   data={executiveData}
                   unit="%"
                   isCenterpiece={true}
                 />
               </div>
               <div className="absolute inset-0 bg-linear-to-br from-blue-50/5 via-transparent to-indigo-50/5 pointer-events-none" />
             </div>

             {/* Rankings Table */}
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                   <thead>
                      <tr className="border-b border-slate-300">
                         <th className="py-4 px-6 text-xs font-mono font-black text-slate-500 uppercase tracking-widest">Rank</th>
                         <th className="py-4 px-6 text-xs font-mono font-black text-slate-500 uppercase tracking-widest">Model</th>
                         <th className="py-4 px-6 text-xs font-mono font-black text-slate-500 uppercase tracking-widest">Accuracy</th>
                         <th className="py-4 px-6 text-xs font-mono font-black text-slate-500 uppercase tracking-widest">Naturalness</th>
                         <th className="py-4 px-6 text-xs font-mono font-black text-slate-500 uppercase tracking-widest">Reliability</th>
                      </tr>
                   </thead>
                   <tbody>
                      {rankings.map((r, i) => {
                        const model = models.find(m => m.id === r.modelId);
                        return (
                          <tr key={r.modelId} className="border-b border-slate-200 group hover:bg-slate-50 transition-colors">
                             <td className="py-6 px-6">
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${i === 0 ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                                   {r.rank}
                                </span>
                             </td>
                             <td className="py-6 px-6">
                                <div className="flex items-center gap-3">
                                   <BrandIcon brandId={r.modelId} size={18} className="text-slate-900" />
                                   <div className="flex flex-col">
                                      <span className="font-black text-slate-900 uppercase tracking-tight text-base leading-none mb-1">{model?.fullName ?? "Unknown"}</span>
                                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{model?.provider ?? "Unknown"}</span>
                                   </div>
                                </div>
                             </td>
                             <td className="py-6 px-6 font-mono font-black text-slate-900 text-xl">{r.accuracy}%</td>
                             <td className="py-6 px-6 font-mono font-bold text-slate-500 text-base">{r.naturalness} MOS</td>
                             <td className="py-6 px-6 font-mono font-bold text-slate-500 text-base">{r.reliability}%</td>
                          </tr>
                        );
                      })}
                   </tbody>
                </table>
             </div>
          </div>
        </ProfessionalArticleSection>

        {/* BLOCK 4: PERFORMANCE ACROSS PILLARS */}
        <ProfessionalArticleSection
          number="02"
          subtitle="Pillar Breakdown"
          title="Architectural Divide in Voice and Logic"
          description="While basic speech-to-text transcription and question answering have become an industry commodity, the true architectural divide in native voice AI is found in the 'Frontier Pillars': Voice Understanding and Speech Reasoning. The ability to perceive human paralinguistics and think natively in audio—without the crutch of text-only logic—remains the primary differentiator between models that merely transcribe and those that truly comprehend."
          stacked={true}
        >
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm relative">
             <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left Side: Title & Selector */}
                <div className="lg:col-span-5 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl">
                   <div className="space-y-8">
                      <div className="space-y-2">
                         <h4 className="text-xl font-mono font-black text-slate-900 uppercase tracking-widest leading-tight">Multi-Model Capability Map</h4>
                         <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Normalizing performance across the three pillars</p>
                      </div>

                      <div className="space-y-3">
                         <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Select Model Focus</h5>
                         <div className="grid grid-cols-1 gap-2.5">
                            {radarDatasets.map((ds, idx) => (
                               <motion.div 
                                  key={ds.name}
                                  onMouseEnter={() => setHoveredRadarIdx(idx)}
                                  onMouseLeave={() => setHoveredRadarIdx(null)}
                                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${
                                     hoveredRadarIdx === idx 
                                     ? 'bg-slate-50 border-slate-200 shadow-sm translate-x-1' 
                                     : 'bg-white border-slate-100 hover:bg-slate-50'
                                  }`}
                               >
                                  <div className="flex items-center gap-4">
                                     <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${hoveredRadarIdx === idx ? 'scale-125 shadow-sm' : ''}`} style={{ backgroundColor: ds.color }} />
                                     <span className={`text-[11px] font-mono font-black uppercase tracking-widest transition-colors ${hoveredRadarIdx === idx ? 'text-slate-900' : 'text-slate-400'}`}>
                                        {ds.name}
                                     </span>
                                  </div>
                                  <ArrowRight className={`w-3.5 h-3.5 transition-all duration-300 ${hoveredRadarIdx === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                               </motion.div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>

                {/* Right Side: Chart */}
                <div className="lg:col-span-7 p-6 md:p-12 flex flex-col items-center justify-center bg-white rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl relative min-h-[500px]">
                   <ProfessionalRadarChart
                     datasets={radarDatasets}
                     size={480}
                     hoveredIndex={hoveredRadarIdx}
                     onHoverChange={setHoveredRadarIdx}
                   />
                </div>
             </div>
          </div>
        </ProfessionalArticleSection>


        {/* BLOCK 5: THE FULL PICTURE (HEATMAP) */}
        <ProfessionalArticleSection
          number="03"
          subtitle="Task Granularity"
          title="Analysis Reveals Logic Performance Bottlenecks"
          description="Decomposing models into specific sub-tasks reveals that low-performing models struggle significantly with paralinguistic identity and complex logic traps like 'Web of Lies'."
          stacked={true}
        >
          <div className="bg-white border border-slate-200 p-4 md:p-12 rounded-2xl shadow-sm relative">
            <ProfessionalHeatmap
              models={models.map(m => ({ id: m.id, name: m.shortName, brandId: m.id }))}
              tasks={tasks}
              data={accuracyByTask}
              color={palette.blue}
            />
            
            {/* Legend Footer */}
            <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {tasks.map(t => (
                 <div key={t.id} className="flex items-start gap-3">
                    <span className="font-mono font-black text-blue-600 text-xs mt-0.5">{t.abbreviation}</span>
                    <span className="text-xs text-slate-500 font-bold leading-tight">{t.name}</span>
                 </div>
               ))}
            </div>
          </div>
        </ProfessionalArticleSection>

        {/* BLOCK 6: KEY INSIGHTS */}
        <ProfessionalArticleSection
          number="04"
          subtitle="Capability Gaps"
          title="Native Reasoning and Perception are Solvable"
          description="Our benchmark proves that the historical gap in reasoning and perceptual depth is technically solvable. However, while frontier models have begun to bridge this divide, the majority of the market continues to struggle with audio-native logic and paralinguistic awareness, often trailing the benchmark lead by significant margins."
          stacked={true}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             
             {/* Insight 1: Reasoning Gap */}
             <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-2xl space-y-8 flex flex-col shadow-sm">
                <div className="space-y-4">
                   <h4 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">The Reasoning Frontier</h4>
                   <p className="text-slate-500 text-base leading-relaxed font-bold">
                      While most models incur a massive 'modality tax' when processing audio, the lead model proves that native speech-to-speech architectures can maintain full cognitive parity with text.
                   </p>
                </div>
                
                <div className="flex-1 min-h-[300px] flex flex-col justify-center">
                   <ProfessionalBarChart 
                     data={reasoningGapData} 
                     unit="%" 
                     maxValue={100}
                     referenceLine={{ value: 66, label: "Market Baseline", color: "#94a3b8" }}
                   />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                   <div>
                      <p className="text-3xl font-black text-slate-900">91.2%</p>
                      <p className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest mt-1">Frontier Peak</p>
                   </div>
                   <div>
                      <p className="text-3xl font-black text-slate-400">66%</p>
                      <p className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest mt-1">Market Avg</p>
                   </div>
                </div>
             </div>

             {/* Insight 2: Voice Understanding */}
             <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-2xl space-y-8 flex flex-col shadow-sm">
                <div className="space-y-4">
                   <h4 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">The Perception Barrier</h4>
                   <p className="text-slate-500 text-base leading-relaxed font-bold">
                      Paralinguistic awareness remains the ultimate differentiator. Outside of the top performers, models fail to perceive basic speaker attributes better than random chance.
                   </p>
                </div>

                <div className="flex-1 min-h-[300px] flex flex-col justify-center">
                   <ProfessionalBarChart 
                     data={genderRecognitionData} 
                     unit="%" 
                     maxValue={100}
                     referenceLine={{ value: 50, label: "Random Chance", color: "#94a3b8" }}
                   />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                   <div>
                      <p className="text-3xl font-black text-slate-900">98.8%</p>
                      <p className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest mt-1">Peak Perception</p>
                   </div>
                   <div>
                      <p className="text-3xl font-black text-slate-400">50%</p>
                      <p className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest mt-1">Blind Guessing</p>
                   </div>
                </div>
             </div>
          </div>
        </ProfessionalArticleSection>


        {/* BLOCK 7: MODULAR COMPARISONS */}
        <ProfessionalArticleSection
          number="05"
          subtitle="Architecture Comparison"
          title="Native STS Rivals Dedicated Layers"
          description="A critical audit comparing native speech-to-speech models against dedicated modular specialists. The data reveals that while STS has successfully matched dedicated STT layers in functional transcription, a significant gap remains in the race to achieve the aesthetic perfection of elite TTS providers and beat the Uncanny Valley."
          stacked={true}
        >
          <div className="space-y-12">
             {/* 1. ASR WER: Functional Parity */}
             <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                   <div className="lg:col-span-4 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-center space-y-10">
                      <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            <Search className="w-5 h-5 text-blue-600" />
                            <h4 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">Functional Parity</h4>
                         </div>
                         <p className="text-slate-500 text-base leading-relaxed font-bold">
                            Integrated neural bundles now achieve Word Error Rates that rival or beat enterprise STT specialists, rendering modular transcription layers obsolete.
                         </p>
                  </div>

                      <div className="space-y-6 pt-6 border-t border-slate-100">
                         {/* View Controls */}
                         <div className="space-y-3">
                            <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.2em]">View Controls</p>
                            <div className="flex flex-wrap gap-2">
                               {[
                                 { id: 'sort', label: 'Sort by Score', icon: TrendingUp },
                                 { id: 'group', label: 'Group by Type', icon: Layers }
                               ].map((mode) => (
                                 <button
                                   key={mode.id}
                                   onClick={() => setModularViewMode(mode.id as 'sort' | 'group')}
                                   className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${
                                     modularViewMode === mode.id 
                                       ? 'bg-linear-to-br from-blue-600 to-indigo-600 border-blue-400 text-white shadow-md' 
                                       : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-900'
                                   }`}
                                 >
                                   <mode.icon className="w-3 h-3" />
                                   {mode.label}
                                 </button>
                               ))}
                            </div>
                         </div>

                         {/* Color Key */}
                    <div className="space-y-3">
                            <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.2em]">Color Key</p>
                            <div className="space-y-2">
                               <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                                  <span className="text-[10px] font-black text-slate-500 uppercase">Native STS Models</span>
                               </div>
                               <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-indigo-600" />
                                  <span className="text-[10px] font-black text-slate-500 uppercase">Specialized Layers</span>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="lg:col-span-8 p-6 md:p-12 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm">
                      <ProfessionalBarChart 
                        data={asrWerChartData} 
                        unit="%" 
                        maxValue={10} 
                        showDivider={false} 
                        orientation="vertical"
                        title="Word Error Rate (Lower is Better)"
                        subtitle="STS Natives vs. Dedicated STT Specialized Layers"
                        hideScale={true}
                        disableInternalSort={true}
                      />
                   </div>
                </div>
                    </div>

             {/* 2. Naturalness: The Aesthetic Gap */}
             <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                   <div className="lg:col-span-4 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-center space-y-10">
                    <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            <Headphones className="w-5 h-5 text-indigo-600" />
                            <h4 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">The Aesthetic Gap</h4>
                         </div>
                         <p className="text-slate-500 text-base leading-relaxed font-bold">
                            Elite TTS layers still lead the race to beat the Uncanny Valley. STS models struggle to match the prosodic nuance of modular audio specialists.
                         </p>
                      </div>

                      <div className="space-y-6 pt-6 border-t border-slate-100">
                         {/* View Controls (Shared State) */}
                         <div className="space-y-3">
                            <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.2em]">View Controls</p>
                            <div className="flex flex-wrap gap-2">
                               <div className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm">
                                  {modularViewMode === 'sort' ? <TrendingUp className="w-3 h-3" /> : <Layers className="w-3 h-3" />}
                                  Sync View: {modularViewMode === 'sort' ? 'Sorted' : 'Grouped'}
                               </div>
                            </div>
                         </div>

                         {/* Color Key (Unified) */}
                         <div className="space-y-3">
                            <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.2em]">Color Key</p>
                            <div className="space-y-2">
                               <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                                  <span className="text-[10px] font-black text-slate-500 uppercase">Native STS Models</span>
                               </div>
                               <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-indigo-600" />
                                  <span className="text-[10px] font-black text-slate-500 uppercase">Specialized Layers</span>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="lg:col-span-8 p-6 md:p-12 flex flex-col items-center justify-center bg-slate-50/50">
                      <ProfessionalBarChart 
                        data={naturalnessData} 
                        unit=" MOS" 
                        maxValue={5} 
                        showDivider={false} 
                        orientation="vertical"
                        title="Mean Opinion Score (1-5 Scale)"
                        subtitle="STS Natives vs. Dedicated TTS Aesthetic Layers"
                        hideScale={true}
                        disableInternalSort={true}
                      />
                   </div>
                </div>
              </div>
            </div>
        </ProfessionalArticleSection>

        {/* BLOCK 8: CORRELATION GAP */}
        <ProfessionalArticleSection
          number="06"
          subtitle="Correlation Analysis"
          title="Naturalness and Accuracy Show Zero Correlation"
          description="Our analysis confirms a critical disjoint: vocal naturalness and logical accuracy are uncorrelated traits. This opens a dangerous frontier for 'reward hacking'—where a model's human-like delivery can mask systemic reasoning failures, potentially deceiving human evaluators and creating a false sense of production readiness."
          stacked={true}
        >
          <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm overflow-hidden relative">
            <ProfessionalScatterPlot 
              data={scatterData} 
              title="Accuracy vs. Naturalness" 
            />
            
            {/* Atmospheric Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/30 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/20 blur-[150px] rounded-full pointer-events-none" />
          </div>
        </ProfessionalArticleSection>

        {/* BLOCK 9: MODEL BREAKDOWN */}
        <ProfessionalArticleSection
          number="07"
          subtitle="Model Intelligence Guide"
          title="Architectural Profiles"
          description=""
          stacked={true}
        >
          <ModelBreakdown 
            models={models} 
            rankings={rankings} 
            accuracyByTask={accuracyByTask} 
            palette={palette} 
          />
        </ProfessionalArticleSection>

        {/* BLOCK 10: QUICK REFERENCE TABLE */}
        <ProfessionalArticleSection
          number="08"
          subtitle="Model Navigation Guide"
          title="Model Recommendations"
          description="Based on our production audit, we have mapped each API to specific industrial use-cases where they maintain a clear competitive advantage."
          stacked={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
               { 
                 need: "Highest Accuracy", 
                 model1: "Gemini", reason1: "94.2% overall accuracy. Unmatched reasoning depth and paralinguistic awareness.",
                 model2: "OpenAI", reason2: "82.2% overall accuracy. Solid logical consistency but trails in complex reasoning."
               },
               { 
                 need: "Perfect Reliability", 
                 model1: "OpenAI", reason1: "100% success rate. The gold standard for stable, sustained production load.",
                 model2: "Grok", reason2: "100% success rate. Equally robust uptime with comparable inference stability."
               },
               { 
                 need: "Best Transcription", 
                 model1: "Hume", reason1: "1.9% WER. The highest transcription fidelity in the cohort, beating modular specialists.",
                 model2: "OpenAI", reason2: "2.5% WER. Competitive functional transcription with reliable word-level accuracy."
               },
               { 
                 need: "Emotion Perception", 
                 model1: "OpenAI", reason1: "97.5% ER Accuracy. Superior precision in extracting complex affective and tonal states.",
                 model2: "Gemini", reason2: "94.0% ER Accuracy. Strong empathetic mapping with consistent tonal detection."
               },
               { 
                 need: "Natural Voice", 
                 model1: "Gemini", reason1: "3.68 MOS. Leading naturalness with human-like prosody and emotional cadence.",
                 model2: "Hume", reason2: "3.59 MOS. Highly expressive empathetic voice designed for social connection."
               },
               { 
                 need: "Architectural Control", 
                 model1: "Ultravox", reason1: "Open-Weight. Fully self-hostable architecture for maximum data privacy and control.",
                 model2: "N/A", reason2: "Ultravox is the only open-weight model in the current production STS cohort."
               },
             ].map((r) => (
               <div key={r.need} className="bg-white border border-slate-100 p-8 md:p-10 rounded-2xl space-y-6 hover:shadow-md transition-all shadow-sm flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <p className="text-xs font-mono font-black text-blue-600 uppercase tracking-widest">Target Scenario</p>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-tight">{r.need}</h4>
                    
                    <div className="pt-6 border-t border-slate-100 space-y-4">
                  <div className="space-y-2">
                          <div className="flex items-center justify-between">
                             <p className="text-sm font-black text-slate-900">1st: {r.model1}</p>
                             <div className="px-2 py-0.5 rounded bg-blue-50 border border-blue-100 text-[9px] font-black text-blue-600 uppercase tracking-widest">Recommended</div>
                  </div>
                          <p className="text-xs text-slate-500 font-bold leading-relaxed">{r.reason1}</p>
                </div>

                       <div className="pt-4 border-t border-slate-50 space-y-2">
                          <p className="text-sm font-black text-slate-400">2nd: {r.model2}</p>
                          <p className="text-xs text-slate-400 font-bold leading-relaxed">{r.reason2}</p>
                </div>
                    </div>
                </div>
              </div>
             ))}
    </div>
        </ProfessionalArticleSection>

        {/* BLOCK 10: GO DEEPER */}
        <div className="pt-48 pb-48 max-w-4xl mx-auto px-6 text-center space-y-16">
           <div className="space-y-6">
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
                 Explore the methodology.
              </h3>
              <p className="text-base md:text-lg text-slate-500 font-bold leading-relaxed max-w-2xl mx-auto">
                 For structural breakdowns and technical find-logs, proceed to our analysis or experiment sections.
              </p>
      </div>

           <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => onNavigate?.('analysis')}
                className="px-8 py-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-all font-black text-xs uppercase tracking-widest text-slate-900 flex items-center gap-3 shadow-sm"
              >
                 <Search className="w-4 h-4 text-blue-600" />
                 Deep Analysis
              </button>
              <button 
                onClick={() => onNavigate?.('experiment')}
                className="px-8 py-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-all font-black text-xs uppercase tracking-widest text-slate-900 flex items-center gap-3 shadow-sm"
              >
                 <Shield className="w-4 h-4 text-indigo-600" />
                 Methodology
              </button>
           </div>
           
           {/* Minimal Stats Footer */}
           <div className="pt-24 flex items-center justify-center gap-12 border-t border-slate-100 opacity-60">
              <div className="text-center">
                 <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">13,205 Samples</p>
        </div>
              <div className="w-1 h-1 rounded-full bg-slate-200" />
              <div className="text-center">
                 <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">99.8% Conf.</p>
        </div>
      </div>
        </div>


      </div>
    </div>
    );
}
