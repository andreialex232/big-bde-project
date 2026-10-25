import './style.css';
import { loadTodos, saveTodos } from './storage';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

/** 
 * Kristian: 6th of September 2024, BDE
 * 
 * This is the list of optional features that can be added to the todo list application:
 * You must make at least one of these features to complete the project. The more the merrier.
 * In your submission video, please mention which feature you have implemented and demonstrate how it works. Go through the code and explain how you implemented the feature and how it works.
 * IF, you want to implement something not on list, you can do that as well.
*/


//Optional features list: 

// Option 1: Add a button to toggle the completed status of a todo item
// Function to toggle the completed status of a todo + 
// Add a button to toggle the completed status of a todo item

// Option 2: Add a button to clear all completed todos
// Add a button to clear all completed todos
// Function to clear all completed todos
// Add a button to toggle all todos

// Option 3: Add a button to toggle all todos
// Edit a todo item and update it
// Add an input field to edit a todo item
// Save the updated todo item
// Cancel the editing of a todo item
// Add a button to cancel the editing of a todo item

// Option 4: Add a button to filter todos by status
// Add a button to filter todos by status
// Function to filter todos by status

// Option 5: Add a button to sort todos by status
// Add a button to sort todos by status
// Function to sort todos by status

// Option 6: Due Date for Todos:
// Add a date input field to set a due date for each todo item.
// Display the due date next to each todo item.
// Highlight overdue todos.
// Priority Levels:

// Option 7: Add a dropdown to set the priority level (e.g., Low, Medium, High) for each todo item.
// Display the priority level next to each todo item.
// Sort todos by priority.
// Search Functionality:

// Option 8: Add a search input field to filter todos based on the search query.
// Display only the todos that match the search query.
// Category Tags:

// Option 9: Add a text input field to assign category tags to each todo item.
// Display the tags next to each todo item.
// Filter todos by category tags.
// Progress Indicator:

// Option 10: Add a progress bar to show the percentage of completed todos.
// Update the progress bar as todos are marked as completed or incomplete.
// Dark Mode Toggle:

// Option 11: Add a button to toggle between light and dark modes.
// Change the app's theme based on the selected mode.
// Export/Import Todos:

// Option 12: Add buttons to export the list of todos to a JSON file.
// Add functionality to import todos from a JSON file.
// Notifications:

// Option 13: Add notifications to remind users of due todos.
// Use the Notification API to show browser notifications.

// Option 14: Local Storage:
// Save the list of todos to local storage.
// Retrieve the todos from local storage on page load.
// Add a button to clear all todos from local storage.

// Option 15: JSDOC Comments:
// Add JSDoc comments to document the functions and interfaces in the code.
// Link : https://jsdoc.app/

// Optional 16: Handle Errors:
// Add error handling for user input validation. Show red text or border for invalid input.
// Display error messages for invalid input.

export let todos: Todo[] = loadTodos();
type Filter = 'all' | 'done' | 'not-done';
let currentFilter: Filter = 'all';
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const clearCompletedBtn = document.getElementById('clear-completed') as HTMLButtonElement; //option 2

// Creates a new todo and adds it to the array
export const addTodo = (text: string): void => {
  const newTodo: Todo = {
    id: Date.now(), // timestamp as a unique ID
    text: text,
    completed: false,
  };
  todos.push(newTodo);
  console.log("Todo added: ", todos);
  renderTodos();
};


// Option 3
const getFilteredTodos = (): Todo[] => {
  if (currentFilter === 'done') return todos.filter(todo => todo.completed);
  if (currentFilter === 'not-done') return todos.filter(todo => !todo.completed);
  return todos;
};

// Rebuilds the todo list in the DOM from the todos array
const renderTodos = (): void => {
    saveTodos(todos);
  todoList.innerHTML = '';

  getFilteredTodos().forEach(todo => {
    const status = translateBoolean(todo.completed)
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
      <span>${todo.text}</span>
      <button>Remove</button>
         <button id="editBtn">Edit</button>
         <div>
            <span class="todoStatus">Status: ${status}</span>
            <button id="toggleStatus">Toggle status</button>
         </div>
         
    `;
    // Listeners are added with addEventListener instead of inline onclick, which is safer
    addRemoveButtonListener(li, todo.id);
    addEditButtonListener(li, todo.id);
    toggleTodoStatusListener(li, todo.id) // Option 1
    todoList.appendChild(li);
  });
};

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (text !== '') {
    addTodo(text);
    todoInput.value = '';
  }
});

const errorMessage = document.getElementById('error-message') as HTMLParagraphElement; // Should be moved to the top + added to the HTML file

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (text !== '') {
    todoInput.classList.remove('input-error');
    errorMessage.style.display = 'none';
    addTodo(text);
    todoInput.value = '';
  } else {
    console.log("Please enter a todo item");
    todoInput.classList.add('input-error');
    errorMessage.style.display = 'block';
  }
});

// Adds a click listener to the remove button of a todo item
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('button');
  removeButton?.addEventListener('click', () => removeTodo(id)); // optional chaining in case the button is missing
};

// Removes a todo from the array by ID
export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
};

// Adds a click listener to the edit button of a todo item
const addEditButtonListener = (li: HTMLLIElement, id:number) => {
  const editButton = li.querySelector('#editBtn')
  editButton?.addEventListener('click', () => editTodo(id)) 
}

// Option 1
const toggleTodoStatusListener = (li: HTMLElement, id:number) => {
    const toggleBtn = li.querySelector('#toggleStatus')
    toggleBtn?.addEventListener('click', () => toggleStatus(id));
}

// Prompts the user for new text and updates the todo
const editTodo = (id:number) => {
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    const text = prompt('Edit todo', todo.text)
    if (text) {
      todo.text = text
      renderTodos()
    }
  }
}

// Option 1
const toggleStatus = (id:number) => {
    const todo = todos.find(todo => todo.id === id);
    if(todo) {
        todo.completed = !todo.completed
    }
    renderTodos()
}

const translateBoolean = (todoItemStatus: boolean) => {
    if(todoItemStatus) {
        return 'Done'
    } else {
        return 'Not done'
    }
}

//option 2
const clearCompleted = (): void => {
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
};
clearCompletedBtn.addEventListener('click', clearCompleted);


document.querySelectorAll<HTMLButtonElement>('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter as Filter;
    renderTodos();
  });
});
const clearStorageBtn = document.getElementById('clear-storage') as HTMLButtonElement | null;
clearStorageBtn?.addEventListener('click', () => {
  todos = [];
  renderTodos();
});


































// Color picker: changes the page background color
const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;
};

const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
  if (colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value);
    });
  } else {
    console.error('Color picker element not found');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker();
});

// Initial render
renderTodos();
