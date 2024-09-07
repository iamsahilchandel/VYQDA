import { Router } from "express";
import { getTodos, createTodo, deleteTodo } from "../controllers/todo";

const router = Router();

/* -------------------------------------------------------------------------- */
/*                         DEFINE TODO ENDPOINTS HERE                         */
/* -------------------------------------------------------------------------- */
router.get("/todo", getTodos);
router.post("/todo", createTodo);
router.delete("/todo", deleteTodo);

export default router;
