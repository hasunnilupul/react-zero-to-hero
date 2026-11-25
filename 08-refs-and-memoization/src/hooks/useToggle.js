import { useState } from 'react';

// A boolean with a built-in flip. Returns [value, toggle, setValue].
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue((current) => !current);
  }

  return [value, toggle, setValue];
}
