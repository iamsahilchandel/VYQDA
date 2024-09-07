import axios, { AxiosError  } from "axios";
import toast from "react-hot-toast";
import Button from "../ui/button";
import Card from "../ui/card";
import Modal from "../ui/modal";
import { TODO_ENDPOINT } from "../../utils/api-endpoints";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoAtom } from "../../store/atoms";

export default function TodoModal({ closeModal }: { closeModal: () => void }) {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const setTodos = useSetRecoilState(todoAtom);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(TODO_ENDPOINT, {
        title: formData.title,
        description: formData.description,
      });
      const newTodo = response.data.data;
      setTodos((old) => [...old, newTodo]);
      toast.success("Todo created successfully");
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log(axiosError);
        toast.error(axiosError.message);
      } else {
        console.log(error);
        toast.error("An unexpected error occurred");
      }
      setIsLoading(false);
    }

    closeModal();
  }

  return (
    <Modal closeModal={closeModal}>
      <Card className="!w-[40rem]">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter a task title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <textarea
              id="descrition"
              rows={8}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your task description here..."
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-end">
            <Button className="mr-4" type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create new task"}
            </Button>
            <Button
              className="!bg-white !text-gray-900 border border-gray-900"
              onClick={closeModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}
