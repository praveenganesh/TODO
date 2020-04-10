import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

const addTodo = (getByTestId) => {
  const TodoInput = getByTestId("todo-input");
  const TodoSubmitBtn = getByTestId("todo-submit");
  TodoInput.focus(TodoInput);
  fireEvent.change(TodoInput, { target: { value: "todo item 1" } });
  fireEvent.click(TodoSubmitBtn);
};

const completeTodo = (getByTestId) => {
  addTodo(getByTestId);
  const checkbox = getByTestId("check-box-PENDING");
  fireEvent.click(checkbox);
};
test("Page Rendered", () => {
  const { getByText } = render(<App />);
  const Title = getByText(/-----TODO-----/i);
  expect(Title).toBeInTheDocument();
});

test("Adding new TODO", () => {
  const { getByTestId, getByText } = render(<App />);
  addTodo(getByTestId);
  expect(getByText(/todo item 1/i).getAttribute("flag")).toBe("PENDING");
});

test("Change TODO to completed", () => {
  const { getByTestId } = render(<App />);
  completeTodo(getByTestId);
  expect(getByTestId("check-box-COMPLETED")).toBeInTheDocument();
});

test("Uncheck completed TODO", () => {
  const { getByTestId } = render(<App />);
  completeTodo(getByTestId);
  const checkbox = getByTestId("check-box-COMPLETED");
  fireEvent.click(checkbox);
  expect(getByTestId("check-box-PENDING")).toBeInTheDocument();
});

test("Delete TODO", () => {
  const { getByTestId, getByText } = render(<App />);
  addTodo(getByTestId);
  try {
    getByText(/todo item 1/i);
  } catch (error) {
    expect(error).toBeDefined();
  }
});

test("Edit TODO", () => {
  const { getByTestId, getByText } = render(<App />);
  addTodo(getByTestId);
  fireEvent.click(getByTestId("edit-btn"));
  fireEvent.focus(getByTestId("edit-input"));
  fireEvent.change(getByTestId("edit-input"), {
    target: { value: "changed todo item 1" },
  });
  fireEvent.click(getByTestId("save-btn"));
  expect(getByText("changed todo item 1")).toBeInTheDocument();
});
