export interface SocialMediaModel {
    _id: string;
    name: string;
    url: string;
    description: string;
    createdAt: string;
}

export interface SocialMediaModelDialog {
    id?:string,
    name: string;
    url: string;
    description: string;
}

export interface SocialMediaData {
    socialMedia: SocialMediaModel[];
    totalPages: number;
    totalItemCount: number;
}
