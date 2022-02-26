import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastMessage } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  public dataTransferSubject = new Subject<ToastMessage>();
  constructor() {}

  success(toast: ToastMessage) {
    this.dataTransferSubject.next({ ...toast, type: 'success' });
  }

  error(toast: ToastMessage) {
    this.dataTransferSubject.next({ ...toast, type: 'error' });
  }
}
