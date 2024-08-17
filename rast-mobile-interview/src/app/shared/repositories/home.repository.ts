import { Injectable, inject } from "@angular/core";
import { ToastType, ToastrService } from "../services/toastr.service";
import { DataService } from "../services/data.service";
import { PostSocialMediaData, SocialMediaData, SocialMediaModel } from "../models/socialMedia.model";
import { General } from "../models/generals.model";

@Injectable({
    providedIn: 'root'
})

export class HomeRepository {
    DataService = inject(DataService);
    toastrService = inject(ToastrService);

    socialMediasArray: SocialMediaModel[] = [];
    currentPage: number = 1;
    dataSize: number = 4;
    totalItemCount: number = 0;
    totalPageCount: number = 0;

    GetSocialMediaDatas() {
        this.DataService.GetSocialMediaPagination({ page: this.currentPage, size: this.dataSize }).subscribe({
            next: (data: General<SocialMediaData>) => {
                if (data.status === 'success' && data.data) {
                    this.socialMediasArray = data.data.socialMedia;
                    this.totalItemCount = data.data.totalItemCount;
                    this.totalPageCount = data.data.totalPages;
                } else {
                    this.toastrService.show(data.message, ToastType.Error);
                }
            },
            error: (err) => {
                console.error(err);
                this.toastrService.show(err.message, ToastType.Error);
            }
        });
    }

    GetSocialMediaWithID(id: string) {
        this.DataService.GetSocialMediaWithID(id).subscribe({
            next: (data: General<SocialMediaModel>) => {
                if (data.status === 'success' && data.data) {
                    console.log(data.data.name)
                } else {
                    this.toastrService.show(data.message, ToastType.Error);
                }
            },
            error: (err) => {
                console.error(err);
                this.toastrService.show(err.message, ToastType.Error);
            }
        });
    }

    DeleteSocialMediaData(id: string) {
        this.DataService.DeleteSocialMedia(id).subscribe({
            next: (data: General<SocialMediaModel>) => {
                if (data.status == 'success') {
                    this.toastrService.show(data.message, ToastType.Success);
                    this.GetSocialMediaDatas();
                } else {
                    this.toastrService.show(data.message, ToastType.Error);
                }
            },
            error: (err) => {
                console.error(err);
                this.toastrService.show(err.message, ToastType.Error);
            }
        })
    }

    PostSocialMediaData(data: PostSocialMediaData) {
        this.DataService.PostSocialMediaData(data).subscribe({
            next: (data: PostSocialMediaData) => {
                if (data.status == 'success') {
                    this.toastrService.show('Başarılı', ToastType.Success);
                    this.GetSocialMediaDatas();
                } else {
                    this.toastrService.show('Bir Hata Oluştu', ToastType.Error);
                }
            },
            error: (err) => {
                console.error(err);
                this.toastrService.show(err.message, ToastType.Error);
            }
        })
    }





}
