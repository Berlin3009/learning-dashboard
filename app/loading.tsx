export default function Loading() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-neutral-950 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      
      {/* Mock Sidebar Skeleton */}
      <div className="w-full md:w-20 lg:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-neutral-950/50 p-4" />

      <main className="flex-1 p-6 md:p-10 z-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          
          {/* Header Skeleton */}
          <div className="space-y-4">
            <div className="h-10 w-64 bg-white/10 rounded-lg" />
            <div className="h-6 w-96 bg-white/5 rounded-lg" />
          </div>

          {/* Bento Grid Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[200px] bg-white/5 rounded-3xl border border-white/5" />
            <div className="col-span-1 h-[200px] bg-white/5 rounded-3xl border border-white/5" />
            
            {/* Mock Course Cards */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[200px] bg-white/5 rounded-3xl border border-white/5 flex flex-col justify-between p-6">
                 <div className="h-12 w-12 bg-white/10 rounded-2xl" />
                 <div className="h-2 w-full bg-white/10 rounded-full" />
              </div>
            ))}
          </div>
          
        </div>
      </main>
    </div>
  );
}