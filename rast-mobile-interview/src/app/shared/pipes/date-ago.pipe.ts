import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  standalone: true
})

export class DateAgoPipe implements PipeTransform {
  transform(value: Date | string | null): string {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) //eğer 30 saniyeden az işe şimdi yazar
        return 'Şimdi';
      const intervals: { [key: string]: number } = {
        'yıl': 31536000,
        'ay': 2592000,
        'hafta': 604800,
        'gün': 86400,
        'saat': 3600,
        'dakika': 60,
        'saniye': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          return counter + ' ' + i + ' ' + 'önce';
      }
    }
    return 'Geçersiz tarih'; //hatalı tarih durumunda
  }
}