import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "./model";
import "./styles.css";
import { Draggable } from "@hello-pangea/dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  dispatch: React.Dispatch<any>;
};

const SingleTodo: React.FC<Props> = ({ index, todos, todo, dispatch }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = () => {
    dispatch({ type: "done", payload: todo.id });
  };

  const handleDelete = () => {
    dispatch({ type: "remove", payload: todo.id });
  };
  
  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "edit", payload: { id: todo.id, todo: editTodo } });
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
      (provided, snapshot) => (
        <form className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        onSubmit={(e)=> {handleEdit(e)}}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(true);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span
              className="icon"
              onClick={handleDelete}
            >
              <AiFillDelete />
            </span>
            <span
              className="icon"
              onClick={handleDone}
            >
              <MdDone />
            </span>
          </div>
        </form>
    )}
    </Draggable>
  );
};

export default SingleTodo;
