import { createSelector } from '@ngrx/store';
import { ToDoListState } from './todo.reducer';
import { AppState } from './todo.state';

export const selectToDo = (state: AppState) => state.toDoList;
export const selectAllToDoList = createSelector(
  selectToDo,
  (state: ToDoListState) => state?.toDoList
);
export const selectMiscellaneous = createSelector(
  selectToDo,
  (state: ToDoListState) => state.miscellaneous
);
