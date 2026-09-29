import Link from "next/link";

export type TestCardProps = {
  id: string;
  title: string;
  subject?: string;
  category?: string;
  categoryLabel?: string;
  description: string;
  questionCount?: string | number;
  duration?: string;
  durationMinutes?: number;
  difficulty?: string;
  isLiveApi?: boolean;
};

export default function TestCard({
  id,
  title,
  subject,
  categoryLabel,
  description,
  questionCount,
  duration,
  durationMinutes,
  difficulty = "Medium",
  isLiveApi = false,
}: TestCardProps) {
  const displayDuration = duration || (durationMinutes ? `${durationMinutes} min` : "15 min");
  const displayCount = questionCount !== undefined ? questionCount : "10 Questions";

  return (
    <div
      className={`group flex flex-col justify-between rounded-2xl border p-6 transition duration-200 hover:-translate-y-1 ${
        isLiveApi
          ? "border-emerald-500/30 bg-emerald-500/[0.03] hover:border-emerald-500/60"
          : "border-white/10 bg-white/[0.03] hover:border-blue-500/40 hover:bg-white/[0.05]"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${
              isLiveApi ? "text-emerald-400" : "text-blue-400"
            }`}
          >
            {categoryLabel || subject || "GATE CSE"}
          </p>

          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isLiveApi
                ? "bg-emerald-500/15 text-emerald-300"
                : difficulty === "Hard" || difficulty === "GATE Level"
                ? "bg-rose-500/15 text-rose-300"
                : "bg-white/5 text-gray-400"
            }`}
          >
            {difficulty}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold tracking-tight text-white group-hover:text-blue-300 transition">
          {title}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-gray-400">
          {description}
        </p>
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isLiveApi ? "bg-emerald-400 animate-pulse" : "bg-blue-500"
              }`}
            />
            {displayCount}
          </span>
          <span>⏱ {displayDuration}</span>
        </div>

        <Link
          href={`/test/${id}`}
          className={`mt-4 block w-full rounded-xl py-2.5 text-center text-xs font-semibold transition hover:shadow-lg ${
            isLiveApi
              ? "bg-emerald-500 text-black hover:bg-emerald-400 font-bold"
              : "bg-white text-black hover:bg-blue-50"
          }`}
        >
          Start Test →
        </Link>
      </div>
    </div>
  );
}