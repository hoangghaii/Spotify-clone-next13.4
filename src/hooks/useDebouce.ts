import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouceValue, setDebouceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouceValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouceValue;
};
