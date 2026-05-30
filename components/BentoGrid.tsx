"use client";

import { motion } from "framer-motion";
import { Course } from "@/types";
import CourseCard from "./CourseCard";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function BentoGrid({ courses }: { courses: Course[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {/* Required Hero Tile */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="col-span-1 md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/20 flex flex-col justify-center min-h-[200px]"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Daily Learning Streak</h2>
        <p className="text-indigo-200">You are in the top 5% of learners this week. Keep pushing forward!</p>
      </motion.div>

      {/* Required Activity Tile */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="col-span-1 p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center min-h-[200px]"
      >
        <div className="text-center text-neutral-500 font-medium text-sm">
          [Activity Chart Mockup]
        </div>
      </motion.div>

      {/* Dynamic Database Tiles */}
      {courses.map((course) => (
        <motion.div key={course.id} variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <CourseCard course={course} />
        </motion.div>
      ))}
    </motion.div>
  );
}