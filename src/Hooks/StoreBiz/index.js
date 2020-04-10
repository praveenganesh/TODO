import { useState } from "react";

export default function useStoreBiz(props) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    let todoList = JSON.parse(JSON.stringify(todos));
    let item = {
      id: todos.length,
      todo: newTodo,
      flag: "PENDING",
    };
    todoList.unshift(item);
    setTodos(todoList);
    setNewTodo("");
  };

  const removeTodo = (id) => {
    let removedTodos = todos.filter((item) => item.id !== id);
    setTodos(removedTodos);
  };

  const changeFlag = (id, flag) => {
    let todoList = JSON.parse(JSON.stringify(todos));
    todoList.forEach((item) => {
      if (item.id === id) item.flag = flag;
    });
    setTodos(todoList);
  };

  const editTodo = (id, value) => {
    let todoList = JSON.parse(JSON.stringify(todos));
    todoList.forEach((item) => {
      if (item.id === id) item.todo = value;
    });
    setTodos(todoList);
  };
  return {
    todos,
    setTodos,
    newTodo,
    setNewTodo,
    addTodo,
    removeTodo,
    editTodo,
    changeFlag,
  };
}
