"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import pyqManifest from "@/data/gate/pyq/manifest.json";

export default function GatePyqPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedPaperKey, setSelectedPaperKey] = useState<string>("2026-s1");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract all distinct years in descending order
  const distinctYears = useMemo(() => {
    const set = new Set<number>();
    pyqManifest.forEach((p) => set.add(p.year));
    return Array.from(set).sort((a, b) => b - a);
  }, []);

  // Papers for the selected year
  const yearPapers = useMemo(() => {
    return pyqManifest.filter((p) => p.year === selectedYear);
  }, [selectedYear]);

  // Currently selected paper
  const activePaper = useMemo(() => {
    const match = pyqManifest.find((p) => p.yearSetKey === selectedPaperKey);
    if (match && match.year === selectedYear) return match;
    return yearPapers[0] || pyqManifest[0];
  }, [selectedPaperKey, selectedYear, yearPapers]);

  // Search filter
  const filteredPapers = useMemo(() => {
    if (!searchQuery.trim()) return pyqManifest;
    const q = searchQuery.toLowerCase().trim();
    return pyqManifest.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        String(p.year).includes(q) ||
        p.yearSetKey.toLowerCase().includes(q)
    );
  }, [searchQuery]);

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
          <span className="text-blue-400 font-medium">Previous Year Question Papers (PYQ)</span>
        </div>

        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Official GATE Question Papers (1987 – 2026)</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              GATE CSE Previous Year Questions
            </h1>

            <p className="mt-3 text-sm text-gray-400 max-w-3xl leading-relaxed">
              Experience the actual official GATE Computer Science examination papers from 1987 to 2026 with realistic 180-minute countdown timers, scientific calculator, question palettes, and verified answer keys.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <BackButton />
            <Link
              href="/gate/mock"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition"
            >
              Mock Tests Hub
            </Link>
          </div>
        </div>

        {/* Interactive Year Selector & Active Paper Hero Card */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Main Paper Selection / Hero */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Featured Exam Simulation
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
                  {activePaper?.title || `GATE CSE ${selectedYear}`}
                </h2>
              </div>

              {/* Set Selector if multiple sets available for the selected year */}
              {yearPapers.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 bg-white/5 border border-white/10 p-1 rounded-xl">
                  {yearPapers.map((p) => {
                    const label = p.title.includes("Set")
                      ? `Set ${p.set}`
                      : p.title.replace(/GATE\s+(?:CSE\s+)?\d{4}\s*—?\s*/i, "") || `Paper ${p.set}`;
                    return (
                      <button
                        key={p.yearSetKey}
                        onClick={() => setSelectedPaperKey(p.yearSetKey)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                          activePaper?.yearSetKey === p.yearSetKey
                            ? "bg-blue-600 text-white shadow"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Paper Metrics Grid */}
            <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <span className="text-2xl font-bold text-blue-400">{activePaper?.totalQuestions}</span>
                <p className="mt-1 text-xs text-gray-400">Total Questions</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <span className="text-2xl font-bold text-emerald-400">{activePaper?.totalMarks}</span>
                <p className="mt-1 text-xs text-gray-400">Total Marks</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <span className="text-2xl font-bold text-amber-400">{activePaper?.durationMinutes} min</span>
                <p className="mt-1 text-xs text-gray-400">Exam Duration</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <span className="text-2xl font-bold text-purple-400">
                  {activePaper?.gaQuestions} GA + {activePaper?.csQuestions} CS
                </span>
                <p className="mt-1 text-xs text-gray-400">Sections</p>
              </div>
            </div>

            {/* Exam Rules & Details */}
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 mb-8 text-xs text-gray-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 font-bold text-blue-400 uppercase">
                <span>📋 Official Exam Rules:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>1-Mark Questions: -0.33 Negative marking for wrong MCQ response.</li>
                <li>2-Mark Questions: -0.67 Negative marking for wrong MCQ response.</li>
                <li>MSQ &amp; NAT: 0 Negative marking. Full marks for exact evaluation.</li>
                <li>Virtual scientific calculator available during the examination.</li>
              </ul>
            </div>

            {/* Start Button */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/test/${activePaper?.id || `gate-${activePaper?.yearSetKey}`}`}
                className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition hover:scale-105 hover:bg-blue-500"
              >
                <span>Start Full Exam Simulation</span>
                <span className="text-base">→</span>
              </Link>

              <span className="text-xs text-gray-400">
                Instant GATE Analysis &amp; Official Solutions upon submission.
              </span>
            </div>
          </div>

          {/* Quick Year Browser Sidebar */}
          <aside className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                  Select Year ({distinctYears.length})
                </h3>
                <span className="text-xs text-blue-400 font-semibold">1987–2026</span>
              </div>

              {/* Year Grid */}
              <div className="grid grid-cols-4 gap-2 max-h-[420px] overflow-y-auto pr-1">
                {distinctYears.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => {
                      setSelectedYear(yr);
                      const firstP = pyqManifest.find((p) => p.year === yr);
                      if (firstP) setSelectedPaperKey(firstP.yearSetKey);
                    }}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      selectedYear === yr
                        ? "bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30"
                        : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mt-6 text-center">
              <p className="text-xs text-gray-500">
                All 60 historical papers verified with official answer keys.
              </p>
            </div>
          </aside>
        </div>

        {/* Complete Historical Papers Catalog Grid */}
        <div className="mt-14">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">All GATE CSE Papers Archive</h2>
              <p className="text-xs text-gray-400 mt-1">Browse and launch any historical GATE CSE test directly.</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search year or paper..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPapers.map((p) => (
              <div
                key={p.yearSetKey}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition duration-200 hover:border-blue-500/40 hover:bg-white/[0.04]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-[11px] font-bold text-blue-400">
                      GATE {p.year} {p.set > 1 ? `• Set ${p.set}` : ""}
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">
                      ⏱ {p.durationMinutes} min
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition">
                    {p.title}
                  </h3>

                  <p className="text-xs text-gray-400 mt-1">
                    {p.totalQuestions} Questions • {p.totalMarks} Total Marks ({p.gaQuestions} GA + {p.csQuestions} CS)
                  </p>
                </div>

                <div className="mt-5 border-t border-white/5 pt-3">
                  <Link
                    href={`/test/${p.id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-600 hover:text-white"
                  >
                    <span>Start Test</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
