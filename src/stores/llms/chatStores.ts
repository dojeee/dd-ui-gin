import { getConversationByUserIdApi } from "@/api/llms/conversation";
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

  return { conversations, loading, fetchConversations };
});
