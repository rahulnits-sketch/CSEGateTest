import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubjectCard from "@/components/SubjectCard";
import subjectsData from "@/data/subjects.json";
import BackButton from "@/components/BackButton";

export default function GatePrepPage() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col justify-between">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-8 md:py-10 w-full flex-1">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              GATE CSE
            </h1>

            <p className="mt-2 text-sm text-gray-400 max-w-2xl leading-relaxed">
              Subject-wise tests
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <BackButton />
            <Link
              href="/syllabus"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition"
            >
               View GATE Syllabus 📜
            </Link>

            <Link
               href="/test/all"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition"
            >
                Full Mock Test ⚡
            </Link>
          </div>
        </div>
        {/* Subjects */}
        <div className="mb-10">
          <div className="mb-4">
            <p className="text-xl text-gray-400">
              Select any subject to practice chapter-wise tests.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {subjectsData.map((subj) => (
              <SubjectCard key={subj.id} {...subj} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}