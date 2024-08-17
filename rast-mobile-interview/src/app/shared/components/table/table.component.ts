import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocialMediaModel } from '../../models/socialMedia.model';
import { DialogComponent } from "../dialog/dialog.component";
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [CommonModule, FormsModule, DialogComponent, PaginationComponent]
})
export class TableComponent {
  @Input() tableData: SocialMediaModel[] = [];
  @ViewChild(DialogComponent) dialogComponent!: DialogComponent;

  itemsPerPageOptions: number[] = [4, 8, 12];
  dialogIsOpen: boolean = false;
  filterText: string = '';
  columns: { key: string, header: string }[] = [{ key: 'name', header: 'Sosyal Medya Adı' }, { key: 'url', header: 'Sosyal Medya Linki' }, { key: 'description', header: 'Açıklama' }];
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableData'] || changes['columns']) {
      // console.log(this.tableData, this.columns);
    }
  }

  addNewSocialMedia() {
    this.dialogComponent.dialogIsOpen = true;
  }



}
