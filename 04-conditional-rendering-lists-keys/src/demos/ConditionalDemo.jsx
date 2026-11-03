import { useState } from 'react';

function InboxBadge({ count }) {
  // Bug: when count is 0, `0 && ...` evaluates to 0, and React renders "0".
  const buggy = count && <span className="badge">{count} new</span>;

  // Fix: make the left side a real boolean.
  const fixed = count > 0 && <span className="badge">{count} new</span>;

  return (
    <div className="compare">
      <p>
        <code>{'count && …'}</code> → <span className="output">{buggy}</span>
      </p>
      <p>
        <code>{'count > 0 && …'}</code> → <span className="output">{fixed}</span>
      </p>
    </div>
  );
}

function Greeting({ user }) {
  // Early return: handle the "nothing to show" case first.
  if (!user) {
    return <p>Please sign in.</p>;
  }

  // Ternary: choose between two pieces of UI.
  return <p>Welcome back, {user.isAdmin ? <strong>admin {user.name}</strong> : user.name}!</p>;
}

export default function ConditionalDemo() {
  const [count, setCount] = useState(0);
  const [signedIn, setSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const user = signedIn ? { name: 'Nilupul', isAdmin } : null;

  return (
    <div className="card">
      <div className="controls">
        <button type="button" onClick={() => setCount((c) => Math.max(0, c - 1))}>
          − message
        </button>
        <span>count = {count}</span>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          + message
        </button>
      </div>
      <InboxBadge count={count} />

      <hr />

      <div className="controls">
        <label>
          <input type="checkbox" checked={signedIn} onChange={(e) => setSignedIn(e.target.checked)} />
          Signed in
        </label>
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            disabled={!signedIn}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Admin
        </label>
      </div>
      <Greeting user={user} />
    </div>
  );
}
