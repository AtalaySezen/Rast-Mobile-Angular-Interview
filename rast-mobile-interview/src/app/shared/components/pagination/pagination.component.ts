import { Component, inject } from '@angular/core';
import { HomeRepository } from '../../repositories/home.repository';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  homeRepository = inject(HomeRepository);

  rowValue: number = 4;
  itemsOptions: number[] = [4, 8];

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

  updateTableRows(): void {
    this.homeRepository.dataSize = this.rowValue;
    this.homeRepository.GetSocialMediaDatas();
  }

  increaseSize() {
    const currentIndex = this.itemsOptions.indexOf(this.rowValue);
    if (currentIndex < this.itemsOptions.length - 1) {
      this.rowValue = this.itemsOptions[currentIndex + 1];
      this.updateTableRows();
    }
  }

  decreaseSize() {
    const currentIndex = this.itemsOptions.indexOf(this.rowValue);
    if (currentIndex > 0) {
      this.rowValue = this.itemsOptions[currentIndex - 1];
      this.updateTableRows();
    }
  }

}
