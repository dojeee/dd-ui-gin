export interface Role {
  roleId: string;
  roleName: string;
  roleCode: string;
  roleSort: number;
  roleType: number;
  systemId: number;
  remark: string;
  createBy: string;
  updateBy: string;
  createTime: string;
  updateTime: string;
}
export interface RolePageSearchParams {
  roleId?: string;
  roleName?: string;
  roleCode?: string;
  state?: 0 | 1 | "";
}
