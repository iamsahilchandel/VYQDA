import { useState } from "react";
import TodoModal from "./todo-modal";

export default function TodoAdd() {
    const [open, setOpen] = useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    return (
      <div className="w-full my-4 flex items-center justify-center">
        <button
          className="w-[30rem] px-6 py-4 text-gray-500 bg-[#e6d2b1] text-left rounded-lg"
          onClick={handleOpen}
        >
          Take a note...
        </button>
  
        {open && <TodoModal closeModal={handleClose} />}
      </div>
    );
  }
  