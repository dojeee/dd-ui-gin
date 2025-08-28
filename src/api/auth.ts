import { authService } from '@/utils/request';
import type { LoginParams, LoginResponse } from '@/types/auth';
import { ApiResponse } from '@/types/api';

// 登录接口
export const loginApi = (params: LoginParams): Promise<ApiResponse> => {
    return authService.post('/login2', params);
};

// 退出登录接口（如果后端有的话）
export const logoutApi = () => {
    return authService.post('/logout');
};

export const sendVerificationCodeApi = (mobile: string): Promise<ApiResponse> => {
    return authService.post('/sendVerificationCode', { mobile });
};