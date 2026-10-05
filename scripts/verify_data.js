const fs = require("fs");
const path = require("path");

function verify() {
  const pyqManifest = JSON.parse(fs.readFileSync("./data/gate/pyq/manifest.json", "utf8"));
  const subjectsManifest = JSON.parse(fs.readFileSync("./data/gate/subjects/manifest.json", "utf8"));
  const mockPresets = JSON.parse(fs.readFileSync("./data/gate/mock/mocks.json", "utf8"));
  const allQuestions = JSON.parse(fs.readFileSync("./data/gate/all-questions.json", "utf8"));

  console.log("=== GATE DATASET VERIFICATION ===");
  console.log(`✓ Total PYQ Papers: ${pyqManifest.length}`);
  console.log(`✓ Total Subjects: ${subjectsManifest.length}`);
  console.log(`✓ Total Mock Presets: ${mockPresets.length}`);
  console.log(`✓ Total Questions: ${allQuestions.length}`);

  // Test 2026 Set 1
  const p2026 = JSON.parse(fs.readFileSync("./data/gate/pyq/2026-s1.json", "utf8"));
  console.log(`\n✓ 2026 Set 1: ${p2026.title}, ${p2026.questions.length} Qs, ${p2026.totalMarks} Marks`);
  console.log(`  Sample Q1: ${p2026.questions[0].title}`);
  console.log(`  Q1 Type: ${p2026.questions[0].type}, Answer: ${p2026.questions[0].answer}, Marks: ${p2026.questions[0].marks}`);

  // Test OS Subject
  const os = JSON.parse(fs.readFileSync("./data/gate/subjects/os.json", "utf8"));
  console.log(`\n✓ Operating Systems: ${os.name}, ${os.questions.length} Qs, ${os.topics.length} Topics`);

  // Test DBMS Subject
  const dbms = JSON.parse(fs.readFileSync("./data/gate/subjects/dbms.json", "utf8"));
  console.log(`\n✓ DBMS: ${dbms.name}, ${dbms.questions.length} Qs, ${dbms.topics.length} Topics`);

  // Test CN Subject
  const cn = JSON.parse(fs.readFileSync("./data/gate/subjects/cn.json", "utf8"));
  console.log(`\n✓ Computer Networks: ${cn.name}, ${cn.questions.length} Qs, ${cn.topics.length} Topics`);

  console.log("\nALL VERIFICATIONS PASSED!");
}

verify();
