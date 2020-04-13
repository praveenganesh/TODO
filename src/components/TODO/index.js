import React, { useState, useEffect } from "react";
import TodoItem from "../TodoItem";

function TODO(props) {
  const [checked, setChecked] = useState(props.completed ? true : false);
  const [editMode, setEditMode] = useState(false);
  let [edititngField, setEditingField] = useState(props.value);

  let { biz } = props;
  useEffect(() => {
    setEditingField(props.value);
  }, [props.value]);
  return (
    <div>
      <label className="container">
        <input
          onChange={() => {
            if (!checked) {
              biz.changeFlag(props.id, "COMPLETED");
            } else {
              biz.changeFlag(props.id, "PENDING");
            }
          }}
          checked={checked}
          data-testid={`check-box-${props.flag}`}
          flag={props.flag}
          type="checkbox"
        />
        <span className="checkmark"></span>
      </label>

      <TodoItem
        editMode={editMode}
        changeEditMode={(value) => setEditMode(value)}
        completed={props.completed}
        edititngField={edititngField}
        onChange={(e) => {
          setEditingField(e.target.value);
        }}
        {...props}
      />

      {editMode ? (
        <button
          data-testid="save-btn"
          onClick={() => {
            setEditMode(false);
            biz.editTodo(props.id, edititngField);
          }}
        >
          Save
        </button>
      ) : (
        <button data-testid="edit-btn" onClick={() => setEditMode(true)}>
          Edit
        </button>
      )}
      <button
        data-testid={`delete-btn-${props.flag}`}
        onClick={() => {
          biz.removeTodo(props.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}
export default TODO;
