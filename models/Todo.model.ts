import mongoose, { model, models, Schema } from "mongoose";

export interface ITodo {
  _id: mongoose.Types.ObjectId;
  userId: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  priority: string;
  tags: [string];
}

const todoSchema = new Schema<ITodo>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  tags: [String],
});

const Todo = models?.Todo || model("Todo", todoSchema);

export default Todo;
