import { Injectable, inject } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class socialMediaResolver implements Resolve<any> {
  dataService = inject(DataService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.dataService.GetSocialMediaWithID((route.paramMap.get('id')!));
  }
  
}

