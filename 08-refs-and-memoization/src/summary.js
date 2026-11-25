// Counts the most common words across all tasks.
// Cheap for 10 tasks, noticeable for 20,000.
export function buildSummary(tasks) {
  const start = performance.now();
  const counts = new Map();

  for (const task of tasks) {
    for (const word of task.text.toLowerCase().split(/\W+/)) {
      if (word.length < 3) continue;
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }

  const topWords = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5);

  return { topWords, ms: Math.round((performance.now() - start) * 10) / 10 };
}

const VERBS = ['Write', 'Review', 'Plan', 'Fix', 'Ship', 'Test', 'Refactor', 'Draft'];
const NOUNS = ['report', 'pull request', 'roadmap', 'login bug', 'release', 'invoice', 'design doc', 'onboarding'];

export function makeSampleTexts(count, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const n = i + offset;
    return `${VERBS[n % VERBS.length]} ${NOUNS[(n * 3) % NOUNS.length]} #${n + 1}`;
  });
}
