import request from '@/utils/request'

// 工厂物料清单管理列表
export function materialList(params: any) {
  return request({
    url: '/base/material/list',
    method: 'get',
    params
  })
}