import { useState } from 'react';
import { useToggle } from '../hooks/useToggle.js';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, , setIsEditing] = useToggle(false);
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
    setIsEditing(false);
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
            aria-label={`Edit task "${task.text}"`}
            autoFocus
          />
          <button type="submit">Save</button>
          <button type="button" onClick={cancelEditing}>Cancel</button>
        </form>
      </li>
    );
  }

  return (
    <li className={task.completed ? 'task done' : 'task'}>
      <label>
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <span>{task.text}</span>
      </label>
      <div className="actions">
        <button type="button" onClick={startEditing}>Edit</button>
        <button type="button" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
}
