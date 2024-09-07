import { atom, selector } from "recoil";
import axios, { AxiosError } from "axios";
import { TODO_ENDPOINT } from "../utils/api-endpoints";
import toast from "react-hot-toast";

interface Todo {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const todoAtom = atom<Todo[]>({
  key: "todoAtom",
  default: selector({
    key: "todoAtomSelector",
    get: async () => {
      try {
        const response = await axios.get(TODO_ENDPOINT);
        return response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.log(axiosError);
          toast.error(axiosError.message);
        } else {
          console.log(error);
          toast.error("An unexpected error occurred");
        }
      }
    },
  })
});
