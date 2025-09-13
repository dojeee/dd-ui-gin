export interface User {
    userId: number;
    userName: string;
    mobile: string;
    userState: 0 | 1; // 0: disabled, 1: enabled
    createTime: string;
    updateTime: string;
    createdBy: string;
    updatedBy: string;
  }
  
  export interface Pagination {
    current: number;
    pageSize: number;
    total: number;
  }
  
  // 查询参数接口
  export interface SearchParams {
    userName?: string;
    mobile?: string;
    userState?: 0 | 1 | "";
  }