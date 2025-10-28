import { apiService, authService } from "@/utils/request";
import type { LoginParams, LoginResponse } from "@/types/auth";
import { ApiResponse } from "@/types/api";

export const getConversationByUserIdApi = (
  userId: string
): Promise<ApiResponse> => {
  return apiService.post("/llms/conversation/getByUserId", { userId });
};
