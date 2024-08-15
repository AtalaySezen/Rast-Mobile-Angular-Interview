import { Injectable, inject } from '@angular/core';
import { DialogFormData } from '../models/generals.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SocialMediaModelDialog } from '../models/socialMedia.model';

@Injectable({
  providedIn: 'root'
})

export class DialogService {
  http = inject(HttpClient);
  dialogIsOpen: boolean = false;
  dialogData: DialogFormData = { id: '', socialMediaUrl: '', socialMediaName: '', description: '' };

  UpdateSocialMedia(id: string, data: SocialMediaModelDialog): Observable<SocialMediaModelDialog> {
    return this.http.put<SocialMediaModelDialog>(environment.apiUrl + `socialMedia/${id}`, data);
  }


}
