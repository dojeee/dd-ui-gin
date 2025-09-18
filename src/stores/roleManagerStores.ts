import { defineStore } from "pinia";

import { ref, reactive } from "vue";
import { RoleManagerPageSearchParams } from "@/types/role";
import { TableColumnsType } from "ant-design-vue";
import { Role } from "@/types/role";
export const useRoleManagerStores = defineStore("roleManager", () => {
  const searchParams = reactive<RoleManagerPageSearchParams>({
    roleId: "",
    roleName: "",
    status: "" as 0 | 1 | "",
  });

  const columns = ref<TableColumnsType>([
    {
      title: "Role ID",
      dataIndex: "roleId",
      key: "roleId",
      align: "center",
      width: 90,
      minWidth: 90,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
      align: "center",
      width: 150,
      minWidth: 150,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Role Code",
      dataIndex: "roleCode",
      key: "roleCode",
      align: "center",
      width: 150,
      minWidth: 150,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Role Type",
      dataIndex: "roleType",
      key: "roleType",
      align: "center",
      width: 100,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 100,
      minWidth: 100,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      align: "center",
      width: 150,
      minWidth: 150,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
      align: "center",
      width: 150,
      minWidth: 150,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Create Time",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
      width: 150,
      minWidth: 150,
      maxWidth: 200,
      resizable: true,
    },
    {
      title: "Update Time",
      dataIndex: "updateTime",
      key: "updateTime",
      align: "center",
      width: 150,
      minWidth: 150,
      maxWidth: 200,
      resizable: true,
    },
  ]);

  const roleList = ref<Role[]>([]);

  return {
    searchParams,
    columns,
    roleList,
  };
});
