import { useCallback } from 'react';
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
// Every handler is wrapped in useCallback so its identity is stable between
// renders. That only matters because TaskItem is wrapped in memo().
export function useTasks() {
  const [tasks, setTasks] = useLocalStorage('tasks', [], isTaskList);

  // setTasks never changes, and each handler uses the updater form,
  // so none of them needs `tasks` in its dependency array.
  const addTask = useCallback(
    (text) => {
      const newTask = { id: crypto.randomUUID(), text, completed: false };
      setTasks((current) => [...current, newTask]);
    },
    [setTasks],
  );

  const addMany = useCallback(
    (texts) => {
      const newTasks = texts.map((text) => ({
        id: crypto.randomUUID(),
        text,
        completed: false,
      }));
      setTasks((current) => [...current, ...newTasks]);
    },
    [setTasks],
  );

  const toggleTask = useCallback(
    (id) => {
      setTasks((current) =>
        current.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
      );
    },
    [setTasks],
  );

  const editTask = useCallback(
    (id, text) => {
      setTasks((current) => current.map((task) => (task.id === id ? { ...task, text } : task)));
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((current) => current.filter((task) => task.id !== id));
    },
    [setTasks],
  );

  const clearCompleted = useCallback(() => {
    setTasks((current) => current.filter((task) => !task.completed));
  }, [setTasks]);

  return { tasks, addTask, addMany, toggleTask, editTask, deleteTask, clearCompleted };
}
