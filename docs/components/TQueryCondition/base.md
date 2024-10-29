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
TQueryCondition/comUse
:::

### 默认值显示

::: demo
TQueryCondition/defaultVal
:::

### 按钮操作使用

::: demo
TQueryCondition/querybar
:::

### 自定义操作按钮

::: demo 设置`footerBtn`插槽，可以自定义按钮，不开启收起&展开功能
TQueryCondition/footerBtn
:::

### 不展示操作按钮

::: demo 设置`:isFooter=false`,不展示按钮，不开启收起&展开功能
TQueryCondition/footer
:::

### 每行展示多少项

::: demo 开启`isShowWidthSize`；设置`widthSize`值`（默认 4）`；不开启`isShowWidthSize`，则根据`width > 1000 && width < 1280`展示 3 项，`width > 768 && width <= 1000`展示 2 项`width <= 768`展示1项；(width=window.innerWidth)

TQueryCondition/widthSize
:::

### 动态增减查询条件项

::: demo
TQueryCondition/dynamic
:::

### 自定义修改按钮文案

::: demo
TQueryCondition/btnBind
:::

### 以下拉方式展示更多条件

::: demo 设置`isDropDownSelectMore`开启； `popoverAttrs`默认值：`{ showTxt: '更多', title: '所有条件', allTxt: '全选', reverseTxt: '反选', clearTxt: '清空'placement: 'bottom', width: 240, trigger: 'click', ...props.popoverAttrs }`

TQueryCondition/isDropDownSelectMore
:::


### 调用handleEvent动态修改查询条件值<el-tag>v1.4.13</el-tag>

::: demo 最终方法调用`handleEventChangeRef.value.handleEvent({isChange:true, val: "W1" }, "workshopNum")`。解析：`handleEventChangeRef.value`条件查询的`ref`；`handleEvent({ isChange:true,val: "W1" }, "workshopNum")`方法，参数：第一个`isChange`必须为`true`且不可省略，`val`为修改后的值，`workshopNum`为对应查询条件项的`字段名`。
TQueryCondition/handleEventChange
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

| 参数                 | 说明                                      | 类型    | 默认值                                         |
| :------------------- | :---------------------------------------- | :------ | :--------------------------------------------- |
| opts                 | 接收筛选器组件配置                        | object  | 无                                             |
| loading              | 查询按钮 loading 状态，请求数据时需要体现 | Boolean | false                                          |
| reset                | 是否显示“重置”按钮                        | Boolean | true                                           |
| maxVisibleRows       | 收起时设置默认展示行数                    | Number  | 1                                              |
| boolEnter            | 是否敲回车查询                            | Boolean | true                                           |
| isShowOpen           | 是否显示“收起和展开”                      | Boolean | true                                           |
| packUpTxt            | 收起文案                                  | String  | '收起'                                         |
| unfoldTxt            | 展开文案                                  | String  | '展开'                                         |
| isExpansion          | 是否默认展开                              | Boolean | false                                          |
| labelWidth           | labelWidth 宽度                           | String  | '120px'                                        |
| btnCheckBind         | 查询按钮配置（继承`el-button`所有属性）   | object  | `{type: primary, size: default,btnTxt:'查询'}` |
| btnResetBind         | 重置按钮配置（继承`el-button`所有属性）   | object  | `{ size: default,btnTxt:'重置'}`               |
| isFooter             | 自定义按钮(设置:footer="false"不显示按钮) | Boolean | true                                           |
| configChangedReset   | 更新 opts 是否重置（默认重置）            | Boolean | false                                          |
| isShowWidthSize      | 是否开启动态设置每行显示数                | Boolean | false                                          |
| widthSize            | 每行显示多少项，最小值 2                  | Number  | 4                                              |
| isDropDownSelectMore | 是否以下拉方式展示更多条件                | Boolean | false                                          |

#### 2-1 以下拉方式展示更多条件--配置参数（Attributes）
| 参数              | 说明                                                   | 类型             | 默认值     |
| :---------------- | :----------------------------------------------------- | :--------------- | :--------- |
| popoverAttrs      | el-popover配置及中文文案                               | object           | 具体看源码 |
| moreCheckList     | 数据源                                                 | Array            | -          |
| -----label        | 标题                                                   | string           | -          |
| -----comp         | 组件名称，可直接指定全局注册的组件                     | string/component | -          |
| -----isSelfCom    | 是否使用自己封装的下拉组件（即没有el-option）          | Boolean          | false      |
| -----prop         | 接收字段（即后台接收字段）                             | string           | -          |
| -----bind         | 组件配置参数（Attributes）function 传出 form           | object/Function  | -          |
| -----slotName     | 自定义输入框插槽                                       | string           | -          |
| -----span         | 控件占用的列宽，默认占用 1 列，最大值4 (独占一行)      | number           | 1          |
| -----changeEvent  | 事件名称                                               | string           | -          |
| -----defaultVal   | 默认值                                                 | string           | -          |
| -----type         | element 组件type(radio,checkbox,select-arr,select-obj) | string           | -          |
| -----arrLabel     | el-select/el-checkbox-group/el-radio-group 组件options label显示                        | string           | label      |
| -----arrKey       | el-select/el-checkbox-group/el-radio-group 组件options key显示                          | string           | key        |
| -----list         | el-select 组件options 数据标识                         | string           | -          |
| -----listTypeInfo | el-select 组件options 数据源                           | object           | -          |

#### 2-2、opts Attributes

| 参数        | 说明                                                                             | 类型             | 默认值                     |
| :---------- | :------------------------------------------------------------------------------- | :--------------- | :------------------------- |
| label       | 表单字段说明标题                                                                 | string           | -                          |
| className   | 自定义 class                                                                     | string           | -                          |
| isSelfCom   | 是否使用自己封装的组件（即不需要 el-option）                                     | Boolean          | false                      |
| placeholder | placeholder 提示语                                                               | string           | -                          |
| labelRender | 自定义 label（render 函数 jsx 方式编写）                                         | function         | -                          |
| slotName    | 自定义输入框插槽(作用域插槽解构接收{param/scope}返回当前所有表单初始值)          | string           | -                          |
| comp        | 组件名称，可直接指定全局注册的组件，也可引入'elmentUI'如：Button 或者'el-button' | string/component | -                          |
| span        | 控件占用的列宽，默认占用 1 列，最多 4 列 (独占一行)                              | number           | 1                          |
| arrLabel    | type=select-arr/radio/checkbox 时，每个下拉显示的中文                                           | String           | label                      |
| arrKey      | type=select-arr/radio/checkbox 时，每个下拉显示的中文传后台的数字                               | String           | key                        |
| defaultVal  | 默认值                                                                           | -                | -                          |
| bind        | 继承第三方 UI 的 Attributes,function 传出 form                                   | object/function  | -                          |
| eventHandle | 配置组件事件，与写组件时 change 等同理                                           | object           | 本身值，当前 formData 数据 |

### 3、事件（events）

| 事件名       | 说明                                              | 返回值                                        |
| :----------- | :------------------------------------------------ | :-------------------------------------------- |
| handleEvent  | 筛选器数据发生变化时触发                          | event 标识, val：输入值,form:整个查询条件数据 |
| submit       | 点击筛选器查询按钮时触发                          | form:整个查询条件数据                         |
| reset        | 点击筛选器重置按钮时触发                          | -                                             |
| getCheckList | 下拉动态添加条件（isDropDownSelectMore:true生效） | 返回选中的条件项                              |

### 4、Slots

| 插槽名    | 说明                             |
| :-------- | :------------------------------- |
| querybar  | 按钮操作插槽（位置基于重置后面） |
| footerBtn | 按钮操作插槽                     |

### 5、Exposes（Method）

| Method                              | 说明                   | 类型                                                                                       |
| :---------------------------------- | :--------------------- | :----------------------------------------------------------------------------------------- |
| queryState                          | 初始化表单数据         | object                                                                                     |
| resetData                           | 重置表单不调用查询接口 | Function                                                                                   |
| resetHandle                         | 重置表单调用查询接口   | Function                                                                                   |
| checkHandle                         | 查询操作               | Function                                                                                   |
| handleEvent<el-tag>v1.4.13</el-tag> | 动态修改查询条件值     | Function<t-tip content='(flag: boolean, {val: 需要修改的值}, dataIndex: string) => void'/> |
