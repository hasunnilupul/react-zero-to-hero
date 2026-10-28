# 02 · Props, State, and One-Way Data Flow

Source code for article 2 of the **React Zero to Senior** series.

**Stack:** React 19, Vite, pnpm. Node.js 20.19 or newer.

## Run it

```bash
pnpm install
pnpm dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## What's inside

| Path | Article section |
| --- | --- |
| `src/examples/ProfileCard.jsx` | Props: defaults, destructuring, `children` |
| `src/examples/Counter.jsx` | State: snapshot vs updater function |
| `src/App.jsx` | Lifting state up: the parent owns the cart |
| `src/ProductList.jsx` | Child reads props and calls `onAdd` |
| `src/CartSummary.jsx` | Child derives `total` instead of storing it |
| `solution/` | Answer to the "Try it" exercise (quantities) |

## Try it

Extend the cart so that adding the same product twice increases a quantity
instead of adding a second row. Attempt it first, then compare with
`solution/App.jsx` and `solution/CartSummary.jsx`.

To run the solution, change the imports in `src/main.jsx` to point at
`../solution/App.jsx`.

## Build

```bash
pnpm build
pnpm preview
```
