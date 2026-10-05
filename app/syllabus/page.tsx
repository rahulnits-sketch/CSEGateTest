import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { ExternalLink } from "lucide-react";

const syllabusData = [
  {
    subject: "Engineering Mathematics & Discrete Math",
    weightage: "13 - 15 Marks",
  },
  {
    subject: "Digital Logic",
    weightage: "4 - 6 Marks",
  },
  {
    subject: "Computer Organization and Architecture (COA)",
    weightage: "8 - 11 Marks",
  },
  {
    subject: "Programming and Data Structures",
    weightage: "10 - 12 Marks",
  },
  {
    subject: "Algorithms",
    weightage: "8 - 10 Marks",
  },
  {
    subject: "Theory of Computation (TOC)",
    weightage: "7 - 9 Marks",
  },
  {
    subject: "Compiler Design",
    weightage: "4 - 6 Marks",
  },
  {
    subject: "Operating Systems",
    weightage: "8 - 10 Marks",
  },
  {
    subject: "Databases (DBMS)",
    weightage: "7 - 9 Marks",
  },
  {
    subject: "Computer Networks",
    weightage: "7 - 9 Marks",
  },
  {
    subject: "General Aptitude",
    weightage: "15 Marks (Compulsory)",
    topics: [
      "Verbal Ability: Grammar, Vocabulary, Reading Comprehension, Sentence Completion",
      "Quantitative Aptitude: Data Interpretation, Permutations, Probability, Percentages, Ratios, Speed & Time",
      "Analytical & Spatial Aptitude: Logic, Syllogisms, Sequences, Shape Matching, Visual Reasoning"
    ]
  }
];

export default function SyllabusPage() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col justify-between">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16 w-full flex-1">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <span className="text-blue-400 font-medium">GATE CSE Syllabus</span>
        </div>

        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            GATE CSE Complete Syllabus
          </h1>
          <div className="flex items-center gap-3">
            <a
              href="https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/CS_GATE2027_Syllabus.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500 hover:text-black"
            >
              Official Syllabus
              <ExternalLink className="h-4 w-4" />
            </a>
            <BackButton />
          </div>
        </div>

        {/* Syllabus Cards */}
        <div className="space-y-6">
          {syllabusData.map((item, idx) => (
            <div
              key={item.subject}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 transition duration-200 hover:border-white/20 hover:bg-white/[0.03]"
            >
              <div className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-5 ${
                item.subject === "General Aptitude" ? "border-b border-white/10" : ""
              }`}>
                <div className="flex items-center gap-3">
          
                  <div>
                    <span className="text-[11px] font-mono font-semibold text-gray-500 uppercase tracking-wider">
                      Section {idx + 1}
                    </span>
                    <h2 className="text-lg font-bold text-white md:text-xl">
                      {item.subject}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                    {item.weightage}
                  </span>
                  <Link
                    href="/tests"
                    className="rounded-lg bg-white/5 px-3 py-1 text-xs font-medium text-gray-300 hover:bg-white/10 hover:text-white transition"
                  >
                    Practice Tests →
                  </Link>
                </div>
              </div>

              {item.subject === "General Aptitude" && (
                <div className="mt-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                    Key Topics Covered:
                  </h3>
                  <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs text-gray-300">
                    {(item.topics ?? []).map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
