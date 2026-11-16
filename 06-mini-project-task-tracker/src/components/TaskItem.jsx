import { useState } from 'react';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  // Editing is local UI state: only this row cares whether it's being edited.
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  function startEditing() {
    setDraft(task.text);
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
  }

  function handleSave(event) {
    event.preventDefault();

    const trimmed = draft.trim();
    if (trimmed !== '' && trimmed !== task.text) {
      onEdit(task.id, trimmed);
    }
    setIsEditing(false); // an empty or unchanged draft just closes the editor
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') cancelEditing();
  }

  if (isEditing) {
    return (
      <li className="task editing">
        <form className="edit-form" onSubmit={handleSave}>
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={80}
            aria-label={`Edit task "${task.text}"`}
            autoFocus
          />
          <button type="submit">Save</button>
          <button type="button" className="secondary" onClick={cancelEditing}>
            Cancel
          </button>
        </form>
      </li>
    );
  }

  return (
    <li className={task.completed ? 'task done' : 'task'}>
      <label className="task-label">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <span>{task.text}</span>
      </label>
      <div className="actions">
        <button
          type="button"
          className="secondary"
          onClick={startEditing}
          aria-label={`Edit "${task.text}"`}
        >
          Edit
        </button>
        <button
          type="button"
          className="danger"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete "${task.text}"`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
