"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, BarChart2, TrendingUp, Sparkles } from "lucide-react";
import { Course } from "@/types";

const getIntensity = (index: number) => {
  const pattern = [0, 1, 3, 1, 0, 2, 4, 2, 1, 0, 3, 4, 3, 1, 0, 2, 1, 0, 4, 3, 0, 2, 3, 4, 2, 0, 1, 2, 1, 0];
  return pattern[index % pattern.length];
};

const getCellTheme = (intensity: number, isActive: boolean) => {
  if (!isActive) return "bg-white/[0.02] border-transparent";
  
  switch (intensity) {
    case 4: return "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] border-cyan-300 z-10";
    case 3: return "bg-cyan-500/80 border-cyan-400/50";
    case 2: return "bg-cyan-700/50 border-cyan-500/30";
    case 1: return "bg-cyan-900/40 border-cyan-800/30";
    default: return "bg-white/[0.05] border-white/5 hover:bg-white/10"; 
  }
};

const TOTAL_CELLS = 126;

export default function ActivityChart({ courses = [] }: { courses?: Course[] }) {
  const [view, setView] = useState<"grid" | "bars">("grid");
  const [activeRange, setActiveRange] = useState<30 | 60 | 90 | 126>(90);
  const [hoveredCell, setHoveredCell] = useState<{ date: string; count: number, isActive: boolean } | null>(null);

  const activityData = useMemo(() => {
    const data = [];
    const today = new Date();
    
    for (let i = TOTAL_CELLS - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const intensity = getIntensity(i);
      const isActive = i < activeRange;
      
      data.push({
        id: i,
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        count: isActive ? (intensity === 0 ? 0 : (intensity * 2) + (i % 3)) : 0, 
        intensity,
        isActive
      });
    }
    return data;
  }, [activeRange]);

  const totalActivities = useMemo(() => 
    activityData.filter(d => d.isActive).reduce((acc, curr) => acc + curr.count, 0), 
  [activityData]);

  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <h3 className="text-white/90 font-medium flex items-center gap-2">
            Learning Activity <Sparkles className="w-3.5 h-3.5 text-cyan-400/70" />
          </h3>
          <div className="h-5 flex items-center">
            <AnimatePresence mode="wait">
              {hoveredCell && hoveredCell.isActive ? (
                <motion.div
                  key="hovered"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-[11px] font-semibold tracking-wide"
                >
                  <span className="text-cyan-400">{hoveredCell.count} updates</span>
                  <span className="text-neutral-500"> on {hoveredCell.date}</span>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[11px] text-neutral-500 font-medium tracking-wide flex items-center gap-1.5"
                >
                  {view === "grid" ? (
                    <>
                      <TrendingUp className="w-3 h-3 text-cyan-500" />
                      {totalActivities} interactions (Last {activeRange}D)
                    </>
                  ) : (
                    "Module progression breakdown"
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-lg shadow-inner">
          <button 
            onClick={() => setView("grid")}
            className={`p-1.5 rounded-md transition-all duration-300 ${view === "grid" ? "bg-white/10 text-cyan-400 shadow-sm" : "text-neutral-500 hover:text-white"}`}
          >
            <Grid className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setView("bars")}
            className={`p-1.5 rounded-md transition-all duration-300 ${view === "bars" ? "bg-white/10 text-purple-400 shadow-sm" : "text-neutral-500 hover:text-white"}`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {view === "grid" && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full justify-between"
            >
              <div className="w-full flex justify-end">
                <div className="grid grid-rows-7 grid-flow-col gap-[5px]">
                  {activityData.map((day, index) => (
                    <motion.div
                      key={day.id}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.001 }}
                      onHoverStart={() => setHoveredCell({ date: day.date, count: day.count, isActive: day.isActive })}
                      onHoverEnd={() => setHoveredCell(null)}
                      className={`w-[13px] h-[13px] rounded-[3px] border transition-all duration-500 ${getCellTheme(day.intensity, day.isActive)} ${day.isActive ? "cursor-crosshair hover:scale-125 hover:z-20" : ""}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-5 text-[10px] font-bold tracking-widest mt-4 pr-1">
                {[30, 60, 90, 126].map((d) => (
                  <button
                    key={d}
                    onClick={() => setActiveRange(d as any)}
                    className={`transition-colors duration-300 ${activeRange === d ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" : "text-neutral-600 hover:text-neutral-300"}`}
                  >
                    {d}D
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {view === "bars" && (
            <motion.div
              key="bars"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 h-full justify-center"
            >
              {courses.slice(0, 4).map((course, i) => (
                <div key={course.id} className="w-full group">
                  <div className="flex justify-between items-center mb-1.5 gap-3">
                    <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors truncate" title={course.title}>
                      {course.title}
                    </span>
                    <div className="text-[9px] font-bold tracking-widest flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                      <span className="text-cyan-400">{course.progress}%</span>
                      <span className="w-1 h-1 rounded-full bg-white/10" />
                      <span className="text-neutral-500">{100 - course.progress}% LEFT</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-black/60 border border-white/5 rounded-full overflow-hidden flex shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}