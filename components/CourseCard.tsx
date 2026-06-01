"use client";

import { motion } from "framer-motion";
import { Layers, Shield, Play, Code, Network } from "lucide-react";
import { Course } from "@/types";

const iconMap: Record<string, any> = {
  React: Code,
  Layers: Layers,
  Motion: Play,
  Shield: Shield,
  Network: Network,
};

// 1. Added onClick to the props interface
export default function CourseCard({ course, onClick }: { course: Course; onClick?: () => void }) {
  const IconComponent = iconMap[course.icon_name] || Layers;
  const radius = 12; 
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.article 
      onClick={onClick} // 2. Attached the onClick handler
      whileHover={{ scale: 1.03 }} 
      // 3. Added cursor-pointer to the className
      className="relative group rounded-[20px] p-[1px] overflow-hidden min-h-[120px] h-full flex flex-col transform-gpu cursor-pointer"
    >
      <div className="absolute inset-0 bg-white/10" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-400 via-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative h-full w-full bg-[#0a0a0a] rounded-[19px] p-4 flex flex-col justify-between overflow-hidden flex-1 z-10">
        
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-gradient-to-b from-cyan-500/20 to-purple-500/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="flex justify-between items-start z-10">
          <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-white/60 group-hover:text-white group-hover:bg-white/10 transition-colors duration-300">
            <IconComponent className="w-4 h-4" />
          </div>

          <div className="relative flex items-center justify-center w-8 h-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r={radius} className="stroke-white/10" strokeWidth="2.5" fill="none" />
              <motion.circle
                cx="14"
                cy="14"
                r={radius}
                className="stroke-[url(#progressGradient)]"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - (course.progress / 100) * circumference }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
                strokeDasharray={circumference}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute text-[9px] font-bold text-white drop-shadow-md">
              {course.progress}
            </span>
          </div>
        </div>

        <div className="mt-3 z-10 flex flex-col justify-end">
          <h3 className="font-medium text-sm text-white/80 group-hover:text-white line-clamp-2 leading-snug transition-colors duration-300">
            {course.title}
          </h3>
        </div>
      </div>
    </motion.article>
  );
}