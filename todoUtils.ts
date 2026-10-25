import type { Todo } from './src/main'; // see note below

export type Filter = 'all' | 'done' | 'not-done';

export const filterTodos = (todos: Todo[], filter: Filter): Todo[] => {
  if (filter === 'done') return todos.filter(t => t.completed);
  if (filter === 'not-done') return todos.filter(t => !t.completed);
  return todos;
};