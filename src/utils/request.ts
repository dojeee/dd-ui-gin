import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { message } from "ant-design-vue";

const baseURL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:8080";
const apiPrefix = import.meta.env.VITE_APP_API_PREFIX || "/api/v1";
const authPrefix = import.meta.env.VITE_APP_AUTH_PREFIX || "/auth";

// 1. 认证接口实例 (带 /auth 前缀) - 用于 /login, /register 等
export const authService: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

// 2. 业务接口实例 (带 /api/v1 前缀) - 用于 /users, /userRole 等
export const apiService: AxiosInstance = axios.create({
  baseURL: baseURL + apiPrefix,
  timeout: 10000,
});

// 为两个实例都添加请求拦截器
const setupRequestInterceptor = (service: AxiosInstance) => {
  service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 自动添加 token 到请求头
      const token = localStorage.getItem("token");
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
      const res = response.data;

      // 根据你的后端响应格式判断成功状态
      const successCodes = [0, 200, 20000]; // 添加你的成功状态码

      if (successCodes.includes(res.code)) {
        // 成功情况：返回完整响应数据
        return res;
      } else {
        // 业务逻辑错误：显示后端返回的 msg
        const errorMessage = res.msg || res.message || "请求失败";
        message.error(errorMessage);

        // 创建一个包含错误信息的 Error 对象，使用类型断言
        const error = new Error(errorMessage) as Error & {
          code?: number;
          response?: AxiosResponse;
        };
        error.code = res.code;
        error.response = response;

        return Promise.reject(error);
      }
    },
    (error) => {
      console.error("API request error:", error);

      // HTTP 状态码错误处理
      if (error.response) {
        const { status, data } = error.response;

        // 先尝试从响应数据中提取错误信息
        let errorMessage = "";
        if (data && data.msg) {
          errorMessage = data.msg;
        } else if (data && data.message) {
          errorMessage = data.message;
        } else {
          // 根据 HTTP 状态码设置默认错误信息
          switch (status) {
            case 401:
              errorMessage = "未授权，请重新登录";
              localStorage.removeItem("token");
              break;
            case 403:
              errorMessage = "权限不足";
              break;
            case 404:
              errorMessage = "请求的资源不存在";
              break;
            case 500:
              errorMessage = "服务器内部错误";
              break;
            default:
              errorMessage = `请求失败 (${status})`;
          }
        }
        message.error(errorMessage);
      } else if (error.request) {
        // 网络错误
        console.error("Network error:", error.request);
      } else {
        // 其他错误
        message.error(error.message);[]
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
