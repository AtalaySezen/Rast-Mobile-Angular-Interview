import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EditSocialMediaData } from '../models/generals.model';

@Injectable({
  providedIn: 'root'
})

export class DialogService {
  http = inject(HttpClient);
  dialogIsOpen: boolean = false;

  UpdateSocialMedia(id: string, data: EditSocialMediaData): Observable<EditSocialMediaData> {
    return this.http.post<EditSocialMediaData>(environment.apiUrl + `socialMedia/${id}`, data);
  }

}
