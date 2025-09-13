import { defineStore } from "pinia";

export const useUserManagerStores = defineStore("userManager", () => {
  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    
  ];

  return {
    tableColumns,
  };
});
