import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ToastType, ToastrService } from "../services/toastr.service";
import { Auth } from "../models/generals.model";
import { environment } from "../../../environments/environment";
import { AuthData } from "../models/auth.model";

@Injectable({
    providedIn: 'root'
})

export class AuthRepository {
    authLocalStorageToken = `${environment.appVersion}-${environment.APP_KEY}`;
    router = inject(Router);
    authService = inject(AuthService);
    toastrService = inject(ToastrService);

    rememberMeChecked: boolean = false;
    loading: boolean = false;

    async AuthGuardRepo(): Promise<boolean> {
        if (this.token != '') {
            this.CheckTokenIsValid();
            return true;
        } else {
            await this.LogOut();
            return await false;
        }
    }


    Login(email: string, password: string) {
        this.loading = true;
        this.authService.Login(email, password).subscribe({
            next: (data) => {
                if (data.status === 'success') {
                    if (this.rememberMeChecked) {
                        this.SetLocalStorageToken(data);
                    } else {
                        this.SetSessionStorageToken(data);
                    }
                    this.toastrService.show(data.message, ToastType.Success);
                    this.router.navigate(['/home']);
                } else {
                    this.toastrService.show(data.message, ToastType.Error);
                }
            },
            error: (err) => {
                this.loading = false;
                console.error('Hata:', err);
                if (err.error && err.error.message) {
                    this.toastrService.show(err.error.message, ToastType.Error);
                } else {
                    this.toastrService.show('Bir hata oluştu!', ToastType.Error);
                }
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    CheckTokenIsValid() {
        this.authService.TokenIsValid().subscribe({
            next: async (data) => {
                if (data.valid == true) {
                    return true;
                } else {
                    await this.LogOut();
                    return false;
                }
            }, error: (err) => {
                this.LogOut();
                console.error(err);
            },
        });
    }

    checkUserToken() {
        if (this.token != '') {
            this.router.navigate(['home']);
        }
    }

    LogOut() {
        localStorage.removeItem(`${this.authLocalStorageToken}`);
        sessionStorage.removeItem(`${this.authLocalStorageToken}`);
        this.router.navigate(['/login']);
    }

    //#region kullanıcının bilgilerini beni hatırla seçili ise localstorage'a kayıt eder.
    SetLocalStorageToken(user: Auth<AuthData>) {
        return localStorage.setItem(`${this.authLocalStorageToken}`, user.token);
    }
    //#endregion

    //#region kullanıcının bilgilerini beni hatırla seçili değil ise sessionStorage'a kayıt yapar.
    SetSessionStorageToken(user: Auth<AuthData>) {
        return sessionStorage.setItem(`${this.authLocalStorageToken}`, user.token);
    }
    //#endregion

    //#region kullanıcın token bilgisini storage'dan alır
    get token() {
        if (localStorage.getItem(`${this.authLocalStorageToken}`) != null) {
            return localStorage.getItem(`${this.authLocalStorageToken}`) || '';
        } if (sessionStorage.getItem(`${this.authLocalStorageToken}`) != null) {
            return sessionStorage.getItem(`${this.authLocalStorageToken}`) || '';
        } else {
            return '';
        }
    }
    //#endregion

    //#region Register Account
    Register(email: string, password: string) {
        this.loading = true;
        this.authService.Register(email, password).subscribe({
            next: (data) => {
                console.log(data);
                if (data.status === 'success') {
                    this.toastrService.show(data.message, ToastType.Success);
                    this.router.navigate(['/home']);
                } else {
                    this.toastrService.show(data.message, ToastType.Error);
                }
            },
            error: (err) => {
                this.loading = false;
                if (err.error && err.error.message) {
                    this.toastrService.show(err.error.message, ToastType.Error);
                } else {
                    this.toastrService.show('Bir hata oluştu!', ToastType.Error);
                }
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
    //#endregion


}