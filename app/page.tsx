import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      
      {/* Navbar */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          
          <Link href="/" className="text-xl font-bold tracking-tight">
            GATE<span className="text-blue-500">CSE</span>
          </Link>

          <div className="hidden gap-8 text-sm text-gray-400 md:flex">
            <Link href="/tests" className="hover:text-white">
              Tests
            </Link>

            <Link href="/tests" className="hover:text-white">
              PYQs
            </Link>

            <Link href="/tests" className="hover:text-white">
              Subjects
            </Link>
          </div>

          <Link
            href="/tests"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Start Test
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto flex min-h-[75vh] max-w-7xl items-center px-6">
        <div className="max-w-4xl">

          <div className="mb-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            GATE CSE • Online Test Series
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Prepare for GATE CSE.
            <br />
            <span className="text-gray-500">
              One test at a time.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-400">
            Practice programming, DSA, DBMS, OS, Computer Networks
            and other core CSE subjects through focused online tests.
          </p>

          <div className="mt-9 flex gap-4">
            <Link
              href="/tests"
              className="rounded-full bg-blue-600 px-7 py-3.5 font-semibold transition hover:bg-blue-500"
            >
              Explore Tests →
            </Link>

            <Link
              href="/tests"
              className="rounded-full border border-white/15 px-7 py-3.5 font-semibold transition hover:bg-white/5"
            >
              Free Mock
            </Link>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          
          {[
            ["10+", "Practice Tests"],
            ["5+", "CSE Subjects"],
            ["100+", "Questions"],
            ["24/7", "Practice"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="border-r border-white/10 px-6 py-10"
            >
              <div className="text-3xl font-bold">{number}</div>
              <div className="mt-2 text-sm text-gray-500">{label}</div>
            </div>
          ))}

        </div>
      </section>

    </main>
  );
}