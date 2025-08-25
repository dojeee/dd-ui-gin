import { apiService } from '@/utils/request';

// 用户管理接口
export const createUserApi = (userData: any) => {
    return apiService.post('/users', userData);
};

export const getUserApi = (id: string) => {
    return apiService.get(`/users/${id}`);
};

export const updateUserApi = (userData: any) => {
    return apiService.post('/users/update', userData);
};

export const deleteUserApi = (userData: any) => {
    return apiService.post('/users/delete', userData);
};

export const listUsersApi = () => {
    return apiService.get('/users');
};

export const queryUsersByPageApi = (params: any) => {
    return apiService.post('/users/queryByPage', params);
};