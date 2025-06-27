import { getServerSession } from "next-auth";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Todo from "@/models/Todo.model";
import dbConnect from "@/lib/db";
import { todo } from "node:test";

export default async function TodosPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    // If no session, send the user to sign-in page
    redirect("/sign-in");
  }

  await dbConnect();
  const todosFromDB = await Todo.find({ userId: session.user.id });

  // ✅ Convert to plain objects
  const todos = JSON.parse(JSON.stringify(todosFromDB));

  console.log("Here are the todos", todos);
  return (
    <main className="mx-auto p-4 h-[100vh] w-[90vw]">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">My Task's</h1>
          <p className="text-gray-500 p-1">Wednesday, 11 May</p>
        </div>
        <div>
          <TodoForm/>
        </div>
      </header>

      <TodoList initialTodos={todos}/>
    </main>
  );
}
