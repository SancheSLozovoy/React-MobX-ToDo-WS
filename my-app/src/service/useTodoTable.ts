import { useContext, createContext } from "react";
import TodoTable from "../state/TodoTable";

export const TodoContext = createContext<TodoTable | undefined>(undefined)

export const useTodoTable = () => {
    const context = useContext(TodoContext)
    if(!context){
        throw new Error("Dont see context");
    }
    return context;
}

