import Link from "next/link";
import questionData from "@/data/questions.json";

const testList = [
  {
    id: "dsa-01",
    title: "Data Structures & Algorithms — Test 01",
    subject: "Data Structures & Algorithms",
    duration: "15 min",
    difficulty: "Medium",
    description: "Binary search, stack, tree heights & linear data structures.",
    isLiveApi: false,
  },
  {
    id: "dbms-01",
    title: "Database Management Systems — Test 01",
    subject: "DBMS",
    duration: "15 min",
    difficulty: "Medium",
    description: "Normal forms (2NF), ACID properties, candidate keys & closures.",
    isLiveApi: false,
  },
  {
    id: "cn-01",
    title: "Computer Networks — Test 01",
    subject: "Computer Networks",
    duration: "15 min",
    difficulty: "Medium",
    description: "OSI network layer, transport protocols (UDP), Go-Back-N windowing.",
    isLiveApi: false,
  },
  {
    id: "os-01",
    title: "Operating Systems — Test 01",
    subject: "Operating Systems",
    duration: "15 min",
    difficulty: "Medium",
    description: "CPU scheduling starvation, deadlock conditions & resource allocation.",
    isLiveApi: false,
  },
  {
    id: "all",
    title: "GATE CSE Full Subject Mock Test",
    subject: "Comprehensive",
    duration: "30 min",
    difficulty: "GATE Level",
    description: "Curated mix of MCQ, MSQ, and NAT questions across core subjects.",
    isLiveApi: false,
  },
  {
    id: "opentdb",
    title: "Computer Science Trivia — Open Trivia DB",
    subject: "Live API (Science: Computers)",
    duration: "10 min",
    difficulty: "Mixed",
    description: "Dynamic live questions fetched directly from Open Trivia DB REST API.",
    isLiveApi: true,
  },
];

export default function TestsPage() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            GATE<span className="text-blue-500">CSE</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="mb-12">
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
            Practice Tests
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            GATE CSE Test Series
          </h1>

          <p className="mt-3 text-base text-gray-400">
            Practice strictly simulated GATE pattern tests as well as live API tests.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testList.map((test) => {
            const count = test.isLiveApi
              ? "10 (Live)"
              : test.id === "all"
              ? `${questionData.length} Questions`
              : `${questionData.filter((q) => q.testId === test.id).length} Questions`;

            return (
              <div
                key={test.id}
                className={`group flex flex-col justify-between rounded-2xl border p-6 transition duration-200 hover:-translate-y-1 ${
                  test.isLiveApi
                    ? "border-emerald-500/30 bg-emerald-500/[0.03] hover:border-emerald-500/60"
                    : "border-white/10 bg-white/[0.03] hover:border-blue-500/40 hover:bg-white/[0.05]"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-xs font-medium uppercase tracking-wider ${
                        test.isLiveApi ? "text-emerald-400 font-semibold" : "text-blue-400"
                      }`}
                    >
                      {test.subject}
                    </p>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        test.isLiveApi
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-white/5 text-gray-400"
                      }`}
                    >
                      {test.difficulty}
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-semibold tracking-tight text-white group-hover:text-blue-300">
                    {test.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    {test.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          test.isLiveApi ? "bg-emerald-400 animate-pulse" : "bg-blue-500"
                        }`}
                      />
                      {count}
                    </span>
                    <span>⏱ {test.duration}</span>
                  </div>

                  <Link
                    href={`/test/${test.id}`}
                    className={`mt-4 block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition hover:shadow-lg ${
                      test.isLiveApi
                        ? "bg-emerald-500 text-black hover:bg-emerald-400"
                        : "bg-white text-black hover:bg-blue-50"
                    }`}
                  >
                    Start Test →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}