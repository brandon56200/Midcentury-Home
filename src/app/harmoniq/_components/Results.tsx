"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import ReactECharts from "echarts-for-react";
import { HARMONIQ_DATA } from "../data";
import { 
  ShieldCheck, 
  Activity,
  Layers,
  Maximize2,
  Brain,
  Heart,
  Headphones,
  Waves,
  Target,
  Clock,
  AlertTriangle,
  X,
  Sparkles,
  TrendingUp
} from "lucide-react";

export default function Results() {
  const [expandedChart, setExpandedChart] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string>("openai");

  const { rankings, accuracyByTask, models, tasks, asrWer, sttProviders } = HARMONIQ_DATA;

  // Ref for the model selector section to trigger ring animations
  const modelSelectorRef = useRef(null);
  const isModelSelectorInView = useInView(modelSelectorRef, { once: true, margin: "-100px" });

  // --- ULTRA-DARK BLUE ATMOSPHERIC THEME ---
  const THEME = {
    blue: ["#172554", "#1e3a8a", "#1e40af", "#1d4ed8", "#2563eb"], 
    slate: ["#020617", "#0f172a", "#1e293b", "#334155", "#475569"],
    primary: "#2563eb",
    bg: "#050505",
    border: "rgba(37, 99, 235, 0.08)",
    textDim: "#475569"
  };

  // Helper for pill-shaped gradients
  const getPillGradient = (color: string, horizontal: boolean = true) => ({
    type: 'linear',
    x: 0, y: 0, x2: horizontal ? 1 : 0, y2: horizontal ? 0 : 1,
    colorStops: [
      { offset: 0, color: color + "33" },
      { offset: 1, color: color }         
    ]
  });

  // --- CHART CONFIGURATIONS ---

  const getExecutiveOptions = (showData: boolean) => {
    const sortedRankings = [...rankings].sort((a, b) => b.accuracy - a.accuracy);
    const modelNames = sortedRankings.map(r => models.find(m => m.id === r.modelId)?.shortName ?? "Unknown");

    return {
      backgroundColor: "transparent",
      tooltip: { show: true, backgroundColor: 'rgba(5, 5, 5, 0.98)', borderColor: THEME.border, textStyle: { color: '#fff', fontSize: 11 }, formatter: "{b}: <b>{c}%</b>" },
      grid: { left: "10%", right: "15%", bottom: "10%", top: "20%", containLabel: true },
      xAxis: { type: 'value', max: 100, axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: "rgba(255,255,255,0.05)" } }, axisLabel: { color: "rgba(255,255,255,0.3)", fontSize: 9 } },
      yAxis: { type: 'category', data: modelNames, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: "#fff", fontWeight: "600", fontSize: 11, margin: 25 } },
      series: [{ name: 'Score', type: 'bar', animationDuration: 1000, animationEasing: 'cubicOut', data: showData ? sortedRankings.map((r) => ({ value: r.accuracy, itemStyle: { color: "#fff", borderRadius: 20 } })) : [], barWidth: 16, label: { show: true, position: 'right', formatter: '{c}%', color: '#fff', fontWeight: '700', fontSize: 13, distance: 12 } }]
    };
  };

  const getWheelOptions = (showData: boolean) => {
    const data = showData ? models.map(m => {
        const reasoningTasks = tasks.filter(t => t.type === "speech_reasoning");
        const understandingTasks = tasks.filter(t => t.type !== "speech_reasoning");
        const reasoningChildren = reasoningTasks.map((t) => ({ name: t.abbreviation, value: 1, score: accuracyByTask[m.id]?.[t.id] ?? 0, itemStyle: { color: "rgba(255, 255, 255, 0.12)" } }));
        const understandingChildren = understandingTasks.map((t) => ({ name: t.abbreviation, value: 1, score: accuracyByTask[m.id]?.[t.id] ?? 0, itemStyle: { color: "rgba(255, 255, 255, 0.08)" } }));
        const reasoningAvg = reasoningChildren.length ? reasoningChildren.reduce((acc, curr) => acc + (curr.score ?? 0), 0) / reasoningChildren.length : 0;
        const understandingAvg = understandingChildren.length ? understandingChildren.reduce((acc, curr) => acc + (curr.score ?? 0), 0) / understandingChildren.length : 0;
        return { name: m.shortName, score: (reasoningAvg + understandingAvg) / 2, itemStyle: { color: THEME.blue[0] ?? "#172554" }, children: [{ name: "Reasoning", score: reasoningAvg, itemStyle: { color: THEME.blue[1] ?? "#1e3a8a" }, children: reasoningChildren }, { name: "Understanding", score: understandingAvg, itemStyle: { color: THEME.slate[1] ?? "#0f172a" }, children: understandingChildren }] };
    }) : [];

    return {
      backgroundColor: "transparent",
      tooltip: { backgroundColor: 'rgba(5, 5, 5, 0.98)', borderColor: THEME.border, textStyle: { color: '#fff' }, formatter: (params: any) => `${params.data.name}: <b>${params.data.score?.toFixed(1) || params.data.value}%</b>` },
      series: { type: "sunburst", data: data, radius: [0, "105%"], center: ["50%", "53%"], sort: null, animationDuration: 1000, emphasis: { focus: "ancestor" }, levels: [{}, { r0: "0%", r: "30%", label: { rotate: 0, fontSize: 7, color: "#fff", fontWeight: '700' } }, { r0: "30%", r: "60%", label: { rotate: 'tangential', fontSize: 7, color: "rgba(255,255,255,0.7)" } }, { r0: "60%", r: "85%", label: { position: "outside", padding: 8, fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: '600' } }] }
    };
  };

  const getHeatmapOptions = (showData: boolean) => {
    const data = [];
    if (showData) {
      for (let mIdx = 0; mIdx < models.length; mIdx++) { 
        const model = models[mIdx];
        if (!model) continue;
        const modelId = model.id;
        for (let tIdx = 0; tIdx < tasks.length; tIdx++) { 
          const task = tasks[tIdx];
          if (!task) continue;
          const taskId = task.id;
          data.push([tIdx, mIdx, accuracyByTask[modelId]?.[taskId] ?? 0]); 
        } 
      }
    }
    return {
      backgroundColor: "transparent",
      tooltip: { backgroundColor: 'rgba(5, 5, 5, 0.98)', borderColor: THEME.border, textStyle: { color: '#fff' } },
      grid: { height: "55%", top: "15%", left: "10%", right: "10%", containLabel: true },
      xAxis: { type: "category", data: tasks.map(t => t.abbreviation), axisLabel: { color: THEME.textDim, fontSize: 9 } },
      yAxis: { type: "category", data: models.map(m => m.shortName), axisLabel: { color: "#fff", fontWeight: "600", fontSize: 11 } },
      visualMap: { min: 40, max: 100, calculable: true, orient: "horizontal", left: "center", bottom: "5%", inRange: { color: ["#050505", "#172554", "#1e3a8a", "#1e40af", "#2563eb"] }, textStyle: { color: THEME.textDim, fontSize: 9 } },
      series: [{ type: "heatmap", data: data, animationDuration: 1000, label: { show: true, fontSize: 8, color: "#fff", fontWeight: '600' } }]
    };
  };

  const getModelTaskBreakdownOptions = (modelId: string, showData: boolean) => {
    const modelTasks = tasks.map((t, idx) => ({ name: t.name, value: accuracyByTask[modelId]?.[t.id] ?? 0, color: THEME.blue[idx % 5] ?? THEME.blue[0] ?? "#172554" }));
    return {
      backgroundColor: "transparent",
      grid: { left: "5%", right: "15%", top: "20%", bottom: "10%", containLabel: true },
      xAxis: { type: 'value', max: 100, splitLine: { show: false }, axisLabel: { show: false } },
      yAxis: { type: 'category', data: modelTasks.map(t => t.name), axisLabel: { color: '#fff', fontSize: 10, fontWeight: '600' }, axisLine: { show: false }, axisTick: { show: false } },
      series: [{ type: 'bar', data: showData ? modelTasks.map(t => ({ value: t.value, itemStyle: { color: getPillGradient(t.color), borderRadius: 12 } })) : [], barWidth: 12, animationDuration: 800, label: { show: true, position: 'right', formatter: '{c}%', color: '#fff', fontSize: 11, fontWeight: '700' } }]
    };
  };

  const getModelRingOptions = (modelId: string, showData: boolean) => {
    const rank = rankings.find(r => r.modelId === modelId);
    const isActive = selectedModelId === modelId;
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
        data: showData ? [{ value: rank?.accuracy ?? 0 }] : [], 
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

  const getASROptionsFixed = (showData: boolean) => {
    const data = [...models.map(m => ({ name: m.shortName, value: asrWer[m.id] ?? 0 })), ...sttProviders.map(p => ({ name: p.name.split(" ")[0] ?? "STT", value: p.wer }))].sort((a, b) => (a.value ?? 0) - (b.value ?? 0));
    return {
      backgroundColor: "transparent",
      grid: { left: "10%", right: "10%", bottom: "20%", top: "25%", containLabel: true },
      xAxis: { type: "category", data: data.map(d => d.name ?? ""), axisLabel: { color: "#fff", fontSize: 9, rotate: 30 } },
      yAxis: { inverse: true, splitLine: { lineStyle: { color: "rgba(255,255,255,0.1)" } }, axisLabel: { color: "rgba(255,255,255,0.3)", fontSize: 9 } },
      series: [{ type: "bar", data: showData ? data.map((d, idx) => ({ value: d.value, itemStyle: { color: getPillGradient(THEME.blue[idx % 5] ?? THEME.blue[0] ?? "#172554", false), borderRadius: 20 } })) : [], barWidth: "25%", animationDuration: 1000, label: { show: true, position: "bottom", color: "#fff", fontSize: 10, formatter: "{c}%", fontWeight: '700' as const } }]
    };
  };

  const getNaturalnessOptions = (isInverted: boolean | undefined, showData: boolean) => {
    const data = rankings.map(r => ({ name: models.find(m => m.id === r.modelId)?.shortName ?? "Unknown", value: r.naturalness })).sort((a, b) => a.value - b.value);
    return {
      backgroundColor: "transparent",
      grid: { left: "10%", right: "15%", bottom: "10%", top: "20%", containLabel: true },
      xAxis: { type: "value", max: 4, splitLine: { show: false }, axisLabel: { color: isInverted ? "rgba(255,255,255,0.4)" : THEME.textDim, fontSize: 9 } },
      yAxis: { type: "category", data: data.map(d => d.name), axisLabel: { color: "#fff", fontWeight: '600', fontSize: 11 }, axisLine: { show: false }, axisTick: { show: false } },
      series: [{ type: "bar", data: showData ? data.map((d, idx) => ({ value: d.value, itemStyle: { color: isInverted ? "#fff" : getPillGradient(THEME.blue[idx % 5] ?? THEME.blue[0] ?? "#172554"), borderRadius: 20 } })) : [], barWidth: 15, animationDuration: 1000, label: { show: true, position: "right", color: "#fff", fontSize: 10, formatter: "{c}" } }]
    };
  };

  const getCorrelationOptions = (showData: boolean) => ({
    backgroundColor: "transparent",
    grid: { left: "10%", right: "10%", bottom: "15%", top: "20%", containLabel: true },
    xAxis: { min: 50, max: 100, splitLine: { lineStyle: { color: "rgba(255,255,255,0.1)" } }, axisLabel: { color: "rgba(255,255,255,0.4)", fontSize: 9 } },
    yAxis: { min: 3, max: 4, splitLine: { lineStyle: { color: "rgba(255,255,255,0.1)" } }, axisLabel: { color: "rgba(255,255,255,0.4)", fontSize: 9 } },
    series: [{ type: "scatter", symbolSize: 12, data: showData ? rankings.map(r => [r.accuracy, r.naturalness, models.find(m => m.id === r.modelId)?.shortName ?? "Unknown"]) : [], itemStyle: { color: "#fff" }, animationDuration: 1000, label: { show: true, position: "top", formatter: (p: any) => p.data[2], color: "#fff", fontSize: 8, fontWeight: '600' } }]
  });

  const chartConfigs: Record<string, { title: string, option: (showData: boolean) => any, description: string }> = {
    executive: { title: "Performance Alpha (%)", option: getExecutiveOptions, description: "Leaderboard by aggregate accuracy." },
    wheel: { title: "Capability Wheel (Avg %)", option: getWheelOptions, description: "Hierarchical performance averages." },
    heatmap: { title: "Accuracy Matrix (%)", option: getHeatmapOptions, description: "Task-level granular audit." },
    asr: { title: "ASR Comparison (WER %)", option: getASROptionsFixed, description: "STS vs Dedicated STT fidelity." },
    naturalness: { title: "Human Quality (MOS 1-5)", option: (show) => getNaturalnessOptions(true, show), description: "Audio naturalness rankings." },
    correlation: { title: "Naturalness Correlation (Acc % vs MOS)", option: getCorrelationOptions, description: "Accuracy vs Human MOS." }
  };

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
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto w-full space-y-16 md:y-24 pb-24"
      >
        
        {/* --- SECTION 1: EXECUTIVE SUMMARY --- */}
        <section className="space-y-6 md:space-y-8">
          <SectionHeader number="01" title="Executive Summary" description="Benchmark results defined by aggregate accuracy metrics." />
          
          <div className="flex flex-col gap-4">
            <ChartCard id="executive" title={chartConfigs.executive?.title ?? ""} className="w-full h-[300px] md:h-[450px]" description={chartConfigs.executive?.description ?? ""} onExpand={() => setExpandedChart('executive')} highlight inverted>
              <ScrollAnimatedChart optionFactory={getExecutiveOptions} />
            </ChartCard>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <MiniStat icon={Target} label="Accuracy Leader" value="Gemini" detail="94.2% Avg" />
                <MiniStat icon={Brain} label="Native IQ Peak" value="91.2%" detail="Gemini Reasoning" />
                <div className="hidden md:block h-full">
                  <MiniStat icon={Waves} label="STT Parity" value="1.9%" detail="STS Beats STT" className="w-full" />
                </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: CORE INTELLIGENCE --- */}
        <section className="space-y-6 md:space-y-8">
          <SectionHeader number="02" title="Core Intelligence" description="Deep audit of model reasoning and perception task-sets." />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <ChartCard id="heatmap" title={chartConfigs.heatmap?.title ?? ""} className="lg:col-span-7 h-[400px] md:h-[550px]" description={chartConfigs.heatmap?.description ?? ""} onExpand={() => setExpandedChart("heatmap")}>
              <ScrollAnimatedChart optionFactory={getHeatmapOptions} />
            </ChartCard>

            <ChartCard id="wheel" title={chartConfigs.wheel?.title ?? ""} className="lg:col-span-5 h-[400px] md:h-[550px]" description={chartConfigs.wheel?.description ?? ""} onExpand={() => setExpandedChart("wheel")}>
              <ScrollAnimatedChart optionFactory={getWheelOptions} />
            </ChartCard>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:col-span-12">
                <MiniStat icon={TrendingUp} label="Reasoning Lead" value="+14pt" detail="Gemini vs Field" />
                <MiniStat icon={Heart} label="Perception Peak" value="97.5%" detail="OpenAI Emotion" />
                <MiniStat icon={ShieldCheck} label="Understanding Ceiling" value="99.4%" detail="OpenAI SQA" />
            </div>
          </div>
        </section>

        {/* --- SECTION 3: HUMAN PERCEPTION --- */}
        <section className="space-y-6 md:space-y-8">
          <SectionHeader number="03" title="Human Perception" description="The tension between sounding human and logical accuracy." />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <ChartCard id="naturalness" title={chartConfigs.naturalness?.title ?? ""} className="lg:col-span-5 h-[300px] md:h-[350px]" onExpand={() => setExpandedChart('naturalness')} inverted>
              <ScrollAnimatedChart optionFactory={(show) => getNaturalnessOptions(true, show)} />
            </ChartCard>

            <ChartCard id="correlation" title={chartConfigs.correlation?.title ?? ""} className="lg:col-span-7 h-[300px] md:h-[350px]" onExpand={() => setExpandedChart('correlation')}>
              <ScrollAnimatedChart optionFactory={getCorrelationOptions} />
            </ChartCard>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:col-span-12">
                <div className="md:col-span-4">
                    <MiniStat icon={Headphones} label="Perception" value="3.68" detail="Max MOS Score" />
                </div>
                <motion.div variants={itemVariants} className="md:col-span-8 bg-white/1 border border-white/5 rounded-2xl p-6 md:p-8 flex items-center gap-4 md:gap-6 group hover:bg-white/2 transition-colors">
                    <div className="w-10 h-10 bg-blue-900/10 rounded-xl flex items-center justify-center shrink-0 border border-blue-900/20">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-base md:text-lg font-semibold tracking-tight text-white">The Naturalness Paradox</h4>
                        <p className="text-slate-400 leading-relaxed text-[10px] md:text-xs max-w-xl">
                            High naturalness (MOS) does not always correlate with accuracy. Models often trade logic for fluency.
                        </p>
                    </div>
                </motion.div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: PER-MODEL AUDIT --- */}
        <section className="space-y-6 md:space-y-8">
          <SectionHeader number="04" title="Model Profiles" description="Task-level performance profiles for each provider." />
          
          <div ref={modelSelectorRef} className="grid grid-cols-3 sm:grid-cols-5 gap-2 md:gap-3">
             {models.map((model) => (
               <motion.button key={model.id} variants={itemVariants} onClick={() => setSelectedModelId(model.id)} className={`bg-white/1 border border-white/5 rounded-xl p-3 md:p-4 flex flex-col items-center group transition-colors relative ${selectedModelId === model.id ? 'bg-white/3' : 'hover:bg-white/2'}`}>
                  {selectedModelId === model.id && (
                    <>
                      <motion.div layoutId="active-outline" className="absolute inset-0 border border-blue-600/50 rounded-xl z-20 pointer-events-none" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                      <motion.div layoutId="active-glow" className="absolute inset-0 bg-blue-600/10 blur-xl rounded-xl z-0 pointer-events-none" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                    </>
                  )}
                  <div className="h-10 w-10 md:h-14 md:w-14 mb-2 relative z-10">
                     <ReactECharts option={getModelRingOptions(model.id, isModelSelectorInView)} style={{ height: "100%", width: "100%" }} theme="dark" notMerge={true} />
                  </div>
                  <p className="text-[7px] md:text-[8px] font-bold tracking-wider text-slate-500 uppercase mb-0.5 relative z-10">{model.provider}</p>
                  <h4 className="font-semibold text-[9px] md:text-[10px] tracking-tight relative z-10 text-white">{model.shortName}</h4>
               </motion.button>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-6">
            <div className="lg:col-span-4 h-full">
              <div className="bg-linear-to-br from-blue-950 via-[#050505] to-black border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[250px] md:h-[350px] shadow-[0_0_50px_rgba(23,37,84,0.3)]">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selectedModelId}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div className="space-y-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-md">
                        <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white/80" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        {models.find(m => m.id === selectedModelId)?.shortName}
                      </h3>
                      <p className="text-white/40 text-[9px] md:text-[10px] uppercase font-bold tracking-widest">
                        {models.find(m => m.id === selectedModelId)?.fullName}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end border-b border-white/10 pb-3">
                        <span className="text-[8px] md:text-[9px] font-bold text-white/40 uppercase tracking-wider">Global Rank</span>
                        <span className="text-2xl md:text-3xl font-bold text-white">
                          #{rankings.find(r => r.modelId === selectedModelId)?.rank}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 md:gap-3">
                        <div className="bg-white/5 p-2 md:p-3 rounded-xl border border-white/10 text-center">
                          <p className="text-[6px] md:text-[7px] font-bold text-white/40 uppercase mb-1">ASR WER</p>
                          <p className="text-base md:text-lg font-bold text-white">{asrWer[selectedModelId] ?? 0}%</p>
                        </div>
                        <div className="bg-white/5 p-2 md:p-3 rounded-xl border border-white/10 text-center">
                          <p className="text-[6px] md:text-[7px] font-bold text-white/40 uppercase mb-1">Audio MOS</p>
                          <p className="text-base md:text-lg font-bold text-white">
                            {rankings.find(r => r.modelId === selectedModelId)?.naturalness}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <ChartCard 
              id="audit-main-panel" 
              title="Task Breakdown" 
              className="lg:col-span-8 h-[300px] md:h-[350px]" 
              onExpand={() => setExpandedChart(`audit-${selectedModelId}`)}
            >
              <ReactECharts 
                option={getModelTaskBreakdownOptions(selectedModelId, isModelSelectorInView)} 
                style={{ height: "100%", width: "100%" }} 
                theme="dark" 
                notMerge={true} 
                lazyUpdate={true}
              />
            </ChartCard>
          </div>
        </section>

        {/* --- SECTION 5: TRANSCRIPTION FIDELITY --- */}
        <section className="space-y-6 md:space-y-8 pb-24">
          <SectionHeader number="05" title="Transcription Fidelity" description="Benchmarking native STS features against dedicated layers." />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-4 grid grid-cols-1 gap-4">
                <MiniStat icon={Waves} label="Best STS WER" value="1.9%" detail="Hume EVI3" />
                <motion.div variants={itemVariants} className="bg-white/1 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-center gap-2 md:gap-3">
                    <div className="w-10 h-10 bg-blue-900/10 rounded-xl flex items-center justify-center shrink-0 border border-blue-900/20 mb-1">
                        <Layers className="w-5 h-5 text-blue-600" />
                    </div>
                    <h5 className="text-base md:text-lg font-semibold text-white">Unified Processing</h5>
                    <p className="text-[9px] md:text-[10px] text-slate-500 leading-relaxed">Native STS models now achieve dialogue comprehension parity with dedicated STT specialists, enabling more efficient unified pipelines.</p>
                </motion.div>
            </div>
            <ChartCard id="asr" title={chartConfigs.asr?.title ?? ""} className="lg:col-span-8 h-full min-h-[350px]" onExpand={() => setExpandedChart('asr')}>
              <ScrollAnimatedChart optionFactory={getASROptionsFixed} />
            </ChartCard>
          </div>
        </section>

        {/* Expanded View Overlay */}
        <AnimatePresence>
          {expandedChart && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.3 }} 
              className="fixed inset-0 z-100 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-start pt-36 md:pt-40 pb-20 overflow-y-auto custom-scrollbar"
            >
              <div className="w-full max-w-5xl px-6 md:px-10 flex flex-col space-y-12">
                <div className="flex justify-between items-start border-b border-white/5 pb-10">
                  <div className="space-y-2">
                    <h3 className="text-blue-600 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">Deep Audit View</h3>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                      {expandedChart.startsWith('audit-') ? 'Model Breakdown' : chartConfigs[expandedChart]?.title}
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base font-medium max-w-2xl">
                      {expandedChart.startsWith('audit-') ? `Granular task performance audit for ${models.find(m => m.id === selectedModelId)?.name}.` : chartConfigs[expandedChart]?.description}
                    </p>
                  </div>
                  <button 
                    onClick={() => setExpandedChart(null)} 
                    className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all shrink-0 ml-4 group"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-white" />
                  </button>
                </div>

                <div className="w-full min-h-[500px] md:h-[600px] bg-white/1 border border-white/5 rounded-[2.5rem] p-4 md:p-12 relative overflow-hidden shadow-2xl">
                  <ReactECharts 
                    option={expandedChart.startsWith('audit-') ? getModelTaskBreakdownOptions(selectedModelId, true) : chartConfigs[expandedChart]?.option(true)} 
                    style={{ height: "100%", width: "100%" }} 
                    theme="dark" 
                    notMerge={true} 
                  />
                  <div className="absolute inset-0 bg-grid-white opacity-[0.005] pointer-events-none" />
                </div>

                {/* Insight Footer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Precision", value: "99.8%", detail: "Statistically significant sample size." },
                    { label: "Normalization", value: "Standardized", detail: "Weighted against text baseline." },
                    { label: "Environment", value: "Production", detail: "Evaluated under real latency." },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white/1 border border-white/5 p-6 rounded-2xl space-y-1">
                      <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-white font-bold text-xl">{stat.value}</p>
                      <p className="text-slate-500 text-[10px] font-medium leading-relaxed">{stat.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}

function SectionHeader({ number, title, description, noBorder }: any) {
  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div variants={itemVariants} className={`flex flex-col gap-2 ${noBorder ? '' : 'border-b border-white/5 pb-4 md:pb-6'} w-full`}>
      <div className="flex items-center gap-3">
        <span className="text-blue-600 font-mono text-[10px] md:text-xs font-bold">[{number}]</span>
        <h2 className="text-lg md:text-xl font-bold tracking-tight uppercase text-white">{title}</h2>
      </div>
      <p className="text-slate-500 font-medium text-[10px] md:text-[11px] max-w-xl">{description}</p>
    </motion.div>
  );
}

function MiniStat({ icon: Icon, label, value, detail, className }: any) {
  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div variants={itemVariants} className={`bg-white/1 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-center group hover:bg-white/2 transition-colors relative overflow-hidden h-full ${className}`}>
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

function ChartCard({ id, title, className, description, onExpand, highlight, toggle, children, inverted }: any) {
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
      
      {/* Overlay Header */}
      <div className="absolute top-6 md:top-8 left-6 md:left-8 right-6 md:right-8 flex justify-between items-start z-20 pointer-events-none">
        <div className="space-y-1 pointer-events-auto flex-1 mr-4">
          <h3 className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] ${inverted ? 'text-white/60' : 'text-slate-500'}`}>{title}</h3>
          {description && <p className={`text-[8px] md:text-[9px] font-semibold uppercase tracking-tight line-clamp-2 ${inverted ? 'text-white/40' : 'text-slate-600'}`}>{description}</p>}
        </div>
        <div className="flex items-center gap-3 pointer-events-auto shrink-0">
          {toggle}
          <button onClick={onExpand} className={`w-7 h-7 md:w-8 md:h-8 border rounded-lg flex items-center justify-center hover:scale-105 transition-all group/btn shadow-xl backdrop-blur-md 
              ${inverted ? 'bg-white/10 border-white/20' : 'bg-white/3 border-white/10 hover:bg-white/10'}`}>
            <Maximize2 className={`w-3 h-3 md:w-3.5 md:h-3.5 transition-colors ${inverted ? 'text-white/60 group-hover/btn:text-white' : 'text-slate-500 group-hover/btn:text-white'}`} />
          </button>
        </div>
      </div>
      
      {/* Content Container - Truly centered using Flexbox */}
      <div className="w-full h-full flex items-center justify-center p-4 md:p-8 pt-10 md:pt-12 relative z-10 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
            {children}
        </div>
      </div>

      <div className="absolute inset-0 bg-grid-white opacity-[0.005] pointer-events-none" />
    </motion.div>
  );
}

// Custom wrapper that triggers ECharts internal animation only when scrolled into view
function ScrollAnimatedChart({ optionFactory }: { optionFactory: (showData: boolean) => any }) {
    const ref = useRef(null);
    const [hasBeenSeen, setHasBeenSeen] = useState(false);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Use an effect to safely update state when the component scrolls into view
    React.useEffect(() => {
        if (isInView && !hasBeenSeen) {
            setHasBeenSeen(true);
        }
    }, [isInView, hasBeenSeen]);

    const currentOption = useMemo(() => optionFactory(hasBeenSeen), [hasBeenSeen, optionFactory]);

    return (
        <div ref={ref} className="w-full h-full">
            <ReactECharts option={currentOption} style={{ height: "100%", width: "100%" }} theme="dark" notMerge={true} lazyUpdate={true} />
        </div>
    );
}
