import { useEffect, useState } from 'react';
import { fetchUser, userIds } from '../api/fakeUsers.js';

// ❌ Whichever response arrives LAST wins, even if it's for an old id.
function NaiveUserCard({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchUser(userId).then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <p className="muted">Loading…</p>;
  return <UserDetails user={user} selectedId={userId} />;
}

// ✅ Cancels the stale request in cleanup, and only trusts a result
// whose id matches the current prop.
function UserCard({ userId }) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchUser(userId, { signal: controller.signal })
      .then((user) => setResult({ id: userId, user, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setResult({ id: userId, user: null, error });
        }
      });

    return () => controller.abort();
  }, [userId]);

  // Loading is derived: no result yet, or the result is for another id.
  if (result?.id !== userId) return <p className="muted">Loading…</p>;
  if (result.error) return <p className="bad">Something went wrong: {result.error.message}</p>;
  return <UserDetails user={result.user} selectedId={userId} />;
}

function UserDetails({ user, selectedId }) {
  const mismatch = user.id !== selectedId;
  return (
    <div className="user">
      <p className="user-name">{user.name}</p>
      <p className="muted">{user.role}</p>
      <p className={mismatch ? 'bad' : 'good'}>
        {mismatch ? `✗ Selected user ${selectedId}, showing user ${user.id}` : '✓ Matches selection'}
      </p>
    </div>
  );
}

export default function FetchRaceDemo() {
  const [userId, setUserId] = useState(1);

  return (
    <div className="card">
      <p className="hint">
        User 1 answers in 1.6s, user 2 in 0.3s. Click <strong>User 1</strong> and then quickly{' '}
        <strong>User 2</strong>. The slow response lands last and overwrites the left card.
      </p>
      <div className="controls" role="group" aria-label="Select a user">
        {userIds.map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={id === userId}
            className={id === userId ? 'selected' : undefined}
            onClick={() => setUserId(id)}
          >
            User {id}
          </button>
        ))}
      </div>
      <div className="split">
        <div>
          <h3 className="bad">no cleanup</h3>
          <NaiveUserCard userId={userId} />
        </div>
        <div>
          <h3 className="good">AbortController + id check</h3>
          <UserCard userId={userId} />
        </div>
      </div>
    </div>
  );
}
