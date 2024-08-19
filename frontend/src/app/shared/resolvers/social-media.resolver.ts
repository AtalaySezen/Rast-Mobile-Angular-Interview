import { Observable, catchError, of } from 'rxjs';
import { DataService } from '../services/data.service';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { ToastType, ToastrService } from '../services/toastr.service';

@Injectable({
  providedIn: 'root',
})
export class socialMediaResolver implements Resolve<any> {
  dataService = inject(DataService);
  toastrService = inject(ToastrService);
  router = inject(Router);

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.dataService.GetSocialMediaWithID(route.paramMap.get('id')!).pipe(
      catchError((error) => {
        console.log(error)
        this.toastrService.show('Hata Oluştu', ToastType.Error);
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }

}