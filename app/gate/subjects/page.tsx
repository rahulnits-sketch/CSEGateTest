import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import subjectsManifest from "@/data/gate/subjects/manifest.json";

export default function GateSubjectsPage() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-16 w-full flex-1">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link href="/gate" className="hover:text-white transition">GATE CSE</Link>
          <span>/</span>
          <span className="text-blue-400 font-medium">Subject-wise Practice &amp; PYQs</span>
        </div>

        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
              <span>GATE CSE Subject-wise Mastery</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              Subject-wise PYQ &amp; Practice
            </h1>

            <p className="mt-3 text-sm text-gray-400 max-w-3xl leading-relaxed">
              Target your weak areas topic-by-topic with over 3,600+ previous year questions mapped to official GATE Computer Science syllabus chapters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <BackButton />
            <Link
              href="/gate/pyq"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition"
            >
              📅 Year-wise Papers
            </Link>
          </div>
        </div>

        {/* Core Subjects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subjectsManifest.map((subj) => (
            <div
              key={subj.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/[0.04]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-2xl shadow-inner">
                    {subj.icon}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-blue-400">
                    {subj.shortName}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-bold tracking-tight text-white transition group-hover:text-blue-400">
                  {subj.name}
                </h2>

                <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
                  <span className="rounded bg-white/5 px-2.5 py-1 border border-white/5">
                    {subj.totalQuestions} Questions
                  </span>
                  <span className="rounded bg-white/5 px-2.5 py-1 border border-white/5">
                    {subj.topicsCount} Topics
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                <Link
                  href={`/gate/subjects/${subj.id}`}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500 shadow-md shadow-blue-600/20"
                >
                  Explore Topics &amp; Practice →
                </Link>

                <Link
                  href={`/test/gate-mock-subj-${subj.id}`}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-white/5 py-2 text-xs font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
                >
                  ⚡ Subject Mock Test
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
