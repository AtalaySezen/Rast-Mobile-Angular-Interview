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
