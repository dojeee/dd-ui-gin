import { apiService } from "@/utils/request";
import type { ApiResponse } from "@/types/api";
// 用户管理接口
export const createUserApi = (userData: any) => {
  return apiService.post("/users", userData);
};

export const getUserApi = (id: string) => {
  return apiService.get(`/users/${id}`);
};

export const updateUserApi = (userData: any) => {
  return apiService.post("/users/update", userData);
};

export const deleteUserApi = (userData: any) => {
  return apiService.post("/users/delete", userData);
};

export const listUsersApi = () => {
  return apiService.get("/users");
};

export const queryUsersByPageApi = (params: any): Promise<ApiResponse> => {
  return apiService.post("/users/queryByPage", params);
};

export const deleteUserByIdApi = (userId: any): Promise<ApiResponse> => {
  return apiService.post("/users/delete", { userId: userId });
};