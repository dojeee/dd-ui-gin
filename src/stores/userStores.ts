import { defineStore } from "pinia";
import { loginApi, logoutApi, sendVerificationCodeApi } from "@/api/auth";
import { getUserApi } from "@/api/user";
import { message } from "ant-design-vue";
import router from "@/routers/index";
import { LoginParams } from "@/types/auth";

// 定义用户信息类型
export interface UserInfo {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: null as null | UserInfo,
    token: localStorage.getItem("token") || "",
    loading: false,
  }),

  getters: {
    // 判断用户是否已登录
    isLogin(): boolean {
      return !!this.token;
    },
  },

  actions: {
    // 登录 action
    async login(loginParams: LoginParams) {
      try {
        this.loading = true;

        // 调用登录 API
        const response = await loginApi(loginParams);

        // 保存 token 和用户信息
        this.token = response.data;

        // 将 token 保存到 localStorage，实现持久化
        localStorage.setItem("token", this.token);

        // 显示成功消息
        message.success("ནང་འཛུལ་ལེགས་གྲུབ་བྱུང་།"); // 登录成功

        // 跳转到首页或其他页面
        router.push("/");

        return response;
      } catch (error: any) {
      } finally {
        this.loading = false;
      }
    },

    async sendVerificationCode(mobile: string) {
      try {
        await sendVerificationCodeApi(mobile);
      } catch (error) {
        console.error("发送验证码失败:", error);
        throw error;
      }
    },

    // 退出登录 action
    async logout() {
      try {
        // 调用退出登录 API（可选）
        await logoutApi();
      } catch (error) {
        console.error("退出登录 API 调用失败:", error);
      } finally {
        // 清除本地状态
        this.token = "";
        this.userInfo = null;

        // 清除 localStorage
        localStorage.removeItem("token");

        // 跳转到登录页
        router.push("/login");

        message.success("ཕྱིར་ལོག་ལེགས་གྲུབ་བྱུང་།"); // 退出成功
      }
    },

    // 获取用户信息 action
    async fetchUserInfo() {
      try {
        const response = await getUserApi(this.token);
        this.userInfo = response.data;
        return response;
      } catch (error) {
        console.error("获取用户信息失败:", error);
        // 如果获取用户信息失败，可能是 token 过期，执行退出登录
        this.logout();
        throw error;
      }
    },

    // 设置用户信息
    setUser(user: UserInfo) {
      this.userInfo = user;
    },
  },
});
