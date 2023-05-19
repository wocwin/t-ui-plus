# 查询条件组件

---

### 基础用法

::: demo
TQueryCondition/base
:::

### 收起&展开——默认展开

::: demo 通过设置`isExpansion`
TQueryCondition/isExpansion
:::

### Tsx 用法

::: demo
TQueryCondition/labelRender
:::

### 输入框插槽使用用法

::: demo
TQueryCondition/slotName
:::

### 结合 TSelect 使用

::: demo
TQueryCondition/TSelectUse
:::

### 按钮操作使用

::: demo
TQueryCondition/querybar
:::

### TQueryCondition 参数配置

---

#### 1、代码示例

```html
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

#### 2、配置参数（Attributes）

| 参数        | 说明                                      | 类型    | 默认值  |
| :---------- | :---------------------------------------- | :------ | :------ |
| opts        | 接收筛选器组件配置                        | object  | 无      |
| loading     | 查询按钮 loading 状态，请求数据时需要体现 | Boolean | false   |
| reset       | 是否显示“重置”按钮                        | Boolean | true    |
| boolEnter   | 是否敲回车查询                            | Boolean | true    |
| isShowOpen  | 是否显示收起和展开                        | Boolean | true    |
| isExpansion | 是否默认展开                              | Boolean | false   |
| labelWidth  | labelWidth 宽度                           | String  | '110px' |

#### 3、opts Attributes

| 参数        | 说明                                                                             | 类型             | 默认值 |
| :---------- | :------------------------------------------------------------------------------- | :--------------- | :----- |
| label       | 表单字段说明标题                                                                 | string           | -      |
| className   | 自定义 class                                                                     | string           | -      |
| placeholder | placeholder 提示语                                                               | string           | -      |
| labelRender | 自定义 label（render 函数 jsx 方式编写）                                         | function         | -      |
| slotName    | 自定义输入框插槽(作用域插槽解构接收{param}返回当前所有表单初始值)                | string           | -      |
| comp        | 组件名称，可直接指定全局注册的组件，也可引入'elmentUI'如：Button 或者'el-button' | string,component | -      |
| span        | 控件占用的列宽，默认占用 1 列，最多 4 列 (独占一行)                              | number           | 1      |
| defaultVal  | 默认值                                                                           | -                | -      |

#### 4、事件（events）

| 事件名      | 说明                     | 返回值                                        |
| :---------- | :----------------------- | :-------------------------------------------- |
| handleEvent | 筛选器数据发生变化时触发 | event 标识, val：输入值,form:整个查询条件数据 |
| submit      | 点击筛选器查询按钮时触发 | form:整个查询条件数据                         |
| reset       | 点击筛选器重置按钮时触发 | -                                             |

#### 5、Slots

| 插槽名   | 说明                             |
| :------- | :------------------------------- |
| querybar | 按钮操作插槽（位置基于重置后面） |
