import { useEffect, useState } from 'react';

function readValue(key, getFallback, isValid) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return getFallback();

    const parsed = JSON.parse(raw);
    return isValid(parsed) ? parsed : getFallback();
  } catch {
    // Storage blocked, or the JSON is corrupted: start from the fallback.
    return getFallback();
  }
}

// Like useState, but the value survives a page reload.
// `isValid` guards against data in storage that doesn't have the shape you expect.
// Note: `key` is expected to stay the same for the life of the component.
export function useLocalStorage(key, initialValue, isValid = () => true) {
  const [value, setValue] = useState(() =>
    readValue(
      key,
      () => (typeof initialValue === 'function' ? initialValue() : initialValue),
      isValid,
    ),
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked. The app keeps working, it just won't persist.
    }
  }, [key, value]);

  return [value, setValue];
}
