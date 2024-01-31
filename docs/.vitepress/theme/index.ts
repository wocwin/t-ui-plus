import DefaultTheme from 'vitepress/theme'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts' // 引入echarts

import { VPDemo } from '../vitepress'
// 基于element-plus二次封装基础组件
import TuiPlus from '../../../packages'
import '../../public/css/index.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.config.globalProperties.$echarts = echarts // 全局使用
    // 注册ElementPlus
    ctx.app.use(ElementPlus, {
      locale, // 语言设置
    })
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      ctx.app.component(key, component)
    }
    // 全局注册基础组件
    ctx.app.use(TuiPlus)

    ctx.app.component('Demo', VPDemo)

    try {
      // 引入高德资源
      window['_AMapSecurityConfig'] = {
        securityJsCode: '9d5543a8fdd49c93803180581cdc7317', //测试使用
      }
      let script = document.createElement('script')
      script.src =
        'https://webapi.amap.com/maps?v=2.0&key=b1ec3562e5d1704fc54c1612455b02b3&plugin=AMap.Scale,AMap.HawkEye,AMap.ToolBar,AMap.ControlBar,AMap.PlaceSearch,AMap.DistrictSearch,AMap.HeatMap,AMap.3DTilesLayer,AMap.IndoorMap,AMap.MoveAnimation,AMap.ElasticMarker,AMap.MarkerCluster,AMap.IndexCluster,AMap.MouseTool,AMap.BezierCurveEditor,AMap.RectangleEditor,AMap.CircleEditor,AMap.EllipseEditor,AMap.GeoJSON,AMap.PolylineEditor,AMap.PolygonEditor,AMap.AutoComplete,AMap.Driving,AMap.Walking,AMap.Riding,AMap.Transfer,AMap.Geocoder,AMap.GraspRoad,AMap.StationSearch,AMap.LineSearch,AMap.ArrivalRange,AMap.CitySearch,AMap.Geolocation,AMap.Weather,AMap.RangingTool'
      // 将 <script> 元素添加到页面的 <head> 或 <body> 标签内部
      document.getElementsByTagName('head')[0].appendChild(script) // 放在头部

      let uiScript = document.createElement('script')
      script.src = 'https://webapi.amap.com/ui/1.1/main.js?v=1.0.11'
      // 将 <script> 元素添加到页面的 <head> 或 <body> 标签内部
      document.getElementsByTagName('head')[0].appendChild(script) // 放在头部
      document.getElementsByTagName('head')[0].appendChild(uiScript) // 放在头部
    } catch (error) {
      console.log('高德地图加载error', error)
    }
  },
}
