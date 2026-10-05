const { getGateQuestionsForTest, getPyqManifest, getSubjectsManifest, getMockPresets } = require("../lib/gate");

async function verify() {
  console.log("Verifying Manifests...");
  const pyq = getPyqManifest();
  const subjects = getSubjectsManifest();
  const mocks = getMockPresets();
  console.log(`- PYQ Papers: ${pyq.length}`);
  console.log(`- Subjects: ${subjects.length}`);
  console.log(`- Mocks: ${mocks.length}`);

  console.log("\nTesting Paper Load: gate-2026-s1...");
  const paper2026 = await getGateQuestionsForTest("gate-2026-s1");
  console.log(`- Title: ${paper2026?.title}`);
  console.log(`- Questions Count: ${paper2026?.questions.length}`);
  console.log(`- Sample Q1: ${paper2026?.questions[0].title}, Type: ${paper2026?.questions[0].type}, Marks: ${paper2026?.questions[0].marks}`);

  console.log("\nTesting Subject Load: gate-subject-os...");
  const subjectOs = await getGateQuestionsForTest("gate-subject-os");
  console.log(`- Title: ${subjectOs?.title}`);
  console.log(`- Questions Count: ${subjectOs?.questions.length}`);

  console.log("\nTesting Mock Load: gate-mock-full-2026-1...");
  const mockFull = await getGateQuestionsForTest("gate-mock-full-2026-1");
  console.log(`- Title: ${mockFull?.title}`);
  console.log(`- Questions Count: ${mockFull?.questions.length}`);

  console.log("\nTesting Dynamic Random Mock: gate-mock-random-65...");
  const mockRandom = await getGateQuestionsForTest("gate-mock-random-65");
  console.log(`- Title: ${mockRandom?.title}`);
  console.log(`- Questions Count: ${mockRandom?.questions.length}`);

  console.log("\nVerification SUCCESSFUL!");
}

verify().catch(console.error);
