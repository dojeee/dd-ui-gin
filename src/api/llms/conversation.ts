import { apiService } from "@/utils/request";
import { ApiResponse } from "@/types/api";

export const getConversationByUserIdApi = (
  userId: string
): Promise<ApiResponse> => {
  return apiService.post("/llms/conversation/getByUserId", { userId });
};

export const renameConversationApi = (
  id: string,
  title: string
): Promise<ApiResponse> => {
  return apiService.post("/llms/conversation/updateTitle", {
    id,
    title,
  });
};
