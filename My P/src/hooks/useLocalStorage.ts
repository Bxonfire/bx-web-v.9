import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Also save to a global storage that persists across sessions
      try {
        // Save to a more persistent location
        const globalKey = `global_${key}`;
        window.localStorage.setItem(globalKey, JSON.stringify(valueToStore));
        
        // Also try to save to sessionStorage as backup
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (e) {
        console.log('Failed to save to global storage:', e);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Check for global storage on load
  useEffect(() => {
    try {
      const globalKey = `global_${key}`;
      const globalItem = window.localStorage.getItem(globalKey);
      if (globalItem && globalItem !== JSON.stringify(storedValue)) {
        const globalValue = JSON.parse(globalItem);
        setStoredValue(globalValue);
      }
    } catch (error) {
      console.log('Failed to load from global storage:', error);
    }
  }, [key]);

  return [storedValue, setValue] as const;
}