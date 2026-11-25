import { useState } from 'react';
import FilterBar from './components/FilterBar.jsx';
import SearchBox from './components/SearchBox.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import { FILTERS } from './filters.js';
import { useDebounce } from './hooks/useDebounce.js';
import { useDocumentTitle } from './hooks/useDocumentTitle.js';
import { useTasks } from './hooks/useTasks.js';

export default function App() {
  const { tasks, addTask, toggleTask, editTask, deleteTask, clearCompleted } = useTasks();
  const [filterId, setFilterId] = useState('all');
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

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
      <SearchBox value={query} onChange={setQuery} />
      <FilterBar tasks={tasks} filterId={filterId} onChange={setFilterId} />
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
        {completedCount > 0 && (
          <button type="button" onClick={clearCompleted}>
            Clear completed ({completedCount})
          </button>
        )}
      </footer>
    </main>
  );
}
