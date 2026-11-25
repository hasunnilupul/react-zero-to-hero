import { memo, useEffect, useRef, useState } from 'react';
import { useRenderBadge } from '../hooks/useRenderBadge.js';
import { useToggle } from '../hooks/useToggle.js';

// memo() skips re-rendering when every prop is the same as last time.
// That only helps if the props really are stable: `task` keeps its identity
// until it changes, and the handlers come from useCallback in useTasks.
const TaskItem = memo(function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, , setIsEditing] = useToggle(false);
  const [draft, setDraft] = useState(task.text);
  const itemRef = useRef(null);
  const editInputRef = useRef(null);

  useRenderBadge(itemRef);

  // When the edit row appears, focus the input and select the text.
  useEffect(() => {
    if (isEditing) editInputRef.current?.select();
  }, [isEditing]);

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
      <li ref={itemRef} className="task editing">
        <form className="edit-form" onSubmit={handleSave}>
          <input
            ref={editInputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            aria-label={`Edit task "${task.text}"`}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={cancelEditing}>Cancel</button>
        </form>
      </li>
    );
  }

  return (
    <li ref={itemRef} className={task.completed ? 'task done' : 'task'}>
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
});

export default TaskItem;
