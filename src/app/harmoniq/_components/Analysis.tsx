"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Heart, 
  Ear, 
  CheckCircle2, 
  Activity, 
  Zap,
  ShieldCheck,
  Speaker,
  FileText,
  Database,
  XCircle,
  History,
  AlertTriangle,
  ChevronDown,
  LayoutGrid,
  Search,
  ExternalLink,
  Target,
  Pause,
  PlayCircle,
  Lightbulb
} from "lucide-react";
import AudioAnalysisStudio from "./AudioAnalysisStudio";
import ProfessionalArticleSection from "./ProfessionalArticleSection";
import ProfessionalBarChart from "./charts/ProfessionalBarChart";
import BrandIcon from "./BrandIcon";
import analysisData from "../../../../analysis.json";

// --- THEME ---
const THEME = {
  blue: { bg: "bg-blue-600", lightBg: "bg-blue-50", border: "border-blue-100", text: "text-blue-600" },
  indigo: { bg: "bg-indigo-600", lightBg: "bg-indigo-50", border: "border-indigo-100", text: "text-indigo-600" },
  cyan: { bg: "bg-cyan-600", lightBg: "bg-cyan-50", border: "border-cyan-100", text: "text-cyan-600" },
};

export default function Analysis() {
  const [selectedTaskId, setSelectedTaskId] = useState<string>("er");
  const [selectedModelId, setSelectedModelId] = useState<string>("gemini");

  const activeTask = useMemo(() => 
    analysisData.sections.per_task.find((t: any) => t.task_id === selectedTaskId),
  [selectedTaskId]);

  const activeModel = useMemo(() => 
    analysisData.sections.per_model.find((m: any) => m.model_id === selectedModelId),
  [selectedModelId]);

  const datasetMapping: Record<string, string> = {
    er: "Midcentury-ER",
    gr: "Midcentury-GR",
    asr: "LibriSpeech",
    sqa: "Midcentury-SQA",
    ff: "Big Bench Audio",
    na: "Big Bench Audio",
    oc: "Big Bench Audio",
    wol: "Big Bench Audio"
  };

  const chartData = useMemo(() => {
    if (!activeTask) return [];
    return Object.entries(activeTask.accuracy_by_model).map(([modelId, score]) => ({
      id: modelId,
      brandId: modelId,
      name: analysisData.sections.per_model.find((m: any) => m.model_id === modelId)?.display_name || modelId,
      value: score as number,
      color: modelId === 'gemini' ? '#3b82f6' : '#94a3b8'
    }));
  }, [activeTask]);

  return (
    <div className="flex-1 flex flex-col bg-[#fcfcfc] selection:bg-blue-600/10">
      <div className="pb-32 space-y-0">
        
        {/* BLOCK 1: EXECUTIVE OVERVIEW */}
        <section className="relative pt-32 pb-32 px-6 overflow-hidden min-h-[500px] flex flex-col justify-center border-b border-slate-100 bg-white text-pretty">
           <div className="absolute inset-0 pointer-events-none opacity-40">
              <div 
                className="absolute inset-0" 
                style={{ 
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                  maskImage: 'radial-gradient(circle at 50% 50%, white 0%, transparent 80%)',
                }} 
              />
           </div>

           <div className="max-w-6xl mx-auto w-full relative z-10 space-y-12">
             <div className="max-w-3xl space-y-8">
                <div className="flex items-center gap-3">
                   <span className="w-8 h-px bg-blue-600" />
                   <h3 className="text-blue-600 font-mono text-[10px] font-black uppercase tracking-[0.4em]">Strategic Scoping</h3>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">
                  Intelligence <br />
                  Deep-Dive<span className="text-blue-600"> .</span>
                </h1>
                            <p className="text-lg md:text-xl text-slate-500 font-bold leading-relaxed max-w-2xl">
                              Analyzing model performance across three granular scopes: capability pillars, task-level audits, and model-specific profiles. We draw meaningful insights and trends about the current state of native voice AI, identifying systematic biases and frontier reasoning limits grounded in empirical evidence.
                            </p>
             </div>
           </div>
        </section>

        {/* BLOCK 2: CAPABILITY PILLARS */}
        <ProfessionalArticleSection
          number="01"
          subtitle="Taxonomy"
          title="Capability Pillars"
          description="Decomposing speech intelligence into three distinct areas of evaluation. Each pillar represents a critical frontier in native voice AI."
          stacked={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(analysisData.sections.per_pillar).map((pillar: any) => (
              <PillarCard key={pillar.id} pillar={pillar} />
            ))}
          </div>
        </ProfessionalArticleSection>

                    {/* BLOCK 3: EVIDENCE STUDIO */}
                    <section className="bg-white border-y border-slate-100 py-32 overflow-hidden">
                      <div className="max-w-6xl mx-auto px-6 mb-16 space-y-12">
                        <div className="space-y-8 max-w-3xl">
                          <div className="flex items-center gap-4">
                             <span className="font-mono text-sm md:text-base font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
                               SECTION 02
                             </span>
                             <span className="font-mono text-[11px] md:text-xs font-black uppercase tracking-[0.4em] text-slate-400">
                               Empirical Audit
                             </span>
                          </div>

                          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] text-slate-900 uppercase">
                            Task-level Inference Inspection
                          </h2>

                          <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
                            Drawing granular insights and identifying systemic trends across evaluation tasks. Every finding is validated by irrefutable evidence extracted directly from model inferences and verified source audio.
                          </p>
                        </div>

                        {/* Task Selector */}
                        <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-slate-100/50 border border-slate-200/60 rounded-2xl max-w-4xl mx-auto shadow-inner">
                           {analysisData.sections.per_task.map((task: any) => (
                             <button
                               key={task.task_id}
                               onClick={() => setSelectedTaskId(task.task_id)}
                               className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                 selectedTaskId === task.task_id 
                                   ? "bg-white text-blue-600 shadow-sm border border-blue-100" 
                                   : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                               }`}
                             >
                               {task.task_code}
                             </button>
                           ))}
                        </div>
                      </div>

                      <div className="max-w-7xl mx-auto px-4">
                         <AnimatePresence mode="wait">
                           <motion.div 
                             key={selectedTaskId}
                             initial={{ opacity: 0, x: 20 }}
                             animate={{ opacity: 1, x: 0 }}
                             exit={{ opacity: 0, x: -20 }}
                             transition={{ duration: 0.3, ease: "easeOut" }}
                             className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch"
                           >
                              {/* Left: Audio Studio Parent */}
                              <div className="lg:col-span-8 flex flex-col">
                                <AudioAnalysisStudio 
                                  activeTaskId={selectedTaskId}
                                  datasetName={datasetMapping[selectedTaskId]}
                                  samples={((activeTask as any)?.evidence || []).map((ev: any) => ({
                                    sample_id: ev.sample_id,
                                    ground_truth: ev.ground_truth,
                                    why_selected: ev.why_selected,
                                    input_audio_path: ev.input_audio_path,
                                    outputs: Object.entries(ev.model_responses).map(([modelId, data]: any) => ({
                                      modelId,
                                      modelName: analysisData.sections.per_model.find((m: any) => m.model_id === modelId)?.display_name || modelId,
                                      path: data.output_audio_path,
                                      prediction: data.response,
                                      isCorrect: data.is_correct
                                    }))
                                  }))}
                                />
                              </div>

                              {/* Right: Embedded Insights Panel */}
                              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col gap-6 shadow-sm relative">
                                <div className="space-y-6">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                                      <Target className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Active Insight</p>
                                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeTask?.task_name}</p>
                                    </div>
                                  </div>
                                  <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                                    {activeTask?.insight.insight_title}
                                  </h3>
                                  <p className="text-sm text-slate-500 font-bold leading-relaxed">
                                    {activeTask?.insight.insight_summary}
                                  </p>
                                </div>

                                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 space-y-3 relative group/discovery">
                                   <div className="absolute top-4 right-4 text-slate-400 group-hover:text-blue-600 transition-colors">
                                      <Lightbulb className="w-5 h-5 fill-current opacity-20 group-hover:opacity-100 transition-opacity" />
                                   </div>
                                   <div className="flex items-center gap-2 text-blue-600">
                                      <p className="text-[10px] font-black uppercase tracking-widest">Technical Discovery</p>
                                   </div>
                                   <p className="text-sm text-slate-700 font-medium leading-relaxed pr-6 relative z-10">
                                      {activeTask?.insight.key_finding}
                                   </p>
                                </div>

                                  <div className="flex-1 flex flex-col">
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-12">Cohort Accuracy Index</p>
                                   <div className="flex-1 flex items-end justify-between px-6">
                                     {chartData.map((item) => (
                                       <div key={item.id} className="flex flex-col items-center gap-5 group/bar h-full">
                                         <div className="relative w-1 flex-1 flex flex-col justify-end">
                                            {/* Track */}
                                            <div className="absolute inset-x-0 bottom-0 top-0 bg-slate-100/50 rounded-full border border-slate-100/30" />
                                            {/* Bar */}
                                            <motion.div 
                                              initial={{ height: 0 }}
                                              animate={{ height: `${item.value}%` }}
                                              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                              className="relative z-10 w-full rounded-full bg-linear-to-t from-blue-600 via-blue-500 to-indigo-400 shadow-[0_4px_12px_rgba(37,99,235,0.2)]"
                                            />
                                         </div>
                                         <div className="flex flex-col items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover/bar:border-blue-200 group-hover/bar:bg-white transition-all shadow-xs overflow-hidden shrink-0">
                                              <BrandIcon brandId={item.brandId} size={20} className="text-slate-400 group-hover/bar:text-blue-600 transition-colors" />
                                            </div>
                                            <span className="text-[10px] font-mono font-black text-slate-900 group-hover/bar:text-blue-600 transition-colors">
                                              {item.value.toFixed(0)}%
                                            </span>
                                         </div>
                                       </div>
                                     ))}
                                   </div>
                                </div>
                              </div>
                           </motion.div>
                         </AnimatePresence>
                      </div>
                    </section>

        {/* BLOCK 4: SYSTEMIC WEAKNESSES */}
        <ProfessionalArticleSection
          number="03"
          subtitle="Profiles"
          title="Systemic Weaknesses"
          description="Identifying the critical architectural gaps where frontier models collapse. Our audit focuses on failure diagnostic logs with verified audio evidence."
          stacked={true}
        >
          <div className="space-y-12">
            {/* Model Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
               {analysisData.sections.per_model.map((model: any) => (
                 <button
                   key={model.model_id}
                   onClick={() => setSelectedModelId(model.model_id)}
                   className={`px-8 py-5 rounded-3xl transition-all border flex items-center gap-5 group relative ${
                     selectedModelId === model.model_id 
                       ? "bg-white border-blue-600 shadow-[0_15px_30px_-10px_rgba(37,99,235,0.15)] ring-1 ring-blue-600/5 scale-105 z-10" 
                       : "bg-slate-50/50 border-slate-200/60 hover:border-blue-200 hover:bg-white text-slate-400"
                   }`}
                 >
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                     selectedModelId === model.model_id ? 'bg-blue-50' : 'bg-white border border-slate-100'
                   }`}>
                     <BrandIcon brandId={model.model_id} size={20} className={selectedModelId === model.model_id ? "text-blue-600" : "text-slate-400 group-hover:text-blue-400"} />
                   </div>
                   <div className="text-left space-y-0.5">
                      <h4 className={`text-xs font-black uppercase tracking-tight ${selectedModelId === model.model_id ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>
                        {model.display_name}
                      </h4>
                      <p className={`text-[10px] font-mono font-bold ${selectedModelId === model.model_id ? 'text-blue-600' : 'text-slate-300'}`}>
                        {model.metrics.overall_accuracy.toFixed(1)}%
                      </p>
                   </div>
                 </button>
               ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-4xl overflow-hidden shadow-sm">
               <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                  {/* Model Analysis */}
                  <div className="lg:col-span-5 p-10 md:p-16 space-y-16">
                     <div className="space-y-10">
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm">
                              <BrandIcon brandId={selectedModelId} size={28} />
                           </div>
                           <div className="space-y-1">
                              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                                 {activeModel?.display_name}
                              </h3>
                              <p className="text-blue-600 font-mono text-[10px] font-black uppercase tracking-[0.4em] opacity-60">
                                 Failure Diagnostic
                              </p>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div className="bg-blue-50/50 border border-blue-100/50 rounded-3xl p-8 group/verdict">
                              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4">System Verdict</p>
                              <p className="text-xl font-black text-slate-900 leading-tight relative z-10">{activeModel?.verdict}</p>
                           </div>
                           <p className="text-base text-slate-500 font-bold leading-relaxed border-l-2 border-slate-100 pl-8 py-2">
                              {activeModel?.summary}
                           </p>
                        </div>
                     </div>

                     <div className="space-y-8">
                        <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                           <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                              <AlertTriangle className="w-4 h-4 text-slate-400" />
                              Critical Weaknesses
                           </h5>
                           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Diagnostic Logs</span>
                        </div>
                        <div className="space-y-4">
                           {(activeModel as any)?.weaknesses.map((w: any, idx: number) => (
                             <div key={idx} className="bg-slate-50/30 border border-slate-100/60 rounded-2xl p-6 space-y-4 hover:bg-slate-50 transition-colors group/weakness">
                                <div className="flex justify-between items-start">
                                   <p className="text-[9px] font-black text-slate-400 group-hover/weakness:text-blue-600 uppercase tracking-widest leading-none transition-colors">Failure Mode</p>
                                   {w.task && (
                                     <span className="text-[8px] font-mono font-bold text-slate-300 bg-white border border-slate-100 px-2 py-0.5 rounded uppercase leading-none">
                                       {w.task}
                                     </span>
                                   )}
                                </div>
                                <div className="space-y-2">
                                   <p className="text-[13px] font-black text-slate-900 leading-snug tracking-tight">{w.weakness}</p>
                                   <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic opacity-80">
                                      <span className="font-bold text-slate-500 not-italic">Criteria:</span> {w.evidence_criteria}
                                   </p>
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="bg-blue-50/50 border border-blue-100/50 rounded-3xl p-8 group/growth">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Growth Vector</p>
                        <p className="text-sm font-bold text-slate-600 leading-relaxed">{(activeModel as any)?.improvement_areas}</p>
                     </div>
                  </div>

                  {/* Weakness Evidence Audio */}
                  <div className="lg:col-span-7 p-10 md:p-16 bg-slate-50/20 space-y-12">
                     <div className="flex items-center justify-between">
                        <div className="space-y-1.5">
                           <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                              <Activity className="w-4 h-4 text-blue-600" />
                              Empirical Evidence
                           </h5>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Verified Model Breakdown Logs</p>
                        </div>
                        <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-[9px] font-black text-slate-400 uppercase tracking-widest shadow-xs">
                           {((activeModel as any)?.weakness_evidence || []).length} Recorded Collapses
                        </div>
                     </div>

                     <div className="space-y-4">
                        {((activeModel as any)?.weakness_evidence || []).map((ev: any, idx: number) => (
                          <WeaknessEvidenceRow key={idx} evidence={ev} modelId={selectedModelId} />
                        ))}
                     </div>

                     <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 flex items-center justify-between shadow-sm relative overflow-hidden group/stats">
                        <div className="absolute inset-0 bg-blue-600/5 translate-y-full group-hover/stats:translate-y-0 transition-transform duration-700" />
                        <div className="flex items-center gap-12 relative z-10">
                           <div className="space-y-1">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Composite Index</p>
                              <p className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{activeModel?.metrics.overall_accuracy.toFixed(1)}%</p>
                           </div>
                           <div className="h-16 w-px bg-slate-100" />
                           <div className="space-y-1">
                              <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Naturalness</p>
                              <div className="flex items-baseline gap-2">
                                 <p className="text-2xl font-black text-slate-900">{activeModel?.metrics.naturalness}</p>
                                 <span className="text-[10px] font-black text-slate-400 uppercase">MOS</span>
                              </div>
                           </div>
                        </div>
                        <div className="relative z-10 w-24 h-24 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                           <Target className="w-10 h-10 text-slate-200 group-hover/stats:text-blue-600 transition-colors" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </ProfessionalArticleSection>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function PillarCard({ pillar }: { pillar: any }) {
  const Icon = pillar.id === "speech_understanding" ? Ear : pillar.id === "voice_understanding" ? Heart : Brain;
  const theme = pillar.id === "speech_understanding" ? THEME.blue : pillar.id === "voice_understanding" ? THEME.indigo : THEME.cyan;
  
  return (
    <div className="bg-white border border-slate-200 p-8 rounded-4xl hover:border-blue-600/20 hover:shadow-lg transition-all duration-500 group flex flex-col h-[520px] text-pretty relative">
      <div className="absolute top-8 right-8 flex gap-1">
         {pillar.tasks.map((t: string) => (
           <span key={t} className="text-[8px] font-mono font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{t}</span>
         ))}
      </div>

      {/* Segment 1: Icon Header */}
      <div className="h-12 mb-8 shrink-0">
        <div className={`w-12 h-12 rounded-2xl ${theme.lightBg} ${theme.border} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className={`w-6 h-6 ${theme.text}`} />
        </div>
      </div>
      
      {/* Segment 2: Title & Tagline */}
      <div className="h-24 mb-8 shrink-0">
        <h4 className="text-2xl font-black text-slate-900 tracking-tight uppercase leading-none mb-3">{pillar.name}</h4>
        <p className="text-slate-500 text-sm font-bold leading-relaxed max-w-[240px]">
          {pillar.tagline}
        </p>
      </div>

      {/* Segment 3: Overall Insight Box */}
      <div className="h-20 mb-10 shrink-0">
        <div className={`${theme.bg} rounded-2xl h-full border border-white/10 shadow-sm flex items-center justify-center text-center px-6`}>
           <p className="text-white text-[13px] font-black uppercase tracking-[0.2em] leading-tight">
             {pillar.verdict}
           </p>
        </div>
      </div>
      
      {/* Segment 4: Footer Divider & Metric */}
      <div className="mt-auto pt-8 border-t border-slate-100 shrink-0">
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Primary Metric</p>
        <p className="text-2xl font-black text-slate-900 tracking-tighter">{pillar.key_metric}</p>
      </div>
    </div>
  );
}

function WeaknessEvidenceRow({ evidence, modelId }: { evidence: any, modelId: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col gap-6 group hover:border-blue-600/20 hover:shadow-lg transition-all duration-300">
       <div className="flex items-start justify-between">
          <div className="space-y-4 flex-1">
             <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-widest leading-none">
                  {evidence.task_code}
                </span>
                <div className="h-px w-4 bg-slate-100" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Sample #{evidence.sample_id}</span>
             </div>
             
             <p className="text-sm font-bold text-slate-900 leading-snug pr-8">
                {evidence.weakness_description}
             </p>
          </div>

          <div className="flex flex-col items-center gap-2 shrink-0">
             <button 
               onClick={togglePlay}
               className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                 isPlaying 
                   ? 'bg-blue-600 text-white shadow-[0_8px_20px_-4px_rgba(37,99,235,0.4)] scale-105' 
                   : 'bg-slate-50 text-slate-400 border border-slate-100 hover:border-blue-200 hover:text-blue-600 hover:bg-white'
               }`}
             >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <PlayCircle className="w-5 h-5 transition-transform group-hover:scale-110" />}
             </button>
             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{isPlaying ? 'Playing' : 'Listen'}</p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 space-y-2">
             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest opacity-60">Verified Ground Truth</p>
             <p className="text-[11px] font-bold text-slate-900 uppercase tracking-tight line-clamp-1">{evidence.ground_truth}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 space-y-2">
             <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest opacity-60">Model Inference</p>
             <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight line-clamp-1">{evidence.response}</p>
          </div>
       </div>
       <audio ref={audioRef} src={`/audio_evidence/${evidence.output_audio_path}`} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}

function AssetCard({ title, status, icon }: { title: string, status: string, icon: any }) {
  return (
    <button className="p-6 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-400 transition-all text-left space-y-4 group shadow-xs">
       <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
          {icon}
       </div>
       <div className="space-y-1">
          <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{title}</p>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{status}</p>
       </div>
    </button>
  );
}
