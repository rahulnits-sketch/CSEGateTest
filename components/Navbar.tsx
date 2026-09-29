import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08090b]/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-base shadow-lg shadow-blue-500/30">
            ♟️
          </span>
          <span>
            CheckMate <span className="text-blue-500">GATE</span>
          </span>
        </Link>

        {/* Clean Categorized Navigation without Contact button */}
        <div className="hidden items-center gap-6 text-xs font-semibold text-gray-400 md:flex uppercase tracking-wider">
          <Link href="/tests" className="transition hover:text-white">
            GATE Prep
          </Link>
          <Link href="/dsa" className="transition hover:text-white">
            DSA
          </Link>
          <Link href="/placement" className="transition hover:text-white">
            Placement
          </Link>
          <Link href="/general" className="flex items-center gap-1.5 transition hover:text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            General Quiz
          </Link>
          <Link href="/syllabus" className="transition hover:text-white">
            Syllabus
          </Link>
        </div>

        {/* Explore Button */}
        <div>
          <Link
            href="/tests"
            className="rounded-full bg-white px-5 py-2 text-xs font-bold text-black transition hover:bg-gray-200 shadow-sm"
          >
            Explore
          </Link>
        </div>
      </nav>
    </header>
  );
}