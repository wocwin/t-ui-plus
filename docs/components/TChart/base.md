# Chart 图表

基于 Echarts 二次封装的, 集成初始化 echarts、事件、销毁，详情配置，请参考 echarts 官方

### 前提概要

需要引入 echarts 资源

```js
npm install echarts
```

并在 main 文件中注册使用

```js
import * as echarts from 'echarts' // 引入echarts
app.config.globalProperties.$echarts = echarts // 全局使用
```

### 折线图

:::demo 折线图
TChart/line
:::

### 柱状图

:::demo
TChart/bar
:::

### 饼图

:::demo
TChart/pie
:::

### 雷达图

:::demo
TChart/radar
:::

### 2、配置参数

| 参数   | 说明                        | 类型   | 默认值 |
| :----- | :-------------------------- | :----- | :----- |
| option | echarts 配置                | object | -      |
| id     | 容器 ref 值，默认六位随机数 | string | -      |

### 3、事件（events）集成 echarts 的事件

| 事件名 | 说明              | 回调参数        |
| :----- | :---------------- | :-------------- |
| chart  | 返回的 chart 实例 | 返回 chart 实例 |
