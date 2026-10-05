"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";

import { SiLeetcode } from "react-icons/si";
import { striverA2Z } from "@/data/dsa/roadmaps/striverA2Z";
import {
  getStriverProgressSnapshot,
  notifyStriverProgressChanged,
  STRIVER_PROGRESS_KEY,
  subscribeToStriverProgress,
} from "@/data/dsa/roadmaps/progress";

// Mapping steps to local practice tests if available
const localPracticeRoutes: Record<number, { path: string; label: string }> = {
  3: { path: "/dsa/arrays", label: "Take Arrays Practice Test" },
  6: { path: "/dsa/linked-list", label: "Take Linked List Practice Test" },
  9: { path: "/dsa/stack", label: "Take Stack Practice Test" },
  13: { path: "/dsa/tree", label: "Take Binary Trees Practice Test" },
  14: { path: "/dsa/tree", label: "Take BST Practice Test" },
  15: { path: "/dsa/graph", label: "Take Graph Practice Test" },
};

export default function StriverA2ZPage() {
  const [openStep, setOpenStep] = useState<number | null>(null);
  const savedProgress = useSyncExternalStore(
    subscribeToStriverProgress,
    getStriverProgressSnapshot,
    () => "[]",
  );
  const completedSteps = (() => {
    try {
      const completed: unknown = JSON.parse(savedProgress);
      return Array.isArray(completed) && completed.every(Number.isInteger)
        ? completed as number[]
        : [];
    } catch {
      return [];
    }
  })();

  const toggleCompleted = (stepId: number) => {
    const current = completedSteps;
      const updated = current.includes(stepId)
        ? current.filter((id) => id !== stepId)
        : [...current, stepId];

      localStorage.setItem(STRIVER_PROGRESS_KEY, JSON.stringify(updated));
      notifyStriverProgressChanged();
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset your Striver A2Z progress?")) {
      localStorage.removeItem(STRIVER_PROGRESS_KEY);
      notifyStriverProgressChanged();
    }
  };

  const progress = Math.round(
    (completedSteps.length / striverA2Z.length) * 100
  );

  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col justify-between">
      <Navbar />

      <section className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12 w-full flex-1">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-3">
            <Link
              href="/dsa"
              className="text-gray-400 transition hover:text-white"
            >
              DSA
            </Link>
            <span className="text-gray-700">/</span>
            <Link
              href="/dsa/roadmaps"
              className="text-gray-400 transition hover:text-white"
            >
              Roadmaps
            </Link>
            <span className="text-gray-700">/</span>
            <span className="text-cyan-400 font-medium">StriverA2Z Sheet</span>
          </div>

          <BackButton />
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/35 via-slate-900/50 to-black/80 p-4 shadow-2xl shadow-cyan-950/10 sm:p-6 md:p-7">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10">
      

            {/* Progress Bar */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3 text-xs sm:text-sm">
                <span className="font-medium text-gray-300">Overall Roadmap Progress</span>
                <span className="font-bold text-cyan-400">{progress}% Completed</span>
              </div>

              <div
                className="h-2.5 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label="Overall roadmap progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
                <span>{completedSteps.length} of {striverA2Z.length} steps completed</span>
                <span>{striverA2Z.reduce((acc, s) => acc + s.problemCount, 0)}+ total problems</span>
              </div>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="mt-8 sm:mt-10">
          <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
            <div>
              <h2 className="mt-1 text-xl font-bold sm:text-2xl">A2Z DSA Roadmap Steps</h2>
            </div>

            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400 border border-white/10">
              {striverA2Z.length} Steps
            </span>
          </div>

          <div className="space-y-4">
            {striverA2Z.map((step) => {
              const isOpen = openStep === step.id;
              const isCompleted = completedSteps.includes(step.id);
              const localRoute = localPracticeRoutes[step.id];

              return (
                <div
                  key={step.id}
                  className={`overflow-hidden rounded-2xl border transition duration-200 ${
                    isCompleted
                      ? "border-emerald-500/30 bg-emerald-950/15"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Step Header */}
                  <button
                    type="button"
                    onClick={() => setOpenStep(isOpen ? null : step.id)}
                  className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-white/[0.02] sm:gap-4 sm:p-5 md:p-6"
                  >
                    {/* Number / Checkmark */}
                    <div
                      className={`flex h-11 min-w-11 shrink-0 items-center justify-center rounded-xl px-2 text-xs font-bold transition ${
                        isCompleted
                          ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                          : "bg-white/10 text-gray-300"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
                      ) : (
                        String(step.id).padStart(2, "0")
                      )}
                    </div>

                    {/* Title & info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="font-bold md:text-lg text-white">
                          {step.title}
                        </h3>

                        <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs text-gray-400">
                          {step.problemCount} problems
                        </span>

                        {isCompleted && (
                          <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>

                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 shrink-0 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 shrink-0 text-gray-400" />
                    )}
                  </button>

                  {/* Expanded Content */}
                  {isOpen && (
                    <div className="border-t border-white/10 bg-black/20 px-4 pb-5 pt-4 sm:px-5 md:px-6 md:pb-6">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Topics Covered:
                      </p>

                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {step.topics.map((topic) => (
                          <div
                            key={topic}
                            className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs md:text-sm text-gray-300 flex items-center gap-2"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                      {/* Problems */}
                      <div className="mt-8">
                      <div className="mb-3 flex items-center justify-between">
                       <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                               Problems
                        </p>

                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-500">
                            {step.problems.length} Available
                        </span>
                        </div>

                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#090a0d]">
                      {step.problems.length > 0 ? (
                      step.problems.map((problem) => (
                        <div
                      key={`${step.id}-${problem.id}`}
                      className="group flex items-center gap-3 border-b border-white/[0.06] px-4 py-4 transition last:border-b-0 hover:bg-white/[0.035]"
                          >
          {/* Checkbox */}
            <button
            type="button"
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/20 transition hover:border-cyan-400 hover:bg-cyan-400/10"
            title="Mark problem as completed"
          >
            <CheckCircle2 className="hidden h-4 w-4 text-cyan-400" />
          </button>

          {/* Problem title */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-200 transition group-hover:text-white">
              {problem.title}
            </p>
          </div>

          {/* Difficulty */}
          <span
            className={`hidden rounded-full border px-2.5 py-1 text-[10px] font-semibold sm:block ${
              problem.difficulty === "Basic"
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : problem.difficulty === "Core"
                ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                : "border-red-500/20 bg-red-500/10 text-red-400"
            }`}
          >
            {problem.difficulty}
          </span>

          {/* LeetCode */}
          {problem.leetcode && (
            <a
              href={problem.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              title={`Solve "${problem.title}" on LeetCode`}
              aria-label={`Solve ${problem.title} on LeetCode`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-400"
            >
              <SiLeetcode className="h-5 w-5" />
            </a>
          )}
          </div>
          ))
           ) : (
          <div className="px-4 py-8 text-center text-sm text-gray-500">
              Problems for this step will be added soon.
          </div>
          )}
          </div>
          </div>

                      {/* Actions */}
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => toggleCompleted(step.id)}
                          className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold transition ${
                            isCompleted
                              ? "bg-emerald-500 text-black hover:bg-emerald-400"
                              : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                          }`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          {isCompleted ? "Mark Incomplete" : "Mark as Completed"}
                        </button>

                        {localRoute && (
                          <Link
                            href={localRoute.path}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500/20 border border-cyan-400/30 px-4 py-2.5 text-xs md:text-sm font-semibold text-cyan-300 hover:bg-cyan-500 hover:text-black transition"
                          >
                            {localRoute.label}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div className="flex flex-wrap gap-3">
       
            <Link
              href="/dsa"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              Back to DSA
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
