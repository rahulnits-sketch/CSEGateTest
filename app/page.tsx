import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col selection:bg-blue-500 selection:text-white">
      <Navbar />
      <section className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl flex-col items-center justify-center gap-10 px-6 py-12 text-center md:gap-12 md:py-16">
        <h1 className="-translate-y-3 text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
          <span className="block">Prepare Smarter.</span>
          <span className="mt-3 block bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Test Faster.
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
            <span>Explore</span>
            <span className="text-lg">→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
