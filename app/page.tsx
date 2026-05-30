import Sidebar from "@/components/Sidebar";
import BentoGrid from "@/components/BentoGrid";
import { supabase } from "@/lib/supabase";
import { Course } from "@/types";

// This runs entirely on the server
async function fetchCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching courses:", error);
    return []; // Graceful fallback
  }

  return data || [];
}

export default async function Home() {
  const courses = await fetchCourses();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-neutral-950 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <Sidebar />

      <main className="flex-1 p-6 md:p-10 z-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <header className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
              Welcome back, Mukul.
            </h1>
            <p className="text-neutral-400 text-lg">
              Here is your active learning dashboard.
            </p>
          </header>

          <section className="mt-8">
            <BentoGrid courses={courses} />
          </section>

        </div>
      </main>
    </div>
  );
}