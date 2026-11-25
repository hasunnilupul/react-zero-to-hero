import { useEffect } from 'react';

// Dev-only helper: counts how many times a component has rendered and writes
// the number onto its DOM node as data-renders. CSS shows it as a small badge.
// It works on the DOM node directly, so the counter itself never causes a render.
export function useRenderBadge(ref) {
  useEffect(() => {
    const node = ref.current;
    if (node) node.dataset.renders = String(Number(node.dataset.renders ?? 0) + 1);
  }); // no dependency array on purpose: run after every render
}
