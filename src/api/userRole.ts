import { apiService } from "@/utils/request"




export const bindUserRoleApi = (data: any) => {
    return apiService.post('/userRole/bindUserRole', data);
};


export const unbindUserRoleApi = (data: any) => {
    return apiService.post('/userRole/unbindUserRole', data);
};

export const getUserRolesApi = (data: any) => {
    return apiService.post('/userRole/getUserRoles', data);
};