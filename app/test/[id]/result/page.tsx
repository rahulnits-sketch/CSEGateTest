"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Question } from "../page";

type EvaluatedQuestion = Question & {
  userAnswer: string | string[] | null;
  isAnswered: boolean;
  isCorrect: boolean;
  marksAwarded: number;
};

type TestResultData = {
  testId: string;
  score: number;
  totalMarks: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  evaluated: EvaluatedQuestion[];
  submittedAt: string;
};

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return typeof window !== "undefined" ? localStorage.getItem("latestTestResult") : null;
}

function getServerSnapshot() {
  return null;
}

export default function ResultPage() {
  const params = useParams();
  const testId = (params?.id as string) || "all";

  const rawResult = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const result: TestResultData | null = useMemo(() => {
    if (!rawResult) return null;
    try {
      return JSON.parse(rawResult);
    } catch {
      return null;
    }
  }, [rawResult]);

  const [filter, setFilter] = useState<"all" | "correct" | "incorrect" | "unattempted">("all");

  if (!result) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#08090b] p-6 text-white">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center max-w-md w-full">
          <p className="text-lg font-semibold">No test result found.</p>
          <p className="mt-2 text-sm text-gray-400">
            Please take a test first to view detailed analysis.
          </p>
          <Link
            href="/tests"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Explore Tests
          </Link>
        </div>
      </main>
    );
  }

  const accuracy =
    result.correct + result.incorrect > 0
      ? Math.round((result.correct / (result.correct + result.incorrect)) * 100)
      : 0;

  const minutesSpent = Math.floor((result.timeSpentSeconds || 0) / 60);
  const secondsSpent = (result.timeSpentSeconds || 0) % 60;

  const filteredQuestions = (result.evaluated || []).filter((q) => {
    if (filter === "correct") return q.isCorrect;
    if (filter === "incorrect") return q.isAnswered && !q.isCorrect;
    if (filter === "unattempted") return !q.isAnswered;
    return true;
  });

  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      {/* Top Header */}
      <header className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            GATE<span className="text-blue-500">CSE</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href={`/test/${testId}`}
              className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-gray-300 transition hover:bg-white/5"
            >
              Retake Test
            </Link>
            <Link
              href="/tests"
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-500"
            >
              All Tests
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        {/* Scorecard Hero */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 backdrop-blur">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                Test Summary
              </span>
              <h1 className="mt-3 text-3xl font-bold md:text-4xl text-white">
                Performance Overview
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                Detailed evaluation based on official GATE CSE marking scheme.
              </p>
            </div>

            {/* Score Big Display */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 px-8 py-5 text-center">
              <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">
                Your Score
              </span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">
                  {result.score}
                </span>
                <span className="text-sm font-medium text-gray-400">
                  / {result.totalMarks}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <span className="text-xs text-gray-400">Accuracy</span>
              <p className="mt-1 text-2xl font-bold text-white">{accuracy}%</p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <span className="text-xs text-gray-400">Correct Answers</span>
              <p className="mt-1 text-2xl font-bold text-emerald-400">
                {result.correct} <span className="text-xs text-gray-500">/ {result.totalQuestions}</span>
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <span className="text-xs text-gray-400">Incorrect (Negative)</span>
              <p className="mt-1 text-2xl font-bold text-rose-400">
                {result.incorrect}
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <span className="text-xs text-gray-400">Time Taken</span>
              <p className="mt-1 text-2xl font-bold text-amber-400">
                {minutesSpent}m {secondsSpent}s
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Solutions Section */}
        <section className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Solutions & Explanations</h2>
              <p className="text-xs text-gray-400 mt-1">
                Review your answers with step-by-step solutions
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 text-xs">
              {(
                [
                  ["all", `All (${result.evaluated.length})`],
                  ["correct", `Correct (${result.correct})`],
                  ["incorrect", `Incorrect (${result.incorrect})`],
                  ["unattempted", `Skipped (${result.unattempted})`],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`rounded-lg px-3 py-1.5 font-medium transition ${
                    filter === key
                      ? "bg-white text-black"
                      : "border border-white/10 bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Question List */}
          <div className="mt-6 space-y-5">
            {filteredQuestions.map((q, idx) => {
              const formatAns = (ans: string | string[] | null) => {
                if (ans === null || ans === undefined || (Array.isArray(ans) && ans.length === 0)) {
                  return "Not Answered";
                }
                if (Array.isArray(ans)) return ans.join(", ");
                return ans;
              };

              return (
                <article
                  key={q.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition"
                >
                  {/* Question header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-semibold text-sm text-white">
                        Question {idx + 1}
                      </span>
                      <span className="rounded bg-white/5 px-2 py-0.5 text-[11px] font-mono uppercase text-gray-400">
                        {q.type}
                      </span>
                      <span className="text-xs text-blue-400 font-medium">
                        {q.subject}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold">
                      {q.isCorrect ? (
                        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-400">
                          ✓ Correct (+{q.marks})
                        </span>
                      ) : q.isAnswered ? (
                        <span className="rounded-full bg-rose-500/15 px-3 py-1 text-rose-400">
                          ✕ Incorrect ({q.marksAwarded} Marks)
                        </span>
                      ) : (
                        <span className="rounded-full bg-white/5 px-3 py-1 text-gray-400">
                          ○ Unattempted (0 Marks)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Title */}
                  <p className="mt-4 text-base font-medium leading-relaxed text-zinc-200">
                    {q.question}
                  </p>

                  {/* Answers Comparison */}
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 text-xs">
                    <div
                      className={`rounded-xl border p-3.5 ${
                        !q.isAnswered
                          ? "border-white/10 bg-white/[0.02] text-gray-400"
                          : q.isCorrect
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                          : "border-rose-500/30 bg-rose-500/10 text-rose-300"
                      }`}
                    >
                      <span className="font-semibold text-gray-400 block mb-1">
                        Your Answer:
                      </span>
                      <span className="font-mono text-sm font-semibold">
                        {formatAns(q.userAnswer)}
                      </span>
                    </div>

                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-emerald-300">
                      <span className="font-semibold text-emerald-400 block mb-1">
                        Correct Answer:
                      </span>
                      <span className="font-mono text-sm font-semibold">
                        {formatAns(q.answer)}
                      </span>
                    </div>
                  </div>

                  {/* Explanation Box */}
                  {q.explanation && (
                    <div className="mt-4 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-xs">
                      <span className="font-bold text-blue-400 block mb-1">
                        💡 Explanation:
                      </span>
                      <p className="text-gray-300 leading-relaxed font-sans">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}