import { NgModule } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ToDoListService } from './services/todo.service';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListHeaderComponent } from './components/todo-list-header/todo-list-header.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodoValidationErrorComponent } from 'src/app/shared/components/todo-validation-error/todo-validation-error.component';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoAddComponent,
    TodoItemComponent,
    TodoListHeaderComponent,
    TodoValidationErrorComponent,
    TodoFormComponent,
  ],
  imports: [SharedModule],
  exports: [
    TodoListComponent,
    TodoAddComponent,
    TodoItemComponent,
    TodoValidationErrorComponent,
  ],
  providers: [ToDoListService],
})
export class TodoModule {}
