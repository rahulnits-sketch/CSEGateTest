"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import questionData from "@/data/questions.json";

export type Question = {
  id: number;
  testId: string;
  type: "MCQ" | "MSQ" | "NAT" | string;
  question: string;
  options: string[];
  answer: string[];
  subject: string;
  topic?: string;
  difficulty: string;
  marks: number;
  negativeMarks: number;
  explanation?: string;
};

export default function TestPage() {
  const router = useRouter();
  const params = useParams();
  const testId = (params?.id as string) || "all";

  // Support for dynamic live API (OpenTDB)
  const [liveQuestions, setLiveQuestions] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(testId === "opentdb");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (testId === "opentdb") {
      let isMounted = true;
      fetch("/api/opentdb")
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) {
            if (data?.questions && data.questions.length > 0) {
              setLiveQuestions(data.questions);
            } else {
              setError("No questions received from Open Trivia DB.");
            }
            setLoading(false);
          }
        })
        .catch((err: unknown) => {
          if (isMounted) {
            setError(err instanceof Error ? err.message : "Error fetching from Open Trivia DB");
            setLoading(false);
          }
        });

      return () => {
        isMounted = false;
      };
    }
  }, [testId]);

  // Filter questions according to testId or fallback
  const questions: Question[] = useMemo(() => {
    if (testId === "opentdb") {
      return liveQuestions || [];
    }
    const list = questionData as Question[];
    if (testId === "all") return list;
    const filtered = list.filter((q) => q.testId === testId);
    return filtered.length > 0 ? filtered : list;
  }, [testId, liveQuestions]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  // answers map: string for MCQ/NAT, string[] for MSQ
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [visited, setVisited] = useState<number[]>([questions[0]?.id ?? 1]);
  const [marked, setMarked] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [calcInput, setCalcInput] = useState("");

  const question = questions[currentQuestion] || questions[0];

  // Navigate between questions and mark visited
  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
    const targetQ = questions[index];
    if (targetQ) {
      setVisited((prev) => (prev.includes(targetQ.id) ? prev : [...prev, targetQ.id]));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      goToQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      goToQuestion(currentQuestion - 1);
    }
  };

  // Submit Logic with full GATE Evaluation
  const handleSubmit = useCallback(() => {
    let score = 0;
    let totalMarks = 0;
    let correct = 0;
    let incorrect = 0;

    const evaluated = questions.map((q) => {
      totalMarks += q.marks;
      const userAns = answers[q.id];
      let isAnswered = false;
      let isCorrect = false;

      if (q.type === "MCQ") {
        if (typeof userAns === "string" && userAns.trim() !== "") {
          isAnswered = true;
          isCorrect = q.answer.includes(userAns);
        }
      } else if (q.type === "MSQ") {
        const arr = Array.isArray(userAns) ? userAns : [];
        if (arr.length > 0) {
          isAnswered = true;
          isCorrect =
            arr.length === q.answer.length &&
            arr.every((opt) => q.answer.includes(opt)) &&
            q.answer.every((opt) => arr.includes(opt));
        }
      } else if (q.type === "NAT") {
        if (typeof userAns === "string" && userAns.trim() !== "") {
          isAnswered = true;
          const userNum = parseFloat(userAns.trim());
          const targetNum = parseFloat(q.answer[0]?.trim() || "");
          if (!isNaN(userNum) && !isNaN(targetNum)) {
            isCorrect = Math.abs(userNum - targetNum) < 0.01;
          } else {
            isCorrect = userAns.trim().toLowerCase() === q.answer[0]?.trim().toLowerCase();
          }
        }
      }

      let marksAwarded = 0;
      if (isAnswered) {
        if (isCorrect) {
          correct++;
          marksAwarded = q.marks;
          score += q.marks;
        } else {
          incorrect++;
          // Negative marking ONLY applies to MCQ questions
          if (q.type === "MCQ") {
            marksAwarded = -q.negativeMarks;
            score -= q.negativeMarks;
          } else {
            marksAwarded = 0;
          }
        }
      }

      return {
        ...q,
        userAnswer: userAns ?? null,
        isAnswered,
        isCorrect,
        marksAwarded,
      };
    });

    const unattempted = questions.length - correct - incorrect;

    const resultPayload = {
      testId,
      score: Number(score.toFixed(2)),
      totalMarks,
      correct,
      incorrect,
      unattempted,
      totalQuestions: questions.length,
      timeSpentSeconds: 30 * 60 - timeLeft,
      answers,
      evaluated,
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("latestTestResult", JSON.stringify(resultPayload));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }

    router.push(`/test/${testId}/result`);
  }, [answers, questions, router, testId, timeLeft]);

  // Keep ref up to date in useEffect to avoid render-time ref mutation
  const handleSubmitRef = useRef(handleSubmit);
  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [handleSubmit]);

  // Timer interval with stable ref
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format timer
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  // MCQ Selection Handler
  const handleSelectMCQ = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: option,
    }));
  };

  // MSQ Selection Handler (Multiple checkboxes)
  const handleToggleMSQ = (option: string) => {
    setAnswers((prev) => {
      const current = Array.isArray(prev[question.id])
        ? (prev[question.id] as string[])
        : [];
      const updated = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
      return {
        ...prev,
        [question.id]: updated,
      };
    });
  };

  // NAT Handler
  const handleNATChange = (val: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: val,
    }));
  };

  // Clear Response
  const handleClearResponse = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[question.id];
      return copy;
    });
  };

  // Toggle Mark for review
  const toggleMark = () => {
    setMarked((prev) =>
      prev.includes(question.id)
        ? prev.filter((id) => id !== question.id)
        : [...prev, question.id]
    );
  };

  const isAnswered = (id: number) => {
    const val = answers[id];
    if (Array.isArray(val)) return val.length > 0;
    return typeof val === "string" && val.trim() !== "";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#08090b] text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent mb-4" />
        <p className="text-base font-semibold">Fetching Live Questions from Open Trivia DB...</p>
        <p className="text-xs text-gray-500 mt-1">Category: Science & Computers</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#08090b] p-6 text-white">
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-8 text-center max-w-md w-full">
          <p className="text-rose-400 font-semibold mb-2">Error Loading Live Test</p>
          <p className="text-xs text-gray-400 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-white px-5 py-2 text-xs font-semibold text-black transition hover:bg-gray-200"
            >
              Retry
            </button>
            <Link
              href="/tests"
              className="rounded-xl border border-white/10 px-5 py-2 text-xs font-semibold text-gray-300 transition hover:bg-white/5"
            >
              Back to Tests
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090b] text-white">
        <div className="text-center">
          <p className="text-xl">No questions found for this test.</p>
          <Link
            href="/tests"
            className="mt-4 inline-block rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold"
          >
            Go back to Tests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col justify-between">
      {/* Test Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08090b]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <Link href="/tests" className="text-lg font-bold">
              GATE<span className="text-blue-500">CSE</span>
            </Link>
            <span className="hidden text-xs text-gray-500 md:inline">|</span>
            <span className="hidden text-xs font-medium text-gray-400 md:inline">
              {question.subject}
            </span>
          </div>

          {/* Virtual Calculator button & Timer */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCalc(!showCalc)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-white/10"
              title="Virtual Calculator"
            >
              🧮 Calculator
            </button>

            <div
              className={`rounded-xl border px-4 py-1.5 font-mono text-base font-bold transition ${
                timeLeft <= 300
                  ? "border-red-500/40 bg-red-500/10 text-red-400 animate-pulse"
                  : "border-white/10 bg-white/5 text-blue-400"
              }`}
            >
              ⏱ {formattedTime}
            </div>

            <button
              onClick={() => setShowSubmit(true)}
              className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-500"
            >
              Submit Test
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-6 p-4 md:grid-cols-[1fr_320px] md:p-6">
        {/* Left Question Box */}
        <section className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02]">
          <div>
            {/* Question Top Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-5">
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400">
                  Q{currentQuestion + 1} of {questions.length}
                </span>

                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-semibold uppercase text-gray-300">
                  {question.type}
                </span>

                <span className="text-xs text-emerald-400">
                  +{question.marks} / -{question.type === "MCQ" ? question.negativeMarks : 0} Marks
                </span>
              </div>

              <button
                onClick={toggleMark}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                  marked.includes(question.id)
                    ? "border-amber-500/50 bg-amber-500/15 text-amber-300"
                    : "border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {marked.includes(question.id) ? "★ Marked for Review" : "☆ Mark for Review"}
              </button>
            </div>

            {/* Question Body */}
            <div className="p-5 md:p-8">
              <div className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                {question.subject} {question.topic ? `• ${question.topic}` : ""}
              </div>

              <h2 className="text-lg font-medium leading-relaxed md:text-xl text-zinc-100">
                {question.question}
              </h2>

              {/* RENDER BY TYPE: MCQ, MSQ, NAT */}
              <div className="mt-8">
                {/* 1. MCQ (Single Selection) */}
                {question.type === "MCQ" && (
                  <div className="space-y-3">
                    {question.options.map((option, index) => {
                      const selected = answers[question.id] === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleSelectMCQ(option)}
                          className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                            selected
                              ? "border-blue-500 bg-blue-500/15 text-white"
                              : "border-white/10 bg-white/[0.02] text-gray-300 hover:border-white/20 hover:bg-white/[0.04]"
                          }`}
                        >
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                              selected
                                ? "border-blue-500 bg-blue-500 text-white"
                                : "border-white/20 text-gray-400"
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-sm md:text-base">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. MSQ (Multiple Choice / Multiple Select) */}
                {question.type === "MSQ" && (
                  <div>
                    <p className="mb-3 text-xs text-amber-400">
                      ℹ Note: This is an MSQ. One or more than one option may be correct. No negative marks.
                    </p>
                    <div className="space-y-3">
                      {question.options.map((option, index) => {
                        const currentArr = Array.isArray(answers[question.id])
                          ? (answers[question.id] as string[])
                          : [];
                        const selected = currentArr.includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleToggleMSQ(option)}
                            className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                              selected
                                ? "border-blue-500 bg-blue-500/15 text-white"
                                : "border-white/10 bg-white/[0.02] text-gray-300 hover:border-white/20 hover:bg-white/[0.04]"
                            }`}
                          >
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border text-xs font-bold ${
                                selected
                                  ? "border-blue-500 bg-blue-500 text-white"
                                  : "border-white/20 text-gray-400"
                              }`}
                            >
                              {selected ? "✓" : String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-sm md:text-base">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. NAT (Numerical Answer Type) */}
                {question.type === "NAT" && (
                  <div className="max-w-md rounded-xl border border-white/10 bg-white/[0.02] p-5">
                    <p className="text-xs text-gray-400 mb-3">
                      Enter the numerical value. No negative marks.
                    </p>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        placeholder="Enter numerical answer"
                        value={
                          typeof answers[question.id] === "string"
                            ? (answers[question.id] as string)
                            : ""
                        }
                        onChange={(e) => handleNATChange(e.target.value)}
                        className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-2.5 text-base font-mono text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-5">
            <div className="flex items-center gap-3">
              <button
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
              >
                ← Previous
              </button>

              <button
                onClick={handleClearResponse}
                disabled={!isAnswered(question.id)}
                className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-gray-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={nextQuestion}
                disabled={currentQuestion === questions.length - 1}
                className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save & Next →
              </button>
            </div>
          </div>
        </section>

        {/* Right Palette */}
        <aside className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-sm font-semibold text-white">Question Palette</h3>
            <span className="text-xs text-blue-400">
              {Object.keys(answers).length}/{questions.length} Attempted
            </span>
          </div>

          {/* Number Grid */}
          <div className="mt-5 grid grid-cols-5 gap-2">
            {questions.map((q, index) => {
              const active = currentQuestion === index;
              const answered = isAnswered(q.id);
              const isMarked = marked.includes(q.id);
              const wasVisited = visited.includes(q.id);

              let bgClass = "bg-white/5 text-gray-400 border border-transparent";
              if (answered && isMarked) {
                bgClass = "bg-amber-600 text-white font-bold border border-amber-400";
              } else if (isMarked) {
                bgClass = "bg-purple-600 text-white font-semibold";
              } else if (answered) {
                bgClass = "bg-emerald-600 text-white font-bold";
              } else if (wasVisited) {
                bgClass = "bg-rose-600/70 text-white font-medium";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => goToQuestion(index)}
                  className={`relative flex h-10 w-full items-center justify-center rounded-lg text-xs transition ${bgClass} ${
                    active ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-[#08090b]" : ""
                  }`}
                >
                  {index + 1}
                  {isMarked && (
                    <span className="absolute -top-1 -right-1 text-[10px] text-amber-300">
                      ★
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Status Legends */}
          <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-xs text-gray-400">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded bg-emerald-600" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded bg-rose-600/70" />
              <span>Not Answered</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded bg-purple-600" />
              <span>Marked for Review</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded bg-white/5" />
              <span>Not Visited</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Virtual Calculator Modal */}
      {showCalc && (
        <div className="fixed bottom-6 right-6 z-50 w-72 rounded-2xl border border-white/10 bg-[#16181f] p-4 shadow-2xl backdrop-blur-lg">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <p className="text-xs font-bold text-gray-300">GATE Calculator</p>
            <button
              onClick={() => setShowCalc(false)}
              className="text-xs text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="mt-3">
            <div className="mb-3 rounded-lg bg-black/60 p-2.5 text-right font-mono text-lg text-emerald-400 overflow-x-auto">
              {calcInput || "0"}
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-xs font-semibold">
              {["C", "(", ")", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "^", "="].map(
                (btn) => (
                  <button
                    key={btn}
                    onClick={() => {
                      if (btn === "C") {
                        setCalcInput("");
                      } else if (btn === "=") {
                        try {
                          const sanitized = calcInput.replace(/[^0-9+\-*/.()]/g, "");
                          const fn = new Function(`"use strict"; return (${sanitized});`);
                          const val = fn();
                          setCalcInput(Number.isFinite(val) ? String(val) : "Error");
                        } catch {
                          setCalcInput("Error");
                        }
                      } else {
                        setCalcInput((prev) => prev + btn);
                      }
                    }}
                    className={`rounded-md p-2 transition ${
                      btn === "="
                        ? "bg-blue-600 text-white hover:bg-blue-500"
                        : btn === "C"
                        ? "bg-rose-600/50 text-white hover:bg-rose-500"
                        : "bg-white/5 text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    {btn}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#12141a] p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white">Submit Test?</h2>
            <p className="mt-2 text-xs text-gray-400">
              Are you sure you want to end this test session? Your responses will be evaluated instantly.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center">
                <p className="text-xl font-bold text-emerald-400">
                  {Object.keys(answers).length}
                </p>
                <p className="text-[10px] uppercase text-gray-400">Answered</p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center">
                <p className="text-xl font-bold text-rose-400">
                  {questions.length - Object.keys(answers).length}
                </p>
                <p className="text-[10px] uppercase text-gray-400">Unanswered</p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center">
                <p className="text-xl font-bold text-purple-400">
                  {marked.length}
                </p>
                <p className="text-[10px] uppercase text-gray-400">Marked</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowSubmit(false)}
                className="flex-1 rounded-xl border border-white/10 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-white/5"
              >
                Continue Test
              </button>

              <button
                onClick={() => {
                  setShowSubmit(false);
                  handleSubmit();
                }}
                className="flex-1 rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}