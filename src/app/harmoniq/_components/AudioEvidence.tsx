"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Mic, Speaker, PlayCircle } from "lucide-react";

interface AudioEvidenceProps {
  inputPath: string;
  outputs: {
    modelId: string;
    modelName: string;
    path: string;
    prediction: string;
  }[];
}

export default function AudioEvidence({ inputPath, outputs }: AudioEvidenceProps) {
  const [activeAudio, setActiveAudio] = useState<{ type: 'input' | 'output', id?: string } | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (type: 'input' | 'output', id?: string, path?: string) => {
    if (activeAudio?.type === type && activeAudio?.id === id) {
      if (audioRef.current) {
        if (audioRef.current.paused) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
          setActiveAudio(null);
        }
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setActiveAudio({ type, id });
      const fullPath = `/audio_evidence/${path || inputPath}`;
      const audio = new Audio(fullPath);
      audioRef.current = audio;
      audio.play();
      audio.onended = () => setActiveAudio(null);
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Input Sample */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between group hover:bg-white hover:shadow-sm transition-all">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Input Sample</p>
            <p className="text-sm font-bold text-slate-900">Original Recording</p>
          </div>
        </div>
        <button 
          onClick={() => togglePlay('input')}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-all text-slate-600 hover:text-blue-600"
        >
          {activeAudio?.type === 'input' ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
        </button>
      </div>

      {/* Model Outputs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {outputs.map((out) => (
          <div key={out.modelId} className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col gap-3 group hover:border-blue-200 transition-all shadow-xs">
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">{out.modelName}</span>
              <button 
                onClick={() => togglePlay('output', out.modelId, out.path)}
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                {activeAudio?.id === out.modelId ? <Pause className="w-4 h-4 fill-current" /> : <PlayCircle className="w-4 h-4 fill-current" />}
              </button>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 min-h-[60px] max-h-[100px] overflow-y-auto custom-scrollbar">
              <p className="text-[9px] text-slate-600 leading-relaxed italic">"{out.prediction}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
