import { getConversationByUserIdApi, renameConversationApi, deleteConversationApi } from "@/api/llms/conversation";
import { message } from "ant-design-vue";
import { defineStore } from "pinia";
import { ref } from "vue";

interface Conversation {
  id: string;
  title: string;
}

export const useChatStores = defineStore("chat", () => {
  // state
  const loading = ref(false);
  const conversations = ref<Conversation[]>([]);
  const showHeader = ref(true);
  const renameTitle = ref("");
  const renameLoading = ref(false);
  const renameTargetId = ref<string | null>(null);
  // action
  async function fetchConversations(userId: string = "") {
    if (userId === "") {
      return;
    }

    loading.value = true;
    try {
      await getConversationByUserIdApi(userId).then((res) => {
        if (res.code === 200 && res.data) {
          const result = res.data;
          const mapped = result.map((item: { id: any; title: any }) => ({
            id: String(item.id),
            title: item.title,
          }));
          conversations.value = mapped;
        } else {
          message.error(res.msg || "Failed to fetch conversations list.");
        }
      });
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      loading.value = false;
    }
  }

  async function updateConversationTitle() {
    const title = renameTitle.value.trim();
    if (!title) {
      message.warning("Title cannot be empty");
      return;
    }

    const conversationId = renameTargetId.value;
    if (!conversationId) {
      message.error("Conversation not found");
      return;
    }

    renameLoading.value = true;

    try {
      const response = await renameConversationApi(conversationId, title);
      if (response.code === 200) {
        const target = conversations.value.find(
          (item) => item.id === conversationId
        );
        if (target) {
          target.title = title;
        }
        message.success("Conversation renamed successfully");
      } else {
        message.error(response.msg || "Failed to rename conversation");
      }
    } catch (error) {
      console.error("Failed to rename conversation", error);
      message.error("Failed to rename conversation");
    } finally {
      renameLoading.value = false;
    }
  }

  async function deleteConversation(conversationId: string) {
    
    if (!conversationId) {
      message.error("Conversation not found");
      return;
    }

    try {
      const response = await deleteConversationApi(conversationId)
      if (response.code === 200) {
        const target = conversations.value.find(
          (item) => item.id === conversationId
        );
        if (target) {
          conversations.value = conversations.value.filter(
            (item) => item.id !== conversationId
          );
        }
        message.success("Conversation deleted successfully");
      } else {
        message.error(response.msg || "Failed to delete conversation");
      }
    } catch (error) {
      console.error("Failed to delete conversation", error);
      message.error("Failed to rename conversation");
    } finally {
      renameLoading.value = false;
    }



  }
  return { conversations, 
    showHeader, loading, renameLoading,renameTargetId,
    renameTitle,
    fetchConversations,updateConversationTitle,deleteConversation};
});
