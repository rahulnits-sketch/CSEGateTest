import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestCard from "@/components/TestCard";
import subjectsData from "@/data/subjects.json";
import chaptersData from "@/data/chapters.json";
import BackButton from "@/components/BackButton";

type PracticeTest = {
  id: string;
  title: string;
  duration: string;
  difficulty: string;
  questionsCount: number;
};

type Chapter = {
  id: string;
  name: string;
  description: string;
  tests: PracticeTest[];
};

type PageProps = {
  params: Promise<{ subject: string; chapter: string }>;
};

export default async function ChapterTestsPage({ params }: PageProps) {
  const { subject, chapter } = await params;
  const subjectInfo = subjectsData.find((s) => s.id === subject);
  const chapterList = (chaptersData as Record<string, Chapter[]>)[subject] || [];
  const chapterInfo = chapterList.find((c) => c.id === chapter);

  if (!subjectInfo || !chapterInfo) {
    notFound();
  }

  const tests = chapterInfo.tests || [];

  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col justify-between">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16 w-full flex-1">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link href="/tests" className="hover:text-white transition">GATE Subjects</Link>
          <span>/</span>
          <Link href={`/tests/${subject}`} className="hover:text-white transition">{subjectInfo.name}</Link>
          <span>/</span>
          <span className="text-blue-400 font-medium">{chapterInfo.name}</span>
        </div>

        {/* Header */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
          <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            {subjectInfo.shortName} • Chapter Tests
          </span>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-4xl">
            {chapterInfo.name}
          </h1>

          <p className="mt-2 text-xs leading-relaxed text-gray-400 max-w-2xl">
            {chapterInfo.description}
          </p>
        </div>

        {/* Tests List */}
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Available Practice Tests ({tests.length})</h2>
            <div className="flex items-center gap-3">
              <BackButton />
              <Link
                href={`/tests/${subject}`}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300"
              >
                ← Back to {subjectInfo.shortName} Chapters
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tests.map((t) => (
              <TestCard
                key={t.id}
                id={t.id}
                title={t.title}
                subject={subjectInfo.name}
                categoryLabel={`${subjectInfo.shortName} Chapter Test`}
                description={chapterInfo.description}
                duration={t.duration}
                difficulty={t.difficulty}
                questionCount={`${t.questionsCount} Questions`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
