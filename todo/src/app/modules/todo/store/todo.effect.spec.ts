import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
// import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { ToastMessageService } from '../../core/services/toast-message.service';
import { ToDoInterface } from '../models';
import { ToDoListService } from '../services/todo.service';
import {
  addToDoList,
  deleteToDoList,
  loadToDoList,
  loadToDoListError,
  loadToDoListSuccess,
  setFilterToDo,
  updateToDoList,
} from './todo.action';
import { ToDoEffect } from './todo.effect';
import { AppState } from './todo.state';

const initialState = {
  toDoList: [],
  error: null,
  miscellaneous: {
    filter: {
      title: '',
    },
  },
};

const mockTodo: ToDoInterface[] = [
  {
    id: 1,
    title: 'test',
    description: 'test',
    date: '2022-02-02',
  },
];

class MockTodoService {
  getToDoList() {
    return of(mockTodo);
  }
}

describe('ToDoEffect', () => {
  let actions$: Observable<any>;
  let effects: ToDoEffect;
  let store: MockStore<AppState>;
  let httpService: ToDoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ToDoEffect,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: ToDoListService, useClass: MockTodoService },
        ToastMessageService,
      ],
    });

    effects = TestBed.inject(ToDoEffect);
    store = TestBed.inject(MockStore);
    httpService = TestBed.inject(ToDoListService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  // Testing API interaction
  describe('onGetTodos$', () => {
    it('should get todos', (done) => {
      const spy = spyOn(httpService, 'getToDoList').and.callThrough();
      actions$ = of(loadToDoList);
      effects.loadToDoList$.subscribe((res) => {
        expect(res).toEqual(loadToDoListSuccess({ toDoList: mockTodo }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
