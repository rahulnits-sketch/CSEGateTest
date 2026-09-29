import { NextResponse } from "next/server";

function decodeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&deg;/g, "°")
    .replace(/&shy;/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&eacute;/g, "é")
    .replace(/&uuml;/g, "ü")
    .replace(/&ouml;/g, "ö")
    .replace(/&auml;/g, "ä");
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// In-memory cache to prevent OpenTDB 5-second rate limiting during React dev re-renders
type CachedItem = {
  id: number;
  testId: string;
  type: string;
  question: string;
  options: string[];
  answer: string[];
  subject: string;
  topic: string;
  difficulty: string;
  marks: number;
  negativeMarks: number;
  explanation: string;
};

let cachedResult: CachedItem[] = [];
let lastFetchTimestamp = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const amount = searchParams.get("amount") || "10";
  const difficulty = searchParams.get("difficulty");
  const category = searchParams.get("category") || "18";

  const now = Date.now();
  // If called within 10 seconds and cache has full questions, reuse cache
  if (cachedResult.length >= 10 && now - lastFetchTimestamp < 10000) {
    return NextResponse.json({
      success: true,
      source: "Open Trivia DB (Cached)",
      count: cachedResult.length,
      questions: cachedResult,
    });
  }

  let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`;
  if (difficulty && ["easy", "medium", "hard"].includes(difficulty)) {
    url += `&difficulty=${difficulty}`;
  }

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`OpenTDB responded with status ${res.status}`);
    }

    const data = await res.json();

    // If rate limited (response_code 5) and we have previous cache, return previous cache!
    if (data.response_code === 5 && cachedResult.length > 0) {
      return NextResponse.json({
        success: true,
        source: "Open Trivia DB (Cache on Rate-Limit)",
        count: cachedResult.length,
        questions: cachedResult,
      });
    }

    if (data.response_code !== 0 || !data.results || data.results.length === 0) {
      throw new Error(`OpenTDB error code: ${data.response_code}`);
    }

    type OpenTDBItem = {
      category: string;
      type: string;
      difficulty: string;
      question: string;
      correct_answer: string;
      incorrect_answers: string[];
    };

    const questions: CachedItem[] = data.results.map((item: OpenTDBItem, idx: number) => {
      const decodedQuestion = decodeHtml(item.question);
      const decodedCorrect = decodeHtml(item.correct_answer);
      const decodedIncorrect = item.incorrect_answers.map((ans) => decodeHtml(ans));

      const shuffledOptions = shuffleArray([decodedCorrect, ...decodedIncorrect]);

      return {
        id: 1000 + idx + 1,
        testId: "opentdb",
        type: "MCQ",
        question: decodedQuestion,
        options: shuffledOptions,
        answer: [decodedCorrect],
        subject: "Computer Science (OpenTDB)",
        topic: "General CS Trivia",
        difficulty:
          item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1),
        marks: 1,
        negativeMarks: 0.33,
        explanation: `According to Open Trivia DB, the correct answer is "${decodedCorrect}".`,
      };
    });

    cachedResult = questions;
    lastFetchTimestamp = now;

    return NextResponse.json({
      success: true,
      source: "Open Trivia DB (Live)",
      count: questions.length,
      questions,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to fetch from OpenTDB";
    console.error("OpenTDB Fetch Error:", errorMsg);

    // If we have cached results from earlier, use them!
    if (cachedResult.length >= 10) {
      return NextResponse.json({
        success: true,
        source: "Open Trivia DB (Cached)",
        count: cachedResult.length,
        questions: cachedResult,
      });
    }

    // Complete 10-Question Fallback Bank
    const fullFallbackQuestions: CachedItem[] = [
      {
        id: 1001,
        testId: "opentdb",
        type: "MCQ",
        question: "What does CPU stand for?",
        options: [
          "Central Processing Unit",
          "Central Process Unit",
          "Computer Processing Unit",
          "Core Processor Unit",
        ],
        answer: ["Central Processing Unit"],
        subject: "Computer Science (OpenTDB)",
        topic: "Hardware",
        difficulty: "Easy",
        marks: 1,
        negativeMarks: 0.33,
        explanation: "CPU stands for Central Processing Unit.",
      },
      {
        id: 1002,
        testId: "opentdb",
        type: "MCQ",
        question: "In programming, the ternary operator is mostly defined with which symbols?",
        options: ["?:", "??", "if-else", "#:"],
        answer: ["?:"],
        subject: "Computer Science (OpenTDB)",
        topic: "Programming",
        difficulty: "Medium",
        marks: 1,
        negativeMarks: 0.33,
        explanation: "The conditional (ternary) operator in C, Java, JS is defined with '?:'.",
      },
      {
        id: 1003,
        testId: "opentdb",
        type: "MCQ",
        question: "Which of the following is not an operating system?",
        options: ["Oracle", "Linux", "Windows", "macOS"],
        answer: ["Oracle"],
        subject: "Computer Science (OpenTDB)",
        topic: "Operating Systems",
        difficulty: "Easy",
        marks: 1,
        negativeMarks: 0.33,
        explanation: "Oracle is a database management system, not an OS.",
      },
      {
        id: 1004,
        testId: "opentdb",
        type: "MCQ",
        question: "What is the primary protocol used to transfer web pages over the Internet?",
        options: ["HTTP", "FTP", "SMTP", "SNMP"],
        answer: ["HTTP"],
        subject: "Computer Science (OpenTDB)",
        topic: "Networking",
        difficulty: "Easy",
        marks: 1,
        negativeMarks: 0.33,
        explanation: "HTTP (Hypertext Transfer Protocol) is used for web communication.",
      },
      {
        id: 1005,
        testId: "opentdb",
        type: "MCQ",
        question: "Which data structure operates on a First-In, First-Out (FIFO) basis?",
        options: ["Queue", "Stack", "Binary Tree", "Heap"],
        answer: ["Queue"],
        subject: "Computer Science (OpenTDB)",
        topic: "Data Structures",
        difficulty: "Easy",
        marks: 1,
        negativeMarks: 0.33,
        explanation: "A Queue operates on FIFO basis.",
      },
      {
        id: 1006,
        testId: "opentdb",
        type: "MCQ",
        question: "What year was the programming language Python first released?",
        options: ["1991", "1989", "1995", "2000"],
        answer: ["1991"],
        subject: "Computer Science (OpenTDB)",
        topic: "History",
        difficulty: "Medium",
        marks: 1,
        negativeMarks: 0.33,
        explanation: "Python was created by Guido van Rossum and released in 1991.",
      },
      {
        id: 1007,
        testId: "opentdb",
        type: "MCQ",
        question: "Which company created the JavaScript programming language in 1995?",
        options: ["Netscape", "Microsoft", "Sun Microsystems", "Oracle"],
        answer: ["Netscape"],
        subject: "Computer Science (OpenTDB)",
        topic: "Web Development",
        difficulty: "Medium",
        marks: 1,
        negativeMarks: 0.33,
        explanation: "Brendan Eich developed JavaScript while working at Netscape.",
      },
      {
        id: 1008,
        testId: "opentdb",
        type: "MCQ",
        question: "In hexadecimal notation, what is the decimal equivalent of the letter 'F'?",
        options: ["15", "16", "10", "14"],
        answer: ["15"],
        subject: "Computer Science (OpenTDB)",
        topic: "Number Systems",
        difficulty: "Easy",
        marks: 1,
        negativeMarks: 0.33,
        explanation: "Hexadecimal digits A-F represent decimal 10-15. F is 15.",
      },
      {
        id: 1009,
        testId: "opentdb",
        type: "MCQ",
        question: "What port number does secure HTTPS typically run on?",
        options: ["443", "80", "22", "8080"],
        answer: ["443"],
        subject: "Computer Science (OpenTDB)",
        topic: "Networking",
        difficulty: "Easy",
        marks: 1,
        negativeMarks: 0.33,
        explanation: "Standard HTTPS traffic operates on TCP port 443.",
      },
      {
        id: 1010,
        testId: "opentdb",
        type: "MCQ",
        question: "Which company originally created the Android operating system before Google acquired it?",
        options: ["Android Inc.", "Symbian", "Motorola", "Palm"],
        answer: ["Android Inc."],
        subject: "Computer Science (OpenTDB)",
        topic: "Mobile OS",
        difficulty: "Medium",
        marks: 1,
        negativeMarks: 0.33,
        explanation: "Android Inc. was founded in Palo Alto in 2003 and acquired by Google in 2005.",
      },
    ];

    cachedResult = fullFallbackQuestions;
    return NextResponse.json({
      success: true,
      fallback: true,
      count: fullFallbackQuestions.length,
      questions: fullFallbackQuestions,
    });
  }
}
