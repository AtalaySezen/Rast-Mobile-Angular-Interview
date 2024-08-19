import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { HomeRepository } from '../../shared/repositories/home.repository';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableComponent } from "../../shared/components/table/table.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeaderComponent, CommonModule, TableComponent]
})
export class HomeComponent {
    homeRepository = inject(HomeRepository);
    router = inject(Router);

    ngOnInit() {
        this.homeRepository.GetSocialMediaDatas();
    }

}
