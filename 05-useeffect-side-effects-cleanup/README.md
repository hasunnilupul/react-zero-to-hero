# 05 · useEffect: Side Effects, Dependencies, and Cleanup

Companion code for Article 5 of **React Zero to Senior**.

**Versions:** React 19.3.1 · Vite 8.3.4 · @vitejs/plugin-react 6.2.1 · Node 20.19+ or 22.12+

## Run it

```bash
cd 05-useeffect-side-effects-cleanup
pnpm install
pnpm dev
```

Keep the browser console open while you try the demos. Several of them log what their effects are doing.

## What's inside

| File | Shows |
| --- | --- |
| `src/demos/NoEffectNeeded.jsx` | A full name synced into state with an effect next to the same value derived during render |
| `src/demos/DocumentTitle.jsx` | An effect that re-runs only when its dependency changes, with a cleanup that restores the tab title |
| `src/demos/CleanupDemo.jsx` | An interval with and without cleanup side by side, plus a `resize` listener that removes itself |
| `src/demos/FetchRaceDemo.jsx` | The fetch race condition: a naive card next to one that aborts stale requests and checks the id |
| `src/demos/StrictModeDemo.jsx` | A pretend chat connection that logs connect and disconnect, showing Strict Mode's extra cycle |
| `src/api/fakeUsers.js` | An offline fake API with fixed delays, so the race is reproducible every time |

## Try this

1. In the name demo, type one letter in each form and compare the console logs. The effect version renders twice, and the first render shows the old name.
2. In the cleanup demo, notice the left timer counts twice per second. Hide both timers and watch the leaky one keep logging.
3. In the fetch demo, click **User 1** then **User 2** within a second. The left card ends up on the wrong user.
4. Delete the `return () => controller.abort();` line in `FetchRaceDemo.jsx` and repeat step 3. The id check stops the wrong user from showing, but the stale response still overwrites the good one, so the right card gets stuck on "Loading…". The cleanup is what actually fixes the race.
5. Run `pnpm build && pnpm preview` and reload with the console open. The extra connect and disconnect from Strict Mode are gone in production.
