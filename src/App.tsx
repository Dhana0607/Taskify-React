import React, { useReducer, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./components/model";
import TodoList from "./components/TodoList";
import todoReducer from "./components/todoReducer";
import {
  DragDropContext,
  DropResult,
} from "@hello-pangea/dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");

  // useReducer replaces useState for todos
  const [todos, dispatch] = useReducer(todoReducer, [] as Todo[]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatch({ type: "add", payload: todo });
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    // dragging inside the same place → just reorder
    if (source.droppableId === destination.droppableId) {
      return;
    }

    // moving from active to completed
    if (source.droppableId === "TodosList" && destination.droppableId === "TodosRemove") {
      const moved = todos[source.index];
      const newActive = [...todos];
      newActive.splice(source.index, 1);

      const newCompleted = [...completedTodos];
      newCompleted.splice(destination.index, 0, moved);

      // update both
      dispatch({ type: "set", payload: newActive });
      setCompletedTodos(newCompleted);
    }

    // moving from completed back to active
    if (source.droppableId === "TodosRemove" && destination.droppableId === "TodosList") {
      const moved = completedTodos[source.index];
      const newCompleted = [...completedTodos];
      newCompleted.splice(source.index, 1);

      const newActive = [...todos];
      newActive.splice(destination.index, 0, moved);

      dispatch({ type: "set", payload: newActive });
      setCompletedTodos(newCompleted);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="App-header">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          dispatch={dispatch}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
