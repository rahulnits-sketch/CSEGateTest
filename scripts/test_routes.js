async function testUrls() {
  const urls = [
    "http://localhost:3000/gate",
    "http://localhost:3000/gate/pyq",
    "http://localhost:3000/gate/subjects",
    "http://localhost:3000/gate/subjects/os",
    "http://localhost:3000/gate/mock",
    "http://localhost:3000/tests",
    "http://localhost:3000/test/gate-2026-s1",
    "http://localhost:3000/api/gate/pyq",
    "http://localhost:3000/api/gate/subjects",
    "http://localhost:3000/api/gate/mock"
  ];
  for (const u of urls) {
    try {
      const res = await fetch(u);
      console.log(`Status ${res.status}: ${u}`);
    } catch (e) {
      console.log(`Failed: ${u}`, e.message);
    }
  }
}
testUrls();
