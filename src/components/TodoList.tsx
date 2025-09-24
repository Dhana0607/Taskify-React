import React from "react";
import "./styles.css";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "@hello-pangea/dnd";

interface Props {
  todos: Todo[];
  dispatch: React.Dispatch<any>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  dispatch,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      {/* Active Tasks */}
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver?"dragactive" :""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                key={todo.id}
                index={index}            
                todo={todo}
                todos={todos}           
                dispatch={dispatch}    
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Completed Tasks */}
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                key={todo.id}
                index={index}                 
                todo={todo}
                todos={completedTodos}         
                dispatch={setCompletedTodos}   
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
