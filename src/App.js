import React from "react";
import useStoreBiz from "./Hooks/StoreBiz";
import TODO from "./components/TODO";
import "./App.css";

function App(props) {
  let biz = useStoreBiz(props);
  let { todos, newTodo, setNewTodo, addTodo } = biz;
  let pendingTodos = todos.filter((item) => item.flag === "PENDING");
  let completedTodos = todos.filter((item) => item.flag === "COMPLETED");
  return (
    <div className="App">
      <header className="App-header">
        <p className="title">-----TODO-----</p>
        <div className="wrapper">
          <div>
            <p className="heading">Add Item</p>
            <div>
              <input
                data-testid="todo-input"
                type="text"
                placeholder="type here..."
                value={newTodo}
                onChange={(e) => {
                  setNewTodo(e.target.value);
                }}
              />
              <button
                data-testid="todo-submit"
                onClick={() => {
                  addTodo();
                }}
              >
                Add
              </button>
              <button
                onClick={() => {
                  setNewTodo("");
                }}
              >
                clear
              </button>
            </div>
          </div>

          <div>
            <p className="heading">TODO</p>
            <p>{`${pendingTodos.length} item${
              pendingTodos.length > 1 ? "s" : ""
            }`}</p>
            {pendingTodos.length === 0 && <p className="info">No items</p>}
            {pendingTodos.map((item, index) => {
              return (
                <TODO
                  biz={biz}
                  id={item.id}
                  key={index}
                  flag={item.flag}
                  editable
                  value={item.todo}
                />
              );
            })}
          </div>

          <div>
            <p className="heading">Completed</p>
            <p>{`${completedTodos.length} item${
              completedTodos.length > 1 ? "s" : ""
            }`}</p>
            {completedTodos.length === 0 && <p className="info">No items</p>}
            {completedTodos.map((item, index) => {
              return (
                <TODO
                  biz={biz}
                  id={item.id}
                  key={index}
                  editable
                  flag={item.flag}
                  completed
                  value={item.todo}
                />
              );
            })}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
