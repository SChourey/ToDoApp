import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastMessage } from '../../models';
import { ToastMessageService } from '../../services/toast-message.service';

@Component({
  selector: 'app-todo-toast-messages',
  templateUrl: './todo-toast-messages.component.html',
  styleUrls: ['./todo-toast-messages.component.scss'],
})
export class TodoToastMessagesComponent implements OnInit, OnDestroy {
  successToastMessage!: ToastMessage;
  errorToastMessage!: ToastMessage;
  showSuccessMessage = false;
  showErrorMessage = false;
  subscription!: Subscription;
  constructor(private toastService: ToastMessageService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.dataTransferSubject.subscribe(
      (toast) => {
        if (toast.type === 'success') {
          this.showSuccessMessage = true;
          this.successToastMessage = toast;

          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        }

        if (toast.type === 'error') {
           this.showErrorMessage = true;
          this.errorToastMessage = toast;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
