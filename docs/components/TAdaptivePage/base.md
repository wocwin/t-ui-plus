# TAdaptivePage 组件（页面一屏显示）

### 一屏展示组件

:::demo 继承 TQueryCondition 组件(查询条件组件)与 TTable 组件的所有属性、事件、插槽、方法
TAdaptivePage/base
:::

### 操作 TTable 取消复选功能

:::demo 继承 TQueryCondition 组件(查询条件组件)与 TTable 组件的所有属性、事件、插槽、方法
TAdaptivePage/selection
:::

### 显示左侧 tree 结构

:::demo 使用插槽`leftContent`
TAdaptivePage/lefttree
:::

### treeTable 综合使用

:::demo
TAdaptivePage/treeTable
:::

### TAdaptivePage 参数配置

---

### 1、代码示例

```html
<t-adaptive-page
  title="用户管理列表"
  :table="state.table"
  :columns="state.table.columns"
  :opts="opts"
  @size-change="handlesSizeChange"
  @page-change="handlesCurrentChange"
  @submit="conditionEnter"
/>
```

### 2、配置参数（Attributes）继承 TTable 及 TQueryCondition 组件的所有属性、事件、插槽、方法

| 参数                | 说明                                                         | 类型          | 默认值 |
| :------------------ | :----------------------------------------------------------- | :------------ | :----- |
| leftWidth           | 左侧宽度                                                     | number,String | 260    |
| pageStyle           | t-layout-page 行内样式                                       | object        | -      |
| queryPageStyle      | 查询条件组件的 t-layout-page-item 行内样式                   | object        | -      |
| tablePageStyle      | table 组件的 t-layout-page-item 行内样式                     | object        | -      |
| isTTableSelfFilling | 一屏组件 TTable 自动撑满（即分页器显示最下，table 内容撑满） | Boolean       | false  |
