# TDetail 详情组件

### 基础用法

:::demo

```vue
<template>
  <t-layout-page class="t_detail_demo">
    <t-detail :descData="DataSource.descData" />
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
const DataSource: any = reactive({
  dataList: {
    id: '1498904492217241602',
    stocktakePlanNo: 'PD-YX-20220302002',
    workshopId: 301,
    workshopLabel: '压型车间',
    planStocktakeDate: '2022-03-03',
    warehouseId: 1,
    warehouseName: '压型电极仓',
    stocktakeJobStatus: 4,
    stocktakeJobStatusLabel: '待盘点录入',
    stocktakeType: 2,
    stocktakeTypeLabel: '临时盘点',
    originTypeList: '[1, 3]',
    originTypeListLabel: '在制品,合格品',
    planStocktakeUserName: '张三',
    planStocktakeUserId: 0,
    createRemark: '测试',
  },
  descData: [
    {
      label: '盘点单编号：',
      fieldName: 'stocktakePlanNo',
      value: '',
    },
    {
      label: '盘点单状态：',
      fieldName: 'stocktakeJobStatusLabel',
      value: '',
    },
    {
      label: '盘点负责人：',
      fieldName: 'planStocktakeUserName',
      value: '',
    },
    {
      label: '计划盘点日期：',
      fieldName: 'planStocktakeDate',
      value: '',
    },
    {
      label: '车间：',
      fieldName: 'workshopLabel',
      value: '',
    },
    {
      label: '仓库：',
      fieldName: 'warehouseName',
      value: '',
    },
    {
      label: '盘点所有物料：',
      fieldName: 'originTypeListLabel',
      value: '',
    },
    {
      label: '备注：',
      fieldName: 'createRemark',
      value: '',
      span: 4,
    },
  ],
})
onMounted(() => {
  DataSource.descData.map((item) => {
    item.value = DataSource.dataList[item.fieldName]
  })
})
</script>
```

:::

### 加边框

:::demo

```vue
<template>
  <t-layout-page class="t_detail_demo">
    <t-detail :descData="DataSource.descData" border />
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
const DataSource: any = reactive({
  dataList: {
    id: '1498904492217241602',
    stocktakePlanNo: 'PD-YX-20220302002',
    workshopId: 301,
    workshopLabel: '压型车间',
    planStocktakeDate: '2022-03-03',
    warehouseId: 1,
    warehouseName: '压型电极仓',
    stocktakeJobStatus: 4,
    stocktakeJobStatusLabel: '待盘点录入',
    stocktakeType: 2,
    stocktakeTypeLabel: '临时盘点',
    originTypeList: '[1, 3]',
    originTypeListLabel: '在制品,合格品',
    planStocktakeUserName: '张三',
    planStocktakeUserId: 0,
    createRemark: '测试',
  },
  descData: [
    {
      label: '盘点单编号：',
      fieldName: 'stocktakePlanNo',
      value: '',
    },
    {
      label: '盘点单状态：',
      fieldName: 'stocktakeJobStatusLabel',
      value: '',
    },
    {
      label: '盘点负责人：',
      fieldName: 'planStocktakeUserName',
      value: '',
    },
    {
      label: '计划盘点日期：',
      fieldName: 'planStocktakeDate',
      value: '',
    },
    {
      label: '车间：',
      fieldName: 'workshopLabel',
      value: '',
    },
    {
      label: '仓库：',
      fieldName: 'warehouseName',
      value: '',
    },
    {
      label: '盘点所有物料：',
      fieldName: 'originTypeListLabel',
      value: '',
    },
    {
      label: '备注：',
      fieldName: 'createRemark',
      value: '',
      span: 4,
    },
  ],
})
onMounted(() => {
  DataSource.descData.map((item) => {
    item.value = DataSource.dataList[item.fieldName]
  })
})
</script>
```

:::

### 每行展示多少项

:::demo

```vue
<template>
  <t-layout-page class="t_detail_demo">
    <el-radio-group
      v-model="descColumn"
      size="small"
      style="margin-bottom:15px;"
    >
      <el-radio-button :label="1">一行展示</el-radio-button>
      <el-radio-button :label="2">一行展示2项</el-radio-button>
      <el-radio-button :label="3">一行展示3项</el-radio-button>
      <el-radio-button :label="4">一行展示4项</el-radio-button>
    </el-radio-group>
    <t-detail :descData="DataSource.descData" :descColumn="descColumn" />
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
const descColumn = ref(1)
const DataSource: any = reactive({
  dataList: {
    id: '1498904492217241602',
    stocktakePlanNo: 'PD-YX-20220302002',
    workshopId: 301,
    workshopLabel: '压型车间',
    planStocktakeDate: '2022-03-03',
    warehouseId: 1,
    warehouseName: '压型电极仓',
    stocktakeJobStatus: 4,
    stocktakeJobStatusLabel: '待盘点录入',
    stocktakeType: 2,
    stocktakeTypeLabel: '临时盘点',
    originTypeList: '[1, 3]',
    originTypeListLabel: '在制品,合格品',
    planStocktakeUserName: '张三',
    planStocktakeUserId: 0,
    createRemark: '测试',
  },
  descData: [
    {
      label: '盘点单编号：',
      fieldName: 'stocktakePlanNo',
      value: '',
    },
    {
      label: '盘点单状态：',
      fieldName: 'stocktakeJobStatusLabel',
      value: '',
    },
    {
      label: '盘点负责人：',
      fieldName: 'planStocktakeUserName',
      value: '',
    },
    {
      label: '计划盘点日期：',
      fieldName: 'planStocktakeDate',
      value: '',
    },
    {
      label: '车间：',
      fieldName: 'workshopLabel',
      value: '',
    },
    {
      label: '仓库：',
      fieldName: 'warehouseName',
      value: '',
    },
    {
      label: '盘点所有物料：',
      fieldName: 'originTypeListLabel',
      value: '',
    },
    {
      label: '备注：',
      fieldName: 'createRemark',
      value: '',
      span: 4,
    },
  ],
})
onMounted(() => {
  DataSource.descData.map((item) => {
    item.value = DataSource.dataList[item.fieldName]
  })
})
</script>
```

:::

### 垂直布局

:::demo

```vue
<template>
  <t-layout-page class="t_detail_demo">
    <t-detail :descData="DataSource.descData" direction="vertical" />
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
const DataSource: any = reactive({
  dataList: {
    id: '1498904492217241602',
    stocktakePlanNo: 'PD-YX-20220302002',
    workshopId: 301,
    workshopLabel: '压型车间',
    planStocktakeDate: '2022-03-03',
    warehouseId: 1,
    warehouseName: '压型电极仓',
    stocktakeJobStatus: 4,
    stocktakeJobStatusLabel: '待盘点录入',
    stocktakeType: 2,
    stocktakeTypeLabel: '临时盘点',
    originTypeList: '[1, 3]',
    originTypeListLabel: '在制品,合格品',
    planStocktakeUserName: '张三',
    planStocktakeUserId: 0,
    createRemark: '测试',
  },
  descData: [
    {
      label: '盘点单编号：',
      fieldName: 'stocktakePlanNo',
      value: '',
    },
    {
      label: '盘点单状态：',
      fieldName: 'stocktakeJobStatusLabel',
      value: '',
    },
    {
      label: '盘点负责人：',
      fieldName: 'planStocktakeUserName',
      value: '',
    },
    {
      label: '计划盘点日期：',
      fieldName: 'planStocktakeDate',
      value: '',
    },
    {
      label: '车间：',
      fieldName: 'workshopLabel',
      value: '',
    },
    {
      label: '仓库：',
      fieldName: 'warehouseName',
      value: '',
    },
    {
      label: '盘点所有物料：',
      fieldName: 'originTypeListLabel',
      value: '',
    },
    {
      label: '备注：',
      fieldName: 'createRemark',
      value: '',
      span: 4,
    },
  ],
})
onMounted(() => {
  DataSource.descData.map((item) => {
    item.value = DataSource.dataList[item.fieldName]
  })
})
</script>
```

:::

### 插槽显示

:::demo

```vue
<template>
  <t-layout-page class="t_detail_demo">
    <t-detail :descData="DataSource.descData" :descColumn="2">
      <template #slotName>
        {{
          `${DataSource.dataList.stocktakePlanNo}--${DataSource.dataList.planStocktakeUserName}`
        }}
      </template>
    </t-detail>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
const DataSource: any = reactive({
  dataList: {
    id: '1498904492217241602',
    stocktakePlanNo: 'PD-YX-20220302002',
    workshopId: 301,
    workshopLabel: '压型车间',
    planStocktakeDate: '2022-03-03',
    warehouseId: 1,
    warehouseName: '压型电极仓',
    stocktakeJobStatus: 4,
    stocktakeJobStatusLabel: '待盘点录入',
    stocktakeType: 2,
    stocktakeTypeLabel: '临时盘点',
    originTypeList: '[1, 3]',
    originTypeListLabel: '在制品,合格品',
    planStocktakeUserName: '张三',
    planStocktakeUserId: 0,
    createRemark: '测试',
  },
  descData: [
    {
      label: '盘点单编号：',
      fieldName: 'stocktakePlanNo',
      value: '',
    },
    {
      label: '盘点单状态：',
      fieldName: 'stocktakeJobStatusLabel',
      value: '',
    },
    {
      label: '盘点负责人：',
      fieldName: 'planStocktakeUserName',
      value: '',
    },
    {
      label: '计划盘点日期：',
      fieldName: 'planStocktakeDate',
      value: '',
    },
    {
      label: '插槽显示编号+负责人：',
      slotName: 'slotName',
      span: 4,
      value: '',
    },
    {
      label: '车间：',
      fieldName: 'workshopLabel',
      value: '',
    },
    {
      label: '仓库：',
      fieldName: 'warehouseName',
      value: '',
    },
    {
      label: '盘点所有物料：',
      fieldName: 'originTypeListLabel',
      value: '',
    },
    {
      label: '备注：',
      fieldName: 'createRemark',
      value: '',
      span: 4,
    },
  ],
})
onMounted(() => {
  DataSource.descData.map((item) => {
    item.value = DataSource.dataList[item.fieldName]
  })
})
</script>
```

:::

### 字典回显

:::demo 需要配置：`listTypeInfo`和`dataList`

```vue
<template>
  <t-layout-page class="t_detail_demo">
    <t-detail
      :listTypeInfo="DataSource.listTypeInfo"
      :dataList="DataSource.dataList"
      :descData="DataSource.descData"
      :descColumn="2"
    >
      <template #slotName>
        <span>{{ DataSource.dataList.stocktakePlanNo }}</span>
        <span>--</span>
        <span>{{ DataSource.dataList.planStocktakeUserName }}</span>
      </template>
    </t-detail>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
const DataSource: any = reactive({
  listTypeInfo: {
    stockTakeTypeList: [
      {
        label: '在制品',
        value: 1,
      },
      {
        label: '待检品',
        value: 2,
      },
      {
        label: '合格品',
        value: 3,
      },
      {
        label: '报废品',
        value: 4,
      },
    ],
  },
  dataList: {
    id: '1498904492217241602',
    stocktakePlanNo: 'PD-YX-20220302002',
    workshopId: 301,
    workshopLabel: '压型车间',
    planStocktakeDate: '2022-03-03',
    warehouseId: 1,
    warehouseName: '压型电极仓',
    stocktakeJobStatus: 4,
    stocktakeJobStatusLabel: '待盘点录入',
    stocktakeType: 2,
    stocktakeTypeLabel: '临时盘点',
    originTypeList: '[1, 3]',
    originTypeListLabel: '在制品,合格品',
    planStocktakeUserName: '张三',
    planStocktakeUserId: 0,
    createRemark: '测试',
  },
  descData: [
    {
      label: '盘点单编号：',
      fieldName: 'stocktakePlanNo',
      value: '',
    },
    {
      label: '盘点单状态：',
      fieldName: 'stocktakeJobStatusLabel',
      value: '',
    },
    {
      label: '盘点负责人：',
      fieldName: 'planStocktakeUserName',
      value: '',
    },
    {
      label: '计划盘点日期：',
      fieldName: 'planStocktakeDate',
      value: '',
      tooltip: 'tooltip字符串显示',
    },
    {
      label: '插槽显示编号+负责人：',
      slotName: 'slotName',
      span: 4,
      value: '',
    },
    {
      label: '字典回显：',
      fieldName: 'stocktakeJobStatus',
      value: '',
      filters: {
        list: 'stockTakeTypeList',
      },
    },
    {
      label: '车间：',
      fieldName: 'workshopLabel',
      value: '',
    },
    {
      label: '仓库：',
      fieldName: 'warehouseName',
      value: '',
    },
    {
      label: '盘点所有物料：',
      fieldName: 'originTypeListLabel',
      value: '',
    },
    {
      label: '备注：',
      fieldName: 'createRemark',
      value: '',
      span: 4,
    },
  ],
})
onMounted(() => {
  DataSource.descData.map((item) => {
    item.value = DataSource.dataList[item.fieldName]
  })
})
</script>
```

:::

### tooltip 显示

:::demo 案例暂不支持 tsx 方式,但实际项目可以这样使用 `tooltip` 返回一个 `function`,可以参考下面注释的代码

```vue
<template>
  <t-layout-page class="t_detail_demo">
    <t-detail :descData="DataSource.descData" :descColumn="2">
      <template #slotName>
        <span>{{ DataSource.dataList.stocktakePlanNo }}</span>
        <span>--</span>
        <span>{{ DataSource.dataList.planStocktakeUserName }}</span>
      </template>
    </t-detail>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
const DataSource: any = reactive({
  dataList: {
    id: '1498904492217241602',
    stocktakePlanNo: 'PD-YX-20220302002',
    workshopId: 301,
    workshopLabel: '压型车间',
    planStocktakeDate: '2022-03-03',
    warehouseId: 1,
    warehouseName: '压型电极仓',
    stocktakeJobStatus: 4,
    stocktakeJobStatusLabel: '待盘点录入',
    stocktakeType: 2,
    stocktakeTypeLabel: '临时盘点',
    originTypeList: '[1, 3]',
    originTypeListLabel: '在制品,合格品',
    planStocktakeUserName: '张三',
    planStocktakeUserId: 0,
    createRemark: '测试',
  },
  descData: [
    {
      label: '盘点单编号：',
      fieldName: 'stocktakePlanNo',
      value: '',
    },
    {
      label: '盘点单状态：',
      fieldName: 'stocktakeJobStatusLabel',
      value: '',
    },
    {
      label: '盘点负责人：',
      fieldName: 'planStocktakeUserName',
      value: '',
      // tooltip: () => {
      //   return (
      //     <span>
      //       tooltip 函数显示
      //     </span>
      //   )
      // }
    },
    {
      label: '计划盘点日期：',
      fieldName: 'planStocktakeDate',
      value: '',
      tooltip: 'tooltip字符串显示',
    },
    {
      label: '插槽显示编号+负责人：',
      slotName: 'slotName',
      span: 4,
      value: '',
    },
    {
      label: '车间：',
      fieldName: 'workshopLabel',
      value: '',
    },
    {
      label: '仓库：',
      fieldName: 'warehouseName',
      value: '',
    },
    {
      label: '盘点所有物料：',
      fieldName: 'originTypeListLabel',
      value: '',
    },
    {
      label: '备注：',
      fieldName: 'createRemark',
      value: '',
      span: 4,
    },
  ],
})
onMounted(() => {
  DataSource.descData.map((item) => {
    item.value = DataSource.dataList[item.fieldName]
  })
})
</script>
```

:::

### TDetail Attributes

---

#### 1、代码示例

> `详情组件————可实现表单回显`

```html
<!-- 常规模式 -->
<t-detail :descData="descData" />
<!-- 字典回显模式 -->
<t-detail :descData="descData" :dataList="dataList"
:listTypeInfo=="listTypeInfo" />
```

#### 2、配置参数（Attributes）继承 el-descriptions Attributes

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

#### 3、继承 el-descriptions events
