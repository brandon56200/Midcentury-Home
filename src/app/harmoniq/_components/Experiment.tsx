"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { HARMONIQ_DATA } from "../data";
import { 
  Ear,
  Heart,
  Brain,
  Zap,
  Scale,
  Activity,
  FileText,
  Github,
  Plus,
  Layers,
  Database,
  ShieldCheck
} from "lucide-react";
import ProfessionalArticleSection from "./ProfessionalArticleSection";
import BrandIcon from "./BrandIcon";

// --- THEME ---
const THEME = {
  blue: { bg: "bg-blue-600", lightBg: "bg-blue-50", border: "border-blue-100", text: "text-blue-600" },
  indigo: { bg: "bg-indigo-600", lightBg: "bg-indigo-50", border: "border-indigo-100", text: "text-indigo-600" },
  cyan: { bg: "bg-cyan-600", lightBg: "bg-cyan-50", border: "border-cyan-100", text: "text-cyan-600" },
};

export default function Experiment() {
  const { tasks, models, sttProviders } = HARMONIQ_DATA;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.6 } }
  };

  const taskExamples: Record<string, string> = {
    er: "Listen: [angry voice] 'I can't believe you did that' → What emotion is expressed?",
    gr: "Listen: [diverse voices] → Identify if the speaker is male or female.",
    sqa: "Listen: 'What is the capital of France?' → The model must answer 'Paris'.",
    asr: "Listen: 'The quick brown fox' → The model must transcribe the words exactly.",
    ff: "Listen: [logical argument] → Is this argument valid or fallacious?",
    na: "Listen: 'Turn left, then go straight for 2 miles' → What is your final position?",
    oc: "Listen: 'There are three apples and two oranges' → How many fruits are there?",
    wol: "Listen: 'Alice says Bob is lying' → Determine who is telling the truth."
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fcfcfc] selection:bg-blue-600/10">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pb-32 space-y-0"
      >
        
        {/* --- BLOCK 1: EXECUTIVE OVERVIEW --- */}
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
                   <h3 className="text-blue-600 font-mono text-[10px] font-black uppercase tracking-[0.4em]">Methodology</h3>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">
                  Designing a <br />
                  Modern Audio Benchmark<span className="text-blue-600"> .</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-500 font-bold leading-relaxed max-w-2xl">
                  A rigorous protocol built to evaluate the next generation of native voice AI. We move beyond objective metrics to measure true model intelligence, paralinguistic nuance, and production-grade reliability.
                </p>
             </div>
           </div>
        </section>

        {/* --- BLOCK 2: THE GAP --- */}
        <section className="max-w-6xl mx-auto px-6 py-24 md:py-32 border-b border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center text-pretty">
            {/* Left Column: Narrative */}
            <div className="lg:col-span-6 space-y-16">
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm md:text-base font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 uppercase">
                      Section 01
                    </span>
                    <span className="font-mono text-[11px] md:text-xs font-black uppercase tracking-[0.4em] text-slate-500">
                      Primary Thesis
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] text-slate-900 uppercase">
                    The Simulation <br /> Paradox
                  </h2>
                </div>

                <div className="space-y-8">
                  <p className="text-lg md:text-2xl text-slate-500 leading-tight max-w-xl font-bold border-l-4 border-blue-100 pl-10 py-2">
                    Benchmark performance often fails to predict real interaction because it prioritizes isolated metrics over system-wide simulation.
                  </p>
                  <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-xl font-medium">
                    Most benchmarks evaluate reasoning, perception, and speech generation as independent modules. While this simplifies measurement, it obscures the interaction effects that define real conversation. In practice, failures emerge at the boundaries—when reasoning degrades under expressive speech or perceptual signals fail to shape responses. Evaluating these dimensions in isolation systematically overestimates robustness and misses critical compound failure modes.
                  </p>
                  <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-xl font-medium">
                    This disconnect is amplified by synthetic data lacking paralinguistic ground truth and text-based shortcuts that diverge from production conditions. As a result, many benchmarks reflect laboratory abstractions rather than behavior under real user interaction. Effective evaluation requires prioritizing contextual fidelity across data, tasks, and modality to ensure metrics translate to production reality.
                  </p>
                </div>
              </div>

              {/* Three Prongs - Highlighted */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { title: "Fragmented Evals", desc: "Failures at the seams of capability intersections.", color: "blue" },
                  { title: "Synthetic Proxies", desc: "Lack of paralinguistic ground truth rigor.", color: "indigo" },
                  { title: "Lab vs. Reality", desc: "Metrics that fail to transfer to production.", color: "cyan" }
                ].map((prong, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group/prong">
                    <div className="flex items-center justify-between">
                      <p className={`text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none group-hover/prong:text-blue-600 transition-colors`}>{prong.title}</p>
                      <div className={`w-1.5 h-1.5 rounded-full bg-${prong.color}-500 opacity-40`} />
                    </div>
                    <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{prong.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Graphic */}
            <div className="lg:col-span-6">
              <div className="bg-white border border-slate-200 rounded-4xl p-8 md:p-12 relative overflow-hidden shadow-sm h-full flex flex-col items-center justify-center min-h-[700px] group/circuit">
                {/* Advanced Circuit Architecture */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Complex Circuit Trace Layer */}
                  <g stroke="rgba(0,0,0,0.03)" strokeWidth="1" fill="none">
                    <path d="M 66 160 Q 66 200 133 220 T 200 240" />
                    <path d="M 200 160 V 240" />
                    <path d="M 334 160 Q 334 200 267 220 T 200 240" />
                    <path d="M 200 310 Q 200 350 150 370 T 100 400" />
                    <path d="M 200 310 Q 200 350 250 370 T 300 400" />
                    <path d="M 100 490 Q 100 550 150 570 T 200 630" />
                    <path d="M 300 490 Q 300 550 250 570 T 200 630" />
                    <path d="M 200 310 V 630" strokeWidth="1" stroke="rgba(59, 130, 246, 0.05)" />
                  </g>

                  {/* Active Energy Layer */}
                  {[
                    { d: "M 66 160 Q 66 200 133 220 T 200 240", delay: 0, duration: 3 },
                    { d: "M 200 160 V 240", delay: 0.5, duration: 2.5 },
                    { d: "M 334 160 Q 334 200 267 220 T 200 240", delay: 1, duration: 3 },
                    { d: "M 200 310 Q 200 350 150 370 T 100 400", delay: 2, duration: 3 },
                    { d: "M 200 310 Q 200 350 250 370 T 300 400", delay: 2.5, duration: 3 },
                    { d: "M 100 490 Q 100 550 150 570 T 200 630", delay: 4, duration: 3 },
                    { d: "M 300 490 Q 300 550 250 570 T 200 630", delay: 4.5, duration: 3 },
                    { d: "M 200 310 V 630", delay: 3.2, duration: 2 },
                  ].map((stream, idx) => (
                    <React.Fragment key={idx}>
                      <motion.circle
                        r="1.5"
                        fill="#3b82f6"
                        filter="url(#glow)"
                        initial={{ offsetDistance: "0%", opacity: 0 }}
                        animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                        transition={{ duration: stream.duration, repeat: Infinity, delay: stream.delay, ease: "linear" }}
                        style={{ offsetPath: `path('${stream.d}')` }}
                      />
                    </React.Fragment>
                  ))}
                </svg>

                <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center gap-16 md:gap-20">
                  <div className="grid grid-cols-3 gap-6 w-full">
                    {[
                      { label: "Speech", icon: Ear, color: "blue" },
                      { label: "Voice", icon: Heart, color: "indigo" },
                      { label: "Reasoning", icon: Brain, color: "cyan" }
                    ].map((p, i) => (
                      <div key={i} className="bg-white/90 backdrop-blur-xl border border-slate-100 rounded-3xl p-5 flex flex-col items-center gap-3 relative h-32 justify-center shadow-xs text-pretty">
                        <div className={`w-10 h-10 rounded-xl bg-${p.color}-50 border border-${p.color}-100 flex items-center justify-center`}>
                          <p.icon className={`w-5 h-5 text-${p.color}-600`} />
                        </div>
                        <span className={`text-[9px] font-black ${p.label === 'Speech' ? 'text-slate-900' : `text-${p.color}-600/60`} uppercase tracking-widest`}>{p.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="relative">
                    <div className="w-16 h-16 rounded-3xl border border-blue-100 bg-blue-50/50 backdrop-blur-xl flex items-center justify-center relative shadow-sm transition-all group-hover/circuit:border-blue-300">
                      <Plus className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 w-full">
                    {[
                      { label: "Naturalness", icon: Activity, detail: "UTMOSv2 Engine" },
                      { label: "Reliability", icon: Scale, detail: "3-Judge Consensus" }
                    ].map((e, i) => (
                      <div key={i} className="bg-white/90 backdrop-blur-xl border border-slate-100 rounded-3xl p-6 flex items-center gap-5 relative h-24 shadow-xs text-pretty">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                          <e.icon className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest block">{e.label}</span>
                          <span className="text-[8px] text-blue-600 font-bold uppercase tracking-widest mt-1">{e.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full relative group/output">
                    <div className="relative w-full bg-white border border-slate-200 rounded-4xl p-10 text-center overflow-hidden shadow-sm">
                      <div className="relative z-10 space-y-4">
                        <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto shadow-sm">
                          <Zap className="w-8 h-8 text-blue-600 fill-blue-600/10" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-black text-slate-900 tracking-[0.4em] uppercase leading-none">Harmoniq</h4>
                          <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.6em] mt-3">The Production Standard</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- BLOCK 3: THE FRAMEWORK --- */}
        <ProfessionalArticleSection
          number="02"
          subtitle="Taxonomy"
          title="The Framework"
          description="Decomposing voice intelligence into three fundamental building blocks of capability."
          stacked={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PillarBlock 
              id="speech_understanding"
              icon={Ear} 
              title="Speech Understanding" 
              subtitle="Can it comprehend WHAT was said?"
              desc="The foundation of audio interaction. If a model can't accurately parse the raw linguistic data, context is lost. This tests the linguistic fidelity of the system."
              color="blue"
            />
            <PillarBlock 
              id="voice_understanding"
              icon={Heart} 
              title="Voice Understanding" 
              subtitle="Can it perceive WHO and HOW?"
              desc="Humans extract critical information from paralinguistic cues—tone, emotion, and speaker identity. This tests whether models 'hear' with human-level nuance."
              color="indigo"
            />
            <PillarBlock 
              id="speech_reasoning"
              icon={Brain} 
              title="Speech Reasoning" 
              subtitle="Can it THINK about what it heard?"
              desc="The ultimate test of model intelligence. Determining if cognitive capability survives the audio transition. This tests the logic engine within the audio domain."
              color="cyan"
            />
          </div>
        </ProfessionalArticleSection>

        {/* --- BLOCK 4: OPERATIONALIZING --- */}
        <ProfessionalArticleSection
          number="03"
          subtitle="Implementation"
          title="Evaluation Tasks"
          description="8 granular tasks designed to stress-test every dimension of our capability pillars."
          stacked={true}
        >
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em]">Speech Understanding</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tasks.filter(t => t.type === 'speech_understanding').map(task => (
                    <TaskCard key={task.id} task={task} example={taskExamples[task.id] || ""} />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em]">Voice Understanding</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tasks.filter(t => t.type === 'voice_understanding').map(task => (
                    <TaskCard key={task.id} task={task} example={taskExamples[task.id] || ""} />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em]">Speech Reasoning</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tasks.filter(t => t.type === 'speech_reasoning').map(task => (
                  <TaskCard key={task.id} task={task} example={taskExamples[task.id] || ""} />
                ))}
              </div>
            </div>
          </div>
        </ProfessionalArticleSection>

        {/* --- BLOCK 5: THE COHORT --- */}
        <ProfessionalArticleSection
          number="04"
          subtitle="Audit Specs"
          title="Evaluation Cohort"
          description="We evaluate production-grade speech-to-speech APIs that developers can actually ship today."
          stacked={true}
        >
          <div className="space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {models.map((model) => (
                <div key={model.id} className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center space-y-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-all group-hover:bg-white group-hover:border-blue-100">
                    <BrandIcon brandId={model.id} size={28} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1 opacity-60">{model.provider}</p>
                    <h4 className="text-slate-900 font-black text-sm uppercase tracking-tight">{model.shortName}</h4>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-slate-50 text-[8px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">STS Native</div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-4xl p-10 flex flex-col md:flex-row items-center justify-between gap-12 shadow-sm">
              <div className="space-y-3">
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Enterprise Baselines</h4>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xl font-medium">Do native models need dedicated transcribers? We benchmark against specialist engines to find out.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {sttProviders.map(p => (
                  <div key={p.name} className="px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-xs">
                    {p.name.split(' ')[0]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ProfessionalArticleSection>

        {/* --- BLOCK 6: DATASET PHILOSOPHY --- */}
        <ProfessionalArticleSection
          number="05"
          subtitle="Ground Truth"
          title="Dataset Protocol"
          description="A blend of natural human speech and rigorous reasoning benchmarks."
          stacked={true}
        >
          <div className="space-y-24">
            {/* 1. Overview Grid (Original Content Restored) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DataCard 
                  title="Midcentury Voice Collection" 
                  badge="Proprietary" 
                  tasks="ER, GR, SQA"
                  desc="Recorded using professional voice actors to capture authentic human inflection and emotional nuances."
                  approach="Authenticity: Diverse speaker profiles, verified labels, and zero synthetic artifacting."
                />
                <DataCard 
                  title="Big Bench Audio" 
                  badge="External Standard" 
                  tasks="FF, NA, OC, WOL"
                  desc="Landmark reasoning dataset from Artificial Analysis, adapted to test high-level cognitive capability via audio."
                  approach="Difficulty: Documentation of the 'speech reasoning gap' across frontier models."
                />
              </div>
              <div className="md:col-span-4 bg-white border border-slate-200 rounded-4xl p-10 space-y-8 flex flex-col justify-center text-center shadow-sm relative overflow-hidden group">
                <div className="space-y-3 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Database className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">ASR Evaluation</p>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight">LibriSpeech</h4>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">test-clean split</p>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed font-medium relative z-10">Industry-standard benchmark used to measure Word Error Rate (WER) across high-fidelity transcription tasks.</p>
              </div>
            </div>

            {/* 2. Dataset Deep-Dive (Additive) */}
            <div className="space-y-12">
              <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">The Midcentury Collection</h3>
                  <p className="text-slate-500 text-sm font-bold">Proprietary benchmarks designed to expose hidden capability gaps in paralinguistic processing.</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shrink-0">
                  Verified Ground Truth
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    id: "er", 
                    name: "Midcentury-ER", 
                    tagline: "Emotion Recognition", 
                    stat: "1k+ Samples | 11 Categories",
                    desc: "Captures naturalistic emotional spectrums beyond exaggerated acting. It tests if models can detect de-escalation cues or urgency via raw vocal signals.",
                    insight: "Revealed a 38-point performance gap—exposing models that hear words but miss emotional urgency."
                  },
                  { 
                    id: "gr", 
                    name: "Midcentury-GR", 
                    tagline: "Gender Recognition", 
                    stat: "1k+ Samples | Balanced Cohort",
                    desc: "A proxy for speaker attribute extraction. Our analysis uncovered systematic prediction biases, with some models defaulting to a single gender up to 90% of the time.",
                    insight: "Proved that 'simple' tasks can expose deep-seated architectural biases in voice processing."
                  },
                  { 
                    id: "sqa", 
                    name: "Midcentury-SQA", 
                    tagline: "Spoken Q&A", 
                    stat: "1k+ Samples | Natural Speech",
                    desc: "Tests a model's ability to truly understand the semantics behind what the user is saying, moving beyond transcription to measure deep conversational comprehension.",
                    insight: "Establishment of the production baseline. With all models >95%, it proves that basic spoken QA is now saturated."
                  }
                ].map((dataset) => (
                  <div key={dataset.id} className="group relative bg-white border border-slate-200 rounded-4xl p-8 flex flex-col hover:border-blue-200 hover:shadow-xl transition-all duration-500">
                    <div className="space-y-6 grow">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-white group-hover:border-blue-100 transition-all`}>
                          <Database className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                        </div>
                        <span className="text-[9px] font-black text-blue-600/60 uppercase tracking-widest">{dataset.stat}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">{dataset.name}</h4>
                        <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest">{dataset.tagline}</p>
                      </div>
                      
                      <p className="text-slate-500 text-xs leading-relaxed font-bold">{dataset.desc}</p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-50">
                      <p className="text-slate-900 text-xs leading-relaxed font-bold">
                        {dataset.insight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ProfessionalArticleSection>

        {/* --- BLOCK 7: SCORING ENGINE --- */}
        <ProfessionalArticleSection
          number="06"
          subtitle="Analysis"
          title="Scoring Engine"
          description="A transparent, multi-stage evaluation pipeline to ensure undeniable result integrity."
          stacked={true}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="bg-white border border-slate-200 rounded-4xl p-10 relative overflow-hidden group shadow-sm hover:border-blue-200 transition-all duration-300">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Scale className="w-7 h-7 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight uppercase">3-Judge Consensus</h4>
                    <p className="text-[10px] text-blue-600 uppercase font-black tracking-[0.2em] opacity-60">Accuracy Audit</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <JudgeCard model="GPT-4o" role="Judge Alpha" />
                  <JudgeCard model="Claude 3.5" role="Judge Beta" />
                  <JudgeCard model="Gemini 1.5 Pro" role="Judge Gamma" />
                </div>
                <div className="mt-12 pt-10 border-t border-slate-100">
                  <p className="text-slate-500 text-sm leading-relaxed font-bold italic border-l-2 border-slate-100 pl-8">
                    "Majority consensus (2/3) determines the final score, systematically reducing single-model evaluator bias."
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 space-y-4 flex-1 group hover:bg-white hover:border-blue-100 transition-all">
                <div className="flex items-center gap-3 text-blue-600">
                  <Activity className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Naturalness Index</span>
                </div>
                <h5 className="text-lg font-black text-slate-900 uppercase tracking-tight">UTMOSv2</h5>
                <p className="text-slate-500 text-[11px] leading-relaxed font-medium">Automated MOS scoring engine used to generate reproducible rankings of synthesized audio quality.</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 space-y-4 flex-1 group hover:bg-white hover:border-blue-100 transition-all">
                <div className="flex items-center gap-3 text-blue-600">
                  <Layers className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Transcription</span>
                </div>
                <h5 className="text-lg font-black text-slate-900 uppercase tracking-tight">Word Error Rate</h5>
                <p className="text-slate-500 text-[11px] leading-relaxed font-medium">Standardized WER calculation after text normalization to focus on core transcription accuracy.</p>
              </div>
            </div>
          </div>
        </ProfessionalArticleSection>

        {/* --- BLOCK 8: THE SCALE --- */}
        <ProfessionalArticleSection
          number="07"
          subtitle="Metrics"
          title="The Scale"
          description="Summary statistics behind the Harmoniq 2025 benchmark protocol."
          stacked={true}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <StatCard label="Total Predictions" value="13,205" />
            <StatCard label="STS APIs" value="5" />
            <StatCard label="Eval Tasks" value="8" />
            <StatCard label="Capability Pillars" value="3" />
            <div className="hidden lg:block">
              <StatCard label="Judge Invocations" value="~38K" />
            </div>
          </div>
        </ProfessionalArticleSection>

        {/* --- BLOCK 9: REPRODUCIBILITY --- */}
        <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch text-pretty">
            {/* Left Column: Narrative & Links */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-16">
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm md:text-base font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 uppercase">
                      Section 08
                    </span>
                    <span className="font-mono text-[11px] md:text-xs font-black uppercase tracking-[0.4em] text-slate-500">
                      Transparency
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] text-slate-900 uppercase">
                    Reproducibility
                  </h2>
                  <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium max-w-xl">
                    Our commitment to open science and the voice AI research community. We provide the technical assets necessary to audit, verify, and extend our results.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">Acknowledgments</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-bold border-l-2 border-slate-100 pl-6 py-1">
                    Harmoniq builds on the foundational work of <strong>Artificial Analysis</strong>. Their creation of <strong>Big Bench Audio</strong> made rigorous speech reasoning evaluation possible.
                  </p>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-lg">
                    We also extend our thanks to the research community for the LibriSpeech corpus and the developers behind UTMOSv2 for advancing automated audio quality assessment.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="https://huggingface.co/datasets/ArtificialAnalysis/big_bench_audio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white border border-slate-200 p-5 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all group shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100">
                    <FileText className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-black text-xs uppercase tracking-tight group-hover:text-blue-600 transition-colors">Big Bench Audio</p>
                    <p className="text-slate-400 text-[8px] font-bold uppercase tracking-widest mt-1">Dataset Repository</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 bg-slate-50/50 border border-slate-100 p-5 rounded-2xl opacity-60 grayscale cursor-not-allowed">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-200">
                    <Github className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <p className="text-slate-400 font-black text-xs uppercase tracking-tight">Midcentury Hub</p>
                    <p className="text-slate-400 text-[8px] font-bold uppercase tracking-widest mt-1">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Asset Manifest */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="bg-white border border-slate-200 rounded-4xl p-10 md:p-12 space-y-10 shadow-xs relative overflow-hidden group grow flex flex-col justify-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-slate-900 font-black text-xl uppercase tracking-tight">Asset Manifest</h4>
                    <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest opacity-60">Verification Vault</p>
                  </div>
                </div>
                
                <div className="space-y-4 relative z-10">
                  <ReleaseRow label="Midcentury-ER Dataset" status="Coming Soon" />
                  <ReleaseRow label="Midcentury-GR Dataset" status="Coming Soon" />
                  <ReleaseRow label="Midcentury-SQA Dataset" status="Coming Soon" />
                  <ReleaseRow label="Evaluation Configs" status="Available" />
                  <ReleaseRow label="Raw Results JSON" status="Available" />
                </div>

                <div className="mt-4 p-6 bg-slate-50 border border-slate-100 rounded-3xl">
                  <p className="text-slate-500 text-[11px] leading-relaxed font-bold italic opacity-80">
                    "All metrics reported are reproducible using the configurations and raw inference sets provided above."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </motion.div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function PillarBlock({ id, icon: Icon, title, subtitle, desc, color = "blue" }: any) {
  const theme = id === "speech_understanding" ? THEME.blue : id === "voice_understanding" ? THEME.indigo : THEME.cyan;
  
  return (
    <div className="bg-white border border-slate-200 p-10 rounded-4xl space-y-10 hover:border-blue-600/20 hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col h-full text-pretty">
      <div className={`w-14 h-14 rounded-2xl ${theme.lightBg} ${theme.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
        <Icon className={`w-7 h-7 ${theme.text}`} />
      </div>
      
      <div className="space-y-4">
        <h4 className="text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">{title}</h4>
        <p className={`${theme.text} text-[10px] font-black uppercase tracking-[0.2em] leading-snug opacity-70`}>{subtitle}</p>
      </div>
      
      <p className="text-slate-500 text-[15px] font-bold leading-relaxed grow">{desc}</p>
      
      <div className="pt-8 border-t border-slate-50 flex items-center gap-2">
         <div className={`w-1.5 h-1.5 rounded-full ${theme.bg}`} />
         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Capability</span>
      </div>
    </div>
  );
}

function DataCard({ title, badge, tasks, desc, approach }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300 shadow-xs flex flex-col h-full text-pretty">
      <div className="flex justify-between items-start">
        <span className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 text-[9px] font-black uppercase tracking-widest">{badge}</span>
        <span className="text-slate-400 font-mono text-[10px] font-bold uppercase tracking-widest">{tasks}</span>
      </div>
      <div className="space-y-3">
        <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">{title}</h4>
        <p className="text-slate-500 text-sm leading-relaxed font-bold">{desc}</p>
      </div>
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mt-auto">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Protocol Philosophy</p>
        <p className="text-slate-600 text-[11px] leading-relaxed font-bold italic opacity-80">"{approach}"</p>
      </div>
    </div>
  );
}

function JudgeCard({ model, role }: any) {
  return (
    <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 text-center space-y-2 group hover:bg-white hover:border-blue-100 hover:shadow-md transition-all">
      <div className="w-10 h-10 rounded-full bg-white border border-slate-200 mx-auto flex items-center justify-center text-slate-900 font-black text-[11px] shadow-sm group-hover:border-blue-200 group-hover:text-blue-600">
        {model[0]}
      </div>
      <p className="text-slate-900 font-black text-xs uppercase tracking-tight leading-none pt-2">{model}</p>
      <p className="text-slate-400 text-[9px] uppercase tracking-widest font-black opacity-60">{role}</p>
    </div>
  );
}

function StatCard({ label, value }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-2 hover:border-blue-200 hover:shadow-lg transition-all duration-300 shadow-xs">
      <p className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">{value}</p>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight opacity-70">{label}</p>
    </div>
  );
}

function ReleaseRow({ label, status, inverted }: any) {
  const isAvailable = status === "Available";
  return (
    <div className={`flex justify-between items-center border-b ${inverted ? 'border-white/10' : 'border-slate-100'} pb-4 last:border-0 last:pb-0`}>
      <span className={`${inverted ? 'text-blue-50' : 'text-slate-900'} text-[13px] font-bold`}>{label}</span>
      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
        isAvailable 
          ? (inverted ? 'bg-blue-600 text-white border border-blue-500' : 'bg-emerald-50 text-emerald-600 border border-emerald-100') 
          : (inverted ? 'bg-white/5 text-white/40 border border-white/10' : 'bg-slate-100 text-slate-500 border border-slate-200')
      }`}>{status}</span>
    </div>
  );
}

function TaskCard({ task, example }: { task: any, example: string }) {
  const colorClass = task.type === 'speech_reasoning' ? 'cyan' : task.type === 'voice_understanding' ? 'indigo' : 'blue';
  const theme = colorClass === 'blue' ? THEME.blue : colorClass === 'indigo' ? THEME.indigo : THEME.cyan;
  
  return (
    <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group relative h-full flex flex-col shadow-xs text-pretty">
      <div className="flex justify-between items-start mb-6">
        <span className={`${theme.text} font-mono text-[10px] font-black uppercase tracking-[0.2em] opacity-60`}>{task.abbreviation}</span>
        <div className={`w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-white group-hover:border-blue-50 transition-colors`}>
           <TaskIcon type={task.type} />
        </div>
      </div>
      <h4 className={`font-black text-slate-900 text-lg uppercase tracking-tight mb-4 group-hover:text-blue-600 transition-colors`}>{task.name}</h4>
      <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 mt-auto">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 opacity-60">Example Case</p>
        <p className="text-slate-500 text-[11px] leading-relaxed font-bold italic opacity-80">"{example}"</p>
      </div>
    </div>
  );
}

function TaskIcon({ type }: { type: string }) {
  if (type === 'speech_reasoning') return <Brain className="w-4 h-4 text-cyan-500" />;
  if (type === 'voice_understanding') return <Heart className="w-4 h-4 text-indigo-500" />;
  return <Ear className="w-4 h-4 text-blue-500" />;
}
