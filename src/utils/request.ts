import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { message } from 'ant-design-vue';


const baseURL = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';
const apiPrefix = import.meta.env.VITE_APP_API_PREFIX || '/api/v1';
const authPrefix = import.meta.env.VITE_APP_AUTH_PREFIX || '/auth';


// 1. 认证接口实例 (带 /auth 前缀) - 用于 /login, /register 等
export const authService: AxiosInstance = axios.create({
    baseURL: baseURL + authPrefix,
    timeout: 10000
});

// 2. 业务接口实例 (带 /api/v1 前缀) - 用于 /users, /userRole 等
export const apiService: AxiosInstance = axios.create({
    baseURL: baseURL + apiPrefix,
    timeout: 10000
});

// 为两个实例都添加请求拦截器
const setupRequestInterceptor = (service: AxiosInstance) => {
    service.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // 自动添加 token 到请求头
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};


// 为两个实例都添加响应拦截器
const setupResponseInterceptor = (service: AxiosInstance) => {
    service.interceptors.response.use(
        (response: AxiosResponse) => {
            // 直接返回响应数据，让具体的 API 函数处理数据结构
            return response.data;
        },
        (error) => {
            console.error('API 请求错误:', error);
            
            // 统一错误处理
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 401:
                        message.error('未授权，请重新登录');
                        localStorage.removeItem('token');
                        // 可以在这里跳转到登录页
                        break;
                    case 403:
                        message.error('权限不足');
                        break;
                    case 500:
                        message.error('服务器错误');
                        break;
                    default:
                        message.error(data?.message || '请求失败');
                }
            } else {
                message.error('网络错误，请检查网络连接');
            }
            
            return Promise.reject(error);
        }
    );
};

// 应用拦截器
setupRequestInterceptor(authService);
setupRequestInterceptor(apiService);
setupResponseInterceptor(authService);
setupResponseInterceptor(apiService);

// 默认导出认证服务（保持向后兼容）
export default authService;