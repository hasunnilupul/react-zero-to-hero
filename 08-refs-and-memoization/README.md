# 08: Refs and Memoization

The Article 7 tracker plus `useRef` (focus handling, `/` shortcut, render badges), `memo`, `useCallback`, and `useMemo`.

```
pnpm install
pnpm dev
```

Click "Add 2,000 sample tasks", then watch the small "renders: N" label on each row. It starts at 2 in development because Strict Mode mounts effects twice. What matters is whether it changes.

## Break it on purpose

1. Remove `memo` from `TaskItem` and type in the search box. Watch every badge climb.
2. Put `memo` back, then remove `useCallback` from `toggleTask` in `useTasks.js`. Type again and see why a stable function matters.
3. In `useTasks.js`, give `toggleTask` a dependency on `tasks` instead of using the updater form. Check what that does to its identity.
4. Pass `style={{ color: 'red' }}` to `TaskItem` and note what happens to the badges.
5. In `Summary.jsx`, remove `useMemo` and compare the "computed in" time while typing.

## Stretch goals

- Make `TaskItem` deliberately expensive and compare `memo` on/off in the React DevTools Profiler
- Move the search state down into `SearchBox` and see which components stop re-rendering
- Add a Stopwatch component that keeps its interval id in a ref
