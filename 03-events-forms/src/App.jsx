import { useState } from "react";
import LikeButton from "./examples/01-LikeButton.jsx";
import ControlledVsUncontrolled from "./examples/02-ControlledVsUncontrolled.jsx";
import SignupForm from "./examples/03-SignupForm.jsx";
import TaskCardDemo from "./examples/04-TaskCard.jsx";
import SignupFormWithConfirm from "./solutions/SignupFormWithConfirm.jsx";

const examples = [
  { id: "events", label: "1. Event basics", Component: LikeButton },
  { id: "inputs", label: "2. Controlled vs uncontrolled", Component: ControlledVsUncontrolled },
  { id: "form", label: "3. Sign-up form", Component: SignupForm },
  { id: "propagation", label: "4. Propagation", Component: TaskCardDemo },
  { id: "solution", label: "Exercise solution", Component: SignupFormWithConfirm },
];

export default function App() {
  const [activeId, setActiveId] = useState(examples[0].id);
  const active = examples.find((e) => e.id === activeId);

  return (
    <main className="container">
      <header>
        <p className="eyebrow">React Zero to Senior · Article 3</p>
        <h1>Events, Forms, and Controlled Inputs</h1>
      </header>

      <nav aria-label="Examples" className="tabs">
        {examples.map((e) => (
          <button
            key={e.id}
            type="button"
            className="tab"
            aria-pressed={e.id === activeId}
            onClick={() => setActiveId(e.id)}
          >
            {e.label}
          </button>
        ))}
      </nav>

      <section className="panel" aria-label={active.label}>
        <active.Component />
      </section>

      <p className="hint">Open the browser console to see the logged events and submissions.</p>
    </main>
  );
}
