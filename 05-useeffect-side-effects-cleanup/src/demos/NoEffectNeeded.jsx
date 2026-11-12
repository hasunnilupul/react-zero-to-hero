import { useEffect, useState } from 'react';

// ❌ Copies derived data into state and syncs it with an effect.
// Every keystroke renders twice: once with the stale full name, then again
// after the effect calls setFullName. Open the console to see both renders.
function EffectVersion() {
  const [first, setFirst] = useState('Ada');
  const [last, setLast] = useState('Lovelace');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    setFullName(`${first} ${last}`);
  }, [first, last]);

  console.log('[effect version] render, fullName =', JSON.stringify(fullName));

  return (
    <NameForm first={first} last={last} setFirst={setFirst} setLast={setLast} fullName={fullName} />
  );
}

// ✅ Calculates it during render. One render per keystroke, never stale.
function DerivedVersion() {
  const [first, setFirst] = useState('Ada');
  const [last, setLast] = useState('Lovelace');
  const fullName = `${first} ${last}`;

  console.log('[derived version] render, fullName =', JSON.stringify(fullName));

  return (
    <NameForm first={first} last={last} setFirst={setFirst} setLast={setLast} fullName={fullName} />
  );
}

function NameForm({ first, last, setFirst, setLast, fullName }) {
  return (
    <div className="stack">
      <label>
        First name
        <input value={first} onChange={(e) => setFirst(e.target.value)} />
      </label>
      <label>
        Last name
        <input value={last} onChange={(e) => setLast(e.target.value)} />
      </label>
      <p>
        Full name: <span className="output">{fullName}</span>
      </p>
    </div>
  );
}

export default function NoEffectNeeded() {
  return (
    <div className="card">
      <p className="hint">
        Both forms look the same. Open the browser console and type one letter in each: the effect
        version logs an extra render with the old name first.
      </p>
      <div className="split">
        <div>
          <h3 className="bad">useState + useEffect</h3>
          <EffectVersion />
        </div>
        <div>
          <h3 className="good">derived during render</h3>
          <DerivedVersion />
        </div>
      </div>
    </div>
  );
}
