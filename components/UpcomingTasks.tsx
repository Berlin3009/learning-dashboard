"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, Plus } from "lucide-react";

interface Task {
  id: number;
  text: string;
  done: boolean;
  time: string;
}

export default function UpcomingTasks() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Review CAPF Paper-2 essay structures", done: false, time: "2h ago" },
    { id: 2, text: "Complete OSINT framework module", done: true, time: "Yesterday" }
  ]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now(),
      text: newTask,
      done: false,
      time: "Just now"
    };
    
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="flex flex-col h-full relative z-10">
      <h3 className="text-white/90 font-medium text-xs tracking-widest uppercase mb-4">Upcoming Tasks</h3>
      
      {/* Interactive Input Form */}
      <form onSubmit={handleAddTask} className="mb-4 relative">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-4 pr-10 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
        />
        <button 
          type="submit"
          disabled={!newTask.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/5 hover:bg-cyan-500/20 text-neutral-400 hover:text-cyan-400 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-white/5 disabled:hover:text-neutral-400"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>

      {/* Task List with Framer Motion AnimatePresence */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <ul className="space-y-1">
          <AnimatePresence initial={false}>
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, height: 0, scale: 0.9 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="overflow-hidden"
              >
                <div 
                  onClick={() => toggleTask(task.id)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer group transition-colors"
                >
                  <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    task.done 
                      ? "bg-cyan-500/20 border-cyan-500/50" 
                      : "border-white/20 bg-black/50 group-hover:border-cyan-400/50"
                  }`}>
                    {task.done && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  
                  <div className="flex-1">
                    <p className={`text-sm transition-all duration-300 ${
                      task.done ? "text-white/30 line-through" : "text-white/80 group-hover:text-white"
                    }`}>
                      {task.text}
                    </p>
                    <p className={`text-[10px] flex items-center gap-1 mt-1 font-medium tracking-wide transition-colors ${
                      task.done ? "text-neutral-700" : "text-neutral-500"
                    }`}>
                      <Clock className="w-3 h-3"/> 
                      {task.done ? "Completed" : `Deadline • ${task.time}`}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}