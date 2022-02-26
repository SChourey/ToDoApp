import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateToDoList } from '../../store/todo.action';
import { AppState } from '../../store/todo.state';
import { ToDoForm, ToDoInterface } from '../../models';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() toDoItem!: ToDoInterface;
  editData!: ToDoInterface;
  type: 'View' | 'Edit' = 'View';
  @Output() triggerDelete = new EventEmitter<ToDoInterface>();
  toDoForm!: ToDoForm;

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.editData = { ...this.toDoItem };
  }

  dispatchDelete() {
    this.triggerDelete.emit();
  }

  updateTodo(todoItem: ToDoInterface) {
    if (this.toDoForm.formData) {
      this.store$.dispatch(
        updateToDoList({ toDoList: { ...this.toDoForm.formData, id: todoItem.id } })
      );
      this.type = 'View';
    }
  }

  startEdit() {
    this.type = 'Edit';
  }

  stopEdit() {
    this.type = 'View';
  }

  onValueChange(data: ToDoForm) {
    this.toDoForm = data;
  }
}
