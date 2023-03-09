# 下拉选择表格组件

### 单选

::: demo 在组件中需配置：<br/>`table` 数据源及表头信息<br/>`keywords` 选项中的 value（选项的值）,label(选项的标签)<br/>`@radioChange` 选中事件，传出当前选中对象

```vue
<template>
  <t-select-table
    :table="table"
    :columns="table.columns"
    :max-height="400"
    :keywords="{ label: 'name', value: 'id' }"
    @radioChange="radioChange"
  ></t-select-table>
</template>
<script setup lang="ts">
const table = {
  data: [
    { id: 1, code: 1, name: '物料名称1', spec: '物料规格1', unitName: '吨' },
    { id: 2, code: 2, name: '物料名称2', spec: '物料规格2', unitName: '吨' },
    { id: 3, code: 3, name: '物料名称3', spec: '物料规格3', unitName: '吨' },
    { id: 4, code: 4, name: '物料名称4', spec: '物料规格4', unitName: '吨' },
    { id: 5, code: 5, name: '物料名称5', spec: '物料规格5', unitName: '吨' },
    { id: 6, code: 6, name: '物料名称6', spec: '物料规格6', unitName: '吨' },
    { id: 7, code: 7, name: '物料名称7', spec: '物料规格7', unitName: '吨' },
    { id: 8, code: 8, name: '物料名称8', spec: '物料规格8', unitName: '吨' },
    { id: 9, code: 9, name: '物料名称9', spec: '物料规格9', unitName: '吨' },
    {
      id: 10,
      code: 10,
      name: '物料名称10',
      spec: '物料规格10',
      unitName: '吨',
    },
    {
      id: 11,
      code: 11,
      name: '物料名称11',
      spec: '物料规格11',
      unitName: '吨',
    },
    {
      id: 12,
      code: 12,
      name: '物料名称12',
      spec: '物料规格12',
      unitName: '吨',
    },
    {
      id: 13,
      code: 13,
      name: '物料名称13',
      spec: '物料规格13',
      unitName: '吨',
    },
  ],
  columns: [
    { label: '物料编号', width: '100px', prop: 'code' },
    { label: '物料名称', width: '149px', prop: 'name' },
    { label: '规格', width: '149px', prop: 'spec' },
    { label: '单位', width: '110px', prop: 'unitName' },
    { label: '物料编号1', width: '149px', prop: 'code' },
    { label: '物料名称1', width: '149px', prop: 'name' },
    { label: '规格1', width: '149px', prop: 'spec' },
    { label: '单位1', width: '110px', prop: 'unitName' },
    { label: '物料编号11', width: '149px', prop: 'code' },
    { label: '物料名称11', width: '149px', prop: 'name' },
    { label: '规格11', width: '149px', prop: 'spec' },
    { label: '单位11', width: '110px', prop: 'unitName' },
    { label: '物料编号111', width: '149px', prop: 'code' },
    { label: '物料名称111', width: '149px', prop: 'name' },
    { label: '规格111', width: '149px', prop: 'spec' },
    { label: '单位111', width: '110px', prop: 'unitName' },
  ],
}
const radioChange = (row) => {
  console.log('单选--传给后台的值', row)
}
</script>
```

:::

### 不显示首列单选

::: demo 在组件中需配置：<br/>`table` 数据源及表头信息<br/>`keywords` 选项中的 value（选项的值）,label(选项的标签)<br/>`@radioChange` 选中事件，传出当前选中对象

```vue
<template>
  <t-select-table
    :table="table"
    :columns="table.columns"
    :max-height="400"
    :keywords="{ label: 'name', value: 'id' }"
    :isShowFirstColumn="false"
    @radioChange="radioChange"
  ></t-select-table>
</template>
<script setup lang="ts">
const table = {
  data: [
    { id: 1, code: 1, name: '物料名称1', spec: '物料规格1', unitName: '吨' },
    { id: 2, code: 2, name: '物料名称2', spec: '物料规格2', unitName: '吨' },
    { id: 3, code: 3, name: '物料名称3', spec: '物料规格3', unitName: '吨' },
    { id: 4, code: 4, name: '物料名称4', spec: '物料规格4', unitName: '吨' },
    { id: 5, code: 5, name: '物料名称5', spec: '物料规格5', unitName: '吨' },
    { id: 6, code: 6, name: '物料名称6', spec: '物料规格6', unitName: '吨' },
    { id: 7, code: 7, name: '物料名称7', spec: '物料规格7', unitName: '吨' },
    { id: 8, code: 8, name: '物料名称8', spec: '物料规格8', unitName: '吨' },
    { id: 9, code: 9, name: '物料名称9', spec: '物料规格9', unitName: '吨' },
    {
      id: 10,
      code: 10,
      name: '物料名称10',
      spec: '物料规格10',
      unitName: '吨',
    },
    {
      id: 11,
      code: 11,
      name: '物料名称11',
      spec: '物料规格11',
      unitName: '吨',
    },
    {
      id: 12,
      code: 12,
      name: '物料名称12',
      spec: '物料规格12',
      unitName: '吨',
    },
    {
      id: 13,
      code: 13,
      name: '物料名称13',
      spec: '物料规格13',
      unitName: '吨',
    },
  ],
  columns: [
    { label: '物料编号', width: '100px', prop: 'code' },
    { label: '物料名称', width: '149px', prop: 'name' },
    { label: '规格', width: '149px', prop: 'spec' },
    { label: '单位', width: '110px', prop: 'unitName' },
    { label: '物料编号1', width: '149px', prop: 'code' },
    { label: '物料名称1', width: '149px', prop: 'name' },
    { label: '规格1', width: '149px', prop: 'spec' },
    { label: '单位1', width: '110px', prop: 'unitName' },
    { label: '物料编号11', width: '149px', prop: 'code' },
    { label: '物料名称11', width: '149px', prop: 'name' },
    { label: '规格11', width: '149px', prop: 'spec' },
    { label: '单位11', width: '110px', prop: 'unitName' },
    { label: '物料编号111', width: '149px', prop: 'code' },
    { label: '物料名称111', width: '149px', prop: 'name' },
    { label: '规格111', width: '149px', prop: 'spec' },
    { label: '单位111', width: '110px', prop: 'unitName' },
  ],
}
const radioChange = (row) => {
  console.log('单选--传给后台的值', row)
}
</script>
```

:::

### 多选

:::demo 在组件中需配置：<br/>`multiple` 开启多选<br/>`table` 数据源及表头信息<br/>`keywords` 选项中的 value（选项的值）,label(选项的标签)<br/>`@selectionChange` 多选事件，传出当前选中项，及选中项的 keywords.value 集合

```vue
<template>
  <t-select-table
    :table="table"
    :columns="table.columns"
    :max-height="400"
    :keywords="{ label: 'name', value: 'id' }"
    multiple
    @selectionChange="selectionChange"
  />
</template>
<script setup lang="ts">
let table = {
  total: 100,
  data: [
    { id: 1, code: 1, name: '物料名称1', spec: '物料规格1', unitName: '吨' },
    { id: 2, code: 2, name: '物料名称2', spec: '物料规格2', unitName: '吨' },
    { id: 3, code: 3, name: '物料名称3', spec: '物料规格3', unitName: '吨' },
    { id: 4, code: 4, name: '物料名称4', spec: '物料规格4', unitName: '吨' },
    { id: 5, code: 5, name: '物料名称5', spec: '物料规格5', unitName: '吨' },
    { id: 6, code: 6, name: '物料名称6', spec: '物料规格6', unitName: '吨' },
    { id: 7, code: 7, name: '物料名称7', spec: '物料规格7', unitName: '吨' },
    { id: 8, code: 8, name: '物料名称8', spec: '物料规格8', unitName: '吨' },
    { id: 9, code: 9, name: '物料名称9', spec: '物料规格9', unitName: '吨' },
    {
      id: 10,
      code: 10,
      name: '物料名称10',
      spec: '物料规格10',
      unitName: '吨',
    },
    {
      id: 11,
      code: 11,
      name: '物料名称11',
      spec: '物料规格11',
      unitName: '吨',
    },
    {
      id: 12,
      code: 12,
      name: '物料名称12',
      spec: '物料规格12',
      unitName: '吨',
    },
    {
      id: 13,
      code: 13,
      name: '物料名称13',
      spec: '物料规格13',
      unitName: '吨',
    },
  ],
  columns: [
    { label: '物料编号', width: '100px', prop: 'code', fixed: true },
    { label: '物料名称', width: '149px', prop: 'name' },
    { label: '规格', width: '149px', prop: 'spec' },
    { label: '单位', width: '110px', prop: 'unitName' },
    { label: '物料编号1', width: '149px', prop: 'code' },
    { label: '物料名称1', width: '149px', prop: 'name' },
    { label: '规格1', width: '149px', prop: 'spec' },
    { label: '单位1', width: '110px', prop: 'unitName' },
    { label: '物料编号11', width: '149px', prop: 'code' },
    { label: '物料名称11', width: '149px', prop: 'name' },
    { label: '规格11', width: '149px', prop: 'spec' },
    { label: '单位11', width: '110px', prop: 'unitName' },
    { label: '物料编号111', width: '149px', prop: 'code' },
    { label: '物料名称111', width: '149px', prop: 'name' },
    { label: '规格111', width: '149px', prop: 'spec' },
    { label: '单位111', width: '110px', prop: 'unitName' },
  ],
}
const selectionChange = (val, ids) => {
  console.log('复选框', val)
  console.log('复选框--id', ids)
}
</script>
```

:::

### 开启分页功能（支持翻页选中且默认开启）

:::demo 在组件中需配置：<br/>`isShowPagination` 开启分页功能<br/>`@page-change`页码改变事件;传出当前选中的页码<br/>`table` 数据源及表头信息<br/>`keywords` 选项中的 value（选项的值）,label(选项的标签)<br/>

```vue
<template>
  <t-select-table
    :table="table"
    :columns="table.columns"
    :max-height="400"
    :keywords="{ label: 'name', value: 'id' }"
    multiple
    @selectionChange="selectionChange"
    isShowPagination
    x
    @current-change="pageChange"
  />
</template>
<script setup lang="ts">
let table = {
  total: 100,
  data: [
    { id: 1, code: 1, name: '物料名称1', spec: '物料规格1', unitName: '吨' },
    { id: 2, code: 2, name: '物料名称2', spec: '物料规格2', unitName: '吨' },
    { id: 3, code: 3, name: '物料名称3', spec: '物料规格3', unitName: '吨' },
    { id: 4, code: 4, name: '物料名称4', spec: '物料规格4', unitName: '吨' },
    { id: 5, code: 5, name: '物料名称5', spec: '物料规格5', unitName: '吨' },
    { id: 6, code: 6, name: '物料名称6', spec: '物料规格6', unitName: '吨' },
    { id: 7, code: 7, name: '物料名称7', spec: '物料规格7', unitName: '吨' },
    { id: 8, code: 8, name: '物料名称8', spec: '物料规格8', unitName: '吨' },
    { id: 9, code: 9, name: '物料名称9', spec: '物料规格9', unitName: '吨' },
    {
      id: 10,
      code: 10,
      name: '物料名称10',
      spec: '物料规格10',
      unitName: '吨',
    },
    {
      id: 11,
      code: 11,
      name: '物料名称11',
      spec: '物料规格11',
      unitName: '吨',
    },
    {
      id: 12,
      code: 12,
      name: '物料名称12',
      spec: '物料规格12',
      unitName: '吨',
    },
    {
      id: 13,
      code: 13,
      name: '物料名称13',
      spec: '物料规格13',
      unitName: '吨',
    },
  ],
  columns: [
    { label: '物料编号', width: '100px', prop: 'code', fixed: true },
    { label: '物料名称', width: '149px', prop: 'name' },
    { label: '规格', width: '149px', prop: 'spec' },
    { label: '单位', width: '110px', prop: 'unitName' },
    { label: '物料编号1', width: '149px', prop: 'code' },
    { label: '物料名称1', width: '149px', prop: 'name' },
    { label: '规格1', width: '149px', prop: 'spec' },
    { label: '单位1', width: '110px', prop: 'unitName' },
    { label: '物料编号11', width: '149px', prop: 'code' },
    { label: '物料名称11', width: '149px', prop: 'name' },
    { label: '规格11', width: '149px', prop: 'spec' },
    { label: '单位11', width: '110px', prop: 'unitName' },
    { label: '物料编号111', width: '149px', prop: 'code' },
    { label: '物料名称111', width: '149px', prop: 'name' },
    { label: '规格111', width: '149px', prop: 'spec' },
    { label: '单位111', width: '110px', prop: 'unitName' },
  ],
}
const selectionChange = (val, ids) => {
  console.log('复选框', val)
  console.log('复选框--id', ids)
}
// 获取当前的页码
const pageChange = (val) => {
  console.log('获取当前的页码', val)
  table.currentPage = val
}
</script>
```

:::

### TSelectTable 参数配置

---

#### 1、代码示例

```html
<t-select-table
  :table="table"
  :columns="table.columns"
  :max-height="400"
  :keywords="{ label: 'name', value: 'id' }"
  @radioChange="radioChange"
></t-select-table>
```

#### 2、配置参数（Attributes）继承 el-table 及 el-select 属性

| 参数              | 说明                                                        | 类型                      | 默认值     |
| :---------------- | :---------------------------------------------------------- | :------------------------ | :--------- |
| v-model           | 绑定值                                                      | boolean / string / number | 仅显示     |
| table             | 表格数据对象                                                | Object                    | {}         |
| ---data           | 展示下拉数据源                                              | Array                     | []         |
| ---total          | 数据总条数                                                  | Number                    | -          |
| ---pageSize       | 每页显示条目个数                                            | Number                    | -          |
| ---currentPage    | 当前页数                                                    | Number                    | -          |
| columns           | 表头信息                                                    | Array                     | []         |
| ----bind          | el-table-column Attributes                                  | Object                    | -          |
| ----noShowTip     | 是否换行 （设置：noShowTip:true）                           | Boolean                   | false      |
| ----fixed         | 列是否固定( left, right)                                    | string, boolean           | -          |
| ----align         | 对齐方式(left/center/right)                                 | String                    | center     |
| ----render        | 返回三个参数(text：当前值,row：当前整条数据 ,index：当前行) | function                  | -          |
| ----slotName      | 插槽显示此列数据（其值是具名作用域插槽）                    | String                    | -          |
| ------scope       | 具名插槽获取此行数据必须用解构接收{scope}                   | Object                    | 当前行数据 |
| keywords          | 关键字配置（value-key 配置）                                | Object                    | 无         |
| ------label       | 选项的标签                                                  | String                    | ‘label’    |
| ------value       | 选项的值                                                    | String                    | ‘value’    |
| radioTxt          | 单选文案                                                    | String                    | 单选       |
| multiple          | 是否开启多选                                                | Boolean                   | false      |
| isShowFirstColumn | 是否显示首列(单选)                                          | boolean                   | true       |
| filterable        | 是否开启过滤(根据 keywords 的 label 值进行过滤)             | Boolean                   | true       |
| reserveSelection  | 是否支持翻页选中                                            | Boolean                   | true       |
| isShowPagination  | 开启分页                                                    | Boolean                   | false      |
| tableWidth        | table 宽度                                                  | Number                    | 550        |

#### 3、事件（events）继承 el-table 及 el-select 属性

| 事件名          | 说明         | 回调参数                                       |
| :-------------- | :----------- | :--------------------------------------------- |
| page-change     | 页码改变事件 | 返回选中的页码                                 |
| selectionChange | 多选事件     | 返回选中的项数据及选中项的 keywords.value 集合 |
| radioChange     | 单选         | 返回当前项所有数据                             |

#### 4、方法（Methods）继承 el-table 及 el-select 属性

| 方法名 | 说明                            | 回调参数 |
| :----- | :------------------------------ | :------- |
| focus  | 使 input 获取焦点               |          |
| blur   | 使 input 失去焦点，并隐藏下拉框 |          |
