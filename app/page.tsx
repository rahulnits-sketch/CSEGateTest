import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, BriefcaseBusiness, Code2, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col selection:bg-blue-500 selection:text-white">
      <Navbar />
      <section className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl flex-col items-center justify-center gap-10 px-6 py-12 text-center md:gap-12 md:py-16">
        <h1 className="-translate-y-3 text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
          <span className="block">Prepare Smarter</span>
          <span className="mt-3 block bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Test Faster
          </span>
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
          Master GATE CSE, conquer placement aptitude tests, sharpen your DSA logic, and take live tech quizzes — all organized in dedicated, clean sections.
        </p>

        <div>
          <Link
            href="/tests"
            className="inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-base font-bold text-black shadow-xl shadow-white/10 transition duration-200 hover:scale-105 hover:bg-gray-100"
          >
            <span>Browse  tests</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
            Choose your path
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            What are you preparing for?
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Link
            href="/gate"
            className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-emerald-950/20 to-[#08090b] p-6 transition duration-200 hover:-translate-y-1 hover:border-emerald-400/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
          >
            <div className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl transition group-hover:bg-emerald-400/20" />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                <GraduationCap className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 flex items-center gap-3 text-2xl font-bold text-white">
                GATE CSE
                <ArrowRight className="h-5 w-5 text-emerald-400 transition group-hover:translate-x-1" aria-hidden="true" />
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
                Practise by subject, explore previous-year questions, and take mock tests.
              </p>
            </div>
            <span className="relative mt-6 w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              Explore GATE
            </span>
          </Link>

          <Link
            href="/dsa"
            className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-2xl border border-purple-400/20 bg-gradient-to-br from-purple-500/10 via-purple-950/20 to-[#08090b] p-6 transition duration-200 hover:-translate-y-1 hover:border-purple-400/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300"
          >
            <div className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-purple-400/10 blur-3xl transition group-hover:bg-purple-400/20" />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-400/10 text-purple-300">
                <Code2 className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 flex items-center gap-3 text-2xl font-bold text-white">
                DSA
                <ArrowRight className="h-5 w-5 text-purple-400 transition group-hover:translate-x-1" aria-hidden="true" />
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
                Build problem-solving skills with topic-wise practice and structured roadmaps.
              </p>
            </div>
            <span className="relative mt-6 w-fit rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1 text-xs font-semibold text-purple-300">
              Explore DSA
            </span>
          </Link>

          <Link
            href="/placement"
            className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 via-amber-950/20 to-[#08090b] p-6 transition duration-200 hover:-translate-y-1 hover:border-amber-400/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
          >
            <div className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl transition group-hover:bg-amber-400/20" />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
                <BriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 flex items-center gap-3 text-2xl font-bold text-white">
                Placement
                <ArrowRight className="h-5 w-5 text-amber-400 transition group-hover:translate-x-1" aria-hidden="true" />
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
                Prepare for hiring tests with aptitude, reasoning, and verbal practice.
              </p>
            </div>
            <span className="relative mt-6 w-fit rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
              Explore Placement
            </span>
          </Link>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-r from-[#101b2b] via-[#111827] to-[#101525] p-6 shadow-xl shadow-blue-950/20 md:px-8 md:py-7">
          <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold tracking-wide text-blue-300">
                CheckMate GATE
              </p>
              <h3 className="mt-2 text-xl font-extrabold leading-tight text-white md:text-2xl">
                One platform. Endless possibilities.
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                GATE, DSA, and Placement — let&apos;s build your success story.
              </p>
            </div>
            <Link
              href="/tests"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-lime-300 px-5 py-3 text-sm font-bold text-gray-950 shadow-lg shadow-emerald-500/10 transition hover:scale-[1.03] hover:from-emerald-300 hover:to-lime-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            >
              Start Preparing
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
