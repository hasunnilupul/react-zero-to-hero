import { useState } from 'react';

const MAX_LENGTH = 80;

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  function handleChange(event) {
    setText(event.target.value);
    if (error !== '') setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmed = text.trim();
    if (trimmed === '') {
      setError('Enter a task before adding it.');
      return;
    }

    onAdd(trimmed);
    setText('');
    setError('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="new-task" className="visually-hidden">New task</label>
      <div className="row">
        <input
          id="new-task"
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
