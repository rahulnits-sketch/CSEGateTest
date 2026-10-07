export interface TestHistoryItem {
  id: string;
  testId: string;
  title: string;
  subject: string;
  score: number;
  totalMarks: number;
  totalQuestions: number;
  correctCount: number;
  percentage: number;
  timestamp: string;
}

export interface TrackerStats {
  testsDone: number;
  problemsSolved: number;
  streak: number;
  lastActiveDate: string;
  lastActiveTopic?: string;
  lastActiveTestId?: string;
}

export interface DailyGoal {
  id: string;
  text: string;
  completed: boolean;
  link: string;
  category?: "gate" | "dsa" | "revision";
}

const STORAGE_KEYS = {
  STATS: "cm_tracker_stats",
  HISTORY: "cm_test_history",
  GOALS: "cm_daily_goals",
  LAST_DATE: "cm_last_active_date",
};

const DEFAULT_GOALS: DailyGoal[] = [
  {
    id: "g1",
    text: "1 GATE Test (OS — Scheduling)",
    completed: false,
    link: "/test/gate-topic-os-cpu-scheduling-processes",
    category: "gate",
  },
  {
    id: "g2",
    text: "1 DSA Problem (Arrays & Sliding Window)",
    completed: false,
    link: "/dsa/arrays",
    category: "dsa",
  },
  {
    id: "g3",
    text: "Revise: DBMS Normalization (5 min)",
    completed: false,
    link: "/test/gate-topic-dbms-functional-dependencies-normalization",
    category: "revision",
  },
];

export function getTodayDateString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getTrackerStats(): TrackerStats {
  if (typeof window === "undefined") {
    return {
      testsDone: 12,
      problemsSolved: 48,
      streak: 4,
      lastActiveDate: getTodayDateString(),
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}

  const initial: TrackerStats = {
    testsDone: 12,
    problemsSolved: 48,
    streak: 4,
    lastActiveDate: getTodayDateString(),
    lastActiveTopic: "Operating Systems — Process Scheduling",
    lastActiveTestId: "gate-topic-os-cpu-scheduling-processes",
  };
  try {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(initial));
  } catch {}
  return initial;
}

export function getTestHistory(): TestHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getDailyGoals(): DailyGoal[] {
  if (typeof window === "undefined") return DEFAULT_GOALS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GOALS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_GOALS;
}

export function toggleDailyGoal(id: string): DailyGoal[] {
  if (typeof window === "undefined") return DEFAULT_GOALS;
  const current = getDailyGoals();
  const updated = current.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g));
  try {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(updated));
  } catch {}
  return updated;
}

export function recordTestCompletion(params: {
  testId: string;
  title: string;
  subject: string;
  score: number;
  totalMarks: number;
  totalQuestions: number;
  correctCount: number;
  answeredCount: number;
}): { stats: TrackerStats; history: TestHistoryItem[] } {
  if (typeof window === "undefined") {
    return { stats: getTrackerStats(), history: [] };
  }

  const today = getTodayDateString();
  const currentStats = getTrackerStats();
  const currentHistory = getTestHistory();
  const currentGoals = getDailyGoals();

  // 1. Calculate Streak
  let newStreak = currentStats.streak || 1;
  if (currentStats.lastActiveDate) {
    const lastDate = new Date(currentStats.lastActiveDate);
    const currentDate = new Date(today);
    const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  }

  // 2. Update Stats
  const newStats: TrackerStats = {
    testsDone: (currentStats.testsDone || 0) + 1,
    problemsSolved: (currentStats.problemsSolved || 0) + (params.answeredCount || params.correctCount || 1),
    streak: newStreak,
    lastActiveDate: today,
    lastActiveTopic: `${params.subject} — ${params.title}`,
    lastActiveTestId: params.testId,
  };

  try {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
  } catch {}

  // 3. Update History
  const historyEntry: TestHistoryItem = {
    id: `attempt_${Date.now()}`,
    testId: params.testId,
    title: params.title,
    subject: params.subject,
    score: params.score,
    totalMarks: params.totalMarks,
    totalQuestions: params.totalQuestions,
    correctCount: params.correctCount,
    percentage: params.totalMarks > 0 ? Math.round((params.score / params.totalMarks) * 100) : 0,
    timestamp: new Date().toISOString(),
  };

  const newHistory = [historyEntry, ...currentHistory].slice(0, 50); // keep last 50
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
  } catch {}

  // 4. Auto-complete related daily goals
  const updatedGoals = currentGoals.map((g) => {
    if (params.testId.includes("os") && g.id === "g1") return { ...g, completed: true };
    if (params.testId.includes("dbms") && g.id === "g3") return { ...g, completed: true };
    if (params.testId.includes("dsa") && g.id === "g2") return { ...g, completed: true };
    return g;
  });
  try {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(updatedGoals));
  } catch {}

  return { stats: newStats, history: newHistory };
}
