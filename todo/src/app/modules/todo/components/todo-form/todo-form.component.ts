import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { getDateInStandardFormat } from 'src/app/shared/utils';
import { ToDoForm, ToDoInterface } from '../../models';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit, OnDestroy {
  @Input() todoData: ToDoInterface = {
    title: '',
    description: '',
    date: '',
  };
  @Output() formStatus = new EventEmitter<ToDoForm>();
  toDoListForm!: FormGroup;
  subscription!: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const { title, description, date } = this.todoData;
    this.toDoListForm = this.fb.group({
      title: [title, Validators.required],
      description: [description, Validators.required],
      date: [date, Validators.required],
    });

    this.subscription = this.toDoListForm.valueChanges.subscribe(() => {
      this.formStatus.emit({
        valid: !this.toDoListForm.invalid,
        formData: this.toDoListForm.value,
      });
    });
  }

  isFieldValid(field: string) {
    return !!(
      !this.toDoListForm?.get(field)?.valid &&
      this.toDoListForm?.get(field)?.touched
    );
  }

  get getCurrentDate() {
    return getDateInStandardFormat(new Date());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
