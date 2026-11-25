import { useLocalStorage } from './useLocalStorage.js';

function isTask(item) {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.text === 'string' &&
    typeof item.completed === 'boolean'
  );
}

function isTaskList(value) {
  return Array.isArray(value) && value.every(isTask);
}

// Everything about the task list that isn't about how it looks.
export function useTasks() {
  const [tasks, setTasks] = useLocalStorage('tasks', [], isTaskList);

  function addTask(text) {
    // Create the id out here, not inside the updater: updaters must be pure.
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

  return { tasks, addTask, toggleTask, editTask, deleteTask, clearCompleted };
}
