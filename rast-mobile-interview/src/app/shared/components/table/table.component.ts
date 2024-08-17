import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeRepository } from '../../repositories/home.repository';
import { SocialMediaModel } from '../../models/socialMedia.model';
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [CommonModule, FormsModule, DialogComponent]
})

export class TableComponent {
  @Input() tableData: SocialMediaModel[] = [];
  @ViewChild(DialogComponent) dialogComponent!: DialogComponent;
  homeRepository = inject(HomeRepository);

  dialogIsOpen: boolean = false;
  filterText: string = '';
  columns: { key: string, header: string }[] = [{ key: 'name', header: 'Sosyal Medya Adı' }, { key: 'url', header: 'Sosyal Medya Linki' }, { key: 'description', header: 'Açıklama' }];
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableData'] || changes['columns']) {
      console.log(this.tableData, this.columns);
    }
  }

  addNewSocialMedia() {
    this.dialogComponent.dialogIsOpen = true;
  }

}
