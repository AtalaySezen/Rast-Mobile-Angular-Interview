import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Auth, General } from '../models/generals.model';
import { AuthData } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  Login(email: string, password: string): Observable<Auth<AuthData>> {
    return this.http.post<Auth<AuthData>>(environment.apiUrl + 'auth/login',
      {
        email: email,
        password: password
      }
    )
  }

  Register(email: string, password: string): Observable<General<AuthData>> {
    return this.http.post<General<AuthData>>(environment.apiUrl + 'auth/register',
      {
        email: email,
        password: password
      }
    )
  }

  TokenIsValid(): Observable<General<null>> {
    return this.http.post<General<null>>(environment.apiUrl + 'token/tokenIsValid', {});
  }



}

