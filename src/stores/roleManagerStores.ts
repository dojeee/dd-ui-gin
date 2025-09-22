import { defineStore } from "pinia";

import { ref, reactive } from "vue";
import { RolePageSearchParams } from "@/types/role";
import { TableColumnsType, TablePaginationConfig } from "ant-design-vue";
import { Role } from "@/types/role";
import { queryRolesByPageApi } from "@/api/role";
import { message } from "ant-design-vue";

//store
export const useRoleManagerStores = defineStore("roleManager", () => {
  // state
  const searchParams = reactive<RolePageSearchParams>({
    roleId: "",
    roleName: "",
    state: "" as 0 | 1 | "",
  });

  const columns = ref<TableColumnsType>([
    {
      title: "Role ID",
      dataIndex: "roleId",
      key: "roleId",
      align: "center",
      width: 90,
      resizable: true,
      fixed: "left",
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
      align: "center",
      width: 130,
      resizable: true,
    },
    {
      title: "Role Code",
      dataIndex: "roleCode",
      key: "roleCode",
      align: "center",
      width: 130,
      resizable: true,
    },
    {
      title: "Role Type",
      dataIndex: "roleType",
      key: "roleType",
      align: "center",
      width: 40,
      resizable: true,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      align: "center",
      width: 100,
      resizable: true,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      align: "center",
      width: 150,
      resizable: true,
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
      align: "center",
      width: 150,
      resizable: true,
    },
    {
      title: "Create Time",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
      width: 200,
      resizable: true,
    },
    {
      title: "Update Time",
      dataIndex: "updateTime",
      key: "updateTime",
      align: "center",
      width: 200,
      resizable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 300,
      resizable: true,
      fixed: "right",
    },
  ]);

  const roleList = ref<Role[]>([]);

  const loading = ref(false);
  const pagination = reactive<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: (total) => `Total ${total} items`,
    pageSizeOptions: ["10", "20", "50", "100"],
  });

  // actions
  function setPage(page: number, size?: number) {
    pagination.current = page;
    if (size) {
      pagination.pageSize = size;
    }
    fetchRoles(searchParams);
  }

  async function fetchRoles(searchParams: RolePageSearchParams = {}) {
    loading.value = true;
    try {
      const rawParams: Record<string, any> = {
        pageNumber: pagination.current,
        pageSize: pagination.pageSize,
        ...searchParams,
      };

      const requestParams = Object.entries(rawParams).reduce(
        (acc, [key, value]) => {
          if (value !== "" && value !== null && value !== undefined) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, any>
      );

      const response = await queryRolesByPageApi(requestParams);
      if (response.code === 200 && response.data) {
        const result = response.data;
        roleList.value = result.items;
        pagination.total = result.total;
      } else {
        message.error(response.msg || "Failed to fetch role list.");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      loading.value = false;
    }
  }
  return {
    //State
    searchParams,
    columns,
    roleList,
    loading,
    pagination,
    // Actions
    setPage,
    fetchRoles,
  };
});
