import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodoToastMessagesComponent } from './components/todo-toast-messages/todo-toast-messages.component';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [HeaderComponent, TodoToastMessagesComponent],
  imports: [SharedModule],
  providers: [],
  exports: [HeaderComponent, TodoToastMessagesComponent],
})
export class CoreModule {}
