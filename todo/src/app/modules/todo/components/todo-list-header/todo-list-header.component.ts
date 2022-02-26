import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToDoList,
  loadToDoList,
  setFilterToDo,
} from '../../store/todo.action';
import { AppState } from '../../store/todo.state';
import { ToDoInterface } from '../../models';

type clearTarget = EventTarget | { value: string } | null;

@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.scss'],
})
export class TodoListHeaderComponent implements OnInit {
  showModal = false;
  title: string = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  showAddModal(event: Event) {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submit(event: ToDoInterface) {
    this.store.dispatch(addToDoList({ toDoList: event }));
    this.showModal = false;
  }

  filterByTitle(target: clearTarget) {
    this.store.dispatch(
      setFilterToDo({
        filter: { title: (target as HTMLInputElement).value },
      })
    );
  }

  clearFilter() {
    this.title = '';
    this.filterByTitle({
      value: '',
    });
  }
}
