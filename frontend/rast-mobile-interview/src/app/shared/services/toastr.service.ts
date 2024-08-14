import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ToastrService {
    private toastSubject = new Subject<ToastMessage | null>();
    toastState: Observable<ToastMessage | null> = this.toastSubject.asObservable();

    show(message: string, type: ToastType, duration: number = 5000) {
        this.toastSubject.next({ message, type });
        of(null)
            .pipe(delay(duration))
            .subscribe(() => this.toastSubject.next(null));
    }
}

export interface ToastMessage {
    message: string;
    type: ToastType;
}

export enum ToastType {
    Success = 'success',
    Warning = 'warning',
    Error = 'error'
}