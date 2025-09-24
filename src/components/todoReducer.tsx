import { Todo } from "./model";

type Actions =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: number }
  | { type: "done"; payload: number }
  | { type: "edit"; payload: { id: number; todo: string }}
  | { type: "set"; payload: Todo[] };

export const todoReducer = (state: Todo[], action: Actions): Todo[] => {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), todo: action.payload, isDone: false }];

    case "remove":
      return state.filter((todo) => todo.id !== action.payload);

    case "done":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );

    case "edit":
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, todo: action.payload.todo } : todo
      );
    case "set":   
    return action.payload;

    default:
      return state;
  }
};
export default todoReducer;