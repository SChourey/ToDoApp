import { createAction, props } from '@ngrx/store';
import { ToDoInterface, Filter } from '../models';

export const loadToDoList = createAction('[Load To-Do List] Load To-Do List');

export const loadToDoListSuccess = createAction(
  '[To-Do List API] To-Do List Load Success',
  props<{ toDoList: ToDoInterface[] }>()
);

export const loadToDoListError = createAction(
  '[To-Do List API] To-Do List Load Failure',
  props<{ error: string }>()
);

export const addToDoList = createAction(
  '[Create To-Do List] Add To-Do List',
  props<{ toDoList: ToDoInterface }>()
);

export const deleteToDoList = createAction(
  '[To-Do List API] Delete To-Do List',
  props<{ id: number }>()
);

export const updateToDoList = createAction(
  '[To-Do List API] update ToDoList',
  props<{ toDoList: ToDoInterface }>()
);

export const setFilterToDo = createAction(
  '[To-Do List Filter] filter To-Do List',
  props<{ filter: Filter }>()
);
