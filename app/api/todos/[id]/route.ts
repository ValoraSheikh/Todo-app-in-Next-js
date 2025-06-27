import dbConnect from "@/lib/db";
import Todo from "@/models/Todo.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized access",
        },
        { status: 401 }
      );
    }

    await dbConnect();

    const todo = await Todo.findById(params.id);

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    if (todo.userId !== session?.user?.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    await Todo.findByIdAndDelete(params.id);

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized access",
        },
        { status: 401 }
      );
    }

    await dbConnect();

    const todo = await Todo.findById(params.id);

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    if (todo.userId !== session?.user?.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = await request.json();

    const updatedTodo = await Todo.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}
