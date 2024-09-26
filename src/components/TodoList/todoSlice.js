import { createSlice } from "@reduxjs/toolkit";

// const initialState = {

// }

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: [
    { id: 1, name: "Learn Yoga", completed: false, priorities: "Medium" },
    { id: 2, name: "Learn Redux", completed: true, priorities: "High" },
    { id: 3, name: "Learn JavaScript", completed: false, priorities: "Low" },
  ],
  reducers: {
    addToDo: (state, action) => {
      state.push(action.payload);
    },
    toggleToDoStatus: (state, action) => {
      const currentTodo = state.find((todo) => todo.id === action.payload);
      if(currentTodo){
        currentTodo.completed = !currentTodo.completed;
      }
      console.log('state', state);
    },
  },
});

export const { addToDo, toggleToDoStatus } = todoSlice.actions;

export default todoSlice.reducer;
