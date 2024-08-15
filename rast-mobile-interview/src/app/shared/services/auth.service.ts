import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Auth, General, TokenModel } from '../models/generals.model';
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

  TokenIsValid(): Observable<TokenModel<null>> {
    return this.http.post<TokenModel<null>>(environment.apiUrl + 'token/tokenIsValid', {});
  }


}

