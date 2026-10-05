const KNOWN_SUBJECT_SLUGS = [
  "os", "dbms", "cn", "dsa", "toc", "coa", "compiler", "digital",
  "discrete-math", "engg-math", "aptitude"
];

function testTopicId(testId) {
  if (testId.startsWith("gate-topic-")) {
    const afterPrefix = testId.slice("gate-topic-".length);
    const sortedSlugs = [...KNOWN_SUBJECT_SLUGS].sort((a, b) => b.length - a.length);
    const matchedSlug = sortedSlugs.find(slug => afterPrefix.startsWith(`${slug}-`));

    if (matchedSlug) {
      const topicSlug = afterPrefix.slice(matchedSlug.length + 1);
      return { matchedSlug, topicSlug };
    }
  }
  return null;
}

console.log(testTopicId("gate-topic-dbms-functional-dependencies-normalization"));
console.log(testTopicId("gate-topic-aptitude-verbal-aptitude-grammar"));
console.log(testTopicId("gate-topic-discrete-math-mathematical-logic-proofs"));
console.log(testTopicId("gate-topic-os-cpu-scheduling-processes"));
