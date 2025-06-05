import { utoa } from './utils'
const MAIN_FILE_NAME = 'App.vue'

// 导出一个函数，用于获取编码后的playground
  // 解码source
export const getPlaygroundEncoded = (source: string) => {
  const code = decodeURIComponent(source)
  const originCode = {
    [MAIN_FILE_NAME]: code
  }
  const encoded = utoa(JSON.stringify(originCode))
  return encoded
}
