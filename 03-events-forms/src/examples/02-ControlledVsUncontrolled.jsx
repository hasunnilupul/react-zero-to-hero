import { useState } from "react";

// Controlled: React state is the single source of truth
export function ControlledName() {
  const [name, setName] = useState("");

  return (
    <label className="field">
      Name
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <small>Hello, {name || "stranger"}</small>
    </label>
  );
}

// Uncontrolled: the DOM keeps the value; you read it when you need it
export function UncontrolledName() {
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    alert(`Hello, ${data.get("name")}`);
  }

  return (
    <form onSubmit={handleSubmit} className="field">
      <label htmlFor="uncontrolled-name">Name</label>
      <input id="uncontrolled-name" name="name" defaultValue="" />
      <button type="submit">Greet</button>
    </form>
  );
}

export default function ControlledVsUncontrolled() {
  return (
    <div className="stack">
      <h2>Controlled vs uncontrolled inputs</h2>
      <div className="grid">
        <div className="card">
          <h3>Controlled</h3>
          <p>
            <code>value</code> + <code>onChange</code>. The greeting updates on every keystroke.
          </p>
          <ControlledName />
        </div>
        <div className="card">
          <h3>Uncontrolled</h3>
          <p>
            <code>defaultValue</code>, read with <code>FormData</code> on submit.
          </p>
          <UncontrolledName />
        </div>
      </div>
    </div>
  );
}
