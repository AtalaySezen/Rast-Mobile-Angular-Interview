//Bu model dosyası genel api isteklerinde kullanılır.

export interface General<T> {
    status: 'success' | 'error';
    message: string;
    data?: T;
}

export interface QueryPageSize {
    page?: number;
    size?: number;
}

