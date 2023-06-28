# TDetail 详情组件

### 基础用法

:::demo
TDetail/base
:::

### 加边框

:::demo
TDetail/border
:::

### 每行展示多少项

:::demo
TDetail/descColumn
:::

### 垂直布局

:::demo
TDetail/vertical
:::

### 插槽显示

:::demo
TDetail/slotName
:::

### 字典回显

:::demo 需要配置：`listTypeInfo`和`dataList`
TDetail/echo
:::

### tooltip 显示

:::demo
TDetail/tooltip
:::

### TDetail Attributes

---

### 1、代码示例

> `详情组件————可实现表单回显`

```html
<!-- 常规模式 -->
<t-detail :descData="descData" />
<!-- 字典回显模式 -->
<t-detail :descData="descData" :dataList="dataList"
:listTypeInfo=="listTypeInfo" />
```

### 2、配置参数（Attributes）继承 el-descriptions Attributes

| 参数          | 说明                                               | 类型            | 默认值       |
| :------------ | :------------------------------------------------- | :-------------- | :----------- |
| descData      | 详情页面数据源                                     | Array           | 无           |
| ----label     | 详情字段说明标题                                   | String          | 无           |
| ----value     | 详情字段返回值                                     | String          | 无           |
| ----fieldName | value 返回值的字段                                 | String          | 无           |
| ----slotName  | 插槽（自定义 value）                               | slot            | 无           |
| ----span      | 占用的列宽，默认占用 1 列，最多 4 列               | Number          | 1            |
| ----tooltip   | value 值的提示语                                   | String/function | 无           |
| ----iconSize  | tooltip 提示语的 icon 大小                         | String/Number   | 继承字体大小 |
| ----iconColor | tooltip 提示语的 icon 颜色                         | String          | 继承颜色     |
| ----filters   | 字典类型（即后台返回的是数字类型）过滤转成中文     | Object          | 无           |
| -------list   | 字典 list 定义的数据名即 listTypeInfo 里面对应的值 | String          | 无           |
| -------key    | 下拉数据源的 key 字段                              | String          | 'value'      |
| -------label  | 下拉数据源的 label 字段                            | String          | 'label'      |
| descColumn    | 布局一行显示几列（默认：一行显示 4 列）            | Number          | 4            |
| dataList      | 开启 filters 时详情接口返回的数据                  | Object          | {}           |
| listTypeInfo  | 开启 filters 时下拉数据源                          | Object          | {}           |

### 3、继承 el-descriptions events
