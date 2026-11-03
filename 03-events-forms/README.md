# 03 · Events, Forms, and Controlled Inputs

Code for **Article 3** of the *React Zero to Senior* series on Medium.

📖 Read the article: [Events, Forms, and Controlled Inputs in React 19](ADD-ARTICLE-03-LINK)
📚 Series index: [React Zero to Senior: The Complete Series Index](https://medium.com/@hasunnilupul/react-zero-to-senior-the-complete-series-index-045e4fa582cc)

## Versions

- React 19.3.1 / React DOM 19.3.1
- Vite 8.3.4
- pnpm 10

## Run it

```bash
cd 03-events-forms
pnpm install
pnpm dev
```

Then open the URL Vite prints (usually http://localhost:5173). Each example has its own tab, and most of them log to the browser console, so keep DevTools open.

## What's inside

| File | Article section |
| --- | --- |
| [`src/examples/01-LikeButton.jsx`](src/examples/01-LikeButton.jsx) | Handling events: passing vs calling a handler, `target` vs `currentTarget` |
| [`src/examples/02-ControlledVsUncontrolled.jsx`](src/examples/02-ControlledVsUncontrolled.jsx) | Controlled (`value` + `onChange`) vs uncontrolled (`defaultValue` + `FormData`) inputs |
| [`src/examples/03-SignupForm.jsx`](src/examples/03-SignupForm.jsx) | Building a real form: one state object, one change handler, derived validation, touched/submitted error timing |
| [`src/examples/04-TaskCard.jsx`](src/examples/04-TaskCard.jsx) | Event propagation, `stopPropagation()`, and `type="button"` |
| [`src/solutions/SignupFormWithConfirm.jsx`](src/solutions/SignupFormWithConfirm.jsx) | ⚠️ Spoiler: solution to the "Try it yourself" exercise |

## Things to try

1. In `01-LikeButton.jsx`, uncomment the `onClick={reportPost(postId)}` line and watch the console fill up on every render.
2. In `02-ControlledVsUncontrolled.jsx`, remove the `onChange` from the controlled input. The field freezes and React logs a warning.
3. In `04-TaskCard.jsx`, delete `e.stopPropagation()` and click **Delete**. The event log shows the card opening as well.
4. Try the exercise from the article before you open the solution: add a **Confirm email** field to the sign-up form that shows an error when it doesn't match.

---

**Previous:** 02 · Props, State, and One-Way Data Flow · **Next:** 04 · Conditional Rendering, Lists, and Keys
