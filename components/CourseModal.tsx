"use client";

import { motion } from "framer-motion";
import { X, PlayCircle, CheckCircle2, Clock, Layers, Shield, Play, Code, Network } from "lucide-react";
import { Course } from "@/types";

const iconMap: Record<string, any> = {
  React: Code,
  Layers: Layers,
  Motion: Play,
  Shield: Shield,
  Network: Network,
};

const moduleSyllabus = [
  { id: 1, title: "Introduction & Core Theory", duration: "12m", completed: true },
  { id: 2, title: "Architecture & Best Practices", duration: "25m", completed: true },
  { id: 3, title: "Practical Implementation", duration: "45m", completed: false },
  { id: 4, title: "Advanced Techniques & Optimization", duration: "30m", completed: false },
];

interface CourseModalProps {
  course: Course;
  onClose: () => void;
}

export default function CourseModal({ course, onClose }: CourseModalProps) {
  const IconComponent = iconMap[course.icon_name] || Layers;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="absolute inset-0 border-t border-white/10 rounded-[32px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="p-6 pb-0 flex justify-between items-start relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-cyan-400 shadow-inner">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">{course.title}</h2>
              <p className="text-xs text-neutral-400 mt-1 font-medium tracking-wide uppercase">Module Details</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 relative z-10">
          <div className="mb-8 bg-black/40 border border-white/5 p-4 rounded-2xl">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-white/80">Course Progress</span>
              <span className="text-lg font-bold text-cyan-400">{course.progress}%</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
              />
            </div>
          </div>

          <h3 className="text-xs text-white/50 tracking-widest uppercase mb-4 font-semibold">Syllabus Overview</h3>
          <ul className="space-y-2 mb-8">
            {moduleSyllabus.map((lesson) => (
              <li 
                key={lesson.id} 
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5"
              >
                <div className="flex items-center gap-3">
                  {lesson.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <PlayCircle className="w-5 h-5 text-neutral-600 group-hover:text-purple-400 transition-colors" />
                  )}
                  <span className={`text-sm font-medium transition-colors ${lesson.completed ? "text-white/50" : "text-white/90 group-hover:text-white"}`}>
                    {lesson.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium tracking-wide">
                  <Clock className="w-3.5 h-3.5" />
                  {lesson.duration}
                </div>
              </li>
            ))}
          </ul>

          <button className="w-full py-3.5 rounded-xl bg-white text-black font-bold tracking-wide hover:bg-cyan-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Resume Module
          </button>
        </div>
      </motion.div>
    </div>
  );
}