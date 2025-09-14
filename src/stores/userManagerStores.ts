import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { queryUsersByPageApi } from "@/api/user";
import {
  message,
  TableColumnsType,
  TablePaginationConfig,
} from "ant-design-vue";
import { User, Pagination, SearchParams } from "@/types/user";

export const useUserManagerStores = defineStore("userManager", () => {
  // State
  const userList = ref<User[]>([]);
  const loading = ref(false);
  const pagination = reactive<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: (total) => `Total ${total} items`,
    pageSizeOptions: ["10", "20", "50", "100"],
  });

  const columns = ref<TableColumnsType>([
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      align: "center",
      width: 20,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      align: "center",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Status",
      dataIndex: "userState",
      key: "userState",
      align: "center",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
      customRender: ({ text: userState }: { text: 0 | 1 }) =>
        userState === 1 ? "✅ Enabled" : "❌ Disabled",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      align: "center",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
      align: "center",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Create Time",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
      width: 130,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Update Time",
      dataIndex: "updateTime",
      key: "updateTime",
      align: "center",
      width: 130,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 140,
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
