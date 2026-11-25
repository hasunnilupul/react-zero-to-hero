# 07: Custom Hooks Task Tracker

The Article 6 task tracker, refactored to use custom hooks, plus a debounced search box.

```
pnpm install
pnpm dev
```

## Where things are

- `src/hooks/useToggle.js`: a boolean with a flip function
- `src/hooks/useLocalStorage.js`: `useState` that survives a reload, with a validator
- `src/hooks/useDebounce.js`: a value that only updates after it stops changing
- `src/hooks/useDocumentTitle.js`: keeps `document.title` in sync
- `src/hooks/useTasks.js`: the task list and its five handlers
- `src/filters.js`: the filters as data

## Break it on purpose

1. In `useLocalStorage.js`, delete the `isValid` check, then run `localStorage.setItem('tasks', '[{"bad":1}]')` in the console and reload. Watch what the list does with a malformed task.
2. In `TaskItem.jsx`, wrap the `useToggle` call in `if (task.id) { ... }`. Read the lint error, then the runtime behavior.
3. Set the debounce delay to `2000` and type quickly. Note which value the input uses and which the list uses.
4. Render `<TaskItem>` twice with `useToggle` inside it and confirm each row keeps its own state.

## Stretch goals

- `useMediaQuery(query)` (needs a cleanup function)
- Sync tasks between tabs using the `storage` event inside `useLocalStorage`
- Make `useLocalStorage` handle a changing `key`
