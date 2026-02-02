export interface HarmoniqData {
  meta: {
    title: string;
    subtitle: string;
    description: string;
    stats: {
      totalSamples: number;
      productionAPIs: number;
      tasks: number;
      runtime: string;
      errorRate: number;
      llmJudgeCalls: number;
    };
    lastUpdated: string;
  };
  colors: Record<string, string>;
  models: {
    id: string;
    name: string;
    shortName: string;
    provider: string;
    fullName: string;
    type: string;
    color: string;
  }[];
  sttProviders: {
    id: string;
    name: string;
    wer: number;
    color: string;
  }[];
  tasks: {
    id: string;
    name: string;
    abbreviation: string;
    type: string;
    dataset: string;
    description: string;
  }[];
  rankings: {
    rank: number;
    modelId: string;
    accuracy: number;
    naturalness: number;
    responseTime: number;
    reliability: number;
  }[];
  accuracyByTask: Record<string, Record<string, number>>;
  asrWer: Record<string, number>;
  responseTimeDetails: Record<string, { avg: number; median: number; p95: number }>;
  reliabilityDetails: Record<string, { totalCalls: number; successRate: number }>;
  recommendations: {
    useCase: string;
    modelId: string;
    alternateModelId?: string;
    reason: string;
  }[];
  keyInsights: {
    id: string;
    title: string;
    summary: string;
    highlight?: string;
    data?: Record<string, number>;
  }[];
  credits: {
    developer: string;
    speechReasoningSource: string;
    speechReasoningUrl: string;
    evaluationMethod: string;
    naturalnessMethod: string;
  };
}

export const HARMONIQ_DATA: HarmoniqData = {
  "meta": {
    "title": "Harmoniq",
    "subtitle": "Benchmarking Voice AI the Way Users Actually Experience It",
    "description": "The first benchmark designed to evaluate speech-to-speech AI models under real-world conditions.",
    "stats": {
      "totalSamples": 13205,
      "productionAPIs": 5,
      "tasks": 8,
      "runtime": "14h 45m",
      "errorRate": 0.0012,
      "llmJudgeCalls": 38000
    },
    "lastUpdated": "2025-01-30"
  },
  "colors": {
    "OpenAI": "#10a37f",
    "Gemini": "#4285f4",
    "Grok": "#1da1f2",
    "Hume": "#ff6b6b",
    "Ultravox": "#9b59b6",
    "Cartesia": "#f39c12",
    "ElevenLabs": "#2ecc71",
    "Deepgram": "#3498db"
  },
  "models": [
    {
      "id": "openai",
      "name": "OpenAI Realtime",
      "shortName": "OpenAI",
      "provider": "OpenAI",
      "fullName": "GPT-4o Realtime",
      "type": "sts",
      "color": "#10a37f"
    },
    {
      "id": "gemini",
      "name": "Gemini Live",
      "shortName": "Gemini",
      "provider": "Google",
      "fullName": "Gemini 2.5 Flash Live",
      "type": "sts",
      "color": "#4285f4"
    },
    {
      "id": "grok",
      "name": "Grok Realtime",
      "shortName": "Grok",
      "provider": "xAI",
      "fullName": "Grok 2 Realtime",
      "type": "sts",
      "color": "#1da1f2"
    },
    {
      "id": "hume",
      "name": "Hume EVI3",
      "shortName": "Hume",
      "provider": "Hume",
      "fullName": "Hume EVI3",
      "type": "sts",
      "color": "#ff6b6b"
    },
    {
      "id": "ultravox",
      "name": "Ultravox",
      "shortName": "Ultravox",
      "provider": "Fixie",
      "fullName": "Ultravox",
      "type": "sts",
      "color": "#9b59b6"
    }
  ],
  "sttProviders": [
    {
      "id": "elevenlabs",
      "name": "ElevenLabs Scribe",
      "wer": 3.1,
      "color": "#2ecc71"
    },
    {
      "id": "cartesia",
      "name": "Cartesia Ink",
      "wer": 3.2,
      "color": "#f39c12"
    },
    {
      "id": "deepgram",
      "name": "Deepgram Nova-2",
      "wer": 4.5,
      "color": "#3498db"
    }
  ],
  "tasks": [
    {
      "id": "er",
      "name": "Emotion Recognition",
      "abbreviation": "ER",
      "type": "voice_understanding",
      "dataset": "Midcentury-ER",
      "description": "Detect emotion from speech"
    },
    {
      "id": "gr",
      "name": "Gender Recognition",
      "abbreviation": "GR",
      "type": "voice_understanding",
      "dataset": "Midcentury-GR",
      "description": "Identify speaker gender"
    },
    {
      "id": "sqa",
      "name": "Spoken Question Answering",
      "abbreviation": "SQA",
      "type": "speech_understanding",
      "dataset": "Midcentury-SQA",
      "description": "Answer spoken questions"
    },
    {
      "id": "asr",
      "name": "Speech Recognition",
      "abbreviation": "ASR",
      "type": "speech_understanding",
      "dataset": "LibriSpeech",
      "description": "Transcription accuracy (100 - WER%)"
    },
    {
      "id": "ff",
      "name": "Formal Fallacies",
      "abbreviation": "FF",
      "type": "speech_reasoning",
      "dataset": "Big Bench Audio",
      "description": "Detect logical fallacies"
    },
    {
      "id": "na",
      "name": "Navigate",
      "abbreviation": "Na",
      "type": "speech_reasoning",
      "dataset": "Big Bench Audio",
      "description": "Spatial reasoning"
    },
    {
      "id": "oc",
      "name": "Object Counting",
      "abbreviation": "OC",
      "type": "speech_reasoning",
      "dataset": "Big Bench Audio",
      "description": "Count entities"
    },
    {
      "id": "wol",
      "name": "Web of Lies",
      "abbreviation": "WoL",
      "type": "speech_reasoning",
      "dataset": "Big Bench Audio",
      "description": "Track truth values"
    }
  ],
  "rankings": [
    {
      "rank": 1,
      "modelId": "gemini",
      "accuracy": 94.2,
      "naturalness": 3.68,
      "responseTime": 26.72,
      "reliability": 94.8
    },
    {
      "rank": 2,
      "modelId": "openai",
      "accuracy": 82.2,
      "naturalness": 3.35,
      "responseTime": 12.75,
      "reliability": 100.0
    },
    {
      "rank": 3,
      "modelId": "grok",
      "accuracy": 80.4,
      "naturalness": 3.34,
      "responseTime": 12.97,
      "reliability": 100.0
    },
    {
      "rank": 4,
      "modelId": "ultravox",
      "accuracy": 75.1,
      "naturalness": 3.30,
      "responseTime": 37.63,
      "reliability": 100.0
    },
    {
      "rank": 5,
      "modelId": "hume",
      "accuracy": 57.3,
      "naturalness": 3.59,
      "responseTime": 38.64,
      "reliability": 96.7
    }
  ],
  "accuracyByTask": {
    "openai": {
      "er": 97.5,
      "gr": 90.1,
      "sqa": 99.0,
      "asr": 97.5,
      "ff": 68.3,
      "na": 64.7,
      "oc": 71.4,
      "wol": 69.2
    },
    "gemini": {
      "er": 94.0,
      "gr": 98.8,
      "sqa": 98.6,
      "asr": 97.0,
      "ff": 89.8,
      "na": 88.9,
      "oc": 94.2,
      "wol": 91.9
    },
    "grok": {
      "er": 89.6,
      "gr": 50.5,
      "sqa": 99.4,
      "asr": 96.8,
      "ff": 66.5,
      "na": 82.7,
      "oc": 77.9,
      "wol": 79.4
    },
    "hume": {
      "er": 59.2,
      "gr": 46.0,
      "sqa": 95.4,
      "asr": 98.1,
      "ff": 38.5,
      "na": 36.0,
      "oc": 31.4,
      "wol": 53.6
    },
    "ultravox": {
      "er": 93.7,
      "gr": 48.1,
      "sqa": 99.5,
      "asr": 95.7,
      "ff": 67.3,
      "na": 58.3,
      "oc": 70.6,
      "wol": 67.3
    }
  },
  "asrWer": {
    "hume": 1.9,
    "openai": 2.5,
    "gemini": 3.0,
    "grok": 3.2,
    "ultravox": 4.3
  },
  "responseTimeDetails": {
    "openai": { "avg": 12.75, "median": 11.44, "p95": 20.76 },
    "gemini": { "avg": 26.72, "median": 25.79, "p95": 44.40 },
    "grok": { "avg": 12.97, "median": 11.07, "p95": 21.96 },
    "hume": { "avg": 38.64, "median": 37.11, "p95": 57.71 },
    "ultravox": { "avg": 37.63, "median": 31.83, "p95": 61.22 }
  },
  "reliabilityDetails": {
    "openai": { "totalCalls": 2359, "successRate": 100.0 },
    "gemini": { "totalCalls": 2354, "successRate": 94.8 },
    "grok": { "totalCalls": 2361, "successRate": 100.0 },
    "hume": { "totalCalls": 2360, "successRate": 96.7 },
    "ultravox": { "totalCalls": 2361, "successRate": 100.0 }
  },
  "recommendations": [
    {
      "useCase": "General accuracy",
      "modelId": "gemini",
      "reason": "Highest overall (94.2%)"
    },
    {
      "useCase": "Low latency",
      "modelId": "openai",
      "alternateModelId": "grok",
      "reason": "12-13s response time"
    },
    {
      "useCase": "High reliability",
      "modelId": "openai",
      "alternateModelId": "grok",
      "reason": "100% success rate"
    },
    {
      "useCase": "Best ASR quality",
      "modelId": "hume",
      "alternateModelId": "openai",
      "reason": "1.9-2.5% WER, beats dedicated STT"
    },
    {
      "useCase": "Emotional perception",
      "modelId": "openai",
      "reason": "Best ER accuracy (97.5%)"
    },
    {
      "useCase": "Cost-sensitive",
      "modelId": "ultravox",
      "reason": "Open-weight, self-hostable"
    },
    {
      "useCase": "Empathetic conversation",
      "modelId": "hume",
      "reason": "High naturalness, designed for connection"
    }
  ],
  "keyInsights": [
    {
      "id": "reasoning-gap",
      "title": "The Speech Reasoning Gap Is Closable",
      "summary": "Gemini outperforms by 14+ percentage points on reasoning tasks, proving audio models don't have to sacrifice intelligence.",
      "data": {
        "geminiReasoningAvg": 91.2,
        "openaiReasoningAvg": 68.4,
        "grokReasoningAvg": 76.6,
        "ultravoxReasoningAvg": 65.9,
        "humeReasoningAvg": 39.9
      }
    },
    {
      "id": "voice-understanding",
      "title": "Voice Understanding Reveals Capability Gaps",
      "summary": "OpenAI leads emotion recognition (97.5%), but Grok, Ultravox, and Hume hover around 50% for gender recognition—essentially random chance.",
      "highlight": "Models that can't extract basic speaker attributes may be missing other paralinguistic information."
    },
    {
      "id": "sqa-saturated",
      "title": "SQA Is Saturated, ASR Is Competitive",
      "summary": "All models achieve 95%+ on SQA—no longer differentiating. STS models include built-in ASR that rivals dedicated STT providers.",
      "highlight": "Hume's 1.9% WER beats all dedicated STT providers tested."
    },
    {
      "id": "speed-accuracy",
      "title": "Speed vs Accuracy Trade-off",
      "summary": "OpenAI and Grok respond 3x faster than the slowest models, but Gemini is most accurate.",
      "highlight": "No model is simultaneously fastest AND most accurate—yet."
    },
    {
      "id": "naturalness-uncorrelated",
      "title": "Naturalness and Accuracy Are Uncorrelated",
      "summary": "Hume achieves high naturalness (3.59 MOS) despite lower accuracy, while Gemini achieves both.",
      "highlight": "Don't assume a natural-sounding model is accurate, or vice versa."
    },
    {
      "id": "reliability",
      "title": "Reliability Varies Across Providers",
      "summary": "OpenAI, Grok, and Ultravox never fail to produce audio. Gemini's 5.2% failure rate means occasional silent responses.",
      "highlight": "For high-reliability applications, perfect uptime may outweigh accuracy advantages."
    }
  ],
  "credits": {
    "developer": "Midcentury",
    "speechReasoningSource": "Big Bench Audio by Artificial Analysis",
    "speechReasoningUrl": "https://huggingface.co/blog/big-bench-audio-release",
    "evaluationMethod": "3-judge LLM panel (GPT-4.1, Claude Sonnet, Gemini Flash)",
    "naturalnessMethod": "UTMOSv2"
  }
};
