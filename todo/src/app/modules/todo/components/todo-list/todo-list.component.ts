import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { deleteToDoList, loadToDoList } from '../../store/todo.action';

import { selectAllToDoList } from '../../store/todo.selector';
import { AppState } from '../../store/todo.state';
import { ToDoInterface, ToDoListByDate } from '../../models';
import { getDateDiffInDays } from 'src/app/shared/utils';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  toDoListId!: number;
  toDoList$!: Observable<ToDoInterface[]>;
  showConfirmationModal = false;
  showModal = false;
  currentToDoDeleteItem: ToDoInterface | null = null;
  todoItemsByDate: ToDoListByDate = {
    past: [],
    today: [],
    tomorrow: [],
    future: [],
  };
  @Output() triggerDelete = new EventEmitter<boolean>();
  subscription!: Subscription;

  constructor(private store: Store<AppState>) {
    this.toDoList$ = this.store.select(selectAllToDoList);
  }

  ngOnInit(): void {
    this.fetchToDoList();
    this.subscription = this.toDoList$.subscribe((todos) => {
      this.todoItemsByDate = {
        past: [],
        today: [],
        tomorrow: [],
        future: [],
      };
      for (const todo of todos) {
        const currDate = new Date();
        const category = this.dateCompare(
          new Date(
            Date.UTC(
              currDate.getFullYear(),
              currDate.getMonth(),
              currDate.getDate()
            )
          ),
          new Date(todo.date)
        );
        this.todoItemsByDate[category].push(todo);
      }
    });
  }

  fetchToDoList() {
    this.store.dispatch(loadToDoList());
  }

  toggleConfirmationModal() {
    this.showConfirmationModal = !this.showConfirmationModal;
  }

  dateCompare(currentDate: Date, todoDueDate: Date) {
    const currentTime = currentDate.getTime();
    const todoTime = todoDueDate.getTime();

    if (currentTime > todoTime) {
      return 'past';
    } else if (currentTime === todoTime) {
      return 'today';
    } else {
      const diffDays = getDateDiffInDays(currentTime, todoTime);
      if (diffDays === 1) {
        return 'tomorrow';
      } else {
        return 'future';
      }
    }
  }

  deleteToDoListItem(toDoItem: ToDoInterface) {
    this.currentToDoDeleteItem = toDoItem;
    this.toggleConfirmationModal();
  }

  deleteConfirmTodoItem() {
    if (this.currentToDoDeleteItem?.id) {
      this.store.dispatch(
        deleteToDoList({ id: this.currentToDoDeleteItem.id })
      );
      this.toggleConfirmationModal();
      this.currentToDoDeleteItem = null;
    }
  }

  closeModal() {
    this.toggleConfirmationModal();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
