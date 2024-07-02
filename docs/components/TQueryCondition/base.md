# TQueryCondition 查询条件组件

---

### 基础用法

::: demo

TQueryCondition/base

:::

### 收起&展开——默认展开

::: demo 通过设置`isExpansion`
TQueryCondition/isExpansion
:::

### 设置折叠时默认显示几行

::: demo 通过设置`maxVisibleRows`来设置折叠时默认显示几行，默认为 1
TQueryCondition/maxVisibleSpans
:::

### Tsx 用法

::: demo
TQueryCondition/labelRender
:::

### 输入框插槽使用用法

::: demo
TQueryCondition/slotName
:::

### 联动使用(使用第三方组件事件)

::: demo
TQueryCondition/eventHandle
:::

### 结合自己封装组件使用

::: demo
TQueryCondition/TSelectUse
:::

### 按钮操作使用

::: demo
TQueryCondition/querybar
:::

### 自定义按钮

::: demo 设置`footerBtn`插槽，可以自定义按钮,设置`:footer=null`,不展示按钮
TQueryCondition/footer
:::

### 每行展示多少项

::: demo 开启`isShowWidthSize`；设置`widthSize`值最小值 2，默认 4;不开启`isShowWidthSize`，则根据`width > 768 && width < 1280`展示 3 项，`width <= 768`展示 2 项(width=window.innerWidth)
TQueryCondition/widthSize
:::

### 动态增减查询条件项

::: demo
TQueryCondition/dynamic
:::

### TQueryCondition 参数配置

---

### 1、代码示例

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

### 2、配置参数（Attributes）

| 参数               | 说明                                      | 类型    | 默认值                                         |
| :----------------- | :---------------------------------------- | :------ | :--------------------------------------------- |
| opts               | 接收筛选器组件配置                        | object  | 无                                             |
| loading            | 查询按钮 loading 状态，请求数据时需要体现 | Boolean | false                                          |
| reset              | 是否显示“重置”按钮                        | Boolean | true                                           |
| maxVisibleRows     | 收起时设置默认展示行数                    | Number  | 1                                              |
| boolEnter          | 是否敲回车查询                            | Boolean | true                                           |
| isShowOpen         | 是否显示“收起和展开”                      | Boolean | true                                           |
| packUpTxt          | 收起文案                                  | String  | '收起'                                         |
| unfoldTxt          | 展开文案                                  | String  | '展开'                                         |
| isExpansion        | 是否默认展开                              | Boolean | false                                          |
| labelWidth         | labelWidth 宽度                           | String  | '120px'                                        |
| btnCheckBind       | 查询按钮配置（继承`el-button`所有属性）   | object  | `{type: primary, size: default,btnTxt:'查询'}` |
| btnResetBind       | 重置按钮配置（继承`el-button`所有属性）   | object  | `{ size: default,btnTxt:'重置'}`               |
| footer             | 自定义按钮(设置:footer="null"不显示按钮)  | object  | -                                              |
| configChangedReset | 更新 opts 是否重置（默认重置）            | Boolean | false                                          |
| isShowWidthSize    | 是否开启动态设置每行显示数                | Boolean | false                                          |
| widthSize          | 每行显示多少项，最小值 2                  | Number  | 4                                              |

### 3、opts Attributes

| 参数        | 说明                                                                             | 类型             | 默认值                     |
| :---------- | :------------------------------------------------------------------------------- | :--------------- | :------------------------- |
| label       | 表单字段说明标题                                                                 | string           | -                          |
| className   | 自定义 class                                                                     | string           | -                          |
| isSelfCom   | 是否使用自己封装的组件（即不需要 el-option）                                     | Boolean          | false                      |
| placeholder | placeholder 提示语                                                               | string           | -                          |
| labelRender | 自定义 label（render 函数 jsx 方式编写）                                         | function         | -                          |
| slotName    | 自定义输入框插槽(作用域插槽解构接收{param/scope}返回当前所有表单初始值)          | string           | -                          |
| comp        | 组件名称，可直接指定全局注册的组件，也可引入'elmentUI'如：Button 或者'el-button' | string,component | -                          |
| span        | 控件占用的列宽，默认占用 1 列，最多 4 列 (独占一行)                              | number           | 1                          |
| arrLabel    | type=select-arr 时，每个下拉显示的中文                                           | String           | label                      |
| arrKey      | type=select-arr 时，每个下拉显示的中文传后台的数字                               | String           | key                        |
| defaultVal  | 默认值                                                                           | -                | -                          |
| bind        | 渲染时组件会调用 v-bind 指定设置该配置更新元素的属性(继承第三方组件属性)         | object，function | 无                         |
| eventHandle | 配置组件事件，与写组件时 change 等同理                                           | object           | 本身值，当前 formData 数据 |

#### 4、事件（events）

| 事件名      | 说明                     | 返回值                                        |
| :---------- | :----------------------- | :-------------------------------------------- |
| handleEvent | 筛选器数据发生变化时触发 | event 标识, val：输入值,form:整个查询条件数据 |
| submit      | 点击筛选器查询按钮时触发 | form:整个查询条件数据                         |
| reset       | 点击筛选器重置按钮时触发 | -                                             |

#### 5、Slots

| 插槽名    | 说明                             |
| :-------- | :------------------------------- |
| querybar  | 按钮操作插槽（位置基于重置后面） |
| footerBtn | 按钮操作插槽                     |

#### 6、Exposes（Method）

| Method      | 说明                   | 类型     |
| :---------- | :--------------------- | :------- |
| queryState  | 初始化表单数据         | object   |
| resetData   | 重置表单不调用查询接口 | Function |
| resetHandle | 重置表单调用查询接口   | Function |
| checkHandle | 查询操作               | Function |
