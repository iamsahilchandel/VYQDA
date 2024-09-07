import { selector } from "recoil";
import { todoAtom } from "./atoms";

export const todoSelector = selector({
    key: "todoSelector",
    get: ({ get }) => {
        return get(todoAtom);
    },
})