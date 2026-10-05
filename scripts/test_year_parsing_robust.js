const fs = require("fs");
const path = require("path");

const GATEQA_DIR = "C:/Users/rkuma/.gemini/antigravity/scratch/Gate_QA";
const rawQuestions = JSON.parse(fs.readFileSync(path.join(GATEQA_DIR, "public/questions-with-answers.json"), "utf8"));
const mockCatalog = JSON.parse(fs.readFileSync(path.join(GATEQA_DIR, "public/mock_catalog_v1.json"), "utf8"));

function parseYearAndSet(q, mockInfo) {
  let year = 2026;
  let set = 1;
  let yearSetKey = "";

  // 1. Check title first (e.g. "GATE CSE 2026 | Set 1 | GA | Question: 1" or "GATE IT 2004 | Question: 1" or "GATE CSE 1987")
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

  // Generate canonical key
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

const papers = {};
rawQuestions.forEach((q, idx) => {
  const uid = q.question_uid || `go:${q.link?.match(/gateoverflow\.in\/(\d+)/)?.[1] || idx}`;
  const mockInfo = mockCatalog.byQuestionUid[uid];
  const { year, set, yearSetKey, paperTitle } = parseYearAndSet(q, mockInfo);

  if (!papers[yearSetKey]) {
    papers[yearSetKey] = {
      yearSetKey,
      year,
      set,
      title: paperTitle,
      count: 0
    };
  }
  papers[yearSetKey].count++;
});

console.log("Total distinct papers:", Object.keys(papers).length);
const sorted = Object.values(papers).sort((a, b) => b.year - a.year || a.set - b.set);
console.log("\nAll 60 papers with correct years and titles:");
sorted.forEach(p => console.log(`${p.yearSetKey} => ${p.title} (${p.count} Qs) [Year: ${p.year}, Set: ${p.set}]`));
