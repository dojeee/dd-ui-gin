import request from '@/utils/request'
import type { User } from '@/types'

// 登录
export const login = (data: { phone: string; password: string }) => {
  return request.post('/auth/login', data)
}

// 获取用户信息
export const getUserInfo = (id: string) => {
  return request.get<User>(`/users/${id}`) // 泛型支持类型提示
}

// 更新用户
export const updateUser = (id: string, data: Partial<User>) => {
  return request.put(`/users/${id}`, data)
}

export * from './user'
export * from './product'
export * from './order'