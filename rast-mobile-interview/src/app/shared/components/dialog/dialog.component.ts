import { Component, inject } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  dialogService = inject(DialogService);

  dialogForm = new FormGroup({
    socialMediaUrl: new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
    socialMediaName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
  });


  saveDialog() {
    console.log(this.dialogForm);
  }

  closeDialog() {
    this.dialogService.dialogIsOpen = false;
  }


}
