import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { HomeRepository } from '../../shared/repositories/home.repository';
import { CommonModule } from '@angular/common';
import { DialogComponent } from "../../shared/components/dialog/dialog.component";
import { DialogService } from '../../shared/services/dialog.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeaderComponent, CommonModule, DialogComponent]
})
export class HomeComponent {
    homeRepository = inject(HomeRepository);
    dialogService = inject(DialogService);

    ngOnInit() {
        this.getSocialMediaDatas();
    }

    getSocialMediaDatas() {
        this.homeRepository.GetSocialMediaDatas();
    }

    getSocialMediaWithID(id: string) {
        this.homeRepository.GetSocialMediaWithID(id);
    }

    deleteSocialMedia(id: string) {
        const confirmed = confirm('Silmek istediğinize emin misiniz?');
        if (confirmed) {
            this.homeRepository.DeleteSocialMediaData(id);
        }
    }

    openDialog() {
        this.dialogService.dialogIsOpen = true;
    }





}
