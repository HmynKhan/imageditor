import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../Features/Todo/TodoSlice'
// import todoReducer from '../features/todo/todoSlice';


export const store = configureStore({
    reducer: todoReducer
})