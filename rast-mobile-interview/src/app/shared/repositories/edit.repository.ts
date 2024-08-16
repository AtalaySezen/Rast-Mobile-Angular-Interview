import { Injectable, inject } from "@angular/core";
import { ToastType, ToastrService } from "../services/toastr.service";
import { DataService } from "../services/data.service";
import { Router } from "@angular/router";
import { EditSocialMediaData } from "../models/socialMedia.model";

@Injectable({
    providedIn: 'root'
})

export class EditRepository {
    DataService = inject(DataService);
    toastrService = inject(ToastrService);
    router = inject(Router);

    loading: boolean = false;

    UpdateSocialMedia(id: string, data: EditSocialMediaData) {
        this.loading = true
        this.DataService.UpdateSocialMedia(id, data).subscribe(data => {
            if (data.status == 'success') {
                this.toastrService.show(data.message, ToastType.Success);
                this.loading = false;
                this.router.navigate(['home']);
            } else {
                this.toastrService.show(data.message, ToastType.Error);
                this.loading = false;
            }
        });
    }

}
