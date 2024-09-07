import { prisma } from "../prisma";
import { Request, Response } from "express";
import { z } from "zod";

const newTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

const deleteTodoSchema = z.object({
  id: z.string().min(1),
});

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany();

    if (!todos) {
      return res
        .status(404)
        .json({ success: false, message: "Todos not found" });
    }

    if (todos.length === 0) {
      return res.status(200).json({ success: true, data: [], message: "There is no todo in the database!" });
    }

    res.status(200).json({
      success: true,
      data: todos,
      message: "Todos found successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { success, data } = newTodoSchema.safeParse(req.body);

    if (!success) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid todo data" });
    }

    const { title, description } = data;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Todo title is required" });
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
      },
    });

    if (!todo) {
      return res
        .status(400)
        .json({ success: false, message: "Todo not created" });
    }

    res.status(201).json({
      success: true,
      data: todo,
      message: "Todo created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { success, data } = deleteTodoSchema.safeParse(req.query);

    if (!success) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid todo id" });
    }

    const { id } = data;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Todo id is required" });
    }

    const todo = await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      data: todo,
      message: "Todo deleted successfully",
    });
  } catch (error: Error | any) {
    console.log(error);
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ success: false, message: "Todo you are trying to delete not found" });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
