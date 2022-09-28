import axios from 'axios'
import Message from '@/utils/message'
import { ElMessageBox } from 'element-plus'
import { getToken } from '@/utils/cookies'
import store from '@/store'
export default (config: any) => {
  // 创建axios实例
  const service: any = axios.create({
    baseURL: process.env.VUE_APP_API_URL as string,
    // 超时
    timeout: 50000
  })

  // 请求拦截器
  service.interceptors.request.use(
    (config: any) => {
      config.headers['Authorization'] = getToken() || store.getters.token || ''
      config.headers['Content-Type'] =
        config.headers['Content-Type'] || 'application/json'
      // 8080
      if (config.type == 'file') {
        config.headers['content-type'] = 'application/multipart/form-data'
      } else if (config.type == 'form') {
        config.headers['Content-type'] = 'application/x-www-form-urlencoded'
      }
      if (config.method && config.method.toLowerCase() === 'get') {
        config.data = true
      }
      return config
    },
    (error: any) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  service.interceptors.response.use(
    (response: any) => {
      const code = response.data.code
      if (code === 401) {
        ElMessageBox.confirm(
          '登录状态已过期，您可以继续留在该页面，或者重新登录',
          '系统提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut')
          window.location.href = window.__POWERED_BY_QIANKUN__
            ? '/'
            : '/webdemo'
        })
      } else if (code !== 200) {
        Message({
          message: response.data.msg,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject('error')
      } else {
        return response.data
      }
    },
    (error: any) => {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )
  return service(config)
}
