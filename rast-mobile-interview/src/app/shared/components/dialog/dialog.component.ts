import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostSocialMediaData } from '../../models/socialMedia.model';
import { HomeRepository } from '../../repositories/home.repository';
import { ToastType, ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Output() closeEvent = new EventEmitter<void>();
  homeRepository = inject(HomeRepository);
  toastrService = inject(ToastrService);

  dataID: string = '';
  dialogIsOpen: boolean = false;
  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  dialogForm = new FormGroup({
    url: new FormControl('', [Validators.required, Validators.pattern(this.urlRegex)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  closeDialog() {
    this.dialogIsOpen = false;
    this.dialogForm.reset();
  }

  saveDialog() {
    if (this.dialogForm.invalid) {
      this.toastrService.show('Eksik Alanlar Var', ToastType.Warning);
      return;
    }

    const formData = this.dialogForm.getRawValue();
    const data: PostSocialMediaData = {
      url: formData.url ?? '',
      name: formData.name ?? '',
      description: formData.description ?? ''
    };

    if (this.dialogForm.valid) {
      this.homeRepository.PostSocialMediaData(data);
      this.closeDialog();
    }
  }



}
