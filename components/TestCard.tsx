import Link from "next/link";

type TestCardProps = {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  durationMinutes: number;
};

export default function TestCard({
  id,
  title,
  description,
  questionCount,
  durationMinutes,
}: TestCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Mock test</p>
      <h2 className="mt-2 text-xl font-semibold text-zinc-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
      <div className="mt-5 flex gap-5 text-sm text-zinc-500">
        <span>{questionCount} questions</span>
        <span>{durationMinutes} minutes</span>
      </div>
      <Link
        href={`/test/${id}`}
        className="mt-6 inline-flex rounded-lg bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
      >
        Start test
      </Link>
    </article>
  );
}