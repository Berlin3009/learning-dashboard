"use client";

import { motion } from "framer-motion";
import { Wrench, Sparkles } from "lucide-react";

export default function UnderConstruction({ tabName }: { tabName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full h-[70vh] flex flex-col items-center justify-center rounded-3xl bg-[#0a0a0a] border border-white/5 relative overflow-hidden"
    >
      {/* Premium Background Glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Grain Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="p-4 rounded-3xl bg-white/5 border border-white/10 mb-6 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
          <Wrench className="w-10 h-10 text-cyan-400" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight capitalize flex items-center gap-3">
          {tabName} <Sparkles className="w-6 h-6 text-purple-400" />
        </h2>
        
        <p className="text-neutral-400 max-w-md text-sm md:text-base leading-relaxed">
          We are currently engineering this module. Check back soon for high-performance updates and new features.
        </p>
      </div>
    </motion.div>
  );
}