"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Question } from "../page";
import MathContent from "@/components/MathContent";

type EvaluatedQuestion = Question & {
  userAnswer: string | string[] | null;
  isAnswered: boolean;
  isCorrect: boolean;
  marksAwarded: number;
};

type TestResultData = {
  testId: string;
  testTitle?: string;
  testSubject?: string;
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
            Please take a test first to view detailed analysis and solutions.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/gate/pyq"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500"
            >
              Browse PYQs
            </Link>
            <Link
              href="/tests"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-white/10"
            >
              GATE Hub
            </Link>
          </div>
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
      <header className="border-b border-white/10 px-6 py-5 sticky top-0 z-40 bg-[#08090b]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            CheckMate <span className="text-blue-500">GATE</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={`/test/${testId}`}
              className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-gray-300 transition hover:bg-white/5"
            >
              🔄 Retake Test
            </Link>
            <Link
              href="/gate/pyq"
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              All PYQs
            </Link>
            <Link
              href="/tests"
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-500 shadow-md shadow-blue-600/20"
            >
              GATE Hub
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        {/* Scorecard Hero */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 backdrop-blur shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                <span>Test Performance Analysis</span>
              </div>
              <h1 className="mt-3 text-2xl md:text-3xl font-bold text-white">
                {result.testTitle || "GATE Test Series"}
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Completed on {new Date(result.submittedAt).toLocaleDateString()} at{" "}
                {new Date(result.submittedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>

            {/* Score Pill */}
            <div className="flex items-baseline gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
              <span className="text-4xl md:text-5xl font-extrabold text-blue-400">
                {result.score}
              </span>
              <span className="text-sm font-semibold text-gray-400">/ {result.totalMarks} Marks</span>
            </div>
          </div>

          {/* Metric Stats Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-white/10 pt-6">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
              <span className="text-2xl font-bold text-emerald-400">{result.correct}</span>
              <p className="mt-1 text-xs text-gray-400">Correct Answers</p>
            </div>

            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 text-center">
              <span className="text-2xl font-bold text-rose-400">{result.incorrect}</span>
              <p className="mt-1 text-xs text-gray-400">Incorrect Attempts</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <span className="text-2xl font-bold text-gray-300">{result.unattempted}</span>
              <p className="mt-1 text-xs text-gray-400">Unattempted</p>
            </div>

            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 text-center">
              <span className="text-2xl font-bold text-blue-400">{accuracy}%</span>
              <p className="mt-1 text-xs text-gray-400">Accuracy Rate</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-gray-400 px-2">
            <span>⏱ Time Spent: {minutesSpent}m {secondsSpent}s</span>
            <span>Total Questions: {result.totalQuestions}</span>
          </div>
        </div>

        {/* Detailed Solutions Section */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-white">Detailed Solutions & Analysis</h2>

            {/* Filter Tabs */}
            <div className="flex rounded-xl border border-white/10 bg-white/5 p-1 text-xs font-semibold">
              {(["all", "correct", "incorrect", "unattempted"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`rounded-lg px-3 py-1.5 capitalize transition ${
                    filter === tab
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {filteredQuestions.map((q, idx) => {
              const userAns = q.userAnswer;
              let userAnsDisplay = "Not Attempted";
              if (q.isAnswered) {
                userAnsDisplay = Array.isArray(userAns) ? userAns.join(", ") : String(userAns);
              }

              const correctAnsDisplay = Array.isArray(q.answer)
                ? q.answer.join(", ")
                : String(q.answer);

              return (
                <div
                  key={q.id || idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20"
                >
                  {/* Top Badge Info */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-400">
                        Q{idx + 1}
                      </span>
                      <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] uppercase text-gray-300">
                        {q.type}
                      </span>
                      <span className="text-xs text-gray-400">
                        {q.subject} {q.topic ? `• ${q.topic}` : ""}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {q.isCorrect ? (
                        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-xs font-bold text-emerald-400">
                          +{q.marksAwarded} Marks (Correct)
                        </span>
                      ) : q.isAnswered ? (
                        <span className="rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-0.5 text-xs font-bold text-rose-400">
                          {q.marksAwarded} Marks (Incorrect)
                        </span>
                      ) : (
                        <span className="rounded-full bg-white/5 border border-white/10 px-3 py-0.5 text-xs font-medium text-gray-400">
                          0 Marks (Unattempted)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Stem */}
                  <div className="text-base text-zinc-100 mb-6">
                    <MathContent content={q.question} />
                  </div>

                  {/* Options List if MCQ / MSQ */}
                  {q.options && q.options.length > 0 && (
                    <div className="mb-6 space-y-2">
                      {(q.structuredOptions && q.structuredOptions.length > 0
                        ? q.structuredOptions
                        : q.options.map((opt, i) => ({
                            label: String.fromCharCode(65 + i),
                            text: opt,
                            html: opt,
                          }))
                      ).map((opt) => {
                        const isCorrectOption = Array.isArray(q.answer)
                          ? q.answer.includes(opt.label) || q.answer.includes(opt.text)
                          : q.answer === opt.label || q.answer === opt.text;

                        const isUserSelected = Array.isArray(userAns)
                          ? userAns.includes(opt.label) || userAns.includes(opt.text)
                          : userAns === opt.label || userAns === opt.text;

                        let optClass = "border-white/10 bg-white/[0.01] text-gray-300";
                        if (isCorrectOption) {
                          optClass = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
                        } else if (isUserSelected && !isCorrectOption) {
                          optClass = "border-rose-500/50 bg-rose-500/10 text-rose-300";
                        }

                        return (
                          <div
                            key={opt.label}
                            className={`flex items-start gap-3 rounded-xl border p-3 text-xs md:text-sm ${optClass}`}
                          >
                            <span className="font-bold shrink-0">({opt.label})</span>
                            <div className="flex-1">
                              <MathContent content={opt.html || opt.text} inline />
                            </div>
                            {isCorrectOption && (
                              <span className="shrink-0 text-xs font-bold text-emerald-400">
                                ✓ Correct Key
                              </span>
                            )}
                            {isUserSelected && !isCorrectOption && (
                              <span className="shrink-0 text-xs font-bold text-rose-400">
                                ✗ Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Comparison Summary Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs mb-4">
                    <div>
                      <span className="text-gray-400">Your Response: </span>
                      <span
                        className={`font-semibold ${
                          q.isCorrect
                            ? "text-emerald-400"
                            : q.isAnswered
                            ? "text-rose-400"
                            : "text-gray-400"
                        }`}
                      >
                        {userAnsDisplay}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Official Answer Key: </span>
                      <span className="font-semibold text-emerald-400">
                        {correctAnsDisplay || "MTA"}
                      </span>
                    </div>
                  </div>

                  {/* Explanation / Solution Link */}
                  <div className="border-t border-white/5 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
                    <div>
                      {q.explanation && (
                        <span>💡 {q.explanation}</span>
                      )}
                    </div>

                    {q.link && (
                      <a
                        href={q.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
                      >
                        <span>Official GateOverflow Discussion</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}