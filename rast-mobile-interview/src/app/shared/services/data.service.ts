import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Auth, General, QueryPageSize } from '../models/generals.model';
import { AuthData } from '../models/auth.model';
import { environment } from '../../../environments/environment';
import { SocialMediaData, SocialMediaModel } from '../models/socialMedia.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  http = inject(HttpClient);

  Login(email: string, password: string): Observable<Auth<AuthData>> {
    return this.http.post<Auth<AuthData>>(environment.apiUrl + 'auth/login',
      {
        email: email,
        password: password
      }
    )
  }

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



}
