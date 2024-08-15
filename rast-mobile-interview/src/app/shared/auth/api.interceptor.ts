import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthRepository } from '../repositories/auth.repository';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
    const authRepo = inject(AuthRepository);
    const authLocalStorageToken = authRepo.authLocalStorageToken;

    //#region istek atılan url auth/login ya da auth/register içeriyor mu kontrol eder, içermiyorsa eğer token'i alır. 
    if (!request.url.includes('auth/login') && !request.url.includes('auth/register')) {
        const token = localStorage.getItem(`${authLocalStorageToken}`) || sessionStorage.getItem(`${authLocalStorageToken}`) || '';
        if (token) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }
    } else {
        if (!/^(http|https):/i.test(request.url)) {
            request = request.clone({
                url: environment.apiUrl + request.url,
            });
        }
    }
    //#endregion

    return next(request).pipe(
        catchError((err: HttpErrorResponse) => {
            //Eğer kullanıcı authenticated olmamışsa çıkış yap.
            if (err.status === 401 || err.status === 0) {
                authRepo.LogOut();
            } else {
                console.error('HTTP Error:', err.message);
            }
            return new Observable<HttpEvent<any>>(observer => {
                observer.error(err);
                observer.complete();
            });
        })
    );
};
