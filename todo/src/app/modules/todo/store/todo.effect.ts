import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ToastMessageService } from '../../core/services/toast-message.service';
import { ToDoListService } from '../services/todo.service';
import { ToDoInterface, Filter } from '../models';
import {
  addToDoList,
  deleteToDoList,
  loadToDoList,
  loadToDoListError,
  loadToDoListSuccess,
  setFilterToDo,
  updateToDoList,
} from './todo.action';
import { selectMiscellaneous } from './todo.selector';
import { AppState } from './todo.state';

@Injectable()
export class ToDoEffect {
  constructor(
    private actions$: Actions,
    private toDoListService: ToDoListService,
    private store$: Store<AppState>,
    private toastService: ToastMessageService
  ) {}

  loadToDoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadToDoList),
      withLatestFrom(this.store$.select(selectMiscellaneous)),
      switchMap(([action, { filter }]) => {
        const filterData: Filter = {
          ...(filter.title ? { title: filter.title } : {}),
        };
        return this.toDoListService.getToDoList(filterData).pipe(
          mergeMap((toDoList: ToDoInterface[]) => [
            loadToDoListSuccess({ toDoList: toDoList }),
          ]),
          catchError((error) => of(loadToDoListError({ error })))
        );
      })
    )
  );

  addToDoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToDoList),
      switchMap(({ toDoList }) =>
        this.toDoListService
          .addToDoList(toDoList)
          .pipe(mergeMap(() => [loadToDoList()]))
      ),
      tap(() => this.toastService.success({ message: 'Successfully Added' }))
    )
  );

  deleteToDoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteToDoList),
      switchMap(({ id }) =>
        this.toDoListService
          .deleteToDoList(id)
          .pipe(mergeMap(() => [loadToDoList()]))
      ),
      tap(() => this.toastService.success({ message: 'Successfully Deleted' }))
    )
  );

  updateToDoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateToDoList),
      switchMap(({ toDoList }) =>
        this.toDoListService
          .updateToDoList(toDoList)
          .pipe(mergeMap(() => [loadToDoList()]))
      ),
      tap(() => this.toastService.success({ message: 'Successfully Updated' }))
    )
  );

  setFilterToDoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setFilterToDo),
      switchMap(() => [loadToDoList()])
    )
  );
}
