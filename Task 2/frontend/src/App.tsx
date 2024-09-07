import { useEffect } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import TodoAdd from "./components/todo/todo-add";
import TodoList from "./components/todo/todo-list";

function App() {
  useEffect(() => {
    document.title = "Notes";
  }, []);

  return (
    <main className="w-full min-h-screen bg-zinc-500 text-white">
      <NavigationBar />
      <TodoAdd />
      <TodoList />
    </main>
  );
}

function NavigationBar() {
  return (
    <div className="flex items-center justify-start bg-slate-800 px-6 py-4 text-white text-lg">
      <IoReorderThreeOutline className="mr-2 text-4xl cursor-pointer" />
      <h1>Notes</h1>
    </div>
  );
}

export default App;
