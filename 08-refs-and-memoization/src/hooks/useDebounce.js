import { useEffect, useState } from 'react';

// Returns `value`, but only after it has stopped changing for `delay` ms.
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // each new value cancels the previous timer
  }, [value, delay]);

  return debounced;
}
