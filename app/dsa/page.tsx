import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dsaData from "@/data/dsa.json";
import BackButton from "@/components/BackButton";

export default function DSAPage() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col justify-between">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-8 md:py-10 w-full flex-1">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
            DSA Topic-Wise Practice
          </h1>
          <BackButton />
        </div>

        {/* Topics Grid */}
        <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dsaData.topics.map((t) => (
            <div
              key={t.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition duration-200 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-white/[0.04]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-2xl">
                    {t.icon}
                  </span>
                  <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-gray-400">
                    {t.difficulty}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-white group-hover:text-cyan-400 transition">
                  {t.title}
                </h3>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <Link
                  href={`/dsa/${t.slug}`}
                  className="block w-full rounded-xl bg-cyan-500/10 py-2.5 text-center text-xs font-bold text-cyan-300 transition hover:bg-cyan-500 hover:text-black"
                >
                  Explore {t.title} Tests →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>

      <Footer />
    </main>
  );
}
