import React from "react";

function TodoItem(props) {
  let {
    completed,
    value,
    editMode,
    changeEditMode,
    editable,
    edititngField,
  } = props;

  if (editMode) {
    return (
      <input
        type="text"
        value={edititngField}
        data-testid="edit-input"
        onChange={props.onChange}
        autoFocus
      />
    );
  }
  return (
    <p
      flag={props.flag}
      onClick={() => editable && changeEditMode(true)}
      className={`todo-item ${completed && "completed"}`}
    >
      {value}
    </p>
  );
}
export default TodoItem;
