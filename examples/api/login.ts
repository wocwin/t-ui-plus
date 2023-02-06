import request from '@/utils/request'

// 登录方法
export function login(data: any) {
  sessionStorage.removeItem('systemName')
  return request({
    url: '/portal-sso/web/login',
    method: 'POST',
    headers: {
      "client-type": "PC"
    },
    data
  })
}

// 获取当前登录用户所有按钮权限
export const getPermBtm = () => {
  return request({
    url: '/portal-user/system/user/menuList'
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/portal-user/system/user/profile',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/portal-sso/web/logout',
    method: 'post'
  })
}
