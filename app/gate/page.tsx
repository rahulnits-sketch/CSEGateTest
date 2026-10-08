import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import subjectsManifest from "@/data/gate/subjects/manifest.json";
import pyqManifest from "@/data/gate/pyq/manifest.json";

const gateOptions = [
  {
    href: "/gate/pyq",
    number: "01",
    icon: "📅",
    title: "Year-wise PYQs",
    description:
      "Choose a GATE CSE paper by year and attempt it like a timed exam.",
    detail: `${pyqManifest.length} papers · 1987–2026`,
    accent: "blue",
  },
  {
    href: "/gate/subjects",
    number: "02",
    icon: "📚",
    title: "Subject-wise Practice",
    description:
      "Pick a subject to practise its topics and previous year questions.",
    detail: `${subjectsManifest.length} subjects · Topic-wise practice`,
    accent: "purple",
  },
  {
    href: "/gate/mock",
    number: "03",
    icon: "🎯",
    title: "Mock Tests",
    description:
      "Take a full-length mock, a subject mock, or a quick practice drill.",
    detail: "Full mocks · Subject mocks · Practice drills",
    accent: "emerald",
  },
] as const;

const accentStyles = {
  blue: {
    border: "hover:border-blue-500/40",
    icon: "border-blue-500/20 bg-blue-500/10",
    number: "text-blue-400",
    title: "group-hover:text-blue-300",
    button: "bg-blue-600 hover:bg-blue-500",
  },
  purple: {
    border: "hover:border-purple-500/40",
    icon: "border-purple-500/20 bg-purple-500/10",
    number: "text-purple-400",
    title: "group-hover:text-purple-300",
    button: "bg-purple-600 hover:bg-purple-500",
  },
  emerald: {
    border: "hover:border-emerald-500/40",
    icon: "border-emerald-500/20 bg-emerald-500/10",
    number: "text-emerald-400",
    title: "group-hover:text-emerald-300",
    button: "bg-emerald-600 hover:bg-emerald-500",
  },
} as const;

export default function GateMasterPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-[#08090b] text-white selection:bg-blue-500 selection:text-white">
      <Navbar />

      <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 md:py-16">
        <div className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
         
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">
              What would you like to{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                practise today?
              </span>
            </h1>
        
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {gateOptions.map((option) => {
            const styles = accentStyles[option.accent];

            return (
              <Link
                key={option.href}
                href={option.href}
                className={`group flex min-h-72 flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition duration-200 hover:-translate-y-1 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 sm:p-7 ${styles.border}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-2xl ${styles.icon}`}
                    aria-hidden="true"
                  >
                    {option.icon}
                  </span>
                  <span className={`font-mono text-sm font-bold ${styles.number}`}>
                    {option.number}
                  </span>
                </div>

                <h2
                  className={`mt-6 text-xl font-bold text-white transition ${styles.title}`}
                >
                  {option.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
                  {option.description}
                </p>
                <p className="mt-5 border-t border-white/10 pt-4 text-xs text-gray-500">
                  {option.detail}
                </p>

                <span
                  className={`mt-5 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-white transition ${styles.button}`}
                >
                  <span>Explore</span>
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
