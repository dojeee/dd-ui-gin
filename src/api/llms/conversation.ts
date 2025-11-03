import { apiService } from "@/utils/request";
import { ApiResponse } from "@/types/api";
import { MessagesType } from "@/types/llms";
export const getConversationByUserIdApi = (
  userId: string
): Promise<ApiResponse> => {
  return apiService.post("/llms/conversation/getByUserId", { userId });
};

export const renameConversationApi = (
  conversationId: string,
  title: string
): Promise<ApiResponse> => {
  return apiService.post("/llms/conversation/updateTitle", {
    conversationId,
    title,
  });
};


export const deleteConversationApi = (conversationId: string): Promise<ApiResponse> => {
  return apiService.post("/llms/conversation/deleteById", { conversationId });
};

export const getConversationMessagesApi = (conversationId: string): Promise<ApiResponse<MessagesType[]>> => {
  return apiService.post("/llms/message/getByConversationId", { conversationId });
};