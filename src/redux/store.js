import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../components/TodoList/todoSlice";
import filterSlice from "../components/Filters/filterSlice";

const store = configureStore({
  reducer: {
    filters: filterSlice,
    todoList: todoSlice,
  },
});

export default store;
