import { useEffect, useState } from 'react';

// ❌ No cleanup. In development, Strict Mode mounts, unmounts, and mounts
// again, so this starts TWO intervals and counts twice per second. Hide it
// and the console keeps logging: the intervals outlive the component.
function LeakyTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setInterval(() => {
      console.log('[leaky timer] tick');
      setSeconds((s) => s + 1);
    }, 1000);
  }, []);

  return <p className="big-number bad">{seconds}s</p>;
}

// ✅ Cleanup clears the interval, so there is only ever one running.
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <p className="big-number good">{seconds}s</p>;
}

// ✅ Same idea for event listeners: add on mount, remove on unmount.
function WindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <p>
      Window width: <span className="output">{width}px</span>
    </p>
  );
}

export default function CleanupDemo() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="card">
      <p className="hint">
        Both timers started together. The left one has no cleanup, so in development it counts
        twice as fast. Click <strong>Hide timers</strong>, then check the console: the leaky
        timer keeps ticking with nothing on screen.
      </p>
      <div className="controls">
        <button type="button" onClick={() => setVisible((v) => !v)}>
          {visible ? 'Hide timers' : 'Show timers'}
        </button>
      </div>
      {visible && (
        <div className="split">
          <div>
            <h3 className="bad">no cleanup</h3>
            <LeakyTimer />
          </div>
          <div>
            <h3 className="good">return () =&gt; clearInterval(id)</h3>
            <Timer />
          </div>
        </div>
      )}
      <hr />
      <WindowWidth />
    </div>
  );
}
