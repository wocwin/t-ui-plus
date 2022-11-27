# 查询条件组件

---

## 基础用法

:::demo

TQueryCondition/Base

:::

## Tsx 用法

:::demo

TQueryCondition/Tsx

:::

## 输入框插槽使用用法

:::demo

TQueryCondition/SlotName

:::

## 结合 TSelect 使用

:::demo

TQueryCondition/TSelectUse

:::

## TQueryCondition 参数配置

### 代码示例

```vue
<t-query-condition
  :opts="opts"
  @submit="conditionEnter"
  @handleEvent="handleEvent"
  :loading="loading"
/>
<!-- opts:配置项
     @submit：点击查询按钮 返回最终数据
     @handleEvent：每个查询条件的event:string,输入的值
     loading：查询按钮loading -->
```

### 配置参数（Attributes）

| 参数       | 说明                                      | 类型    | 默认值  |
| :--------- | :---------------------------------------- | :------ | :------ |
| opts       | 接收筛选器组件配置                        | object  | 无      |
| loading    | 查询按钮 loading 状态，请求数据时需要体现 | Boolean | false   |
| reset      | 是否显示“重置”按钮                        | Boolean | true    |
| boolEnter  | 是否敲回车查询                            | Boolean | true    |
| labelWidth | labelWidth 宽度                           | String  | '110px' |

### opts Attributes

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| label | 表单字段说明标题 | string | - |
| className | 自定义 class | string | - |
| placeholder | placeholder 提示语 | string | - |
| labelRender | 自定义 label（render 函数 jsx 方式编写） | function | - |
| slotName | 自定义输入框插槽(作用域插槽解构接收{param}返回当前所有表单初始值) | string | - |
| comp | 组件名称，可直接指定全局注册的组件，也可引入'elmentUI'如：Button 或者'el-button' | string,component | - |
| span | 控件占用的列宽，默认占用 1 列，最多 4 列 (独占一行) | number | 1 |
| defaultVal | 默认值 | - | - |

### 事件（events）

| 事件名 | 说明 | 返回值 |
| :-- | :-- | :-- |
| handleEvent | 筛选器数据发生变化时触发 | event 标识, val：输入值,form:整个查询条件数据 |
| submit | 点击筛选器查询按钮时触发 | form:整个查询条件数据 |
| reset | 点击筛选器重置按钮时触发 | - |
