import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VisitedUrl } from '../../models/generals.model';
import { DateAgoPipe } from '../../pipes/date-ago.pipe';

@Component({
  selector: 'app-visited-links',
  standalone: true,
  imports: [CommonModule, DateAgoPipe],
  templateUrl: './visited-links.component.html',
  styleUrl: './visited-links.component.scss'
})
export class VisitedLinksComponent {
  userVisitedUrls: VisitedUrl[] = [];
  showVisitedLinks: boolean = false;
  accordionOpen: boolean = true;
  showMaximumLinks: number = 5;
  totalLinksCount: number = 0;

  ngOnInit() {
    this.loadVisitedUrls();
  }

  loadVisitedUrls() {
    const storedData = localStorage.getItem('visitedSocialMediaUrls');
    if (storedData) {
      this.userVisitedUrls = JSON.parse(storedData) as VisitedUrl[];
      this.totalLinksCount = this.userVisitedUrls.length;
    }
  }

  toggleVisitedLinks() {
    this.loadVisitedUrls();
    this.showVisitedLinks = !this.showVisitedLinks;
  }

  closeVisitedLinks() {
    this.accordionOpen = false;
  }

  showMore() {
    this.showMaximumLinks = this.totalLinksCount;
  }

  showLess() {
    this.showMaximumLinks = 5;
  }

}
