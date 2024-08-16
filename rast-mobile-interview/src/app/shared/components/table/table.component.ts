import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeRepository } from '../../repositories/home.repository';
import { SocialMediaModel } from '../../models/socialMedia.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() tableData: SocialMediaModel[] = [];
  homeRepository = inject(HomeRepository);
  columns: { key: string, header: string }[] = [{ key: 'name', header: 'Sosyal Medya Adı' }, { key: 'url', header: 'Sosyal Medya Linki' }, { key: 'description', header: 'Açıklama' }];

  filterText: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableData'] || changes['columns']) {
      console.log(this.tableData, this.columns);
    }
  }

}
