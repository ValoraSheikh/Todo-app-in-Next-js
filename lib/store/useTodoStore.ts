import { create } from 'zustand';

interface Todo {
  _id: string;
  title: string;
  isCompleted: boolean;
}

interface TodoState {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((state) => ({ todos: [todo, ...state.todos] })),
  removeTodo: (id) => set((state) => ({ todos: state.todos.filter((t) => t._id !== id) })),
  updateTodo: (updated) => set((state) => ({ todos: state.todos.map((t) => (t._id === updated._id ? updated : t)) })),
}));