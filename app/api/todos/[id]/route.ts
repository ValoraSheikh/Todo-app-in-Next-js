import dbConnect from "@/lib/db";
import Todo from "@/models/Todo.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
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

    const { title, description, dueDate, priority, tags } =
      await request.json();

    if (!title) {
      return NextResponse.json(
        {
          error: "Title is required",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const todo = await Todo.create({
      title,
      userId: session.user.id,
      description,
      dueDate,
      priority,
      tags,
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("Having error in creating todo", error);
    return NextResponse.json(
      {
        error: "Failed while creating todo",
      },
      { status: 400 }
    );
  }
}

export async function GET() {
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

    const todo = await Todo.findById({userId: session.user.id})

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("Having error in getting todos", error);
    return NextResponse.json(
      {
        error: "Failed while getting todos",
      },
      { status: 400 }
    );
  }
}
