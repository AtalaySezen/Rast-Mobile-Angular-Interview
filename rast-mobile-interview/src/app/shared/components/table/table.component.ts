import { Component, Input, OnChanges, SimpleChanges, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocialMediaModel } from '../../models/socialMedia.model';
import { DialogComponent } from '../dialog/dialog.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { Router } from '@angular/router';
import { HomeRepository } from '../../repositories/home.repository';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule, FormsModule, DialogComponent, PaginationComponent]
})
export class TableComponent implements OnChanges {
  @ViewChild(DialogComponent) dialogComponent!: DialogComponent;
  @Input() tableData: SocialMediaModel[] = [];
  HomeRepository = inject(HomeRepository);
  router = inject(Router);

  tableDataFilterArray: SocialMediaModel[] = [];
  dialogIsOpen: boolean = false;
  filterText: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData']) {
      this.tableDataFilterArray = this.tableData;
    }
  }

  applyFilter() {
    if (this.filterText.trim() !== "") {
      this.tableData = this.tableDataFilterArray.filter(item =>
        Object.values(item).some((val: any) => val.toString().toLowerCase().includes(this.filterText.toLowerCase()))
      );
    } else {
      this.tableData = [...this.tableDataFilterArray];
    }
  }

  addNewSocialMedia() {
    this.dialogComponent.dialogIsOpen = true;
  }

  editSocialMediaData(id: string) {
    this.router.navigate(['/edit', id]);
  }

  deleteSocialMediaData(id: string) {
    this.HomeRepository.DeleteSocialMediaData(id);
  }

}
