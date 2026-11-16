# 06 · Mini Project: Build a Task Tracker

Code for **Article 6** of [React Zero to Senior](https://medium.com/@hasunnilupul/react-zero-to-senior-the-complete-series-index-045e4fa582cc).

A small task tracker that uses everything from Part 1: components and props, state, controlled forms, conditional rendering, lists and keys, and an effect that saves your tasks to `localStorage`.

**Versions:** React 19.3.1 · Vite 8.3.4 · @vitejs/plugin-react 6.2.1 · pnpm

## Run it

```bash
pnpm install
pnpm dev
```

Then open the URL Vite prints (usually http://localhost:5173). Add a few tasks, reload the page, and they're still there.

## What it does

- Add a task (empty input shows an error, text is trimmed)
- Complete and un-complete a task with its checkbox
- Edit a task: **Edit**, then **Enter** or **Save** to keep it, **Esc** or **Cancel** to discard it
- Delete a task, or clear every completed task at once
- Filter by All, Active, and Completed, each with a live count
- Show a different empty state for each situation
- Save to `localStorage` after every change, and read it back on the first render
- Show the number of open tasks in the browser tab title

## Folder tour

```text
src/
├── main.jsx                 Entry point, wraps the app in <StrictMode>
├── App.jsx                  Owns the state (tasks, filterId), the handlers, and both effects
├── storage.js               loadTasks / saveTasks: the only code that touches localStorage
├── filters.js               The All / Active / Completed definitions
├── index.css                Styles (light and dark)
└── components/
    ├── TaskForm.jsx         Controlled input, validation, error message
    ├── FilterBar.jsx        Filter buttons with counts
    ├── TaskList.jsx         Maps tasks to items, or shows the empty state
    └── TaskItem.jsx         One row, with its own edit mode
```

## Where each Part 1 idea shows up

| Idea | Where |
| --- | --- |
| Components, props, one-way data flow (Articles 1, 2) | `App` passes data and handlers down, children never change the data themselves |
| Immutable state updates (Article 2) | `toggleTask`, `editTask`, `deleteTask` in `App.jsx` |
| Lifting state up (Article 2) | `tasks` lives in `App` because the list, the filter bar, and the footer all need it |
| Controlled inputs, forms, validation (Article 3) | `TaskForm.jsx` and the edit form in `TaskItem.jsx` |
| Conditional rendering and the `0` bug (Article 4) | `error !== '' &&`, `completedCount > 0 &&`, the three empty states |
| Lists and stable keys (Article 4) | `TaskList.jsx` uses `key={task.id}` |
| Derived data (Articles 4, 5) | `visibleTasks`, `remaining`, `completedCount`, and the filter counts are calculated during render |
| Effects (Article 5) | Saving to `localStorage` and updating `document.title` |

## Break it on purpose

Each of these is a bug from earlier in the series, in a new place. Make the change, predict what will happen, then check.

1. **Index keys.** In `TaskList.jsx`, change `key={task.id}` to `key={index}` (add `index` to the `map` arguments). With three tasks, open the editor on the second one and type a few characters. Then delete the first task. Look at which task the open editor now belongs to, and what happens if you press Save.
2. **Load in an effect.** In `App.jsx`, replace `useState(loadTasks)` with `useState([])` and add `useEffect(() => { setTasks(loadTasks()); }, []);` above or below the save effect. Add a task, reload, and look at `localStorage` in your browser's dev tools. Then remove `<StrictMode>` from `main.jsx` and try both orders again.
3. **Impure updater.** In `addTask`, move `crypto.randomUUID()` inside the `setTasks` updater function. Add a task and check the console and the stored ids.
4. **The 0 bug.** In `App.jsx`, change `completedCount > 0 &&` to `completedCount &&`. Un-complete every task.
5. **Stale filter.** Store `visibleTasks` in its own `useState` and update it from each handler. Then forget one handler.

## Stretch goals

- **Sync across tabs.** Listen for the window `storage` event in an effect so a change in one tab shows up in the other. Don't forget the cleanup.
- **Undo delete.** Keep the last deleted task in state and show an "Undo" button for a few seconds. (Clear the timer in a cleanup.)
- **Due dates.** Add a date input to `TaskForm`, show overdue tasks differently, and sort the list by date.
- **Search.** Add a text filter that combines with the status filter. Remember: derived data, not new state.
- **Edit on double-click.** Make double-clicking the task text open the editor.
- **Move it to a custom hook.** Pull the load, save, and handlers into `useTasks()`. That's exactly where Article 7 starts.
