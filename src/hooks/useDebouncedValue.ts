import { useEffect, useRef, useState } from 'react';

export default function useDebouncedValue<T>(value: T, delay = 250): [T, (v: T) => void] {
  const [debounced, setDebounced] = useState<T>(value);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const set = (v: T) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDebounced(v), delay);
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return [debounced, set];
}
