import { Component, Input, OnChanges, SimpleChanges, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocialMediaModel } from '../../models/socialMedia.model';
import { DialogComponent } from '../dialog/dialog.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { Router } from '@angular/router';
import { HomeRepository } from '../../repositories/home.repository';
import { TitlecasePipe } from '../../pipes/titlecase.pipe';
import { NotFoundMessageComponent } from "../not-found-message/not-found-message.component";
import { VisitedLinksComponent } from "../visited-links/visited-links.component";
import { VisitedUrl } from '../../models/generals.model';
import { TooltipDirective } from '../../directives/tooltip.directive';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule, FormsModule, DialogComponent, PaginationComponent, TitlecasePipe, NotFoundMessageComponent, VisitedLinksComponent, TooltipDirective]
})
export class TableComponent implements OnChanges {
  @ViewChild(DialogComponent) dialogComponent!: DialogComponent;
  @ViewChild(VisitedLinksComponent) visitedLinksComponent!: VisitedLinksComponent;
  @Input() tableData: SocialMediaModel[] = [];
  HomeRepository = inject(HomeRepository);
  router = inject(Router);

  noDataMessage: boolean = false;
  filteredTableData: SocialMediaModel[] = [];
  dialogIsOpen: boolean = false;
  filterText: string = '';
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData']) {
      this.filteredTableData = this.tableData;
      this.noDataMessage = this.tableData.length === 0;
    }
  }

  applyFilter() {
    if (this.filterText.trim() !== "") {
      this.tableData = this.filteredTableData.filter(item =>
        Object.values(item).some((val: any) => val.toString().toLowerCase().includes(this.filterText.toLowerCase()))
      );
    } else {
      this.tableData = [...this.filteredTableData];
    }
  }

  sortTable(field: string) {
    if (field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortDirection = 'asc';
      this.sortField = field;
    }

    this.tableData.sort((a, b) => {
      const valueA = (a[field as keyof SocialMediaModel] ?? '') as string;
      const valueB = (b[field as keyof SocialMediaModel] ?? '') as string;
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  //#region kullanıcı tabloda bulunan urlleri açmasını sağlar ve bu açılan linkleri açıldığı zaman ile localstorage'a kayıt eder.
  openSocialMediaUrl(id: string, url: string) {
    const urlData: VisitedUrl = {
      id: id,
      url: url,
      date: new Date().toISOString()
    };

    const storedUrls = JSON.parse(localStorage.getItem('visitedSocialMediaUrls') || '[]');
    const existingIndex = storedUrls.findIndex((item: { id: string }) => item.id === id);

    if (existingIndex === -1) {
      storedUrls.push(urlData);
    } else {
      storedUrls[existingIndex] = urlData;
    }

    localStorage.setItem('visitedSocialMediaUrls', JSON.stringify(storedUrls));
    this.visitedLinksComponent.loadVisitedUrls();
    //#region  Eğer kullanıcı urlyi https olmadan ekler ise otomatik olarak bu kod bloğu ekler.
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    //#endregion
    window.open(url);
  }
  //#endregion

  //#region Link daha önce ziyaret edilmiş mi kontrol eder. 
  isVisited(id: string): boolean {
    const storedUrls = JSON.parse(localStorage.getItem('visitedSocialMediaUrls') || '[]');
    return storedUrls.some((item: { id: string }) => item.id === id);
  }
  //#endregion

  addNewSocialMedia() {
    this.dialogComponent.dialogIsOpen = true;
  }

  editSocialMediaData(id: string) {
    this.router.navigate(['/edit', id]);
  }

  deleteSocialMediaData(id: string) {
    const isConfirmed = window.confirm('Silmek istediğinize emin misiniz?');
    if (isConfirmed) {
      this.HomeRepository.DeleteSocialMediaData(id);
    }
  }

}
