# 04 · Conditional Rendering, Lists, and Keys

Companion code for Article 4 of **React Zero to Senior**.

**Versions:** React 19.3.1 · Vite 8.3.4 · @vitejs/plugin-react 6.2.1 · Node 20.19+ or 22.12+

## Run it

```bash
cd 04-conditional-rendering-lists-keys
pnpm install
pnpm dev
```

## What's inside

| File | Shows |
| --- | --- |
| `src/demos/ConditionalDemo.jsx` | Ternary, `&&`, early return, and the `0 &&` bug next to its fix |
| `src/demos/KeysDemo.jsx` | The same list keyed by index and by id, side by side. Type notes, then click **Add to top** |
| `src/demos/ProductList.jsx` | Filtering, sorting with `toSorted`, a result count, and an empty state with a reset |
| `src/demos/ProductItem.jsx` | A list split into an item component that owns its own conditional |
| `src/data/products.js` | Sample data with stable ids |

## Try this

1. In the keys demo, type a note in every row of both lists, then add a task. Only the left list mixes up the notes.
2. In the product list, pick **Audio** and tick **In stock only**, then search for "head" to reach the empty state.
3. In `ConditionalDemo.jsx`, change the fixed line back to `count && …` and watch the stray `0` appear.
