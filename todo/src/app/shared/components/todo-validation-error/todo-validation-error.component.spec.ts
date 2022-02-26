import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoValidationErrorComponent } from './todo-validation-error.component';

describe('TodoValidationErrorComponent', () => {
  let component: TodoValidationErrorComponent;
  let fixture: ComponentFixture<TodoValidationErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoValidationErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoValidationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
