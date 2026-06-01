"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, LayoutDashboard, Settings, User, Flame } from "lucide-react";
import { useRouter } from "next/navigation"; // 1. Import Next.js Router

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "profile", icon: User, label: "Profile" },
  { id: "streaks", icon: Flame, label: "Streaks" },
  { id: "settings", icon: Settings, label: "Settings" },
];

// 2. Accept the currentTab as a prop from the Server
export default function Sidebar({ currentTab = "dashboard" }: { currentTab?: string }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  // 3. Update the URL without reloading the page
  const handleNavigation = (id: string) => {
    router.push(`/?tab=${id}`, { scroll: false });
  };

  return (
    <>
      <motion.nav 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="hidden md:flex flex-col h-screen sticky top-0 shrink-0 border-r border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl p-4 z-50 whitespace-nowrap overflow-hidden"
      >
        <div 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-3 text-white/90 mb-10 mt-4 overflow-hidden cursor-pointer group"
          title="Toggle Sidebar"
        >
          <div className="p-2 bg-white/10 rounded-xl border border-white/10 shrink-0 group-hover:bg-white/20 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="font-bold tracking-widest text-sm uppercase opacity-80 group-hover:opacity-100 transition-opacity"
              >
                NextGen
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <ul className="flex flex-col gap-2 w-full">
          {navItems.map((item) => {
            const isActive = currentTab === item.id; // 4. Check against prop
            return (
              <li
                key={item.id}
                onClick={() => handleNavigation(item.id)} // 5. Trigger routing
                className={`relative p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${
                  isActive ? "text-white" : "text-neutral-500 hover:text-white/80"
                } ${item.id === "settings" ? "mt-auto" : ""}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-sidebar-tab"
                    className="absolute inset-0 bg-white/10 border border-white/5 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                <span className="relative z-10 shrink-0">
                  <item.icon className="w-5 h-5" />
                </span>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }} 
                      className="relative z-10 text-sm font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 shrink-0 flex items-center justify-center text-xs font-bold text-white">
            M
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="text-sm text-white font-medium whitespace-nowrap"
              >
                Mukul Sahu
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full border-t border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl p-4 z-50 px-6">
        <ul className="flex justify-between items-center w-full">
          {navItems.filter(i => i.id !== 'settings').map((item) => {
            const isActive = currentTab === item.id;
            return (
              <li
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`relative p-3 rounded-full flex items-center justify-center cursor-pointer ${
                  isActive ? "text-white" : "text-neutral-500"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-mobile-tab"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                <span className="relative z-10">
                  <item.icon className="w-6 h-6" />
                </span>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}