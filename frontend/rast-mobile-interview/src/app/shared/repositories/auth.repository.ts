import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthRepository {
    router = inject(Router);
    authService = inject(AuthService);


    Login() {

    }



}