import Link from "next/link";

export type ResultCardProps = {
  score: number;
  totalMarks: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  timeSpent: string;
  testId: string;
};

export default function ResultCard({
  score,
  totalMarks,
  accuracy,
  correct,
  incorrect,
  unattempted,
  timeSpent,
  testId,
}: ResultCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Performance Summary
          </span>
          <h3 className="mt-1 text-2xl font-bold">
            {score.toFixed(2)}{" "}
            <span className="text-sm font-normal text-gray-400">/ {totalMarks} Marks</span>
          </h3>
        </div>

        <div className="text-right">
          <span className="text-xs text-gray-400">Accuracy</span>
          <p className="text-xl font-bold text-emerald-400">{accuracy.toFixed(1)}%</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2 text-center">
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <span className="text-xs text-gray-400">Correct</span>
          <p className="mt-1 text-base font-bold text-emerald-400">+{correct}</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <span className="text-xs text-gray-400">Incorrect</span>
          <p className="mt-1 text-base font-bold text-rose-400">-{incorrect}</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <span className="text-xs text-gray-400">Skipped</span>
          <p className="mt-1 text-base font-bold text-gray-400">{unattempted}</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <span className="text-xs text-gray-400">Time</span>
          <p className="mt-1 text-sm font-mono font-medium text-blue-300">{timeSpent}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href={`/test/${testId}`}
          className="flex-1 rounded-xl bg-blue-600 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-blue-500"
        >
          Retake Test 🔄
        </Link>
        <Link
          href="/tests"
          className="flex-1 rounded-xl border border-white/10 py-2.5 text-center text-xs font-semibold text-gray-300 transition hover:bg-white/5 hover:text-white"
        >
          Explore More Tests →
        </Link>
      </div>
    </div>
  );
}
