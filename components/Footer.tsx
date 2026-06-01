"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ delay: 0.8, duration: 1 }}
      className="w-full text-center mt-12 pb-8"
    >
      <p className="text-xs text-neutral-600">
        Powered by <span className="text-white/80 hover:text-white transition-colors cursor-pointer">Next.js</span> & <span className="text-cyan-400/80 hover:text-cyan-400 transition-colors cursor-pointer">Supabase</span>
      </p>
    </motion.footer>
  );
}