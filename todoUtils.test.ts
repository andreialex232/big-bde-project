import { describe, it, expect } from 'vitest';
import { filterTodos } from './todoUtils';

const todos = [
  { id: 1, text: 'Buy milk', completed: true },
  { id: 2, text: 'Walk dog', completed: false },
  { id: 3, text: 'Write code', completed: false },
];

describe('filterTodos', () => {
  it('returns all todos for "all"', () => {
    expect(filterTodos(todos, 'all')).toHaveLength(3);
  });

  it('returns only completed todos for "done"', () => {
    const result = filterTodos(todos, 'done');
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('Buy milk');
  });

  it('returns only open todos for "not-done"', () => {
    expect(filterTodos(todos, 'not-done').map(t => t.id)).toEqual([2, 3]);
  });

  it('returns an empty list for an empty input', () => {
    expect(filterTodos([], 'done')).toEqual([]);
  });

  it('does not change the original array', () => {
    filterTodos(todos, 'done');
    expect(todos).toHaveLength(3);
  });
});