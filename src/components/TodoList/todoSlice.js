import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {

// }

const todoSlice = createSlice({
  name: "todoSlice",
  // initialState: [
  //   { id: 1, name: "Learn Yoga", completed: false, priorities: "Medium" },
  //   { id: 2, name: "Learn Redux", completed: true, priorities: "High" },
  //   { id: 3, name: "Learn JavaScript", completed: false, priorities: "Low" },
  // ],
  //   [] => {status : '', todos: [] }
  initialState: { status: "idle", todos: [] },
  reducers: {
    // addToDo: (state, action) => {
    //   state.push(action.payload);
    // },
    // toggleToDoStatus: (state, action) => {
    //   const currentTodo = state.find((todo) => todo.id === action.payload);
    //   if (currentTodo) {
    //     currentTodo.completed = !currentTodo.completed;
    //   }
    //   console.log("state", state);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToDos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchToDos.fulfilled, (state, action) => {
        state.action = action.payload;
        state.status = "idle";
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state,action) => {
        let currentTodo = state.todos.find((todo) => todo.id === action.payload);
        currentTodo = action.payload;
      })

  },
});

export const { addToDo, toggleToDoStatus } = todoSlice.actions;

export default todoSlice.reducer;

//action (object) và action createtor () => {return action}
//thunk action (function) và thunk action createtor () =>{return thunk action}

// export const addToDos = (todo) => {//thunk action createtor
//   return function addToDosThunk(dispatch, getState) {// thunk action
//     console.log('getState', getState());
//     // console.log(todo);1
//   }
// }

export const fetchToDos = createAsyncThunk("todos/fecthToDos", async () => {
  const res = await fetch("/api/todos");
  const data = await res.json();
  return data.todos;
});

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (newTodo) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
    });
    const data = await res.json();
    // console.log('data', data);
    return data.todos;
  }
);

export const updateTodo = createAsyncThunk("todos/updateTodo", async (updatedTodo) => {
  const res = await fetch("/api/updateTodo", {
    method: "POST",
    body: JSON.stringify(updatedTodo)
  });
  const data = await res.json();
  console.log('data', data);
  return data.todo;
});

/* 
  => todos/fecthToDos/pending  || trạng thái vừa khi gửi request
  => todos/fecthToDos/fullfilled 
  => todos/fecthToDos/rejected
*/
