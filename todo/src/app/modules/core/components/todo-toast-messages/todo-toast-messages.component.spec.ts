import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoToastMessagesComponent } from './todo-toast-messages.component';

describe('TodoToastMessagesComponent', () => {
  let component: TodoToastMessagesComponent;
  let fixture: ComponentFixture<TodoToastMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoToastMessagesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoToastMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
