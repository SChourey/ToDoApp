import { createReducer, on } from '@ngrx/store';
import { ToDoInterface, Filter } from '../models';
import {
  loadToDoList,
  loadToDoListError,
  loadToDoListSuccess,
  setFilterToDo,
} from './todo.action';

export interface ToDoListState {
  toDoList: ToDoInterface[];
  error: string | null;
  miscellaneous: {
    filter: Filter;
  };
}
export const initialState: ToDoListState = {
  toDoList: [],
  error: null,
  miscellaneous: {
    filter: {
      title: '',
    },
  },
};

export const ToDoListReducer = createReducer(
  initialState,
  on(loadToDoList, (state) => ({
    ...state,
  })),
  on(loadToDoListSuccess, (state, { toDoList }) => ({
    ...state,
    toDoList: toDoList,
    error: null,
  })),
  on(loadToDoListError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(setFilterToDo, (state, { filter }) => ({
    ...state,
    miscellaneous: { filter },
  }))
);
