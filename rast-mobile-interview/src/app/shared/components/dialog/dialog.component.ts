import { Component, inject } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogFormData } from '../../models/generals.model';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  dialogService = inject(DialogService);
  dataID: string = '';
  originalFormData: DialogFormData = {
    id: '',
    socialMediaUrl: '',
    socialMediaName: '',
    description: ''
  };

  dialogForm = new FormGroup({
    id: new FormControl(''),
    socialMediaUrl: new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
    socialMediaName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });


  ngOnInit() {
    if (this.dialogService.dialogData) {
      this.dialogForm.patchValue(this.dialogService.dialogData);
      this.originalFormData = this.dialogForm.getRawValue(); //Burada form başlangıç değerleri saklanır.
    }
  }

  //#region Verileri kaydetmeden önce kontrol et eğer değişiklik var ise put isteği gönder yok ise devam et.
  saveDialog() {
    const updatedFormData = this.dialogForm.getRawValue();
    let id = this.dialogForm.get('id')?.value;
    this.dataID = updatedFormData.id ?? ''; 

    let url = this.dialogForm.get('socialMediaUrl')?.value;
    let name = this.dialogForm.get('socialMediaName')?.value;
    let description = this.dialogForm.get('description')?.value;

    const data = {
      url: updatedFormData.socialMediaUrl || 'selam',
      name: updatedFormData.socialMediaName || 'selam',
      description: updatedFormData.description || 'selam'
    };


    if (JSON.stringify(this.originalFormData) === JSON.stringify(updatedFormData)) {
      console.log("Verilerde değişiklik yok api isteği atılmayacak");
      this.closeDialog();
    } else {
      console.log(id, data)
      this.dialogService.UpdateSocialMedia(this.dataID, data).subscribe(data => {
        console.log(data);
      })
      console.log("Veriler değişti.", id, url, name, description);
    }

  }
  //#endregion

  closeDialog() {
    this.dialogForm.reset();
    this.dialogService.dialogIsOpen = false;
  }


}
