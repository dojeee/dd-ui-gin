import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { message } from 'ant-design-vue';

// 创建 Axios 实例
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API || '/api', // .env 文件中配置的 API 基础路径
    timeout: 10000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 从 localStorage 直接获取 token，避免在模块初始化时调用 store
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

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data;
        // 假设 200 是成功的状态码，根据你的后端接口调整
        if (res.code !== 200) {
            message.error(res.message || 'Error');
            return Promise.reject(new Error(res.message || 'Error'));
        }
        return res;
    },
    (error) => {
        console.error('err' + error); // for debug
        message.error(error.message);
        return Promise.reject(error);
    }
);

export default service;