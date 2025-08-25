import { authService } from '@/utils/request';
import type { LoginParams, LoginResponse } from '@/types/auth';

// 登录接口
export const loginApi = (params: LoginParams): Promise<LoginResponse> => {
    return authService.post('/login', params);
};

// 退出登录接口（如果后端有的话）
export const logoutApi = () => {
    return authService.post('/logout');
};