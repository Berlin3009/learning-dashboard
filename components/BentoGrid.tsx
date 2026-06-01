"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, CalendarDays, Trophy } from "lucide-react";
import { Course } from "@/types";
import CourseCard from "./CourseCard";
import ActivityChart from "./ActivityChart";
import UpcomingTasks from "./UpcomingTasks";
import CourseModal from "./CourseModal";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 250, damping: 20, mass: 0.8 },
  },
};

export default function BentoGrid({ courses }: { courses: Course[] }) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6 pb-24 md:pb-0"
      >
        {/* ================= TOP SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.005 }}
            className="col-span-1 lg:col-span-2 p-8 rounded-[32px] bg-[#0a0a0a] border border-white/5 flex flex-col justify-between min-h-[240px] relative overflow-hidden group shadow-2xl transition-all duration-700 hover:border-white/10 hover:shadow-[0_0_40px_rgba(34,211,238,0.05)]"
          >
            <div className="absolute inset-0 border-t border-white/10 rounded-[32px] pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none group-hover:from-white/[0.05] transition-colors duration-700" />
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-cyan-500/15 transition-colors duration-700 animate-pulse" style={{ animationDuration: '4s' }} />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-100 to-neutral-500 drop-shadow-sm group-hover:to-neutral-300 transition-all duration-700">
                  Welcome back, Mukul!
                </h2>
                <p className="text-cyan-100/50 max-w-md mb-8 font-medium leading-relaxed group-hover:text-cyan-100/70 transition-colors duration-700">
                  Your dedication is paying off. You are currently in the top 5%
                  of active learners this month. Keep pushing forward.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-auto">
                <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-md shadow-inner group-hover:bg-white/5 group-hover:-translate-y-1 transition-all duration-500">
                  <Flame className="w-6 h-6 text-orange-500 mb-2 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-2xl font-bold text-white">27</span>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest text-center mt-1 font-semibold group-hover:text-neutral-300 transition-colors">Day Streak</span>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-md shadow-inner group-hover:bg-white/5 group-hover:-translate-y-1 transition-all duration-500 delay-75">
                  <CalendarDays className="w-6 h-6 text-cyan-400 mb-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-2xl font-bold text-white">7/8</span>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest text-center mt-1 font-semibold group-hover:text-neutral-300 transition-colors">Weeks Active</span>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-md shadow-inner group-hover:bg-white/5 group-hover:-translate-y-1 transition-all duration-500 delay-150">
                  <Trophy className="w-6 h-6 text-purple-400 mb-2 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-2xl font-bold text-white">180</span>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest text-center mt-1 font-semibold group-hover:text-neutral-300 transition-colors">Total Days</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="col-span-1 p-6 rounded-[32px] bg-[#0a0a0a] border border-white/5 flex h-full relative overflow-hidden"
          >
            <div className="absolute inset-0 border-t border-white/10 rounded-[32px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            <div className="relative z-10 w-full">
              <ActivityChart courses={courses} />
            </div>
          </motion.div>
        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: 2x2 Grid for Course Cards */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 h-fit">
            {courses.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <CourseCard
                  course={course}
                  onClick={() => setSelectedCourse(course)}
                />
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Tasks Stack (Now taking the full height of the column) */}
          <div className="col-span-1 flex flex-col h-full">
            <motion.div
              variants={itemVariants}
              className="flex-1 p-6 rounded-[32px] bg-[#0a0a0a] border border-white/5 relative overflow-hidden flex flex-col min-h-[300px] h-full"
            >
              <div className="absolute inset-0 border-t border-white/10 rounded-[32px] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
              {/* The UpcomingTasks component will natively expand to fill this flex container */}
              <UpcomingTasks />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Modal Overlay Component */}
      <AnimatePresence>
        {selectedCourse && (
          <CourseModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}