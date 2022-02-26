import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-button',
  templateUrl: './todo-button.component.html',
  styleUrls: ['./todo-button.component.scss'],
})
export class TodoButtonComponent implements OnInit {
  @Input() clickEvent!: Function;
  @Input() text!: string;
  @Input() type!: string;
  @Input() disabled = false;

  constructor() {}

  ngOnInit(): void {}
}
