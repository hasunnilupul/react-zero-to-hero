import { useMemo } from 'react';
import { buildSummary } from '../summary.js';

// The summary only depends on `tasks`, so typing in the search box (which
// re-renders App, and this component with it) doesn't need to recompute it.
export default function Summary({ tasks }) {
  const summary = useMemo(() => buildSummary(tasks), [tasks]);

  if (summary.topWords.length === 0) return null;

  return (
    <p className="summary" data-testid="summary">
      Top words: {summary.topWords.map(([word, count]) => `${word} (${count})`).join(', ')}
      <span className="muted"> · computed in {summary.ms} ms</span>
    </p>
  );
}
