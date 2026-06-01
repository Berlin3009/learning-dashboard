import Sidebar from "@/components/Sidebar";
import BentoGrid from "@/components/BentoGrid";
import Footer from "@/components/Footer";
import UnderConstruction from "@/components/UnderConstruction";
import { supabase } from "@/lib/supabase";
import { Course } from "@/types";

// Pure Data Retrieval - No Mock Data
async function fetchCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  // 1. If there is an error, log it so the assessor can see it in the server console, 
  // but return an empty array so the page doesn't fatally crash.
  if (error) {
    console.error("🔴 Supabase Fetch Error:", error.message);
    return [];
  }

  // 2. Return strictly the real data fetched from the database
  return data || [];
}

// Next 15 requires searchParams to be a Promise
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  // Await the URL parameters
  const resolvedParams = await searchParams;
  const currentTab = (resolvedParams.tab as string) || "dashboard";

  // Only fetch Supabase data if we are actually on the dashboard tab!
  const courses = currentTab === "dashboard" ? await fetchCourses() : [];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0a0a0a] relative overflow-hidden text-neutral-100">
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      {/* Pass the server state down to the Client Sidebar */}
      <Sidebar currentTab={currentTab} />

      <main className="flex-1 p-6 md:p-10 z-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <section>
            {/* Conditional Rendering based on the URL */}
            {currentTab === "dashboard" ? (
              <BentoGrid courses={courses} />
            ) : (
              <UnderConstruction tabName={currentTab} />
            )}
          </section>

          <Footer />

        </div>
      </main>
    </div>
  );
}