import Link from "next/link";

export type SubjectCardProps = {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description?: string;
  category: string;
  color?: string;
  borderColor?: string;
};

export default function SubjectCard({
  id,
  name,
  shortName,
  icon,
  description,
  category,
  borderColor = "border-white/10",
}: SubjectCardProps) {
  return (
    <div
      className={`group relative flex h-full flex-col rounded-2xl border ${borderColor} bg-white/[0.02] p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/[0.04]`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-2xl shadow-inner">
            {icon}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-gray-400">
            {category}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-bold tracking-tight text-white transition group-hover:text-blue-400">
          {name}
        </h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
          {shortName}
        </p>

        {description && (
          <p className="mt-3 text-xs leading-relaxed text-gray-400">
            {description}
          </p>
        )}
      </div>

      <div className="mt-4 border-t border-white/10 pt-3">
        <Link
          href={`/tests/${id}`}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-white/5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-600 hover:text-white"
        >
          View Chapters &amp; Tests →
        </Link>
      </div>
    </div>
  );
}
