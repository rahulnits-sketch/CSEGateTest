import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
} from "lucide-react";

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
          Master GATE CSE, placement aptitude tests, sharpen your DSA logic, and take live tech quizzes — all organized in dedicated, clean sections.
        </p>

        <div>
          <Link
            href="/tests"
            className="inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-base font-bold text-black shadow-xl shadow-white/10 transition duration-200 hover:scale-105 hover:bg-gray-100"
          >
            <span>Browse tests</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <section id="tracks" className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            What are you preparing?
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Link
            href="/gate"
            className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
          >
            <div className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-blue-500/[0.06] blur-3xl transition group-hover:bg-blue-500/10" />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                <GraduationCap className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 flex items-center gap-3 text-2xl font-bold text-white">
                GATE CSE
                <ArrowRight className="h-5 w-5 text-blue-300 transition group-hover:translate-x-1" aria-hidden="true" />
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
            className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
          >
            <div className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-blue-500/[0.06] blur-3xl transition group-hover:bg-blue-500/10" />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                <Code2 className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 flex items-center gap-3 text-2xl font-bold text-white">
                DSA
                <ArrowRight className="h-5 w-5 text-blue-300 transition group-hover:translate-x-1" aria-hidden="true" />
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
                Build problem-solving skills with topic-wise practice and structured roadmaps.
              </p>
            </div>
            <span className="relative mt-6 w-fit rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300">
              Explore DSA
            </span>
          </Link>

          <Link
            href="/placement"
            className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
          >
            <div className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-blue-500/[0.06] blur-3xl transition group-hover:bg-blue-500/10" />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                <BriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 flex items-center gap-3 text-2xl font-bold text-white">
                Placement
                <ArrowRight className="h-5 w-5 text-blue-300 transition group-hover:translate-x-1" aria-hidden="true" />
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
                Prepare for hiring tests with aptitude, reasoning, and verbal practice.
              </p>
            </div>
            <span className="relative mt-6 w-fit rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300">
              Explore Placement
            </span>
          </Link>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#101b2b] to-[#111827] p-6 md:px-8 md:py-7">
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
                GATE, DSA, and Placement preparation, all in one place.
              </p>
            </div>
            <Link
              href="/tests"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
            >
              Start Preparing
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-12 md:mt-24">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Choose a preparation area, find a practice format, and start a test when you are ready.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            <article className="border-t border-white/10 pt-5">
              <span className="font-mono text-sm font-semibold text-blue-400">01</span>
              <h3 className="mt-3 text-lg font-bold text-white">Choose your track</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Start with GATE CSE, DSA, or Placement based on what you are preparing for.
              </p>
              <Link
                href="#tracks"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
              >
                View preparation tracks <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>

            <article className="border-t border-white/10 pt-5">
              <span className="font-mono text-sm font-semibold text-blue-400">02</span>
              <h3 className="mt-3 text-lg font-bold text-white">Pick a practice format</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Browse GATE papers by year, practise by subject, or explore DSA roadmaps and placement topics.
              </p>
              <Link
                href="/gate/pyq"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
              >
                Browse GATE papers <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>

            <article className="border-t border-white/10 pt-5">
              <span className="font-mono text-sm font-semibold text-blue-400">03</span>
              <h3 className="mt-3 text-lg font-bold text-white">Start a practice session</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Open a mock test or practice set and work through questions at your own pace.
              </p>
              <Link
                href="/gate/mock"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
              >
                View GATE mock tests <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
