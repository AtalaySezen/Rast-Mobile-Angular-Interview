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

  rowValue: number = 0;
  itemsOptions: number[] = [];

  ngOnInit() {
    this.checkItemOptions();
  }

  //#region Burada dinamik şekilde show rows alanı güncellenir. Eğer 4'den az veri var ise kullanıcıya sadece "all rows" gösterilir. 
  //4'den fazla olunca 4 seçeneği, 8'den fazla ise 8 gösterilir.
  checkItemOptions() {
    this.itemsOptions = [4, 8].filter(option => option <= Number(this.homeRepository.totalItemCount));
    this.rowValue = this.homeRepository.totalItemCount >= 4 ? 4 : this.itemsOptions[0] || 0;
  }
  //#endregion

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
