import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todo: [
        {
            id:1,
            todo:'todo 1',
            completed : 'false',
        },
    ],
    addTodo : (todo)=>{},
    updateTodo : (id,todo)=>{},
    deleteToDo : (id) =>{},
    toggleComplete: (id)=>{},

});

export const useTodo = () =>{
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider