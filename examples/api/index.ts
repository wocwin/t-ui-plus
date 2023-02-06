import request from '@/utils/request'

import * as masterData from './mes/masterData' // 主数据接口


// 数据字典-查询 公共api
export const getDicts = (dictType: any) => { return request({ url: `/system/dict/data/type/${dictType}`, method: 'GET' }) }
export default {
  getDicts,
  ...masterData
}

