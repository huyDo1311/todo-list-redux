import { createSelector } from "@reduxjs/toolkit";

export const searchTextSelector = (state) => state.filters.search;
export const filterStatusSelector = (state) => state.filters.status;
export const filterPrioritiesSelector = (state) => state.filters.priorities;
export const todoListSelector = (state) => state.todoList.todos;

// export const todoListSelector = (state) => {
//     const todoRemaining = state.todoList.filter((todo) => {
//         return todo.name.includes(state.filters.search)
//         // return true
//     });
//     return todoRemaining;
// }

// export const todoRemainingSelector = createSelector(
//   todoListSelector,
//   filterStatusSelector,
//   searchTextSelector,
//   filterPrioritiesSelector,
//   (todoList, status, searchText, priorities) => {
//     return todoList.filter((todo) => {
//       if (status === "All") {
//         return priorities.length
//           ? todo.name.includes(searchText) &&
//               priorities.includes(todo.priorities)
//           : todo.name.includes(searchText);
//       }
//       return (
//         todo.name.includes(searchText) &&
//         (status === "Completed" ? todo.completed : !todo.completed) &&
//         (priorities.length ? priorities.includes(todo.priorities) : true)
//       );
//     });
//   }
// );

// export const todoRemainingSelector = createSelector(
//   todoListSelector,
//   filterStatusSelector,
//   searchTextSelector,
//   filterPrioritiesSelector,
//   (todoList, status, searchText, priorities) => {
//     // Filter based on status and search text
//     const filteredTodos = todoList.filter((todo) => {
//       if (todo.name.includes(searchText)) {
//         // Check if todo name includes search text (case-insensitive)

//         // Filter based on status ("All", "Completed", "Pending")
//         if (status === "All") {
//           return true; // Show all matching search text
//         } else if (status === "Completed") {
//           return todo.completed; // Show completed todos
//         } else {
//           // status === "Pending"
//           return !todo.completed; // Show incomplete todos
//         }
//       }
//       return false; // Don't include if not matching search or status
//     });

//     // Apply priority filtering (optional)
//     if (priorities.length) {
//       return filteredTodos.filter((todo) =>
//         priorities.includes(todo.priorities)
//       );
//     }

//     return filteredTodos;
//   }
// );

export const todoRemainingSelector = createSelector(
  todoListSelector,
  filterStatusSelector,
  searchTextSelector,
  filterPrioritiesSelector,
  (todoList, status, searchText, priorities) => {
    return todoList.filter((todo) => {
      const matchesSearchText = todo.name.includes(searchText);
      const matchesStatus = status === "All" || (status === "Completed" ? todo.completed : !todo.completed);
      const matchesPriorities = priorities.length === 0 || priorities.includes(todo.priorities);

      return matchesSearchText && matchesStatus && matchesPriorities;
    });
  }
);
