export interface General<T> {
    status: 'success' | 'error';
    message: string;
    data?: T;
}

export interface Auth<T> {
    status: 'success' | 'error';
    message: string;
    token: string;
}

export interface QueryPageSize {
    page?: number;
    size?: number;
}

export interface TokenModel<T> {
    valid?: boolean
}

export interface DialogFormData {
    id:string|null;
    socialMediaUrl: string | null;
    socialMediaName: string | null;
    description: string | null;
  }
  