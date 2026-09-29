import Link from "next/link";

export type ChapterCardProps = {
  subjectId: string;
  chapterId: string;
  name: string;
  description: string;
  tests: Array<{
    id: string;
    title: string;
    duration: string;
    questionsCount: number;
    difficulty: string;
  }>;
};

export default function ChapterCard({
  subjectId,
  chapterId,
  name,
  description,
  tests,
}: ChapterCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-200 hover:border-white/20 hover:bg-white/[0.04]">
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Chapter
          </span>
          <span className="text-xs text-gray-500 font-mono">
            {tests.length} {tests.length === 1 ? "Test" : "Tests"} Available
          </span>
        </div>

        <h3 className="mt-3 text-lg font-bold text-white tracking-tight">
          {name}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-gray-400">
          {description}
        </p>
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <Link
          href={`/tests/${subjectId}/${chapterId}`}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-gray-200"
        >
          Explore Tests ({tests.length}) →
        </Link>
      </div>
    </div>
  );
}
