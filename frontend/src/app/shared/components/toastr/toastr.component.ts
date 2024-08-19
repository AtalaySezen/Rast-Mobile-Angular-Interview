import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ToastType, ToastrService, ToastMessage } from '../../services/toastr.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toastr',
  standalone: true,
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
  imports: [CommonModule],
  animations: [
    trigger('toastAnimation', [
      state('hidden', style({
        opacity: 0,
        visibility: 'hidden',
      })),
      state('visible', style({
        opacity: 1,
        visibility: 'visible',
      })),
      transition('hidden => visible', [
        animate('150ms ease-in')
      ]),
      transition('visible => hidden', [
        animate('150ms ease-out')
      ]),
    ]),
  ]
})
export class ToastrComponent implements OnInit, OnDestroy {
  toastrService = inject(ToastrService);

  toastType: ToastType = ToastType.Success;
  toastMessage: string = '';
  showsToast: boolean = false;
  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.subscription = this.toastrService.toastState.subscribe((toast: ToastMessage | null) => {
      if (toast) {
        this.toastMessage = toast.message;
        this.toastType = toast.type;
        this.showsToast = true;
      } else {
        this.showsToast = false;
      }
    });
  }

  closeToast() {
    this.showsToast = false;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}