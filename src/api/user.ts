import request from '@/utils/request';

// 定义登录请求的参数类型
export interface LoginParams {
    phone: string;
    password: string;
}

// 定义登录响应的数据类型
export interface LoginResponse {
    code: number;
    message: string;
    data: {
        token: string;
        userInfo: {
            id: string;
            name: string;
            phone: string;
            avatar?: string;
        };
    };
}

// 登录 API 函数
export const loginApi = (params: LoginParams): Promise<LoginResponse> => {
    return request({
        url: '/user/login',
        method: 'post',
        data: params
    });
};

// 获取用户信息 API 函数
export const getUserInfoApi = (): Promise<any> => {
    return request({
        url: '/user/info',
        method: 'get'
    });
};

// 退出登录 API 函数
export const logoutApi = (): Promise<any> => {
    return request({
        url: '/user/logout',
        method: 'post'
    });
};