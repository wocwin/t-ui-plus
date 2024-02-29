# TAdaptivePage 组件（页面一屏显示）


### 一屏展示组件

:::demo 继承TQueryCondition组件(查询条件组件)与TTable组件的所有属性、事件、插槽、方法
TAdaptivePage/base
:::

### 操作TTable取消复选功能

:::demo 继承TQueryCondition组件(查询条件组件)与TTable组件的所有属性、事件、插槽、方法
TAdaptivePage/selection
:::

### 显示左侧tree结构

:::demo 使用插槽`leftContent`
TAdaptivePage/lefttree
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

| 参数           | 说明                                     | 类型          | 默认值 |
| :------------- | :--------------------------------------- | :------------ | :----- |
| leftWidth      | 左侧宽度                                 | number,String | 260    |
| pageStyle      | t-layout-page行内样式                    | object        | -      |
| queryPageStyle | 查询条件组件的t-layout-page-item行内样式 | object        | -      |
| tablePageStyle | table组件的t-layout-page-item行内样式    | object        | -      |


