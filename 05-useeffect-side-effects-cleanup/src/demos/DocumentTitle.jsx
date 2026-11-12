import { useEffect, useState } from 'react';

export default function DocumentTitle() {
  const [count, setCount] = useState(0);
  const [showLabel, setShowLabel] = useState(false);

  // Runs after the first render, then again only when `count` changes.
  // Toggling the label re-renders the component but does NOT re-run this effect.
  useEffect(() => {
    console.log('[title effect] run, count =', count);
    const previous = document.title;
    document.title = `Clicked ${count} times`;

    // Cleanup: put the old title back before the next run or on unmount.
    return () => {
      console.log('[title effect] cleanup, count =', count);
      document.title = previous;
    };
  }, [count]);

  return (
    <div className="card">
      <p className="hint">
        Watch the browser tab title. Click <strong>Count</strong> and the effect re-runs. Click{' '}
        <strong>Toggle label</strong> and the component re-renders, but the effect is skipped
        because <code>count</code> didn't change.
      </p>
      <div className="controls">
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          Count: {count}
        </button>
        <button type="button" onClick={() => setShowLabel((d) => !d)}>
          Toggle label
        </button>
        <span className={showLabel ? 'good' : 'bad'}>{showLabel ? 'Label on' : 'Label off'}</span>
      </div>
    </div>
  );
}
