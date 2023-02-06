import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/portal-user/getRouters',
    method: 'get',
    params: {
      menuId: 901
    }
  })
}
// 获取子应用父级path
export const getRouterPrefix = () => {
  return request({
    url: '/portal-user/system/menu/router-prefix',
    method: 'get',
    params: {
      menuId: 901
    }
  })
}

