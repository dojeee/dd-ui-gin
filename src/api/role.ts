import { apiService } from "@/utils/request";

import type { ApiResponse } from "@/types/api";
import { RolePageSearchParams } from "@/types/role";

export const queryRolesByPageApi = (
  params: RolePageSearchParams
): Promise<ApiResponse> => {
  return apiService.post("/role/queryByPage", params);
};
