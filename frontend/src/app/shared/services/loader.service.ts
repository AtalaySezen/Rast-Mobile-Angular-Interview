import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loading: boolean = false;

  setLoading(loading: boolean, url?: string) {
    if (loading) {
      //Eğer tokenIsValid'e http isteği yapılır ise loadingi göstermez.
      if (url?.includes('tokenIsValid')) {
        this.loading = false;
      } else {
        this.loading = loading;
      }
    } else {
      this.loading = loading;
    }
  }

  getLoading(): boolean {
    return this.loading;
  }

}


