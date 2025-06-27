'use client';

import { useEffect } from 'react';
import { useTodoStore } from '@/lib/store/useTodoStore';
import TodoItem from './TodoItem';

interface Todo {
  _id: string;
  title: string;
  isCompleted: boolean;
}

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const todos = useTodoStore(state => state.todos);
  const setTodos = useTodoStore(state => state.setTodos);

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos, setTodos]);

  return (
    <ul className="space-y-2 mt-4">
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </ul>
  );
}