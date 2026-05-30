"use client";

import { motion } from "framer-motion";
import { Layers, Shield, Play, Code } from "lucide-react";
import { Course } from "@/types";

// Map the string from Supabase to an actual Lucide Icon component
const iconMap: Record<string, any> = {
  React: Code,
  Layers: Layers,
  Motion: Play,
  Shield: Shield,
};

export default function CourseCard({ course }: { course: Course }) {
  const IconComponent = iconMap[course.icon_name] || Layers;

  return (
    <article className="relative group p-6 rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden flex flex-col justify-between min-h-[200px]">
      
      {/* Subtle hover glow requirement */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />

      <div className="flex items-center gap-4 z-10">
        <div className="p-3 rounded-2xl bg-white/10 border border-white/10 text-white">
          <IconComponent className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-lg text-white/90">{course.title}</h3>
      </div>

      <div className="mt-6 z-10">
        <div className="flex justify-between text-sm font-medium mb-2">
          <span className="text-neutral-400">Progress</span>
          <span className="text-white">{course.progress}%</span>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
            className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        </div>
      </div>
    </article>
  );
}