import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoButtonComponent } from './components/todo-button/todo-button.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoModalComponent } from './components/todo-modal/todo-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodoButtonComponent, TodoCardComponent, TodoModalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    TodoButtonComponent,
    TodoCardComponent,
    TodoModalComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
