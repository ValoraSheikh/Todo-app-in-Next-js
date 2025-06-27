"use client";

import { useState } from "react";
import { useTodoStore } from "@/lib/store/useTodoStore";
import axios from "@/lib/utils/axios";

export default function TodoForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState(""); // renamed setter
  const [tag, setTag] = useState(""); // added state
  const [priority, setPriority] = useState(""); // added state
  const [dueDate, setDueDate] = useState(""); // added state

  const addTodo = useTodoStore((state) => state.addTodo);

  function toggleForm() {
    setIsOpen((v) => !v);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const payload = {
        title,
        description: desc,
        tags: tag ? [tag] : [],
        priority,
        dueDate: dueDate || undefined,
      };
      const res = await axios.post("/api/todos", payload);
      addTodo(res.data);
      // reset fields
      setTitle("");
      setDesc("");
      setTag("");
      setPriority("");
      setDueDate("");
      toggleForm();
    } catch (err) {
      console.error("Error creating todo", err);
    }
  }

  return (
    <>
      {/* Modal toggle */}
      <button
        onClick={toggleForm}
        className="rounded-lg py-2 px-4 text-center text-xl text-blue-400 font-semibold bg-blue-100"
      >
        + Add Task
      </button>

      {/* Main modal */}
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-sm">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Create New Product
              </h3>
              <button
                type="button"
                onClick={toggleForm}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              >
                ✖
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type title"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="tag"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Tag
                  </label>
                  <input
                    type="text"
                    id="tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Business"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Priority
                  </label>
                  <select
                    id="category"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  >
                    <option value="">Select category</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write todo description here"
                  />
                </div>

                <div className="relative max-w-sm col-span-2">
                  <label
                    htmlFor="default-datepicker"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Due Date
                  </label>
                  <input
                    id="default-datepicker"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ps-10"
                  />
                </div>
              </div>
              <button
                onClick={toggleForm}
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add new product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
