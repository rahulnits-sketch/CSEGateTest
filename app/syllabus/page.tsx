import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

const syllabusData = [
  {
    subject: "Engineering Mathematics & Discrete Math",
    weightage: "13 - 15 Marks",
    icon: "📐",
    topics: [
      "Propositional and First-Order Logic",
      "Sets, Relations, Functions, Partial Orders and Lattices",
      "Monoids, Groups, Combinatorics, Counting, Recurrence Relations",
      "Graph Theory: Connectivity, Matching, Coloring",
      "Linear Algebra: Matrices, Determinants, Systems of Linear Equations, Eigenvalues & Eigenvectors",
      "Calculus: Limits, Continuity, Differentiability, Maxima & Minima",
      "Probability & Statistics: Conditional Probability, Bayes Theorem, Random Variables, Distributions"
    ]
  },
  {
    subject: "Digital Logic",
    weightage: "4 - 6 Marks",
    icon: "🔌",
    topics: [
      "Boolean Algebra, Minimization of Functions (K-Maps)",
      "Combinational Circuits: Arithmetic Circuits, Code Converters, Multiplexers, Decoders",
      "Sequential Circuits: Latches, Flip-Flops, Counters, Shift Registers",
      "Number Representations and Computer Arithmetic (Fixed & Floating Point)"
    ]
  },
  {
    subject: "Computer Organization and Architecture (COA)",
    weightage: "8 - 11 Marks",
    icon: "💻",
    topics: [
      "Machine Instructions and Addressing Modes",
      "ALU, Data-Path and Control Unit (Hardwired & Microprogrammed)",
      "Instruction Pipelining and Pipeline Hazards (Data, Structural, Branch)",
      "Memory Hierarchy: Cache (Direct, Associative, Set-Associative), Main Memory, Secondary Storage",
      "I/O Interface: Interrupts and DMA"
    ]
  },
  {
    subject: "Programming and Data Structures",
    weightage: "10 - 12 Marks",
    icon: "⚡",
    topics: [
      "Programming in C: Functions, Recursion, Parameter Passing, Scope, Pointers, Structures",
      "Linear Data Structures: Arrays, Stacks, Queues, Linked Lists",
      "Trees: Binary Trees, Binary Search Trees (BST), AVL Trees",
      "Heaps and Priority Queues"
    ]
  },
  {
    subject: "Algorithms",
    weightage: "8 - 10 Marks",
    icon: "🧮",
    topics: [
      "Searching, Sorting (Merge, Quick, Heap, Comparison lower bounds)",
      "Asymptotic Worst and Average Time/Space Complexity",
      "Algorithm Design Techniques: Greedy, Dynamic Programming, Divide-and-Conquer",
      "Graph Traversals: Minimum Spanning Trees (Prim, Kruskal), Shortest Paths (Dijkstra, Bellman-Ford)"
    ]
  },
  {
    subject: "Theory of Computation (TOC)",
    weightage: "7 - 9 Marks",
    icon: "🔄",
    topics: [
      "Regular Expressions and Finite Automata (DFA, NFA, Minimization)",
      "Context-Free Grammars (CFG) and Pushdown Automata (PDA)",
      "Pumping Lemma for Regular and Context-Free Languages",
      "Turing Machines and Decidability, Halting Problem"
    ]
  },
  {
    subject: "Compiler Design",
    weightage: "4 - 6 Marks",
    icon: "🛠️",
    topics: [
      "Lexical Analysis, Regular Expressions to DFA",
      "Syntax Analysis: LL(1), LR Parsers (LR(0), SLR(1), LALR(1), CLR(1))",
      "Syntax-Directed Translation, Attribute Grammars",
      "Intermediate Code Generation, Control Flow Graphs, Basic Blocks",
      "Code Optimization: Local Optimization, Data Flow Analysis, Register Allocation"
    ]
  },
  {
    subject: "Operating Systems",
    weightage: "8 - 10 Marks",
    icon: "⚙️",
    topics: [
      "System Calls, Processes, Threads, Inter-process Communication",
      "CPU Scheduling: Preemptive and Non-preemptive Algorithms",
      "Synchronization: Critical Section, Mutex, Semaphores, Classical Problems",
      "Deadlocks: Detection, Prevention, Avoidance (Banker's Algorithm)",
      "Memory Management: Paging, Segmentation, Virtual Memory, Page Replacement (FIFO, LRU, Optimal)",
      "File Systems and Disk Scheduling (SSTF, SCAN, C-SCAN, LOOK)"
    ]
  },
  {
    subject: "Databases (DBMS)",
    weightage: "7 - 9 Marks",
    icon: "🗄️",
    topics: [
      "ER-Model, Relational Model: Relational Algebra, Tuple Relational Calculus",
      "SQL: DDL, DML, Joins, Nested Queries, Aggregations",
      "Integrity Constraints, Normalization (1NF, 2NF, 3NF, BCNF, Dependency Preservation)",
      "File Organization, Indexing: B-Trees and B+ Trees",
      "Transactions and Concurrency: ACID Properties, Serializability, Two-Phase Locking (2PL)"
    ]
  },
  {
    subject: "Computer Networks",
    weightage: "7 - 9 Marks",
    icon: "🌐",
    topics: [
      "Concept of Layering: OSI & TCP/IP Protocol Stacks",
      "Data Link Layer: Framing, Error Detection (CRC), Flow Control (Sliding Window, Go-Back-N, Selective Repeat)",
      "MAC: CSMA/CD, Ethernet Basics",
      "Network Layer: IPv4 & IPv6 Addressing, Subnetting, CIDR, Routing Protocols (Distance Vector, Link State)",
      "Transport Layer: TCP (Flow Control, Congestion Control AIMD, 3-way Handshake), UDP",
      "Application Layer Protocols: DNS, SMTP, HTTP, FTP, Basics of Public Key Cryptography"
    ]
  },
  {
    subject: "General Aptitude",
    weightage: "15 Marks (Compulsory)",
    icon: "📊",
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
          <BackButton />
        </div>

        {/* Syllabus Cards */}
        <div className="space-y-6">
          {syllabusData.map((item, idx) => (
            <div
              key={item.subject}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 transition duration-200 hover:border-white/20 hover:bg-white/[0.03]"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-xl">
                    {item.icon}
                  </span>
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

              <div className="mt-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                  Key Topics Covered:
                </h3>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs text-gray-300">
                  {item.topics.map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
