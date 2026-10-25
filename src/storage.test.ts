import { describe, it, expect, beforeEach } from 'vitest';
import { saveTodos, loadTodos, clearStoredTodos, STORAGE_KEY, type StorageLike } from './storage';

// A fake in-memory storage so the tests don't need a browser
const createFakeStorage = (): StorageLike & { data: Record<string, string> } => {
  const data: Record<string, string> = {};
  return {
    data,
    getItem: key => (key in data ? data[key] : null),
    setItem: (key, value) => { data[key] = value; },
    removeItem: key => { delete data[key]; },
  };
};

const sample = [
  { id: 1, text: 'Buy milk', completed: true },
  { id: 2, text: 'Walk dog', completed: false },
];

describe('storage', () => {
  let storage: ReturnType<typeof createFakeStorage>;

  beforeEach(() => {
    storage = createFakeStorage();
  });

  describe('saving', () => {
    it('saves todos as JSON under the todos key', () => {
      saveTodos(sample, storage);
      expect(JSON.parse(storage.data[STORAGE_KEY])).toEqual(sample);
    });

    it('overwrites previously saved todos', () => {
      saveTodos(sample, storage);
      saveTodos([sample[0]], storage);
      expect(loadTodos(storage)).toEqual([sample[0]]);
    });
  });

  describe('loading', () => {
    it('loads the todos that were saved', () => {
      saveTodos(sample, storage);
      expect(loadTodos(storage)).toEqual(sample);
    });

    it('returns an empty list when nothing is stored', () => {
      expect(loadTodos(storage)).toEqual([]);
    });
  });

  describe('invalid data', () => {
    it('returns an empty list when the stored JSON is corrupted', () => {
      storage.setItem(STORAGE_KEY, '{not valid json');
      expect(loadTodos(storage)).toEqual([]);
    });

    it('returns an empty list when the stored value is not an array', () => {
      storage.setItem(STORAGE_KEY, '{"a": 1}');
      expect(loadTodos(storage)).toEqual([]);
    });
  });

  describe('clearing', () => {
    it('removes the stored todos', () => {
      saveTodos(sample, storage);
      clearStoredTodos(storage);
      expect(STORAGE_KEY in storage.data).toBe(false);
      expect(loadTodos(storage)).toEqual([]);
    });
  });
});
