import { useRef, useState } from 'react';

const MAX_LENGTH = 80;

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  function handleChange(event) {
    setText(event.target.value);
    if (error !== '') setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmed = text.trim();
    if (trimmed === '') {
      setError('Enter a task before adding it.');
      inputRef.current.focus(); // put the cursor back where the problem is
      return;
    }

    onAdd(trimmed);
    setText('');
    setError('');
    inputRef.current.focus(); // ready for the next task
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="new-task" className="visually-hidden">New task</label>
      <div className="row">
        <input
          id="new-task"
          ref={inputRef}
          value={text}
          onChange={handleChange}
          maxLength={MAX_LENGTH}
          placeholder="What needs doing?"
          aria-invalid={error !== ''}
          aria-describedby={error !== '' ? 'new-task-error' : undefined}
        />
        <button type="submit">Add</button>
      </div>
      {error !== '' && (
        <p id="new-task-error" className="error" role="alert">{error}</p>
      )}
    </form>
  );
}
