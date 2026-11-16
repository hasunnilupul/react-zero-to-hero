const STORAGE_KEY = 'task-tracker:v1';

// A saved task looks like { id: string, text: string, completed: boolean }.
function isTask(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    typeof value.text === 'string' &&
    typeof value.completed === 'boolean'
  );
}

export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isTask) : [];
  } catch {
    // Corrupted JSON, or storage is blocked (private mode, strict browser settings).
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Quota exceeded or storage blocked: the app keeps working, it just won't persist.
  }
}
