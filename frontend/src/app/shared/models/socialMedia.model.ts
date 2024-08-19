export interface SocialMediaModel {
    _id: string;
    name: string;
    url: string;
    description: string;
    createdAt: string;
    [key: string]: string | undefined;
}

export interface SocialMediaModelEdit {
    id?: string;
    name: string;
    url: string;
    description: string;
}

export interface SocialMediaData {
    socialMedia: SocialMediaModel[];
    totalPages: number;
    totalItemCount: number;
}

export interface EditSocialMediaData {
    id?: string;
    name: string;
    url: string;
    description: string;
    status?: 'success' | 'error';
    message?: '';
}

export interface PostSocialMediaData {
    url: string;
    name: string;
    description: string;
    status?:string;
    message?:string
    
}