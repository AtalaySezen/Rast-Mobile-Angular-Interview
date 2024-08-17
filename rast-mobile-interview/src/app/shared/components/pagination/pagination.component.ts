import { Component, inject } from '@angular/core';
import { HomeRepository } from '../../repositories/home.repository';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  homeRepository = inject(HomeRepository);

  ngOnDestroy() {
    this.homeRepository.currentPage = 1;
    this.homeRepository.dataSize = 4;
  }

  previousPage() {
    if (this.homeRepository.currentPage > 1) {
      this.homeRepository.currentPage--;
      this.homeRepository.GetSocialMediaDatas();
    }
  }

  nextPage() {
    if (this.homeRepository.currentPage < this.homeRepository.totalItemCount) {
      this.homeRepository.currentPage++;
      this.homeRepository.GetSocialMediaDatas();
    }
  }


}
