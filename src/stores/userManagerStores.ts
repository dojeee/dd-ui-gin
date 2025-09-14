import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { queryUsersByPageApi } from "@/api/user";
import { message, TableColumnsType } from "ant-design-vue";
import { User, Pagination, SearchParams } from "@/types/user";

export const useUserManagerStores = defineStore("userManager", () => {
  // State
  const userList = ref<User[]>([]);
  const loading = ref(false);
  const pagination = reactive<Pagination>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const columns = ref<TableColumnsType>([
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Status",
      dataIndex: "userState",
      key: "userState",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
      customRender: ({ text: userState }: { text: 0 | 1 }) =>
        userState === 1 ? "✅ Enabled" : "❌ Disabled",
    },
    {
      title: "Create Time",
      dataIndex: "createTime",
      key: "createTime",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Update Time",
      dataIndex: "updateTime",
      key: "updateTime",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
    },
  ]);

  // Actions
  async function fetchUsers(searchParams: SearchParams = {}) {
    loading.value = true;
    try {
      const rawParams: Record<string, any> = {
        pageNumber: pagination.current,
        pageSize: pagination.pageSize,
        ...searchParams,
      };

      // 清理空参数，确保只发送有效值
      const requestParams = Object.entries(rawParams).reduce(
        (acc, [key, value]) => {
          if (value !== "" && value !== null && value !== undefined) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, any>
      );

      const response = await queryUsersByPageApi(requestParams);
      if (response.code === 200 && response.data) {
        const result = response.data;
        userList.value = result.items;
        pagination.total = result.total;
        pagination.current = result.pageNumber;
        pagination.pageSize = result.pageSize;
      } else {
        message.error(response.msg || "Failed to fetch user list.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("An error occurred while fetching the user list.");
    } finally {
      loading.value = false;
    }
  }

  function setPage(page: number, size?: number) {
    pagination.current = page;
    if (size) {
      pagination.pageSize = size;
    }
    fetchUsers(); // Fetch data for the new page
  }

  return {
    // State
    userList,
    pagination,
    columns,
    loading,

    // Actions
    fetchUsers,
    setPage,
  };
});
