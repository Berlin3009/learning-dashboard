import { BookOpen, LayoutDashboard, Settings, User } from 'lucide-react';

export default function Sidebar() {
  return (
    <nav className="w-full md:w-20 lg:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-neutral-950/50 backdrop-blur-md p-4 flex md:flex-col justify-between md:justify-start gap-8 z-50 transition-all duration-300">
      
      {/* Logo Area */}
      <div className="flex items-center justify-center lg:justify-start gap-3 text-white/90">
        <div className="p-2 bg-white/10 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <BookOpen className="w-5 h-5" />
        </div>
        <span className="hidden lg:block font-bold tracking-widest text-sm uppercase opacity-80">NextGen</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex md:flex-col gap-2 w-full justify-center md:justify-start">
        {/* We will add Framer Motion layoutId highlights here later */}
        <li className="p-3 rounded-xl bg-white/10 border border-white/5 flex items-center justify-center lg:justify-start gap-3 cursor-pointer">
          <LayoutDashboard className="w-5 h-5 text-white" />
          <span className="hidden lg:block text-sm font-medium text-white">Dashboard</span>
        </li>
        <li className="p-3 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center lg:justify-start gap-3 cursor-pointer text-neutral-500 hover:text-white">
          <User className="w-5 h-5" />
          <span className="hidden lg:block text-sm font-medium">Profile</span>
        </li>
        <li className="p-3 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center lg:justify-start gap-3 cursor-pointer text-neutral-500 hover:text-white mt-auto">
          <Settings className="w-5 h-5" />
          <span className="hidden lg:block text-sm font-medium">Settings</span>
        </li>
      </ul>
    </nav>
  );
}