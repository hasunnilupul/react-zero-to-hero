import { useState } from "react";

export function TaskCard({ task, onOpen, onDelete }) {
  return (
    <div className="card task" onClick={() => onOpen(task.id)}>
      <h3>{task.title}</h3>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // don't also open the card
          onDelete(task.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

const initialTasks = [
  { id: 1, title: "Read about synthetic events" },
  { id: 2, title: "Build a controlled form" },
  { id: 3, title: "Remove stopPropagation and see what breaks" },
];

export default function TaskCardDemo() {
  const [tasks, setTasks] = useState(initialTasks);
  const [log, setLog] = useState([]);

  function addLog(message) {
    setLog((l) => [message, ...l].slice(0, 5));
  }

  function handleOpen(id) {
    addLog(`Opened task ${id}`);
  }

  function handleDelete(id) {
    setTasks((t) => t.filter((task) => task.id !== id));
    addLog(`Deleted task ${id}`);
  }

  return (
    <div className="stack">
      <h2>Event propagation</h2>
      <p>
        Clicking a card opens it. Clicking <em>Delete</em> only deletes, because the button stops
        the click from bubbling up to the card.
      </p>

      <div className="stack">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onOpen={handleOpen} onDelete={handleDelete} />
        ))}
        {tasks.length === 0 && (
          <button type="button" onClick={() => setTasks(initialTasks)}>
            Reset tasks
          </button>
        )}
      </div>

      <div className="card">
        <h3>Event log</h3>
        {log.length === 0 ? (
          <p className="muted">Nothing yet. Click a card or a Delete button.</p>
        ) : (
          <ul>
            {log.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
