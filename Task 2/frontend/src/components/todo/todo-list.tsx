import TodoCard from "./todo-card";
import { useRecoilStateLoadable } from "recoil";
import { todoAtom } from "../../store/atoms";
import axios, { AxiosError } from "axios";
import { TODO_ENDPOINT } from "../../utils/api-endpoints";
import toast from "react-hot-toast";
import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useRecoilStateLoadable(todoAtom);
  const [deletingTodoId, setDeletingTodoId] = useState<number | null>(null);

  async function handleTodoDelete(id: number) {
    try {
      setDeletingTodoId(id);
      await axios.delete(`${TODO_ENDPOINT}?id=${id}`);
      setTodos((old) => old.filter((todo) => todo.id !== id));
      toast.success("Todo deleted successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log(axiosError);
        toast.error(axiosError.message);
      } else {
        console.log(error);
        toast.error("An unexpected error occurred");
      }
      console.log(error);
    }
  }

  if (todos.state === "loading") {
    return <div className="w-full text-center">Loading...</div>;
  }

  if (todos.state === "hasError") {
    return <div className="w-full text-center">Error loading todos!</div>;
  }

  if (todos.state === "hasValue" && todos.contents.length === 0) {
    return <div className="w-full text-center">There is no todo as of now!</div>;
  }

  return (
    <div className="px-4 grid grid-cols-5 gap-4">
      {todos.state === "hasValue" &&
        todos.contents.map((todo) => (
          <TodoCard key={todo.id} todo={todo} handleTodoDelete={handleTodoDelete} isDeleting={deletingTodoId === todo.id} />
        ))}
    </div>
  );
}
