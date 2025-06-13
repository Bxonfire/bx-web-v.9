import { useState, useEffect } from 'react';
import { saveContentToDatabase, loadContentFromDatabase, subscribeToContentChanges } from '../lib/supabase';

// Deep merge utility function to ensure complete data structure
function deepMerge<T>(target: T, source: Partial<T>): T {
  if (!source || typeof source !== 'object') {
    return target;
  }

  const result = { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue) &&
          targetValue && typeof targetValue === 'object' && !Array.isArray(targetValue)) {
        // Recursively merge nested objects
        result[key] = deepMerge(targetValue, sourceValue);
      } else if (sourceValue !== undefined) {
        // Use source value if it's defined
        result[key] = sourceValue;
      }
      // Keep target value if source value is undefined
    }
  }

  return result;
}

export function useGlobalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  // Load from database on mount
  useEffect(() => {
    const loadFromDatabase = async () => {
      try {
        const databaseContent = await loadContentFromDatabase();
        if (databaseContent) {
          // Deep merge database content with initial value to ensure complete structure
          const mergedContent = deepMerge(initialValue, databaseContent);
          setStoredValue(mergedContent);
        }
      } catch (error) {
        console.error('Failed to load from database:', error);
        // Fallback to localStorage
        try {
          const item = window.localStorage.getItem(key);
          if (item) {
            const parsedItem = JSON.parse(item);
            // Deep merge localStorage content with initial value
            const mergedContent = deepMerge(initialValue, parsedItem);
            setStoredValue(mergedContent);
          }
        } catch (localError) {
          console.error('Failed to load from localStorage:', localError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadFromDatabase();
  }, [key, initialValue]);

  // Subscribe to real-time changes
  useEffect(() => {
    const subscription = subscribeToContentChanges((newContent) => {
      // Deep merge new content with initial value to ensure complete structure
      const mergedContent = deepMerge(initialValue, newContent);
      setStoredValue(mergedContent);
      
      // Also update localStorage as backup
      try {
        window.localStorage.setItem(key, JSON.stringify(mergedContent));
      } catch (error) {
        console.error('Failed to update localStorage:', error);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [key, initialValue]);

  const setValue = async (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Update local state immediately
      setStoredValue(valueToStore);
      
      // Save to database (global)
      const success = await saveContentToDatabase(valueToStore);
      
      if (success) {
        console.log('✅ Content saved globally - visible to all users!');
      } else {
        console.warn('⚠️ Database save failed, using localStorage backup');
      }
      
      // Always save to localStorage as backup
      try {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error('localStorage backup failed:', error);
      }
      
    } catch (error) {
      console.error('Failed to save content:', error);
    }
  };

  return [storedValue, setValue, isLoading] as const;
}