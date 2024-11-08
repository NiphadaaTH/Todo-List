import React from "react";
import { useState, useEffect } from "react";
import { json } from "stream/consumers";

interface todos {
  id: number;
  title: string;
  complete: boolean;
}

const Todo = () => {
  const [todos, setTodos] = useState<todos[]>([]);
  const [todoName, setTodoName] = useState<string>("");

  const addTodos = () => {
    const newTodo = {
      id: Math.random(),
      title: todoName,
      complete: false,
    };
    setTodos([...todos, newTodo]);
    setTodoName("");
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id != id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const checkTodo = (id: number) => {
    const newTodos = todos.map((t) => {
      if (t.id == id) {
        t.complete = !t.complete;
      }
      return t;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div className="h-full w-full flex justify-center items-center flex-col space-y-10">
      <div className="p-4 flex flex-col space-y-2 text-black">
        <textarea
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          className="p-4 rounded border border-solid border-gray-800"
        />
        <button
          className="p-4 ml-4 bg-indigo-600 rounded hover:bg-indigo-700 text-white font-bold"
          onClick={addTodos}
        >
          Add Todo
        </button>
      </div>

      <div className="flex flex-col w-full justify-center items-center">
        {todos.map((todo) => {
          return (
            <div
              className="flex justify-between items-center w-1/3 my-2
            bg-indigo-700 p-4 bg-opacity-30 border border-solid border-indigo-800 rounded"
            >
              <div className="flex flex-row space-x-2">
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => {
                    checkTodo(todo.id);
                  }}
                  className="h-6 w-6"
                />
                <div
                  className={`text-xl font-semibold ml-2 ${
                    todo.complete ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </div>
              </div>

              <button
                onClick={() => {
                  deleteTodo(todo.id);
                }}
                className="bg-red-600 p-2 rounded hover:bg-red-800 text-white font-bold"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
