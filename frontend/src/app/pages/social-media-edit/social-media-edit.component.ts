import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { DataService } from '../../shared/services/data.service';
import { EditRepository } from '../../shared/repositories/edit.repository';
import { EditSocialMediaData } from '../../shared/models/socialMedia.model';

@Component({
  selector: 'app-social-media-edit',
  standalone: true,
  templateUrl: './social-media-edit.component.html',
  styleUrls: ['./social-media-edit.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})

export class SocialMediaEditComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  dataService = inject(DataService);
  editRepository = inject(EditRepository);
  router = inject(Router);

  socialMediaId: string = '';
  originalFormData: EditSocialMediaData = { url: '', name: '', description: '' };
  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  editForm = new FormGroup({
    url: new FormControl('', [Validators.required, Validators.pattern(this.urlRegex)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.setFormData(data.socialMediaEdit.data);
      this.socialMediaId = data.socialMediaEdit.data._id;
    });
  }

  //#region Bu fonksiyon formgroup'u gelen verileri doldurma amacıyla kullanılır.
  setFormData(socialMediaData: EditSocialMediaData) {
    if (socialMediaData) {
      this.editForm.patchValue({
        url: socialMediaData.url,
        name: socialMediaData.name,
        description: socialMediaData.description
      });

      this.originalFormData = {
        url: socialMediaData.url,
        name: socialMediaData.name,
        description: socialMediaData.description
      };
    }
  }
  //#endregion

  saveSocialMedia() {
    if (this.editForm.valid) {
      const updatedFormData = this.editForm.getRawValue();

      const data: EditSocialMediaData = {
        url: updatedFormData.url ?? '',
        name: updatedFormData.name ?? '',
        description: updatedFormData.description ?? ''
      };

      const hasChanges = this.checkDataValueChanges(data);

      if (hasChanges) {
        console.log("Veriler güncellendi.");
        this.editRepository.UpdateSocialMedia(this.socialMediaId, data);
      } else {
        console.log("Herhangi bir değişiklik yapılmadı.");
        this.closePage();
      }
    }
  }

  //Burada form üzerinde değişiklik yapıldı mı kontrol edilir yapılmış ise put isteği gönderilir.
  checkDataValueChanges(updatedFormData: EditSocialMediaData) {
    if (JSON.stringify(this.originalFormData) == JSON.stringify(updatedFormData)) {
      return false;
    } else {
      this.editRepository.UpdateSocialMedia(this.socialMediaId, updatedFormData);
      return true;
    }
  }

  closePage() {
    if (this.editForm.dirty) {
      const confirmClose = window.confirm('Kaydedilmemiş değişiklikler var. Sayfayı kapatmak istediğinize emin misiniz?');
      if (!confirmClose) {
        return;
      }
    }
    this.router.navigate(['/home']);
    this.editForm.reset();
  }

}
