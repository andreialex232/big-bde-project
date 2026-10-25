import type { Todo } from './main';

export const STORAGE_KEY = 'todos';

// Only the parts of localStorage we use, so tests can pass in a fake
export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

// Option 14: saves the todos array as JSON
export const saveTodos = (todos: Todo[], storage: StorageLike = localStorage): void => {
  storage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

// Option 14: reads todos; returns an empty list if nothing valid is stored
export const loadTodos = (storage: StorageLike = localStorage): Todo[] => {
  try {
    const stored = storage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return []; // corrupted JSON
  }
};

// Option 14: removes the stored todos
export const clearStoredTodos = (storage: StorageLike = localStorage): void => {
  storage.removeItem(STORAGE_KEY);
};
