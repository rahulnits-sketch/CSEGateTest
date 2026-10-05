const fs = require("fs");
const path = require("path");

const ROOT_DIR = "C:/vscode/TestMaker/gate-cse-test-series";
const GATEQA_DIR = "C:/Users/rkuma/.gemini/antigravity/scratch/Gate_QA";

const rawQuestions = JSON.parse(fs.readFileSync(path.join(GATEQA_DIR, "public/questions-with-answers.json"), "utf8"));
const mockCatalog = JSON.parse(fs.readFileSync(path.join(GATEQA_DIR, "public/mock_catalog_v1.json"), "utf8"));
const answersPayload = JSON.parse(fs.readFileSync(path.join(GATEQA_DIR, "public/data/answers/answers_by_question_uid_v1.json"), "utf8"));
const answersMap = answersPayload.records_by_question_uid || {};

console.log(`Starting enhanced conversion of ${rawQuestions.length} GateQA questions...`);

function stripHtmlToText(html = "") {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#160;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanQuestionStem(html = "") {
  if (!html || typeof html !== "string") return "";
  let cleaned = html;
  const ALPHA_OPTION_LIST_RE = /<(ol|ul)\b[^>]*(?:list-style-type\s*:\s*(?:upper-alpha|lower-alpha)|\btype\s*=\s*["']?[Aa]["']?)[^>]*>[\s\S]*?<\/\1>/gi;
  const OPTION_LIST_RE = /<(ol|ul)\b[^>]*>\s*(?:<li\b[^>]*>\s*(?:<(?:strong|b|em|span)\b[^>]*>\s*)?(?:\(?[A-E]\)?[\.\):])\s*[\s\S]*?<\/li>\s*){2,5}<\/\1>/gi;
  const TRAILING_OPTION_LIST_RE = /<(ol|ul)\b[^>]*>\s*(?:<li\b[^>]*>[\s\S]*?<\/li>\s*){2,5}<\/\1>\s*(?:<br\s*\/?>|\s)*$/gi;
  const GENERIC_TRAILING_OPTION_LIST_RE = /<(ol|ul)\b[^>]*>\s*(?:<li\b[^>]*>[\s\S]*?<\/li>\s*){2,5}<\/\1>(?=\s*(?:<\/(?:div|section|article)>|\s)*$)/gi;
  
  cleaned = cleaned.replace(ALPHA_OPTION_LIST_RE, "");
  cleaned = cleaned.replace(OPTION_LIST_RE, "");
  cleaned = cleaned.replace(TRAILING_OPTION_LIST_RE, "");
  cleaned = cleaned.replace(GENERIC_TRAILING_OPTION_LIST_RE, "");
  cleaned = cleaned.replace(/<a\s+name=["']\d+["']><\/a>/gi, "");
  cleaned = cleaned.replace(/<div\s+itemprop=["']text["']>/gi, "");
  cleaned = cleaned.replace(/<\/div>\s*$/i, "");

  return cleaned.trim();
}

function extractOptions(html = "") {
  const raw = String(html || "");
  const options = [];
  const seen = new Set();
  const OPTION_LABELS = ["A", "B", "C", "D", "E"];

  const ALPHA_OPTION_LIST_CAPTURE_RE = /<(ol|ul)\b([^>]*(?:list-style-type\s*:\s*(?:upper-alpha|lower-alpha)|\btype\s*=\s*["']?[Aa]["']?)[^>]*)>([\s\S]*?)<\/\1>/gi;
  const LI_CAPTURE_RE = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;

  for (const listMatch of raw.matchAll(ALPHA_OPTION_LIST_CAPTURE_RE)) {
    const listItems = Array.from(listMatch[3].matchAll(LI_CAPTURE_RE));
    listItems.forEach((itemMatch, itemIndex) => {
      const label = OPTION_LABELS[itemIndex];
      if (label && !seen.has(label)) {
        seen.add(label);
        const optHtml = itemMatch[1].trim();
        const optText = stripHtmlToText(optHtml);
        options.push({
          label,
          text: optText || optHtml,
          html: optHtml
        });
      }
    });
  }

  if (options.length > 0) return options;

  const OPTION_BLOCK_CAPTURE_RE = /<(p|div|li)\b[^>]*>\s*(?:<(?:strong|b|em|span)\b[^>]*>\s*)?\(?([A-E])\)?[\.\):]\s*([\s\S]*?)<\/\1>/gi;
  for (const match of raw.matchAll(OPTION_BLOCK_CAPTURE_RE)) {
    const label = match[2].toUpperCase();
    if (!seen.has(label)) {
      seen.add(label);
      const optHtml = match[3].trim();
      const optText = stripHtmlToText(optHtml);
      options.push({
        label,
        text: optText || optHtml,
        html: optHtml
      });
    }
  }

  if (options.length > 0) return options;

  const OPTION_INLINE_CAPTURE_RE = /(?:^|\n|<br\s*\/?>|<\/?p[^>]*>|<\/?div[^>]*>)\s*\(?([A])\)?[\.\):]\s*([\s\S]*?)(?:&nbsp;|\s+)\(?([B])\)?[\.\):]\s*([\s\S]*?)(?:&nbsp;|\s+)\(?([C])\)?[\.\):]\s*([\s\S]*?)(?:&nbsp;|\s+)\(?([D])\)?[\.\):]\s*([\s\S]*?)(?=(?:<\/(?:p|div|li)>|<br\s*\/?>|\n|$))/i;
  const inlineMatch = raw.match(OPTION_INLINE_CAPTURE_RE);
  if (inlineMatch) {
    [
      { l: "A", h: inlineMatch[2] },
      { l: "B", h: inlineMatch[4] },
      { l: "C", h: inlineMatch[6] },
      { l: "D", h: inlineMatch[8] }
    ].forEach(({ l, h }) => {
      if (h) {
        options.push({
          label: l,
          text: stripHtmlToText(h),
          html: h.trim()
        });
      }
    });
  }

  return options;
}

// Canonical syllabus topic groups per subject
const SYLLABUS_TOPIC_GROUPS = {
  os: [
    { name: "CPU Scheduling & Processes", patterns: ["process", "scheduling", "cpu-scheduling", "context-switch", "srtf", "threads", "precedence-graph"] },
    { name: "Process Synchronization & Semaphores", patterns: ["synchronization", "semaphore", "inter-process", "ipc", "critical-section", "concurrency", "deadlock-prevention"] },
    { name: "Deadlocks & Resource Allocation", patterns: ["deadlock", "resource-allocation", "banker", "resource-allocation-graph"] },
    { name: "Memory Management & Paging", patterns: ["memory-management", "paging", "multilevel-paging", "page-replacement", "virtual-memory", "optimal-page-replacement"] },
    { name: "File Systems & Disk Scheduling", patterns: ["file-system", "disk", "disk-scheduling", "linked-allocation", "io-handling", "input-output"] },
    { name: "System Calls & OS Protection", patterns: ["system-calls", "fork", "fork-system-call", "protection", "interrupts"] }
  ],
  dbms: [
    { name: "ER Model & Relational Algebra", patterns: ["er-diagram", "relational-algebra", "relational-calculus", "relational-model", "tuple-relational-calculus", "joins", "natural-join"] },
    { name: "SQL & Query Languages", patterns: ["sql", "query", "referential-integrity"] },
    { name: "Functional Dependencies & Normalization", patterns: ["functional-dependency", "candidate-key", "normalization", "decomposition", "multivalued-dependency-4nf", "database-design"] },
    { name: "Transactions & Concurrency Control", patterns: ["transaction", "concurrency", "conflict-serializable", "serializability", "acid"] },
    { name: "Indexing & B/B+ Trees", patterns: ["b-tree", "indexing"] }
  ],
  cn: [
    { name: "OSI Layering & Physical Layer", patterns: ["osi-model", "network-layering", "communication", "channel-utilization"] },
    { name: "Data Link Layer & Flow Control", patterns: ["framing", "bit-stuffing", "crc-polynomial", "error-detection", "sliding-window", "stop-and-wait", "lan-technologies", "bridges"] },
    { name: "Medium Access Control (MAC)", patterns: ["csma-cd", "mac-protocol", "ethernet", "token-bucket"] },
    { name: "Network Layer & IP Addressing", patterns: ["ip-addressing", "subnetting", "ip-packet", "fragmentation", "arp", "network-switching", "network-flow"] },
    { name: "Routing Algorithms & Protocols", patterns: ["routing", "routing-protocols", "distance-vector-routing"] },
    { name: "Transport Layer (TCP/UDP)", patterns: ["tcp", "udp", "congestion-control", "sockets", "network-protocols"] },
    { name: "Application Layer Protocols", patterns: ["application-layer-protocols", "http", "dns", "smtp", "ftp"] }
  ],
  dsa: [
    { name: "Asymptotic Analysis & Recurrences", patterns: ["asymptotic-notation", "time-complexity", "space-complexity", "recurrence-relation", "recursion"] },
    { name: "Linear Data Structures (Arrays, Stacks, Queues)", patterns: ["array", "stack", "queue", "linked-list", "priority-queue", "infix-prefix"] },
    { name: "Trees & Binary Search Trees (BST/AVL)", patterns: ["binary-tree", "binary-search-tree", "avl-tree", "tree", "binary-heap"] },
    { name: "Searching, Sorting & Hashing", patterns: ["searching", "binary-search", "sorting", "merge-sort", "quick-sort", "insertion-sort", "hashing", "linear-probing", "double-hashing"] },
    { name: "Graph Algorithms (Shortest Paths, MST)", patterns: ["graph-algorithms", "depth-first-search", "dijkstras-algorithm", "bellman-ford", "shortest-path", "minimum-spanning-tree", "prims-algorithm", "topological-sort", "strongly-connected-components", "directed-graph", "graphs"] },
    { name: "Dynamic Programming & Greedy", patterns: ["dynamic-programming", "greedy-algorithms", "huffman-code", "matrix-chain-ordering"] },
    { name: "C Programming Constructs & Pointers", patterns: ["programming-in-c", "c-programming", "prog-c", "pointers", "parameter-passing", "functions", "strings", "structure", "union", "switch-case", "aliasing", "loop-invariants", "goto"] }
  ],
  toc: [
    { name: "Finite Automata & Regular Languages", patterns: ["finite-automata", "minimal-state-automata", "number-of-states", "regular-expression", "regular-grammar", "regular-language", "non-determinism"] },
    { name: "Context-Free Languages & Pushdown Automata", patterns: ["context-free-grammar", "context-free-language", "pushdown-automata", "dpda", "pumping-lemma"] },
    { name: "Turing Machines & Decidability", patterns: ["decidability", "recursive-and-recursively-enumerable-languages", "reduction", "closure-property", "countable-uncountable-set"] }
  ],
  coa: [
    { name: "Instruction Set Architecture & Addressing Modes", patterns: ["addressing-modes", "instruction-format", "instruction-set-architecture", "machine-instruction", "cisc-risc-architecture"] },
    { name: "Pipelining & Hazards", patterns: ["pipelining", "clock-cycles", "data-dependency", "data-hazards", "speedup", "data-path", "instruction-execution"] },
    { name: "Cache & Memory Hierarchy", patterns: ["cache-memory", "average-memory-access-time", "memory-interfacing", "virtual-memory"] },
    { name: "I/O Organization & Interrupts", patterns: ["io-handling", "interrupts", "dma", "runtime-environment", "microprogramming"] }
  ],
  compiler: [
    { name: "Lexical Analysis & Symbol Tables", patterns: ["lexical-analysis", "symbol-table", "assembler", "linker", "macros"] },
    { name: "Parsing & Syntax Analysis", patterns: ["parsing", "first-and-follow", "grammar", "lr-parser", "operator-precedence"] },
    { name: "Syntax-Directed Translation & Intermediate Code", patterns: ["syntax-directed-translation", "intermediate-code", "expression-evaluation"] },
    { name: "Code Optimization & Runtime Environments", patterns: ["code-optimization", "basic-blocks", "live-variable-analysis", "register-allocation", "runtime-environment", "variable-scope", "parameter-passing", "static-single-assignment", "backpatching"] }
  ],
  digital: [
    { name: "Boolean Algebra & Logic Minimization", patterns: ["boolean-algebra", "k-map", "canonical-normal-form", "min-sum-of-products-form", "min-products-of-sum-form", "prime-implicants", "min-no-gates", "functional-completeness"] },
    { name: "Combinational Circuits", patterns: ["combinational-circuit", "adder", "multiplexer", "decoder", "carry-generator", "array-multiplier", "circuit-output"] },
    { name: "Sequential Circuits, Flip-Flops & Counters", patterns: ["sequential-circuit", "flip-flop", "digital-counter", "ripple-counter-operation", "shift-registers", "finite-state-machines", "synchronous-asynchronous-circuits", "static-hazard"] },
    { name: "Number Representations & Computer Arithmetic", patterns: ["number-representation", "fixed-point-representation", "floating-point-representation", "ieee-representation", "booths-algorithm"] }
  ],
  "discrete-math": [
    { name: "Mathematical Logic & Proofs", patterns: ["mathematical-logic", "propositional-logic", "first-order-logic", "truth-tables", "logical-reasoning", "mathematical-induction"] },
    { name: "Set Theory, Relations & Functions", patterns: ["set-theory", "relations", "functions", "partial-order", "lattice", "group-theory", "countable-uncountable-set", "number-theory", "binary-operation"] },
    { name: "Combinatorics & Counting", patterns: ["combinatorics-and-counting", "combinatory", "counting", "permutations-and-combinations", "pigeonhole-principle", "recurrence-relation", "generating-functions", "modular-arithmetic", "summation", "balls-in-bins"] },
    { name: "Graph Theory", patterns: ["graph-theory", "graph-connectivity", "graph-matching", "graph-coloring", "graph-planarity", "graph-isomorphism", "degree-of-graph"] }
  ],
  "engg-math": [
    { name: "Linear Algebra & Matrices", patterns: ["linear-algebra", "matrix", "determinant", "rank-of-matrix", "eigen-value", "system-of-equations", "vector-space", "gaussian-elimination", "lu-decomposition", "subspace", "singular-value-decomposition", "orthonormality"] },
    { name: "Calculus", patterns: ["calculus", "limits", "continuity", "differentiation", "integration", "definite-integral", "maxima-minima", "cartesian-coordinates"] },
    { name: "Probability & Statistics", patterns: ["probability", "conditional-probability", "bayes-theorem", "random-variable", "probability-density-function", "uniform-distribution", "exponential-distribution", "normal-distribution", "poisson-distribution", "binomial-distribution", "bernoulli-distribution", "expectation", "variance", "statistics", "independent-events", "bayesian-network"] }
  ],
  aptitude: [
    { name: "Verbal Aptitude & Grammar", patterns: ["verbal-aptitude", "english-grammar", "vocabulary", "synonyms", "antonyms", "sentence-ordering", "passage-reading", "verbal-reasoning", "word-meaning", "articles", "tenses", "prepositions"] },
    { name: "Quantitative Aptitude", patterns: ["quantitative-aptitude", "numerical-computation", "ratio-proportion", "percentage", "profit-loss", "speed-time-distance", "work-time", "permutation-and-combination", "algebra", "geometry", "trigonometry", "mensuration", "number-series", "number-system", "lcm-hcf", "logarithms", "powers", "prime-numbers", "compound-interest", "clock-time", "calendar"] },
    { name: "Analytical & Logical Reasoning", patterns: ["analytical-aptitude", "logical-reasoning", "seating-arrangement", "direction-sense", "family-relationship", "coding-decoding", "number-relations", "statements-follow", "inequality", "age-relation"] },
    { name: "Spatial Aptitude & Data Interpretation", patterns: ["spatial-aptitude", "data-interpretation", "bar-graph", "pie-chart", "line-graph", "radar-chart", "tables", "tabular-data", "paper-folding", "mirror-image", "image-rotation", "assembling-pieces", "patterns-in-two-dimensions", "patterns-in-three-dimensions", "venn-diagram"] }
  ]
};

const SUBJECT_CONFIG = {
  os: { name: "Operating Systems", shortName: "OS", icon: "⚙️", color: "from-emerald-500/20 to-teal-500/20", borderColor: "border-emerald-500/30", aliases: ['operating-system', 'os', 'operating-systems'] },
  dbms: { name: "Database Management Systems", shortName: "DBMS", icon: "🗄️", color: "from-blue-500/20 to-indigo-500/20", borderColor: "border-blue-500/30", aliases: ['databases', 'dbms', 'database-management-systems'] },
  cn: { name: "Computer Networks", shortName: "CN", icon: "🌐", color: "from-cyan-500/20 to-blue-500/20", borderColor: "border-cyan-500/30", aliases: ['computer-networks', 'cn'] },
  dsa: { name: "Data Structures & Algorithms", shortName: "DSA", icon: "⚡", color: "from-purple-500/20 to-pink-500/20", borderColor: "border-purple-500/30", aliases: ['algorithms', 'data-structures', 'programming-and-ds', 'programming-ds', 'prog-ds', 'programming-in-c', 'c-programming', 'prog-c', 'programming', 'dsa'] },
  toc: { name: "Theory of Computation", shortName: "TOC", icon: "🔄", color: "from-amber-500/20 to-orange-500/20", borderColor: "border-amber-500/30", aliases: ['theory-of-computation', 'toc'] },
  coa: { name: "Computer Organization & Architecture", shortName: "COA", icon: "💻", color: "from-rose-500/20 to-red-500/20", borderColor: "border-rose-500/30", aliases: ['co-and-architecture', 'computer-organization-and-architecture', 'computer-architecture', 'coa'] },
  compiler: { name: "Compiler Design", shortName: "CD", icon: "🛠️", color: "from-violet-500/20 to-purple-500/20", borderColor: "border-violet-500/30", aliases: ['compiler-design', 'compiler'] },
  digital: { name: "Digital Logic", shortName: "DL", icon: "🔢", color: "from-fuchsia-500/20 to-pink-500/20", borderColor: "border-fuchsia-500/30", aliases: ['digital-logic', 'integrated-circuits'] },
  "discrete-math": { name: "Discrete Mathematics", shortName: "DM", icon: "📐", color: "from-sky-500/20 to-indigo-500/20", borderColor: "border-sky-500/30", aliases: ['discrete-mathematics', 'discrete-math', 'graph-theory', 'mathematical-logic', 'set-theory-and-algebra', 'set-theory&algebra', 'equivalence-class'] },
  "engg-math": { name: "Engineering Mathematics", shortName: "EM", icon: "📊", color: "from-yellow-500/20 to-amber-500/20", borderColor: "border-yellow-500/30", aliases: ['engineering-mathematics', 'engg-math', 'linear-algebra', 'numerical-methods', 'newton-raphson', 'simpsons-rule', 'simplex-method'] },
  aptitude: { name: "General Aptitude", shortName: "GA", icon: "🧠", color: "from-green-500/20 to-emerald-500/20", borderColor: "border-green-500/30", aliases: ['general-aptitude', 'ga', 'verbal-aptitude', 'quantitative-aptitude', 'spatial-aptitude', 'analytical-aptitude'] }
};

const normalize = (str) => String(str || '').toLowerCase().replace(/[^a-z0-9]/g, '');

const subjectAliasMap = {};
for (const [slug, conf] of Object.entries(SUBJECT_CONFIG)) {
  conf.aliases.forEach(a => {
    subjectAliasMap[normalize(a)] = slug;
  });
  subjectAliasMap[normalize(conf.name)] = slug;
  subjectAliasMap[normalize(conf.shortName)] = slug;
}

function classifyQuestion(tags = [], title = "", section = "") {
  if (section === "GA" || title.toLowerCase().includes("| ga |")) {
    return { subjectSlug: "aptitude", subjectName: "General Aptitude" };
  }

  for (const tag of tags) {
    const norm = normalize(tag);
    if (subjectAliasMap[norm]) {
      const slug = subjectAliasMap[norm];
      return { subjectSlug: slug, subjectName: SUBJECT_CONFIG[slug].name };
    }
  }

  for (const [slug, groups] of Object.entries(SYLLABUS_TOPIC_GROUPS)) {
    for (const grp of groups) {
      for (const pat of grp.patterns) {
        const normPat = normalize(pat);
        if (tags.some(t => normalize(t).includes(normPat))) {
          return { subjectSlug: slug, subjectName: SUBJECT_CONFIG[slug].name };
        }
      }
    }
  }

  return { subjectSlug: "engg-math", subjectName: "Engineering Mathematics" };
}

function resolveTopicForSubject(subjectSlug, tags = [], title = "") {
  const groups = SYLLABUS_TOPIC_GROUPS[subjectSlug] || [];
  const normTags = tags.map(t => normalize(t));
  const normTitle = normalize(title);

  for (const grp of groups) {
    for (const pat of grp.patterns) {
      const normPat = normalize(pat);
      if (normTags.some(t => t.includes(normPat) || normPat.includes(t)) || normTitle.includes(normPat)) {
        return grp.name;
      }
    }
  }

  return groups[0]?.name || "Core Concepts & Fundamentals";
}

function parseYearAndSet(q, mockInfo) {
  let year = 2026;
  let set = 1;
  let yearSetKey = "";

  const title = String(q.title || mockInfo?.title || "");
  const titleYearMatch = title.match(/GATE\s+(?:CSE|IT)?\s*(\d{4})/i);
  const titleSetMatch = title.match(/Set\s*(\d+)/i);

  if (titleYearMatch) {
    year = parseInt(titleYearMatch[1], 10);
  } else if (mockInfo?.yearSetKey) {
    const ym = mockInfo.yearSetKey.match(/(\d{4})/);
    if (ym) year = parseInt(ym[1], 10);
  } else if (q.year) {
    const ym = String(q.year).match(/(\d{4})/);
    if (ym) year = parseInt(ym[1], 10);
  }

  if (titleSetMatch) {
    set = parseInt(titleSetMatch[1], 10);
  } else if (mockInfo?.yearSetKey) {
    const sm = mockInfo.yearSetKey.match(/-s(\d+)/i);
    if (sm) {
      const parsedSet = parseInt(sm[1], 10);
      set = parsedSet === 0 ? 1 : parsedSet;
    }
  } else if (q.year) {
    const sm = String(q.year).match(/set[-]?(\d+)/i);
    if (sm) set = parseInt(sm[1], 10);
  }

  if (mockInfo?.yearSetKey) {
    yearSetKey = mockInfo.yearSetKey;
  } else {
    yearSetKey = set > 1 ? `${year}-s${set}` : `${year}-s1`;
  }

  let paperTitle = `GATE CSE ${year}`;
  if (title.includes("GATE IT")) {
    paperTitle = `GATE IT ${year}`;
  } else if (set > 1 || (year >= 2014 && (yearSetKey.includes("-s1") || yearSetKey.includes("-s2") || yearSetKey.includes("-s3")))) {
    paperTitle = `GATE CSE ${year} — Set ${set}`;
  }

  return { year, set, yearSetKey, paperTitle };
}

const allQuestions = [];
const pyqPapersMap = {};
const subjectQuestionsMap = {};

Object.keys(SUBJECT_CONFIG).forEach(s => {
  subjectQuestionsMap[s] = [];
});

rawQuestions.forEach((q, idx) => {
  const uid = q.question_uid || `go:${q.link?.match(/gateoverflow\.in\/(\d+)/)?.[1] || idx}`;
  const mockInfo = mockCatalog.byQuestionUid[uid];
  const ansInfo = answersMap[uid];

  const { year, set, yearSetKey, paperTitle } = parseYearAndSet(q, mockInfo);

  let orderIndex = idx + 1;
  let section = "CS";
  let marks = 1;
  let negativeMarks = 0.33;
  let type = "MCQ";

  if (mockInfo) {
    orderIndex = mockInfo.orderIndex || (idx + 1);
    section = mockInfo.section || (orderIndex <= 10 ? "GA" : "CS");
    marks = mockInfo.marks || 1;
    negativeMarks = Number((mockInfo.negativeMarks || (marks === 2 ? 0.67 : 0.33)).toFixed(2));
    type = mockInfo.type || "MCQ";
  } else {
    orderIndex = idx + 1;
    section = orderIndex <= 10 && (year >= 2010) ? "GA" : "CS";
    if (q.tags?.includes("two-marks") || q.tags?.includes("2-marks")) marks = 2;
    else marks = 1;
    negativeMarks = type === "MCQ" ? (marks === 2 ? 0.67 : 0.33) : 0;
  }

  let answer = q.answer ?? ansInfo?.answer ?? null;
  if (ansInfo?.type) type = ansInfo.type;
  if (q.type) type = q.type.toUpperCase();
  if (type === "MULTI_NAT" || type === "MULTI_BLANK_NAT") type = "NAT";
  if (type === "MTA" || type === "MARKS_TO_ALL") type = "MTA";
  if (!["MCQ", "MSQ", "NAT", "MTA"].includes(type)) {
    if (Array.isArray(answer)) type = "MSQ";
    else if (typeof answer === "number") type = "NAT";
    else type = "MCQ";
  }

  if (type !== "MCQ") {
    negativeMarks = 0;
  }

  let finalAnswer = [];
  if (answer !== null && answer !== undefined) {
    if (Array.isArray(answer)) {
      finalAnswer = answer.map(a => String(a).trim());
    } else {
      finalAnswer = [String(answer).trim()];
    }
  }

  const tolerance = ansInfo?.tolerance || q.answer_meta?.tolerance || null;

  const extractedOpts = extractOptions(q.question);
  let options = extractedOpts;
  if (options.length === 0 && Array.isArray(q.options) && q.options.length > 0) {
    options = q.options.map((opt, i) => {
      const label = String.fromCharCode(65 + i);
      const text = typeof opt === "string" ? opt : (opt.text || opt.html || "");
      return { label, text, html: text };
    });
  }

  const cleanStem = cleanQuestionStem(q.question);
  const { subjectSlug, subjectName } = classifyQuestion(q.tags, q.title, section);
  const topic = resolveTopicForSubject(subjectSlug, q.tags, q.title);

  const gateQuestion = {
    id: uid,
    testId: `gate-${yearSetKey}`,
    year,
    set,
    yearSetKey,
    orderIndex,
    section,
    title: q.title || `${paperTitle} Question ${orderIndex}`,
    subject: subjectName,
    subjectSlug,
    topic,
    type,
    question: cleanStem || q.question,
    rawQuestionHtml: q.question,
    options: options.map(o => o.text),
    structuredOptions: options,
    answer: finalAnswer,
    tolerance,
    marks,
    negativeMarks: type === "MCQ" ? negativeMarks : 0,
    source: "GATE CSE / GateOverflow",
    link: q.link || `https://gateoverflow.in/${uid.replace('go:', '')}`,
    difficulty: marks === 2 ? "Hard" : "Medium",
    explanation: q.explanation || `Refer to official GATE answer key & GateOverflow discussion at: ${q.link || 'https://gateoverflow.in'}`
  };

  allQuestions.push(gateQuestion);

  if (!pyqPapersMap[yearSetKey]) {
    pyqPapersMap[yearSetKey] = {
      id: `gate-${yearSetKey}`,
      yearSetKey,
      year,
      set,
      title: paperTitle,
      duration: "180 min",
      durationMinutes: 180,
      totalMarks: 0,
      totalQuestions: 0,
      gaQuestions: 0,
      csQuestions: 0,
      questions: []
    };
  }
  pyqPapersMap[yearSetKey].questions.push(gateQuestion);
  pyqPapersMap[yearSetKey].totalMarks += marks;
  pyqPapersMap[yearSetKey].totalQuestions += 1;
  if (section === "GA") pyqPapersMap[yearSetKey].gaQuestions += 1;
  else pyqPapersMap[yearSetKey].csQuestions += 1;

  if (subjectQuestionsMap[subjectSlug]) {
    subjectQuestionsMap[subjectSlug].push(gateQuestion);
  }
});

Object.values(pyqPapersMap).forEach(paper => {
  paper.questions.sort((a, b) => a.orderIndex - b.orderIndex);
});

const DATA_GATE_DIR = path.join(ROOT_DIR, "data/gate");
const DATA_PYQ_DIR = path.join(DATA_GATE_DIR, "pyq");
const DATA_SUBJ_DIR = path.join(DATA_GATE_DIR, "subjects");
const DATA_MOCK_DIR = path.join(DATA_GATE_DIR, "mock");

[DATA_GATE_DIR, DATA_PYQ_DIR, DATA_SUBJ_DIR, DATA_MOCK_DIR].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const pyqManifest = [];
Object.entries(pyqPapersMap)
  .sort((a, b) => {
    if (b[1].year !== a[1].year) return b[1].year - a[1].year;
    return a[1].set - b[1].set;
  })
  .forEach(([key, paper]) => {
    fs.writeFileSync(path.join(DATA_PYQ_DIR, `${key}.json`), JSON.stringify(paper, null, 2), "utf8");
    pyqManifest.push({
      id: paper.id,
      yearSetKey: paper.yearSetKey,
      year: paper.year,
      set: paper.set,
      title: paper.title,
      duration: paper.duration,
      durationMinutes: paper.durationMinutes,
      totalMarks: paper.totalMarks,
      totalQuestions: paper.totalQuestions,
      gaQuestions: paper.gaQuestions,
      csQuestions: paper.csQuestions
    });
  });

fs.writeFileSync(path.join(DATA_PYQ_DIR, "manifest.json"), JSON.stringify(pyqManifest, null, 2), "utf8");

const subjectManifest = [];
Object.entries(SUBJECT_CONFIG).forEach(([slug, conf]) => {
  const questions = subjectQuestionsMap[slug] || [];
  const topicCounts = {};
  questions.forEach(q => {
    const t = q.topic || "Core Concepts";
    topicCounts[t] = (topicCounts[t] || 0) + 1;
  });

  const subjectData = {
    id: slug,
    name: conf.name,
    shortName: conf.shortName,
    icon: conf.icon,
    color: conf.color,
    borderColor: conf.borderColor,
    totalQuestions: questions.length,
    topics: Object.entries(topicCounts).map(([topicName, count]) => ({
      name: topicName,
      questionCount: count
    })),
    questions
  };

  fs.writeFileSync(path.join(DATA_SUBJ_DIR, `${slug}.json`), JSON.stringify(subjectData, null, 2), "utf8");

  subjectManifest.push({
    id: slug,
    name: conf.name,
    shortName: conf.shortName,
    icon: conf.icon,
    color: conf.color,
    borderColor: conf.borderColor,
    totalQuestions: questions.length,
    topicsCount: Object.keys(topicCounts).length
  });
});

fs.writeFileSync(path.join(DATA_SUBJ_DIR, "manifest.json"), JSON.stringify(subjectManifest, null, 2), "utf8");
fs.writeFileSync(path.join(DATA_GATE_DIR, "all-questions.json"), JSON.stringify(allQuestions, null, 2), "utf8");

console.log("Full GATE dataset conversion completed successfully with accurate years and topics!");
