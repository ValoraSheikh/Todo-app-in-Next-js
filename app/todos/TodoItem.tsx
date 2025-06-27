"use client";

import { useState } from "react";
import { useTodoStore } from "@/lib/store/useTodoStore";
import axios from "@/lib/utils/axios";

interface Todo {
  _id: string;
  title: string;
  isCompleted: boolean;
  description: string;
  dueDate: Date;
  priority: string
  tags: [string]
}

export default function TodoItem({ todo }: { todo: Todo }) {
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const [loading, setLoading] = useState(false);

  async function toggleComplete() {
    setLoading(true);
    try {
      const res = await axios.patch(`/api/todos/${todo._id}`, {
        isCompleted: !todo.isCompleted,
      });
      updateTodo(res.data);
    } catch (err) {
      console.error("Error updating", err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem() {
    setLoading(true);
    try {
      await axios.delete(`/api/todos/${todo._id}`);
      removeTodo(todo._id);
    } catch (err) {
      console.error("Error deleting", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between w-full bg-white p-5 my-4 rounded-3xl">
        <div>
          <h1
            className={`text-2xl font-semibold ${
              todo.isCompleted ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.title}
          </h1>

          <p className="text-lg text-gray-600 font-semibold">
            {todo.description}
          </p>
          <p className="test-lg text-gray-500">
            {new Date(todo.dueDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-around gap-5">
            <div className="inline-flex items-center pl-20">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  disabled={loading}
                  onChange={toggleComplete}
                  className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded-full bg-slate-100 shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
                  id="check-custom-style"
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </label>
            </div>

            <div>
              <button
                onClick={deleteItem}
                disabled={loading}
                className="text-red-500 group-hover:opacity-100 transition p-2 bg-red-100 rounded-4xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#ff0000"
                >
                  <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-around gap-1">
            <div className="rounded-md bg-slate-100 py-0.5 px-2.5 border border-transparent text-sm text-slate-600 transition-all shadow-sm">
              {todo.tags.map((tag) => tag)}
            </div>
            <div className="rounded-md flex items-center bg-green-100 py-0.5 px-2.5 border border-transparent text-sm text-green-800 transition-all shadow-sm">
              {todo.priority}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
