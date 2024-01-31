# 坐标选择器（引用高德地图资源）----咱不建议使用

```js
// 引入高德资源
<!-- 导入需要的包 （一定要放到index.html中的head标签里） -->
<!-- 高德地图api更新必须配合安全密钥使用 -->
window['_AMapSecurityConfig'] = {
  securityJsCode: 'xxxx',
}
<script type="text/javascript" src='https://webapi.amap.com/maps?v=2.0&key=xxxxxxxx&plugin=AMap.PlaceSearch,AMap.Geocoder,AMap.AutoComplete'></script>
<script src="https://webapi.amap.com/ui/1.1/main.js?v=1.0.11"></script>
```

### 基础用法

:::demo
TMap/base
:::

### form 中使用

:::demo
TMap/form-map
:::

### 禁用状态

:::demo
TMap/disabled
:::

### 配置参数（Attributes）

| 参数                  | 说明     | 类型                                            | 默认值      |
| :-------------------- | :------- | :---------------------------------------------- | :---------- |
| model-value / v-model | 绑定值   | `[]`/`[number,number]`/`[number,number,string]` | -           |
| size                  | 尺寸     | `'large' / 'default' / 'small' `                | `'default'` |
| disabled              | 禁用状态 | `boolean`                                       | `false`     |
| top                   | 弹窗 top | `string`                                        | `8vh`       |
| height                | 弹窗宽度 | `string`                                        | `75%`       |
| options               | 高德配置 | options 配置                                    | -           |

### options 配置

| 参数       | 说明       | 类型      | 默认值 |
| :--------- | :--------- | :-------- | :----- |
| zoom       | 缩放层级   | `number`  | `11`   |
| zoomEnable | 可缩放     | `boolean` | `true` |
| dragEnable | 可拖拽移动 | `boolean` | `true` |
