// 通用响应格式
export interface ApiResponse<T = any> {
    code?: number;
    message?: string;
    data?: T;
}

// 通用分页参数
export interface PageParams {
    page: number;
    size: number;
}