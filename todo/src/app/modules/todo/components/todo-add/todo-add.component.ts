import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/todo.state';
import { ToDoForm, ToDoInterface } from '../../models';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
})
export class TodoAddComponent {
  constructor(private store: Store<AppState>) {}
  title = 'todo';
  toDoListId!: number;
  showModal = true;
  singleToDoList$!: Observable<ToDoInterface>;
  type!: string;
  showConfirmationModal = false;
  @Output() triggerClose = new EventEmitter<boolean>();
  @Output() triggerSubmit = new EventEmitter<ToDoInterface>();

  toDoForm: ToDoForm = { valid: false };

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onValueChange(data: ToDoForm) {
    this.toDoForm = data;
  }

  onSubmit() {
    if (this.toDoForm.valid) {
      this.triggerSubmit.emit(this.toDoForm.formData);
    }
  }

  closeModal() {
    this.triggerClose.emit();
  }
}
