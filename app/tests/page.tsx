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

      <section className="mx-auto max-w-7xl px-6 py-8 md:py-12 w-full flex-1">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <span>GateQA Preparation Hub</span>
              <span>•</span>
              <span className="text-gray-400">Computer Science & IT</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              GATE CSE Test Series
            </h1>

            <p className="mt-3 text-sm text-gray-400 max-w-2xl leading-relaxed">
              Master GATE Computer Science with subject-wise, chapter-wise, and topic-wise targeted practice tests, instant analysis, and virtual calculator simulation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <BackButton />
            <Link
              href="/gate/pyq"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition"
            >
              📅 1987-2026 PYQs
            </Link>
            <Link
              href="/gate/mock"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition"
            >
              🏆 Full GATE Mock Tests
            </Link>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-10">
          <Link
            href="/gate/pyq"
            className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 hover:border-blue-500/40 transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">📅</span>
              <span className="text-xs text-blue-400 font-bold group-hover:translate-x-0.5 transition">→</span>
            </div>
            <h3 className="font-bold text-white text-base">Year-wise PYQs</h3>
            <p className="text-xs text-gray-400 mt-1">Official papers from 2026 down to 1987 with official keys.</p>
          </Link>

          <Link
            href="/gate/subjects"
            className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 hover:border-purple-500/40 transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">📚</span>
              <span className="text-xs text-purple-400 font-bold group-hover:translate-x-0.5 transition">→</span>
            </div>
            <h3 className="font-bold text-white text-base">Subject-wise PYQs</h3>
            <p className="text-xs text-gray-400 mt-1">Practice 3,600+ questions filtered by OS, DBMS, CN, DSA, etc.</p>
          </Link>

          <Link
            href="/gate/mock"
            className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 hover:border-emerald-500/40 transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">🎯</span>
              <span className="text-xs text-emerald-400 font-bold group-hover:translate-x-0.5 transition">→</span>
            </div>
            <h3 className="font-bold text-white text-base">GATE Mock Series</h3>
            <p className="text-xs text-gray-400 mt-1">Full 65-question mocks &amp; custom random drills.</p>
          </Link>
        </div>

        {/* Subject-Wise & Chapter-Wise Grid */}
        <div className="mb-12">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                GATE CS Core Subjects ({subjectsData.length})
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Select any subject to explore its chapters, unit tests, and topic breakdowns.
              </p>
            </div>
            <span className="text-xs text-blue-400 font-semibold bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full self-start md:self-auto">
              100+ Topics Covered
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
