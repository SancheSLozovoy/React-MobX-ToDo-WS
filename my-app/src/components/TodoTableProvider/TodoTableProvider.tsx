import React, { useEffect, useMemo } from "react";
import TodoTable from "../../state/TodoTable";
import { TodoContext } from "../../service/useTodoTable";

export const TodoTableProvider: React.FC<{children : React.ReactNode}> = ({children}) => {

    const memo = useMemo(() => new TodoTable(), [])

    useEffect(() => {
        memo.loadTasks();
    }, [memo])

    return( 
        <TodoContext.Provider value={memo}>
            {children}
        </TodoContext.Provider>
    );
}
 
export default TodoTableProvider;