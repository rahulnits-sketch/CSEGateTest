import pyqManifest from "@/data/gate/pyq/manifest.json";
import subjectsManifest from "@/data/gate/subjects/manifest.json";
import mockPresets from "@/data/gate/mock/mocks.json";

export type GateQuestion = {
  id: string;
  testId: string;
  year: number;
  set?: number;
  yearSetKey: string;
  orderIndex: number;
  section: "GA" | "CS" | string;
  title: string;
  subject: string;
  subjectSlug: string;
  topic?: string;
  type: "MCQ" | "MSQ" | "NAT" | "MTA" | string;
  question: string;
  rawQuestionHtml?: string;
  options: string[];
  structuredOptions?: { label: string; text: string; html?: string }[];
  answer: string[];
  tolerance?: { min?: number; max?: number; lower?: number; upper?: number; abs?: number } | null;
  marks: number;
  negativeMarks: number;
  source?: string;
  link?: string;
  difficulty?: string;
  explanation?: string;
};

export type GatePaper = {
  id: string;
  yearSetKey: string;
  year: number;
  set: number;
  title: string;
  duration: string;
  durationMinutes: number;
  totalMarks: number;
  totalQuestions: number;
  gaQuestions: number;
  csQuestions: number;
  questions: GateQuestion[];
};

export type GateSubject = {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  borderColor: string;
  totalQuestions: number;
  topics: { name: string; questionCount: number }[];
  questions?: GateQuestion[];
};

export type GateMockPreset = {
  id: string;
  title: string;
  type: string;
  category: string;
  subjectSlug?: string;
  subjectName?: string;
  questionsCount: number;
  totalMarks: number;
  durationMinutes: number;
  duration: string;
  difficulty: string;
  description: string;
  sourcePaper?: string;
  isDynamic?: boolean;
  isSubjectMock?: boolean;
};

export function getPyqManifest() {
  return pyqManifest;
}

export function getSubjectsManifest() {
  return subjectsManifest;
}

export function getMockPresets(): GateMockPreset[] {
  return mockPresets as GateMockPreset[];
}

/**
 * Load questions for any given testId synchronously or dynamically
 */
export async function getGateQuestionsForTest(testId: string): Promise<{
  title: string;
  subject: string;
  durationMinutes: number;
  questions: GateQuestion[];
} | null> {
  // 1. Check if testId matches a PYQ paper (e.g. gate-2026-s1, gate-2025-s1, etc.)
  const pyqKey = testId.replace(/^gate-/, "");
  try {
    const paperModule = await import(`@/data/gate/pyq/${pyqKey}.json`);
    const paper: GatePaper = paperModule.default;
    return {
      title: paper.title,
      subject: "GATE CSE Official Paper",
      durationMinutes: paper.durationMinutes || 180,
      questions: paper.questions
    };
  } catch {
    // continue to other matchers
  }

  const KNOWN_SUBJECT_SLUGS = [
    "os", "dbms", "cn", "dsa", "toc", "coa", "compiler", "digital",
    "discrete-math", "engg-math", "aptitude"
  ];
  const sortedSubjectSlugs = [...KNOWN_SUBJECT_SLUGS].sort((a, b) => b.length - a.length);

  // 2. Check if testId matches a topic practice (e.g. gate-topic-[subject]-[topicSlug])
  if (testId.startsWith("gate-topic-")) {
    const afterPrefix = testId.slice("gate-topic-".length);
    const matchedSlug = sortedSubjectSlugs.find(slug => afterPrefix.startsWith(`${slug}-`));

    if (matchedSlug) {
      const rawTopicSlug = afterPrefix.slice(matchedSlug.length + 1);
      const targetTopicNorm = decodeURIComponent(rawTopicSlug).toLowerCase().replace(/[^a-z0-9]/g, "");

      try {
        const subjModule = await import(`@/data/gate/subjects/${matchedSlug}.json`);
        const subjData: GateSubject = subjModule.default;
        const allSubjQuestions = subjData.questions || [];

        // Match questions by comparing normalized topic string
        const filtered = allSubjQuestions.filter(q => {
          const qTopicNorm = String(q.topic || "").toLowerCase().replace(/[^a-z0-9]/g, "");
          return qTopicNorm.includes(targetTopicNorm) || targetTopicNorm.includes(qTopicNorm);
        });

        const qList = filtered.length > 0 ? filtered : allSubjQuestions;
        const displayTopic = filtered.length > 0 && filtered[0]?.topic ? filtered[0].topic : "Topic Practice";

        return {
          title: `${subjData.name} — ${displayTopic}`,
          subject: subjData.name,
          durationMinutes: Math.min(120, Math.max(15, Math.ceil(qList.length * 2.5))),
          questions: qList.map((q, i) => ({ ...q, orderIndex: i + 1 }))
        };
      } catch (e) {
        console.error("Error loading topic questions:", e);
      }
    }
  }

  // 3. Check if testId matches a subject mock or full subject practice (e.g. gate-mock-subj-os, gate-subject-os)
  const isMockSubj = testId.startsWith("gate-mock-subj-");
  const isSubjectAll = testId.startsWith("gate-subject-");
  if (isMockSubj || isSubjectAll) {
    const prefix = isMockSubj ? "gate-mock-subj-" : "gate-subject-";
    const subjSlug = testId.slice(prefix.length);
    if (KNOWN_SUBJECT_SLUGS.includes(subjSlug)) {
      try {
        const subjModule = await import(`@/data/gate/subjects/${subjSlug}.json`);
        const subjData: GateSubject = subjModule.default;
        const allSubjQuestions = subjData.questions || [];
        const questionsToTake = isMockSubj ? sampleQuestions(allSubjQuestions, 25) : allSubjQuestions;
        return {
          title: `${subjData.name} — ${isMockSubj ? "Mock Test" : "Practice Set"}`,
          subject: subjData.name,
          durationMinutes: isMockSubj ? 45 : Math.min(180, Math.max(20, Math.ceil(questionsToTake.length * 2))),
          questions: questionsToTake.map((q, i) => ({ ...q, orderIndex: i + 1 }))
        };
      } catch (e) {
        console.error("Error loading subject questions:", e);
      }
    }
  }

  // 4. Check if testId matches dynamic mock (e.g. gate-mock-random-65, gate-mock-random-30, gate-mock-full-...)
  if (testId.startsWith("gate-mock-")) {
    const mockPreset = (mockPresets as GateMockPreset[]).find(m => m.id === testId);
    if (mockPreset?.sourcePaper) {
      try {
        const paperModule = await import(`@/data/gate/pyq/${mockPreset.sourcePaper}.json`);
        const paper: GatePaper = paperModule.default;
        return {
          title: mockPreset.title,
          subject: "Full GATE CSE Mock",
          durationMinutes: mockPreset.durationMinutes || 180,
          questions: paper.questions
        };
      } catch {
        // continue
      }
    }

    // Dynamic random mock
    try {
      const allQModule = await import("@/data/gate/all-questions.json");
      const allList = allQModule.default as unknown as GateQuestion[];
      const count = mockPreset?.questionsCount || 65;
      return {
        title: mockPreset?.title || "GATE CSE Dynamic Mock",
        subject: "Full GATE CSE Mock",
        durationMinutes: mockPreset?.durationMinutes || 180,
        questions: sampleFullGateMock(allList, count)
      };
    } catch {
      // continue
    }
  }

  return null;
}

function sampleQuestions<T>(items: T[], n: number): T[] {
  if (items.length <= n) return items;
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function sampleFullGateMock(questions: GateQuestion[], targetCount: number = 65): GateQuestion[] {
  const gaList = questions.filter(q => q.section === "GA" || q.subjectSlug === "aptitude");
  const csList = questions.filter(q => q.section !== "GA" && q.subjectSlug !== "aptitude");

  const gaCount = targetCount === 65 ? 10 : Math.round(targetCount * (10 / 65));
  const csCount = targetCount - gaCount;

  const selectedGa = sampleQuestions(gaList, gaCount);
  const selectedCs = sampleQuestions(csList, csCount);

  return [...selectedGa, ...selectedCs].map((q, i) => ({
    ...q,
    orderIndex: i + 1
  }));
}
