"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  Mic, 
  Speaker, 
  History,
  Activity,
  AudioLines,
  CheckCircle2, 
  XCircle, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Info
} from "lucide-react";
import BrandIcon from "./BrandIcon";

interface ModelResponse {
  modelId: string;
  modelName: string;
  path: string;
  prediction: string;
  isCorrect: boolean;
}

interface EvidenceSample {
  sample_id: string;
  ground_truth: string;
  why_selected: string;
  input_audio_path: string;
  outputs: ModelResponse[];
}

export interface AudioAnalysisStudioProps {
  samples: EvidenceSample[];
  activeTaskId: string;
  datasetName?: string;
}

export default function AudioAnalysisStudio({ samples, activeTaskId, datasetName }: AudioAnalysisStudioProps) {
  const [currentSampleIdx, setCurrentSampleIdx] = useState(0);
  const [activeId, setActiveId] = useState<string>("input");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const currentSample = useMemo(() => samples?.[currentSampleIdx] || null, [samples, currentSampleIdx]);

  const activeOutput = useMemo(() => currentSample?.outputs.find(o => o.modelId === activeId), [activeId, currentSample]);

  const activeAudioPath = useMemo(() => {
    if (!currentSample) return "";
    if (activeId === "input") return `/audio_evidence/${currentSample.input_audio_path}`;
    const output = currentSample.outputs.find(o => o.modelId === activeId);
    return output ? `/audio_evidence/${output.path}` : "";
  }, [activeId, currentSample]);

  // 1. Handle Source Changes Separately
  useEffect(() => {
    if (audioRef.current && activeAudioPath) {
      const audio = audioRef.current;
      audio.pause();
      audio.src = activeAudioPath;
      audio.load();
      setProgress(0);
    }
  }, [activeAudioPath]);

  // 2. Handle Play/Pause Commands Safely
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !activeAudioPath) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          if (error.name !== "AbortError") {
            console.error("Playback failed:", error);
          }
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, activeAudioPath]);

  // Reset sample index when task changes
  useEffect(() => {
    setCurrentSampleIdx(0);
  }, [activeTaskId]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const bar = progressBarRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || !audio.duration) return;
    
    const rect = bar.getBoundingClientRect();
    let clientX = 0;
    if ('touches' in e) {
      const touchEvent = e as unknown as React.TouchEvent;
      const touch = touchEvent.touches?.[0];
      if (touch) {
        clientX = touch.clientX;
      } else {
        return;
      }
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }
    
    const x = clientX - rect.left;
    const p = Math.max(0, Math.min(1, x / rect.width));
    audio.currentTime = p * audio.duration;
    setProgress(p * 100);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!currentSample || !samples) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row min-h-[440px] relative">
      {/* Sidebar: Source List */}
      <div className="w-full md:w-72 bg-slate-50 border-r border-slate-100 p-4 flex flex-col gap-4 shrink-0 h-full overflow-y-auto">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Sample Case</p>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">Archive {currentSampleIdx + 1} of {samples.length}</h4>
              <div className="flex gap-1">
                <button 
                  disabled={currentSampleIdx === 0}
                  onClick={() => setCurrentSampleIdx(i => i - 1)}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                </button>
                <button 
                  disabled={currentSampleIdx === samples.length - 1}
                  onClick={() => setCurrentSampleIdx(i => i + 1)}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50/50 border border-blue-100/50 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-3 h-3 text-blue-500" />
              <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest">Selection Logic</p>
            </div>
            <p className="text-[10px] text-slate-600 leading-relaxed font-medium">"{currentSample.why_selected}"</p>
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
          <SourceButton 
            id="input"
            label="Input Source"
            sublabel="Ground Truth"
            isActive={activeId === "input"}
            onClick={() => setActiveId("input")}
            icon={<Mic className="w-3.5 h-3.5" />}
          />
          
          <div className="pt-4 pb-2">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2">Model Inferences</p>
          </div>

          {currentSample.outputs.map((out) => (
            <SourceButton 
              key={out.modelId}
              id={out.modelId}
              label={out.modelName}
              sublabel={out.isCorrect ? "Validated" : "Failure"}
              isActive={activeId === out.modelId}
              onClick={() => setActiveId(out.modelId)}
              icon={<BrandIcon brandId={out.modelId} size={14} className={activeId === out.modelId ? "text-white" : "text-slate-400"} />}
              isCorrect={out.isCorrect}
              indicator={out.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <XCircle className="w-3.5 h-3.5 text-rose-500" />}
            />
          ))}
        </div>

        <div className="bg-blue-600 border border-blue-700 rounded-2xl p-4 space-y-2 shadow-lg shadow-blue-100 ring-1 ring-white/20">
          <p className="text-[9px] font-bold text-blue-100 uppercase tracking-widest">Verified Label</p>
          <p className="text-sm font-black text-white uppercase tracking-tight drop-shadow-sm">{currentSample.ground_truth}</p>
        </div>
      </div>

      {/* Main Content: Player & Waveform */}
      <div className="flex-1 flex flex-col bg-white min-w-0">
        {/* Analysis Header */}
        <div className="px-8 py-3 border-b border-slate-100 flex justify-between items-center text-pretty">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AudioLines className="w-4 h-4 text-blue-600" />
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Signal Analysis Engine</p>
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight truncate max-w-[400px]">
              {activeId === "input" ? "Reference Spectrum" : `${activeOutput?.modelName} Inference`}
            </h3>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4 px-12 bg-slate-50/20 overflow-hidden">
          <div className="w-full max-w-lg h-24 bg-white border border-slate-100 rounded-4xl relative overflow-hidden shadow-inner flex items-center justify-center px-10">
             <div className="flex items-center gap-3 h-12">
               {Array.from({ length: 24 }).map((_, i) => (
                 <motion.div
                   key={i}
                   className="w-1.5 rounded-full bg-blue-600"
                   initial={{ height: 6, opacity: 0.2 }}
                   animate={isPlaying ? {
                     height: [6, 20, 40, 10, 30, 6],
                     opacity: 1,
                     backgroundColor: ["#2563eb", "#6366f1", "#2563eb"]
                   } : { 
                     height: 6,
                     opacity: 0.2,
                     backgroundColor: "#cbd5e1"
                   }}
                   transition={isPlaying ? {
                     duration: 1.2,
                     repeat: Infinity,
                     ease: "easeInOut",
                     delay: i * 0.05
                   } : { duration: 0.3 }}
                 />
               ))}
             </div>

             {/* Scrubbing Interaction Area */}
             <div 
               ref={progressBarRef}
               onMouseDown={handleScrub}
               className="absolute inset-0 z-20 cursor-crosshair"
             />
          </div>

          <div className="mt-6 flex flex-col items-center gap-4 w-full max-w-md">
            <button 
              onClick={togglePlay}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95 group/play ${
                isPlaying ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white border border-slate-200 text-slate-900 hover:border-blue-200 hover:text-blue-600'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>

            {/* Separate Scrubber Bar */}
            <div className="w-full space-y-2">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden relative group/scrub cursor-pointer" onMouseDown={handleScrub}>
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                 <span className={isPlaying ? "text-blue-600" : ""}>{formatTime(audioRef.current?.currentTime || 0)}</span>
                 <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Inference / Reference Banner */}
        <AnimatePresence mode="wait">
          {activeId !== "input" ? (
            <motion.div 
              key="output"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-4 bg-white border-t border-slate-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <BrandIcon brandId={activeId} size={16} className="text-slate-900" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em]">Model Reasoning</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{activeOutput?.modelName} Output</p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border shadow-sm ${activeOutput?.isCorrect ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
                   {activeOutput?.isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                   <span className="text-[9px] font-black uppercase tracking-widest">{activeOutput?.isCorrect ? 'Validated' : 'Failure'}</span>
                </div>
              </div>
              <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3 min-h-[60px] max-h-[100px] overflow-y-auto custom-scrollbar shadow-inner">
                 <p className="text-sm font-bold leading-relaxed text-slate-700">
                   {activeOutput?.prediction}
                 </p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-6 bg-slate-50/50 border-t border-slate-100"
            >
               <div className="flex items-center gap-8">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    <History className="w-7 h-7 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Audio Reference</p>
                    <p className="text-base font-bold text-slate-900 tracking-tight leading-tight">
                      Verified sample source from the <span className="text-blue-600 uppercase">{datasetName || "Harmoniq Core"}</span> benchmark dataset.
                    </p>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}

function SourceButton({ id, label, sublabel, isActive, onClick, icon, isCorrect, indicator }: any) {
  const isInput = id === "input";
  
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-2xl transition-all border flex items-center gap-4 group/btn relative ${
        isActive 
          ? "bg-white border-blue-100 shadow-xl ring-1 ring-blue-50/50" 
          : "bg-transparent border-transparent hover:bg-white hover:border-slate-200"
      }`}
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
        isActive 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
          : "bg-white border border-slate-200 text-slate-400 shadow-sm"
      }`}>
        {icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-black truncate mb-0.5 ${isActive ? 'text-slate-900' : 'text-slate-600'} transition-colors`}>
          {label}
        </p>
        <div className="flex items-center gap-2">
          <p className={`text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
            isActive 
              ? (isInput ? 'text-blue-600 drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]' : (isCorrect ? 'text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]')) 
              : 'text-slate-400'
          }`}>
            {sublabel}
          </p>
          <div className={`transition-all duration-300 ${isActive ? 'scale-110 opacity-100' : 'scale-90 opacity-100'}`}>
              {indicator}
            </div>
        </div>
      </div>

      <div className="w-1.5 h-1.5 flex items-center justify-center">
        {isActive && (
          <motion.div 
            layoutId="active-source-indicator" 
            className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" 
          />
        )}
      </div>
    </button>
  );
}
