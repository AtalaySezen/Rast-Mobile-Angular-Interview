import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ToastType, ToastrService } from "../services/toastr.service";
import { General } from "../models/generals.model";
import { environment } from "../../../environments/environment";
import { AuthData } from "../models/auth.model";

@Injectable({
    providedIn: 'root'
})

export class AuthRepository {
    public authLocalStorageToken = `${environment.appVersion}-${environment.APP_KEY}`;
    router = inject(Router);
    authService = inject(AuthService);
    toastrService = inject(ToastrService);

    rememberMeChecked: boolean = false;
    loading: boolean = false;


    Login(email: string, password: string) {
        this.loading = true;
      
    }

 
}