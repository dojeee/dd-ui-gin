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
export interface RoleManagerPageSearchParams {
  roleId?: string;
  roleName?: string;
  status?: 0 | 1 | "";
}
