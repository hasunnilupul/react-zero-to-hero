import { useEffect, useRef, useState } from 'react';
import FilterBar from './components/FilterBar.jsx';
import SearchBox from './components/SearchBox.jsx';
import Summary from './components/Summary.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import { FILTERS } from './filters.js';
import { useDebounce } from './hooks/useDebounce.js';
import { useDocumentTitle } from './hooks/useDocumentTitle.js';
import { useTasks } from './hooks/useTasks.js';
import { makeSampleTexts } from './summary.js';

const SAMPLE_COUNT = 2000;

export default function App() {
  const { tasks, addTask, addMany, toggleTask, editTask, deleteTask, clearCompleted } =
    useTasks();
  const [filterId, setFilterId] = useState('all');
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const searchRef = useRef(null);

  // Press "/" anywhere to jump to the search box, like on GitHub.
  useEffect(() => {
    function handleKeyDown(event) {
      const tag = document.activeElement?.tagName;
      if (event.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Derived data, calculated during render (Article 6).
  const activeFilter = FILTERS.find((filter) => filter.id === filterId);
  const needle = debouncedQuery.trim().toLowerCase();
  const visibleTasks = tasks
    .filter(activeFilter.matches)
    .filter((task) => task.text.toLowerCase().includes(needle));
  const remaining = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - remaining;

  useDocumentTitle(remaining > 0 ? `(${remaining}) Task Tracker` : 'Task Tracker');

  return (
    <main className="app">
      <h1>Task Tracker</h1>
      <TaskForm onAdd={addTask} />
      <SearchBox ref={searchRef} value={query} onChange={setQuery} />
      <FilterBar tasks={tasks} filterId={filterId} onChange={setFilterId} />
      <Summary tasks={tasks} />
      <TaskList
        tasks={visibleTasks}
        hasTasks={tasks.length > 0}
        isSearching={needle !== ''}
        filterLabel={activeFilter.label}
        onToggle={toggleTask}
        onEdit={editTask}
        onDelete={deleteTask}
      />
      <footer className="footer">
        <span>
          {remaining} {remaining === 1 ? 'task' : 'tasks'} left
        </span>
        <span className="actions">
          <button type="button" onClick={() => addMany(makeSampleTexts(SAMPLE_COUNT, tasks.length))}>
            Add {SAMPLE_COUNT.toLocaleString()} sample tasks
          </button>
          {completedCount > 0 && (
            <button type="button" onClick={clearCompleted}>
              Clear completed ({completedCount})
            </button>
          )}
        </span>
      </footer>
    </main>
  );
}
