// 登录请求参数
export interface LoginParams {
    mobile: string;    // 匹配后端接口
    password: string;
}

// 登录响应数据
export interface LoginResponse {
    token: string;
    // 根据你的后端实际响应结构调整
    user?: {
        id: string;
        name: string;
        mobile: string;
        avatar?: string;
    };
}