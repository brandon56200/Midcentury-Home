"use client";

import { motion } from "framer-motion";
import { 
  Database, 
  Cpu, 
  Network, 
  Share2, 
  Search, 
  Lock 
} from "lucide-react";

const features = [
  {
    name: "Unified Processing",
    description: "Seamlessly ingest text, image, audio, and video data into a single vector-native pipeline.",
    icon: Database,
  },
  {
    name: "AI-First Infrastructure",
    description: "Hardware-accelerated preprocessing optimized for modern LLMs and vision models.",
    icon: Cpu,
  },
  {
    name: "Distributed Mesh",
    description: "Scale your data operations across global nodes with near-zero orchestration overhead.",
    icon: Network,
  },
  {
    name: "Real-time Synthesis",
    description: "Transform raw signals into actionable intelligence as it happens, at petabyte scale.",
    icon: Share2,
  },
  {
    name: "Semantic Discovery",
    description: "Deep content understanding that goes beyond keywords, powered by our custom embeddings.",
    icon: Search,
  },
  {
    name: "Sovereign Security",
    description: "End-to-end encryption and compliance that meets the highest enterprise standards.",
    icon: Lock,
  },
];

export default function Features() {
  return (
    <div id="solutions" className="py-24 sm:py-32 bg-black relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">The Platform</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need for multimodal scale
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Stop worrying about data silos. Our platform treats every data format as a first-class citizen,
            allowing you to focus on building the future.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col glass p-8 rounded-3xl hover:border-indigo-500/50 transition-colors group"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

