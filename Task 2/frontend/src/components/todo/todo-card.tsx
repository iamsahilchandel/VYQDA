import { MdDelete } from "react-icons/md";
import Card from "../ui/card";

interface Todo {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoCardProps {
  todo: Todo;
  isDeleting: boolean;
  handleTodoDelete: (id: number) => void;
}

function TodoCard({ todo, isDeleting, handleTodoDelete }: TodoCardProps) {
  return (
    <Card className="relative !bg-[#e6d2b1] !border-none">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {todo.title}
      </h5>
      <p className="font-normal text-gray-700">
        {todo.description ? todo.description : "No description"}
      </p>
      <p className="font-normal text-gray-700">{todo.createdAt}</p>

      {isDeleting ? (
        <p className="absolute bottom-2 right-2 text-black">Deleting ...</p>
      ) : (
        <MdDelete
          className="absolute bottom-2 right-2 text-black cursor-pointer text-lg"
          onClick={() => handleTodoDelete(todo.id)}
        />
      )}
    </Card>
  );
}

export default TodoCard;
