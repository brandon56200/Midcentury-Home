"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { HARMONIQ_DATA } from "../data";
import { 
  Ear,
  Heart,
  Brain,
  Zap,
  ArrowRight,
  Database,
  Layers,
  Scale,
  Activity,
  CheckCircle2,
  FileText,
  Github,
  X,
  Plus
} from "lucide-react";

export default function Experiment() {
  const { tasks, models, sttProviders } = HARMONIQ_DATA;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, duration: 0.5 } }
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
    <div className="flex-1 flex flex-col p-4 md:p-10 overflow-y-auto custom-scrollbar bg-transparent relative selection:bg-blue-600/30">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto w-full space-y-24 md:space-y-32 pb-32 pt-8"
      >
        
        {/* --- SECTION 1: THE GAP --- */}
        <section className="space-y-12">
          <SectionHeader 
            number="01" 
            title="The Gap" 
            description="Why we built Harmoniq: a full-suite benchmark designed to become the standard for voice AI evaluation." 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
            <div className="lg:col-span-6 space-y-10 flex flex-col justify-center">
              <div className="space-y-6">
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  Voice AI is the future. <br />
                  <span className="text-blue-600">We need a standard to drive it forward.</span>
                </h3>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl font-medium">
                  In 2024, AI labs began to ship native speech-to-speech models, the next step in the evolution of voice AI. These models could process and generate in the audio domain directly without the need for an external pipeline.
                </p>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl font-medium">
                  Existing evaluations measured narrow slices: transcription accuracy here, reasoning ability there. What was missing was a full-suite benchmark—one rigorous enough for researchers and practical enough for developers to adopt as a shared standard.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-white font-bold text-sm leading-tight">Comprehensive Coverage</p>
                  <p className="text-slate-500 text-[11px] leading-relaxed">8 tasks across 3 capability pillars. Speech understanding, voice understanding, and speech reasoning—tested together, not in isolation.</p>
                </div>
                <div className="space-y-2">
                  <p className="text-white font-bold text-sm leading-tight">No Shortcuts</p>
                  <p className="text-slate-500 text-[11px] leading-relaxed">Real human speech from professional voice actors. Production APIs, not research checkpoints. End-to-end evaluation with no synthetic simplifications.</p>
                </div>
                <div className="space-y-2">
                  <p className="text-white font-bold text-sm leading-tight">Multi-Dimensional</p>
                  <p className="text-slate-500 text-[11px] leading-relaxed">Accuracy alone isn't enough. We measure naturalness, reliability, and paralinguistic perception—the full picture of production readiness.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#050505] border border-white/10 rounded-[3rem] p-8 md:p-10 relative overflow-hidden shadow-2xl h-full flex flex-col items-center justify-center min-h-[700px] group/circuit">
                {/* Modern Visual Atmosphere */}
                <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />
                
                {/* Advanced Circuit Architecture */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    
                    <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="50%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>

                    <radialGradient id="node-gradient">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </radialGradient>
                  </defs>

                  {/* Complex Circuit Trace Layer */}
                  <g stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none">
                    {/* Primary Traces with Fillets (Smooth Corners) */}
                    {/* Column 1 -> Hub (Starts below Pillar 1) */}
                    <path d="M 66 160 Q 66 200 133 220 T 200 240" />
                    <path d="M 56 160 Q 56 210 128 230 T 190 240" strokeWidth="0.5" stroke="rgba(255,255,255,0.03)" />
                    
                    {/* Column 2 -> Hub (Starts below Pillar 2) */}
                    <path d="M 200 160 V 240" />
                    <path d="M 194 160 V 230 Q 194 240 200 240" strokeWidth="0.5" stroke="rgba(255,255,255,0.03)" />
                    <path d="M 206 160 V 230 Q 206 240 200 240" strokeWidth="0.5" stroke="rgba(255,255,255,0.03)" />

                    {/* Column 3 -> Hub (Starts below Pillar 3) */}
                    <path d="M 334 160 Q 334 200 267 220 T 200 240" />
                    <path d="M 344 160 Q 344 210 272 230 T 210 240" strokeWidth="0.5" stroke="rgba(255,255,255,0.03)" />

                    {/* Hub -> Engines (Starts below Hub) */}
                    <path d="M 200 310 Q 200 350 150 370 T 100 400" />
                    <path d="M 200 310 Q 200 350 250 370 T 300 400" />
                    
                    {/* Parallel Detail Traces for Engines */}
                    <path d="M 210 310 Q 210 340 160 360 T 110 400" strokeWidth="0.5" stroke="rgba(255,255,255,0.03)" />
                    <path d="M 190 310 Q 190 340 240 360 T 290 400" strokeWidth="0.5" stroke="rgba(255,255,255,0.03)" />
                    
                    {/* Engines -> Output (Flowing into the Zap icon area) */}
                    <path d="M 100 490 Q 100 550 150 570 T 200 630" />
                    <path d="M 300 490 Q 300 550 250 570 T 200 630" />
                    
                    {/* Central Bus to Output */}
                    <path d="M 200 310 V 630" strokeWidth="1" stroke="rgba(59, 130, 246, 0.1)" />
                  </g>

                  {/* Active Energy Layer */}
                  {[
                    // Path 1: Pillar 1 to Hub
                    { d: "M 66 160 Q 66 200 133 220 T 200 240", delay: 0, duration: 3 },
                    // Path 2: Pillar 2 to Hub
                    { d: "M 200 160 V 240", delay: 0.5, duration: 2.5 },
                    // Path 3: Pillar 3 to Hub
                    { d: "M 334 160 Q 334 200 267 220 T 200 240", delay: 1, duration: 3 },
                    // Path 4: Hub to Left Engine
                    { d: "M 200 310 Q 200 350 150 370 T 100 400", delay: 2, duration: 3 },
                    // Path 5: Hub to Right Engine
                    { d: "M 200 310 Q 200 350 250 370 T 300 400", delay: 2.5, duration: 3 },
                    // Path 6: Left Engine to Output
                    { d: "M 100 490 Q 100 550 150 570 T 200 630", delay: 4, duration: 3 },
                    // Path 7: Right Engine to Output
                    { d: "M 300 490 Q 300 550 250 570 T 200 630", delay: 4.5, duration: 3 },
                    // Central Power Line
                    { d: "M 200 310 V 630", delay: 3.2, duration: 2 },
                  ].map((stream, idx) => (
                    <React.Fragment key={idx}>
                      {/* Sub-pulse trace */}
                      <motion.path
                        d={stream.d}
                        stroke="rgba(96, 165, 250, 0.3)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0, 0.4, 0] }}
                        transition={{ 
                          duration: stream.duration, 
                          repeat: Infinity, 
                          delay: stream.delay,
                          ease: "easeInOut"
                        }}
                      />
                      {/* Data Packet */}
                      <motion.circle
                        r="1.5"
                        fill="#fff"
                        filter="url(#glow)"
                        initial={{ offsetDistance: "0%", opacity: 0 }}
                        animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                        transition={{ 
                          duration: stream.duration, 
                          repeat: Infinity, 
                          delay: stream.delay,
                          ease: "linear"
                        }}
                        style={{ offsetPath: `path('${stream.d}')` }}
                      />
                    </React.Fragment>
                  ))}

                  {/* Junction Points (Ports) */}
                  {[
                    // Entry Ports
                    { cx: 66, cy: 160 }, { cx: 200, cy: 160 }, { cx: 334, cy: 160 },
                    // Hub Ports
                    { cx: 200, cy: 240 }, { cx: 200, cy: 310 },
                    // Engine Ports
                    { cx: 100, cy: 400 }, { cx: 300, cy: 400 },
                    { cx: 100, cy: 490 }, { cx: 300, cy: 490 },
                    // Output Port (Aligned with Zap)
                    { cx: 200, cy: 630 }
                  ].map((node, i) => (
                    <g key={i}>
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r="3.5"
                        fill="rgba(5, 5, 5, 1)"
                        stroke="rgba(59, 130, 246, 0.3)"
                        strokeWidth="1"
                      />
                      <motion.circle
                        cx={node.cx}
                        cy={node.cy}
                        r="1.2"
                        fill="#60a5fa"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                      />
                    </g>
                  ))}
                </svg>

                <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center gap-12 md:gap-16">
                  
                  {/* Layer 1: Pillars */}
                  <div className="grid grid-cols-3 gap-6 w-full">
                    {[
                      { label: "Speech", icon: Ear, color: "blue", delay: 0 },
                      { label: "Voice", icon: Heart, color: "indigo", delay: 0.6 },
                      { label: "Reasoning", icon: Brain, color: "cyan", delay: 1.2 }
                    ].map((p, i) => (
                      <div 
                        key={i}
                        className="group/card relative"
                      >
                        <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-4xl p-4 flex flex-col items-center gap-3 relative h-28 justify-center shadow-2xl transition-all group-hover/card:border-blue-500/50 group-hover/card:shadow-[0_0_30px_rgba(59,130,246,0.2)] group-hover/card:bg-black/90">
                          <div className={`w-8 h-8 rounded-xl bg-${p.color}-600/10 flex items-center justify-center transition-all group-hover/card:brightness-150`}>
                            <p.icon className={`w-4 h-4 text-${p.color}-500`} />
                          </div>
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] group-hover/card:text-white transition-colors">{p.label}</span>
                        </div>

                        {/* Connection Port Bottom */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black border border-white/10 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-blue-500/50 group-hover/card:bg-blue-500 group-hover/card:shadow-[0_0_12px_rgba(59,130,246,1)] transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Central Processing Hub (Static, Professional) */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-3xl border border-blue-500/20 bg-black/60 backdrop-blur-xl flex items-center justify-center relative shadow-2xl overflow-hidden transition-all group-hover/circuit:border-blue-500/50 group-hover/circuit:shadow-[0_0_25px_rgba(59,130,246,0.2)]">
                      <Plus className="w-6 h-6 text-blue-500" />
                      
                      {/* Subtle Glow */}
                      <div className="absolute inset-0 bg-radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)" />
                    </div>
                    {/* Orbiting Particles (Static or very slow) */}
                    {[0, 120, 240].map((deg) => (
                      <motion.div
                        key={deg}
                        className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-400 rounded-full"
                        animate={{
                          x: [Math.cos(deg * Math.PI / 180) * 40, Math.cos((deg + 360) * Math.PI / 180) * 40],
                          y: [Math.sin(deg * Math.PI / 180) * 40, Math.sin((deg + 360) * Math.PI / 180) * 40],
                          opacity: [0.1, 0.4, 0.1]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      />
                    ))}
                  </div>

                  {/* Layer 2: Engines */}
                  <div className="grid grid-cols-2 gap-10 w-full">
                    {[
                      { label: "Naturalness", icon: Activity, detail: "UTMOSv2 Engine", delay: 3.0 },
                      { label: "Reliability", icon: Scale, detail: "3-Judge Consensus", delay: 3.6 }
                    ].map((e, i) => (
                      <div 
                        key={i}
                        className="group/engine relative"
                      >
                        {/* Connection Port Top */}
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black border border-white/10 flex items-center justify-center z-20">
                          <div className="w-1 h-1 rounded-full bg-blue-500/50 group-hover/engine:bg-blue-500 transition-all" />
                        </div>

                        <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-4xl p-6 flex items-center gap-5 relative h-22 shadow-xl transition-all group-hover/engine:border-blue-500/50 group-hover/engine:shadow-[0_0_30px_rgba(59,130,246,0.2)] group-hover/engine:bg-black/90">
                          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-all group-hover/engine:brightness-150">
                            <e.icon className="w-4 h-4 text-slate-400 group-hover/engine:text-blue-400" />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block group-hover/engine:text-white transition-colors">{e.label}</span>
                            <span className="text-[7px] text-slate-600 font-bold uppercase tracking-widest mt-0.5 transition-colors group-hover/engine:text-blue-500/70">{e.detail}</span>
                          </div>
                        </div>

                        {/* Connection Port Bottom */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black border border-white/10 flex items-center justify-center z-20">
                          <div className="w-1 h-1 rounded-full bg-blue-500/50 group-hover/engine:bg-blue-500 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Final Output: Harmoniq */}
                  <div className="w-full relative group/output">
                    {/* Connection Port Top - Visual Alignment with Lines */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border border-white/10 flex items-center justify-center z-20">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover/output:shadow-[0_0_12px_rgba(59,130,246,1)] transition-all" />
                    </div>

                    {/* Background Glow */}
                    <div className="absolute -inset-2 bg-linear-to-r from-blue-600/10 to-indigo-600/10 rounded-[3rem] blur-2xl opacity-0 group-hover/output:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative w-full bg-[#050505] border border-white/10 rounded-[2.5rem] p-10 text-center overflow-hidden shadow-2xl transition-all group-hover/output:border-blue-500/50 group-hover/output:shadow-[0_0_50px_rgba(59,130,246,0.3)] group-hover/output:bg-[#080808]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_70%)]" />
                      
                      <div className="relative z-10 space-y-5">
                        <motion.div 
                          animate={{ 
                            boxShadow: ["0 0 20px rgba(37,99,235,0.1)", "0 0 40px rgba(37,99,235,0.3)", "0 0 20px rgba(37,99,235,0.1)"] 
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto transition-all group-hover/output:brightness-150"
                        >
                          <Zap className="w-10 h-10 text-blue-500 fill-blue-500/20" />
                        </motion.div>
                        <div>
                          <h4 className="text-3xl md:text-4xl font-bold text-white tracking-[0.4em] uppercase">Harmoniq</h4>
                          <p className="text-[10px] font-bold text-blue-500/60 uppercase tracking-[0.6em] mt-3 transition-colors group-hover/output:text-blue-500">The Standard</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- SECTION 2: THE FRAMEWORK --- */}
        <section className="space-y-12">
          <SectionHeader number="02" title="The Framework" description="Decomposing Voice AI capability into three fundamental building blocks." />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PillarBlock 
              icon={Ear} 
              title="Speech Understanding" 
              subtitle="Can it comprehend what was said?"
              desc="Speech Understanding is the foundation. If a model can't accurately receive the words, nothing else matters. This tests the 'ears' of the system."
              color="blue"
            />
            <PillarBlock 
              icon={Heart} 
              title="Voice Understanding" 
              subtitle="Can it perceive WHO and HOW?"
              desc="Humans extract enormous information from HOW something is said—tone, emotion, identity. This tests whether models 'hear' like humans do."
              color="purple"
            />
            <PillarBlock 
              icon={Brain} 
              title="Speech Reasoning" 
              subtitle="Can it THINK about what it heard?"
              desc="Speech Reasoning tests whether intelligence survives the audio transition. This tests the 'brain' through the 'ears' of the system."
              color="teal"
            />
          </div>
        </section>

        {/* --- SECTION 3: THE TASKS --- */}
        <section className="space-y-12">
          <SectionHeader number="03" title="Operationalizing" description="8 granular tasks designed to stress-test every dimension of the pillars." />
          
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Speech Understanding */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em]">Speech Understanding</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tasks.filter(t => t.type === 'speech_understanding').map(task => (
                    <TaskCard key={task.id} task={task} example={taskExamples[task.id] || ""} />
                  ))}
                </div>
              </div>

              {/* Right Column: Voice Understanding */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <h3 className="text-[10px] font-bold text-purple-500 uppercase tracking-[0.3em]">Voice Understanding</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tasks.filter(t => t.type === 'voice_understanding').map(task => (
                    <TaskCard key={task.id} task={task} example={taskExamples[task.id] || ""} />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row: Speech Reasoning */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <h3 className="text-[10px] font-bold text-teal-500 uppercase tracking-[0.3em]">Speech Reasoning</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tasks.filter(t => t.type === 'speech_reasoning').map(task => (
                  <TaskCard key={task.id} task={task} example={taskExamples[task.id] || ""} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: THE MODELS --- */}
        <section className="space-y-12">
          <SectionHeader number="04" title="Evaluation Cohort" description="Our selection criteria: we evaluated production speech-to-speech APIs that developers can actually ship today." />
          
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {models.map((model) => (
                <div key={model.id} className="bg-white/1 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 hover:bg-white/2 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-xs uppercase">
                    {model.shortName[0]}
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest leading-none mb-1">{model.provider}</p>
                    <h4 className="text-white font-bold text-sm leading-none">{model.shortName}</h4>
                  </div>
                  <p className="text-[9px] text-slate-500 font-medium leading-relaxed">Native Speech-to-Speech</p>
                </div>
              ))}
            </div>

            <div className="bg-white/1 border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2">
                <h4 className="text-white font-bold">Additional Baselines (ASR Only)</h4>
                <p className="text-slate-500 text-xs leading-relaxed max-w-xl">Do STS models need dedicated STT, or is their built-in transcription sufficient? We benchmark against enterprise specialists to find out.</p>
              </div>
              <div className="flex gap-4">
                {sttProviders.map(p => (
                  <div key={p.name} className="px-4 py-2 rounded-lg bg-white/2 border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.name.split(' ')[0]}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 5: THE DATA --- */}
        <section className="space-y-12">
          <SectionHeader number="05" title="Dataset Philosophy" description="Testing with real human speech is ideal. Synthetic TTS is viable, but lacks variability" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DataCard 
                title="Midcentury Voice Collection" 
                badge="Custom Dataset" 
                tasks="ER, GR, SQA"
                desc="Created using professional voice actors recording natural human speech—not synthetic generation."
                approach="Authenticity: Diverse speakers, accents, and recording styles with known ground truth labels."
              />
              <DataCard 
                title="Big Bench Audio" 
                badge="Adopted Benchmark" 
                tasks="FF, Na, OC, WoL"
                desc="Landmark reasoning dataset from Artificial Analysis, adapted to test cognitive capability via audio."
                approach="Difficulty: Documentation of the 'speech reasoning gap' across established benchmarks."
              />
            </div>
            <div className="md:col-span-4 bg-white/1 border border-white/5 rounded-2xl p-8 space-y-6 flex flex-col justify-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto">
                <Database className="w-6 h-6 text-blue-500" />
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-bold">ASR Evaluation</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-medium italic">LibriSpeech test-clean</p>
              </div>
              <p className="text-slate-500 text-[10px] leading-relaxed">Industry-standard benchmark split from audiobooks used to measure Word Error Rate (WER).</p>
            </div>
          </div>
        </section>

        {/* --- SECTION 6: THE EVALUATION --- */}
        <section className="space-y-12">
          <SectionHeader number="06" title="Scoring Engine" description="How we scored accuracy and naturalness using a transparent evaluation pipeline." />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white/1 border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white tracking-tight">3-Judge LLM Panel</h4>
                    <p className="text-[10px] text-blue-500 uppercase font-bold tracking-[0.2em]">Accuracy Evaluation</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <JudgeCard model="GPT-4o" role="Judge 1" />
                  <JudgeCard model="Claude 3.5" role="Judge 2" />
                  <JudgeCard model="Gemini 1.5" role="Judge 3" />
                </div>
                <div className="mt-8 pt-8 border-t border-white/5">
                  <p className="text-slate-400 text-xs leading-relaxed font-medium">Each response is transcribed and evaluated by three independent judges. Majority consensus (2/3) determines the final score, reducing single-model bias.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-white/1 border border-white/5 rounded-2xl p-6 space-y-3 flex-1">
                <div className="flex items-center gap-2 text-blue-500">
                  <Activity className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Naturalness</span>
                </div>
                <h5 className="text-white font-bold">UTMOSv2</h5>
                <p className="text-slate-500 text-[11px] leading-relaxed font-medium">Automated MOS scoring using UTMOSv2 to generate reproducible rankings of audio quality.</p>
              </div>
              <div className="bg-white/1 border border-white/5 rounded-2xl p-6 space-y-3 flex-1">
                <div className="flex items-center gap-2 text-blue-500">
                  <Layers className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">ASR</span>
                </div>
                <h5 className="text-white font-bold">Word Error Rate</h5>
                <p className="text-slate-500 text-[11px] leading-relaxed font-medium">Standard WER calculation after text normalization to focus on transcription accuracy.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 7: THE SCALE --- */}
        <section className="space-y-12">
          <SectionHeader number="07" title="The Scale" description="Summary statistics behind the 2025 benchmark run." />
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <StatCard label="Total Predictions" value="13,205" />
            <StatCard label="STS APIs" value="5" />
            <StatCard label="Tasks" value="8" />
            <StatCard label="Pillars" value="3" />
            <div className="hidden lg:block">
              <StatCard label="Judge Calls" value="~38K" />
            </div>
          </div>
        </section>

        {/* --- SECTION 8: REPRODUCIBILITY --- */}
        <section className="space-y-12">
          <SectionHeader number="08" title="Reproducibility" description="Our commitment to open science and the research community." />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-8">
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg">Acknowledgments</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-xl">
                  Harmoniq builds on the foundational work of <strong>Artificial Analysis</strong>. Their creation of <strong>Big Bench Audio</strong> made rigorous speech reasoning evaluation possible. We also thank the open-source community for LibriSpeech and UTMOSv2.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="https://huggingface.co/datasets/ArtificialAnalysis/big_bench_audio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/1 border border-white/5 p-4 rounded-xl hover:bg-white/2 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs group-hover:text-blue-400 transition-colors">Big Bench Audio</p>
                    <p className="text-slate-500 text-[10px]">Dataset Repository</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-4 bg-white/1 border border-white/5 p-4 rounded-xl hover:bg-white/2 transition-colors group opacity-50 cursor-not-allowed">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center shrink-0">
                    <Github className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs">Midcentury Datasets</p>
                    <p className="text-slate-500 text-[10px]">Coming Soon</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="bg-linear-to-br from-blue-950/20 via-[#050505] to-black border border-white/10 rounded-3xl p-8 space-y-6">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest">Public Assets</h4>
                <div className="space-y-4">
                  <ReleaseRow label="Midcentury-ER Dataset" status="Coming Soon" />
                  <ReleaseRow label="Midcentury-GR Dataset" status="Coming Soon" />
                  <ReleaseRow label="Midcentury-SQA Dataset" status="Coming Soon" />
                  <ReleaseRow label="Evaluation Configs" status="Available" />
                  <ReleaseRow label="Raw Results JSON" status="Available" />
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

function SectionHeader({ number, title, description, noBorder }: any) {
  return (
    <div className={`flex flex-col gap-2 ${noBorder ? '' : 'border-b border-white/5 pb-4 md:pb-6'} w-full`}>
      <div className="flex items-center gap-3">
        <span className="text-blue-600 font-mono text-[10px] md:text-xs font-bold">[{number}]</span>
        <h2 className="text-lg md:text-2xl font-bold tracking-tight uppercase text-white">{title}</h2>
      </div>
      <p className="text-slate-500 font-medium text-[11px] md:text-sm max-w-2xl leading-relaxed">{description}</p>
    </div>
  );
}

function PillarBlock({ icon: Icon, title, subtitle, desc, color = "blue" }: any) {
  const colors = {
    blue: "bg-blue-600/10 border-blue-500/20 text-blue-500",
    purple: "bg-purple-600/10 border-purple-500/20 text-purple-500",
    teal: "bg-teal-600/10 border-teal-500/20 text-teal-500"
  };
  
  const colorStyles = colors[color as keyof typeof colors].split(' ');

  return (
    <div className="bg-white/1 border border-white/5 rounded-2xl p-8 space-y-6 hover:bg-white/2 transition-colors relative overflow-hidden group h-full">
      <div className={`w-12 h-12 rounded-2xl ${colorStyles[0]} ${colorStyles[1]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
        <Icon className={`w-6 h-6 ${colorStyles[2]}`} />
      </div>
      <div className="space-y-2">
        <h4 className="text-xl font-bold text-white tracking-tight">{title}</h4>
        <p className={`${colorStyles[2]} text-[9px] font-bold uppercase tracking-[0.2em] leading-none`}>{subtitle}</p>
      </div>
      <p className="text-slate-400 text-xs leading-relaxed font-medium">{desc}</p>
      <div className="absolute inset-0 bg-grid-white opacity-[0.005] pointer-events-none" />
    </div>
  );
}

function DataCard({ title, badge, tasks, desc, approach }: any) {
  return (
    <div className="bg-white/1 border border-white/5 rounded-2xl p-6 space-y-4 hover:bg-white/2 transition-colors">
      <div className="flex justify-between items-start">
        <span className="px-2 py-1 rounded bg-blue-600/10 border border-blue-500/20 text-blue-500 text-[8px] font-bold uppercase tracking-widest">{badge}</span>
        <span className="text-slate-600 font-mono text-[9px] font-bold uppercase">{tasks}</span>
      </div>
      <h4 className="text-white font-bold">{title}</h4>
      <p className="text-slate-400 text-[11px] leading-relaxed font-medium">{desc}</p>
      <div className="bg-black/40 rounded-xl p-4 border border-white/5">
        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Recording Philosophy</p>
        <p className="text-slate-500 text-[10px] leading-relaxed italic">"{approach}"</p>
      </div>
    </div>
  );
}

function JudgeCard({ model, role }: any) {
  return (
    <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-center space-y-1">
      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-white font-bold text-[10px]">
        {model[0]}
      </div>
      <p className="text-white font-bold text-xs leading-none pt-1">{model}</p>
      <p className="text-slate-600 text-[8px] uppercase tracking-widest font-bold">{role}</p>
    </div>
  );
}

function StatCard({ label, value }: any) {
  return (
    <div className="bg-white/1 border border-white/5 rounded-2xl p-6 text-center space-y-1 hover:bg-white/2 transition-colors">
      <p className="text-2xl md:text-3xl font-bold text-white tracking-tighter">{value}</p>
      <p className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-tight">{label}</p>
    </div>
  );
}

function ReleaseRow({ label, status }: any) {
  const isAvailable = status === "Available";
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-slate-400 text-xs font-medium">{label}</span>
      <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${isAvailable ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-slate-500/10 text-slate-500 border border-slate-500/20'}`}>{status}</span>
    </div>
  );
}

function TaskCard({ task, example }: { task: any, example: string }) {
  const colorClass = task.type === 'speech_reasoning' ? 'teal' : task.type === 'voice_understanding' ? 'purple' : 'blue';
  
  return (
    <div className="p-6 rounded-2xl bg-white/1 border border-white/5 hover:bg-white/2 transition-all group relative h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <span className={`text-${colorClass}-500 font-mono text-[9px] font-bold uppercase tracking-widest`}>{task.abbreviation}</span>
        <TaskIcon type={task.type} />
      </div>
      <h4 className={`font-bold text-white text-base mb-2 group-hover:text-${colorClass}-400 transition-colors`}>{task.name}</h4>
      <div className="bg-black/20 rounded-xl p-3 border border-white/5 mt-auto">
        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Test Case</p>
        <p className="text-slate-400 text-[10px] leading-relaxed italic">"{example}"</p>
      </div>
    </div>
  );
}

function TaskIcon({ type }: { type: string }) {
  if (type === 'speech_reasoning') return <Brain className="w-4 h-4 text-teal-500" />;
  if (type === 'voice_understanding') return <Heart className="w-4 h-4 text-purple-500" />;
  return <Ear className="w-4 h-4 text-blue-500" />;
}

function TaskTag({ label, color }: { label: string, color: 'blue' | 'indigo' | 'cyan' }) {
  const colors = {
    blue: 'bg-blue-600/5 text-blue-400 border-blue-500/10',
    indigo: 'bg-indigo-600/5 text-indigo-400 border-indigo-500/10',
    cyan: 'bg-cyan-600/5 text-cyan-400 border-cyan-500/10'
  };
  return (
    <div className={`py-1 rounded-lg border text-[10px] font-bold text-center uppercase tracking-widest ${colors[color]}`}>
      {label}
    </div>
  );
}
