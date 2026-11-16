import { useEffect, useState } from 'react';
import { FILTERS } from './filters';
import { loadTasks, saveTasks } from './storage';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';

export default function App() {
  // State: the source of truth. Everything else on screen is derived from these two values.
  // Passing the function itself (not loadTasks()) means React reads localStorage only on the first render.
  const [tasks, setTasks] = useState(loadTasks);
  const [filterId, setFilterId] = useState('all');

  // Effect: keep localStorage in sync with `tasks`.
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Derived data: calculated during render, never stored in state.
  const activeFilter = FILTERS.find((filter) => filter.id === filterId);
  const visibleTasks = tasks.filter(activeFilter.matches);
  const remaining = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - remaining;

  // Effect: sync the browser tab title with the number of open tasks.
  useEffect(() => {
    document.title = remaining > 0 ? `(${remaining}) Task Tracker` : 'Task Tracker';
  }, [remaining]);

  // Event handlers. Each one returns a new array and never mutates the old one.
  function addTask(text) {
    // Create the id out here, not inside the updater. Updater functions must be pure,
    // and Strict Mode calls them twice in development.
    const newTask = { id: crypto.randomUUID(), text, completed: false };
    setTasks((current) => [...current, newTask]);
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  }

  function editTask(id, text) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, text } : task)));
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function clearCompleted() {
    setTasks((current) => current.filter((task) => !task.completed));
  }

  return (
    <main className="app">
      <h1>Task Tracker</h1>

      <TaskForm onAdd={addTask} />

      <FilterBar tasks={tasks} activeId={filterId} onChange={setFilterId} />

      <TaskList
        tasks={visibleTasks}
        totalCount={tasks.length}
        filterId={filterId}
        onToggle={toggleTask}
        onEdit={editTask}
        onDelete={deleteTask}
      />

      {tasks.length > 0 && (
        <footer className="summary">
          <p>
            {remaining} {remaining === 1 ? 'task' : 'tasks'} left
          </p>
          {completedCount > 0 && (
            <button type="button" className="link" onClick={clearCompleted}>
              Clear completed ({completedCount})
            </button>
          )}
        </footer>
      )}
    </main>
  );
}
