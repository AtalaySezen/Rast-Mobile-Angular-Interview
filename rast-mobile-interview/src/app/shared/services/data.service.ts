import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { General, QueryPageSize } from '../models/generals.model';
import { environment } from '../../../environments/environment';
import { EditSocialMediaData, SocialMediaData, SocialMediaModel, SocialMediaModelEdit } from '../models/socialMedia.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  http = inject(HttpClient);

  GetSocialMedias(): Observable<General<SocialMediaData>> {
    return this.http.get<General<SocialMediaData>>(environment.apiUrl + 'socialMedia');
  }

  GetSocialMediaWithID(socialMediaID: string): Observable<General<SocialMediaModel>> {
    if (socialMediaID) {
      return this.http.get<General<SocialMediaModel>>(environment.apiUrl + `socialMedia/${socialMediaID}`);
    } else {
      return this.http.get<General<SocialMediaModel>>(environment.apiUrl + `socialMedia/`);
    }
  }

  GetSocialMediaPagination(parameters: QueryPageSize = { page: 1, size: 12 }) {
    return this.http.get<General<SocialMediaData>>(environment.apiUrl + `socialMedia/?page=${parameters.page}&limit=${parameters.size}`);
  }

  DeleteSocialMedia(id: string) {
    return this.http.delete<General<SocialMediaModel>>(environment.apiUrl + `socialMedia/${id}`);
  }

  UpdateSocialMedia(id: string, data: EditSocialMediaData): Observable<General<SocialMediaModelEdit>> {
    return this.http.put<General<SocialMediaModelEdit>>(environment.apiUrl + `socialMedia/${id}`, data);
  }

}
