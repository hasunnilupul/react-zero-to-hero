import { useState } from 'react';

const initialTodos = [
  { id: crypto.randomUUID(), text: 'Write article 4' },
  { id: crypto.randomUUID(), text: 'Record the demo' },
  { id: crypto.randomUUID(), text: 'Update the series index' },
];

function TodoRow({ todo }) {
  // The <input> is uncontrolled: its typed value lives in the DOM node,
  // so it stays with whichever element React decides to reuse.
  return (
    <li className="todo-row">
      <span>{todo.text}</span>
      <input aria-label={`Note for ${todo.text}`} placeholder="type a note…" />
    </li>
  );
}

function TodoList({ todos, useIndexKey }) {
  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <TodoRow key={useIndexKey ? index : todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default function KeysDemo() {
  const [todos, setTodos] = useState(initialTodos);
  const [count, setCount] = useState(1);

  function addToTop() {
    setTodos((prev) => [{ id: crypto.randomUUID(), text: `New task ${count}` }, ...prev]);
    setCount((c) => c + 1);
  }

  function reset() {
    setTodos(initialTodos);
    setCount(1);
  }

  return (
    <div className="card">
      <p className="hint">
        Type a different note into each row of both lists, then click <strong>Add to top</strong>.
        On the left, the notes stay put while the tasks shift, so they end up on the wrong rows.
      </p>
      <div className="controls">
        <button type="button" onClick={addToTop}>
          Add to top
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="split">
        <div>
          <h3 className="bad">key={'{index}'}</h3>
          <TodoList todos={todos} useIndexKey />
        </div>
        <div>
          <h3 className="good">key={'{todo.id}'}</h3>
          <TodoList todos={todos} useIndexKey={false} />
        </div>
      </div>
    </div>
  );
}
