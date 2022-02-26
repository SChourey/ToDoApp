import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-validation-error',
  templateUrl: './todo-validation-error.component.html',
  styleUrls: ['./todo-validation-error.component.scss'],
})
export class TodoValidationErrorComponent implements OnInit {
  @Input() errorMessage!: string;
  @Input() displayError!: boolean;
  @Input() editValidationError!: boolean;
  constructor() {}

  ngOnInit(): void {}
}
