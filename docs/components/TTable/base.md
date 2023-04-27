# Table 表格

用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作。

### 基础用法

:::demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="基本用法"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
const table = {
  // border: true,
  // 接口返回数据
  data: [
    {
      id: '1',
      date: '2019-09-25',
      date1: '2019-09-26',
      name: '张三',
      status: '2',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '3',
      date: '2019-09-26',
      date1: '2019-09-28',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '4',
      date: '2019-09-26',
      date1: '2019-09-29',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
  ],
  // 表头数据
  columns: [
    { prop: 'name', label: '姓名', minWidth: '100' },
    { prop: 'date', label: '日期', minWidth: '180' },
    { prop: 'status', label: '状态', minWidth: '80' },
    { prop: 'address', label: '地址', minWidth: '220' },
  ],
}
</script>
```

:::

### 边框表格

:::demo 在`table`对象中添加`border:true`

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="加边框"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
const table = {
  border: true,
  // 接口返回数据
  data: [
    {
      id: '1',
      date: '2019-09-25',
      date1: '2019-09-26',
      name: '张三',
      status: '2',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '3',
      date: '2019-09-26',
      date1: '2019-09-28',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '4',
      date: '2019-09-26',
      date1: '2019-09-29',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
  ],
  // 表头数据
  columns: [
    { prop: 'name', label: '姓名', minWidth: '100' },
    { prop: 'date', label: '日期', minWidth: '180' },
    { prop: 'status', label: '状态', minWidth: '80' },
    { prop: 'address', label: '地址', minWidth: '220' },
  ],
}
</script>
```

:::

### 复选框表格

:::demo 在`table`对象中添加`firstColumn:{ type: 'selection', fixed: true }`

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="复选框"
        ref="selectionTable"
        :table="table"
        :columns="table.columns"
        @selection-change="selectionChange"
        :isShowPagination="false"
      >
        <template #toolbar>
          <el-button
            size="default"
            type="primary"
            :disabled="state.ids.length < 1"
            @click="cancelSelect"
            >取消选中</el-button
          >
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
let table = {
  firstColumn: { type: 'selection', fixed: true },
  // 接口返回数据
  data: [
    {
      id: '1',
      date: '2019-09-25',
      date1: '2019-09-26',
      name: '张三',
      status: '2',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '3',
      date: '2019-09-26',
      date1: '2019-09-28',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '4',
      date: '2019-09-26',
      date1: '2019-09-29',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
  ],
  // 表头数据
  columns: [
    { prop: 'name', label: '姓名', minWidth: '100' },
    { prop: 'date', label: '日期', minWidth: '180' },
    { prop: 'status', label: '状态', minWidth: '80' },
    { prop: 'address', label: '地址', minWidth: '220' },
  ],
}
// 获取ref
const selectionTable: any = ref<HTMLElement | null>(null)
let state = reactive({
  ids: [],
})
// 选择复选框
const selectionChange = (val: any) => {
  console.log('选择复选框', val)
  state.ids = val
}
// 取消选中
const cancelSelect = () => {
  console.log('取消选中', selectionTable.value)
  if (state.ids.length > 0) {
    console.log('取消选中222', selectionTable.value)
    selectionTable.value.clearSelection()
  }
}
</script>
```

:::

### 单选框表格

:::demo 在`table`对象中添加`firstColumn:{ type: 'radio', fixed: true }`,可以再次点击取消选中；添加`@radioChange`事件传当前选中行是数据<br/>默认点击整行选中 可以设置`rowClickRadio：false`,只有点击单选框才选中

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="单选框"
        ref="selectionTable"
        :table="table"
        :columns="table.columns"
        @radioChange="radioChange"
        :isShowPagination="false"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
let table = {
  firstColumn: { type: 'radio', fixed: true },
  // 接口返回数据
  data: [
    {
      id: '1',
      date: '2019-09-25',
      date1: '2019-09-26',
      name: '张三',
      status: '2',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '3',
      date: '2019-09-26',
      date1: '2019-09-28',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '4',
      date: '2019-09-26',
      date1: '2019-09-29',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
  ],
  // 表头数据
  columns: [
    { prop: 'name', label: '姓名', minWidth: '100' },
    { prop: 'date', label: '日期', minWidth: '180' },
    { prop: 'status', label: '状态', minWidth: '80' },
    { prop: 'address', label: '地址', minWidth: '220' },
  ],
}
// 获取ref
const selectionTable: any = ref<HTMLElement | null>(null)
// 选择单选框
const radioChange = (val: any) => {
  console.log('选择单选框', val)
}
</script>
```

:::

### 序列号表格

:::demo 在`table`对象中添加`firstColumn:{ type: 'index', fixed: true }`；可以新增`label`属性来定义表头名默认'序号'

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="序列号"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
let table = {
  firstColumn: { type: 'index', fixed: true },
  // 接口返回数据
  data: [
    {
      id: '1',
      date: '2019-09-25',
      date1: '2019-09-26',
      name: '张三',
      status: '2',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '3',
      date: '2019-09-26',
      date1: '2019-09-28',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '4',
      date: '2019-09-26',
      date1: '2019-09-29',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
  ],
  // 表头数据
  columns: [
    { prop: 'name', label: '姓名', minWidth: '100' },
    { prop: 'date', label: '日期', minWidth: '180' },
    { prop: 'status', label: '状态', minWidth: '80' },
    { prop: 'address', label: '地址', minWidth: '220' },
  ],
}
</script>
```

:::

### 双击单元格复制(默认不开启)

:::demo 若需要关闭（在 TTable 标签中设置属性：`isCopy:true`）

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="双击单元格复制"
        :table="table"
        isCopy
        :columns="table.columns"
        :isShowPagination="false"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
let table = {
  // 接口返回数据
  data: [
    {
      id: '1',
      date: '2019-09-25',
      date1: '2019-09-26',
      name: '张三',
      status: '2',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '3',
      date: '2019-09-26',
      date1: '2019-09-28',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '4',
      date: '2019-09-26',
      date1: '2019-09-29',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
  ],
  // 表头数据
  columns: [
    { prop: 'name', label: '姓名', minWidth: '100' },
    { prop: 'date', label: '日期', minWidth: '180' },
    { prop: 'status', label: '状态', minWidth: '80' },
    { prop: 'address', label: '地址', minWidth: '220' },
  ],
}
</script>
```

:::

### 字典过滤渲染

:::demo `columns`中某项添加`filters: { list: 'statusList', key: 'id', label: 'label' }`<br/>`table`中添加`listTypeInfo: { statusList:[数据源] }`字典类型的数据源

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="字典过滤渲染"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
let table = {
  // 接口返回数据
  data: [
    {
      id: '1',
      date: '2019-09-25',
      date1: '2019-09-26',
      name: '张三',
      status: '2',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '3',
      date: '2019-09-26',
      date1: '2019-09-28',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '4',
      date: '2019-09-26',
      date1: '2019-09-29',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
  ],
  // 表头数据
  columns: [
    { prop: 'name', label: '姓名', minWidth: '100' },
    { prop: 'date', label: '日期', minWidth: '180' },
    {
      prop: 'status',
      label: '字典过滤',
      minWidth: '80',
      filters: { list: 'statusList', key: 'id', label: 'label' },
    },
    { prop: 'address', label: '地址', minWidth: '220' },
  ],
  // 字典渲染数据源
  listTypeInfo: {
    statusList: [
      {
        id: '1',
        label: '待办',
      },
      {
        id: '2',
        label: '待审批',
      },
      {
        id: '3',
        label: '报废',
      },
    ],
  },
}
</script>
```

:::

### 表头合并单元格（多级表头）

:::demo 只需要配置`columns`中某项新增`children：Array[]`属性;表头合并自动加边框

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="表头合并"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
let table = {
  // 接口返回数据
  data: [
    {
      id: '1',
      date: '2019-09-25',
      date1: '2019-09-26',
      name: '张三',
      status: '2',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '3',
      date: '2019-09-26',
      date1: '2019-09-28',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '4',
      date: '2019-09-26',
      date1: '2019-09-29',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
  ],
  // 表头数据
  columns: [
    {
      prop: 'name',
      label: '姓名',
      minWidth: '100',
      children: [
        {
          prop: 'name',
          label: '姓名',
          minWidth: '100',
          children: [
            {
              prop: 'type',
              label: '类型',
              minWidth: '100',
              children: [{ prop: 'date1', label: '日期2552', minWidth: '180' }],
            },
          ],
        },
        {
          prop: 'type',
          label: '表头合并1',
          minWidth: '100',
          children: [
            {
              prop: 'type',
              label: '类型',
              minWidth: '100',
              children: [{ prop: 'date1', label: '日期2552', minWidth: '180' }],
            },
          ],
        },
        { prop: 'name', label: '姓名', minWidth: '100' },
        {
          prop: 'date',
          label: '表头合并2',
          minWidth: '180',
          children: [
            { prop: 'type', label: '类型', minWidth: '100' },
            {
              prop: 'date',
              label: '日期',
              minWidth: '180',
              children: [{ prop: 'date1', label: '日期22', minWidth: '180' }],
            },
          ],
        },
      ],
    },
    {
      prop: 'name',
      label: '姓名',
      minWidth: '100',
      children: [
        {
          prop: 'type',
          label: '类型',
          minWidth: '100',
          children: [{ prop: 'date1', label: '日期2552', minWidth: '180' }],
        },
      ],
    },
    {
      prop: 'type',
      label: '表头合并1',
      minWidth: '100',
      children: [
        {
          prop: 'type',
          label: '类型',
          minWidth: '100',
          children: [{ prop: 'date1', label: '日期2552', minWidth: '180' }],
        },
      ],
    },
    { prop: 'name', label: '姓名', minWidth: '100' },
    {
      prop: 'date',
      label: '表头合并2',
      minWidth: '180',
      children: [
        { prop: 'type', label: '类型', minWidth: '100' },
        {
          prop: 'date',
          label: '日期',
          minWidth: '180',
          children: [{ prop: 'date1', label: '日期22', minWidth: '180' }],
        },
      ],
    },
    { prop: 'address', label: '地址', minWidth: '220' },
    { prop: 'date1', label: '日期', minWidth: '180' },
    { prop: 'address1', label: '地址', minWidth: '220' },
  ],
}
</script>
```

:::

### 表格操作按钮

:::demo 在组件中需配置：`operator数组`<br/>`operator 数组`是显示按钮数且点击后将当前行数据传出<br/>`operatorConfig` 对象是操作列样式（可以设置宽度/列标题及是否固定在最左/右侧）<br/>按钮的颜色是以 `ElementUI` 内置 `button` 的 `type` 为准<br/>隐藏按钮——`noshow`:多种状态控制按钮的显示与隐藏<br/>例如：`noshow:[{key:'fields',val:'isHasVal'},{key:'status',val:[0,1,99]},{key:'channelCode',val:['bank']}]`<br/>注释： `noshow` 中的 `key` 值(fields/status/channelCode)是表格后台返回的字段<br/> 当 `val` 等于字符串'isHasVal'时,字段'fields'返回为空时，此行操作按钮隐藏<br/> `以上综合：`当'status'为 0/1/99 并且'channelCode'为'bank'及'fields'为空时<br/>`show: { key: 'status', val: [3,4] }`表 status 值为 3 或者 4 时，显示此操作健 根据后台字段返回是数字还是字符串来显示

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="操作列"
        ref="selectionTable"
        :table="state.table"
        :columns="state.table.columns"
        @selection-change="selectionChange"
        :isShowPagination="false"
      >
        <template #toolbar>
          <el-button
            size="default"
            type="primary"
            :disabled="state.ids.length < 1"
            @click="cancelSelect"
            >取消选中</el-button
          >
          <el-button size="default" type="primary" @click="add">新增</el-button>
          <el-button
            size="default"
            type="danger"
            :disabled="state.ids.length < 1"
            @click="del"
            >删除</el-button
          >
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue'
const viewDetail = (val) => {
  console.log('viewDetail', val)
}
const edit = (val) => {
  console.log('edit', val)
}
const nullify = (val) => {
  console.log('nullify', val)
}
// 获取ref
const selectionTable: any = ref<HTMLElement | null>(null)
let state = reactive({
  table: {
    firstColumn: { type: 'selection', fixed: true },
    // 接口返回数据
    data: [
      {
        id: '1',
        date: '2019-09-25',
        date1: '2019-09-26',
        name: '张三',
        status: '2',
        address: '广东省广州市天河区',
      },
      {
        id: '2',
        date: '2019-09-26',
        date1: '2019-09-27',
        name: '张三1',
        status: '1',
        address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
      },
      {
        id: '3',
        date: '2019-09-26',
        date1: '2019-09-28',
        name: '张三1',
        status: '1',
        address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
      },
      {
        id: '4',
        date: '2019-09-26',
        date1: '2019-09-29',
        name: '张三1',
        status: '1',
        address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
      },
    ],
    // 表头数据
    columns: [
      { prop: 'name', label: '姓名', minWidth: '100' },
      { prop: 'date', label: '日期', minWidth: '180' },
      {
        prop: 'status',
        label: '状态',
        minWidth: '220',
      },
      { prop: 'date1', label: '日期22', minWidth: '180' },
      {
        prop: 'address',
        label: '地址',
        minWidth: '220',
      },
    ],
    // 表格内操作列
    operator: [
      {
        text: '查看',
        fun: viewDetail,
        // show: { key: 'status', val: ['1'] },
        noshow: [{ key: 'status', val: ['1'] }],
      },
      {
        text: '编辑',
        fun: edit,
      },
      {
        text: '作废',
        fun: nullify,
      },
    ],
    // 操作列样式
    operatorConfig: {
      fixed: 'right', // 固定列表右边（left则固定在左边）
      width: 200,
      label: '操作',
    },
  },
  ids: [],
})
// 选择复选框
const selectionChange = (val: any) => {
  console.log('选择复选框', val)
  state.ids = val
}
// 取消选中
const cancelSelect = () => {
  console.log('取消选中', selectionTable.value)
  if (state.ids.length > 0) {
    console.log('取消选中222', selectionTable.value)
    selectionTable.value.clearSelection()
  }
}
// 新增按钮
const add = () => {
  console.log('add按钮')
}
// 删除按钮
const del = () => {
  console.log('del按钮')
}
</script>
```

:::

### 集成分页器

:::demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table title="集成分页器" :table="table" :columns="table.columns" />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
// import { onMounted } from 'vue'
const table = {
  total: 20,
  currentPage: 1,
  pageSize: 10,
  // 接口返回数据
  data: [
    {
      id: '1',
      date: '2019-09-25',
      date1: '2019-09-26',
      name: '张三',
      status: '2',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '3',
      date: '2019-09-26',
      date1: '2019-09-28',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '4',
      date: '2019-09-26',
      date1: '2019-09-29',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
  ],
  // 表头数据
  columns: [
    { prop: 'name', label: '姓名', minWidth: '100' },
    { prop: 'date', label: '日期', minWidth: '180' },
    { prop: 'status', label: '状态', minWidth: '80' },
    { prop: 'address', label: '地址', minWidth: '220' },
  ],
}
// onMounted(() => {
//   table.total = 100
// })
// 选择当前展示的总页码
const handlesSizeChange = (val) => {
  console.log('选择当前展示的总页码', val)
  table.pageSize = val
}
// 选择当前页码
const handlesCurrentChange = (val) => {
  console.log('选择当前页码', val)
  table.currentPage = val
}
</script>
```

:::

### 某列 render 渲染

:::demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="某列render渲染"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
const table = {
  // 接口返回数据
  data: [
    {
      id: '1',
      date: '2019-09-25',
      date1: '2019-09-26',
      name: '张三',
      status: '2',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '3',
      date: '2019-09-26',
      date1: '2019-09-28',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '4',
      date: '2019-09-26',
      date1: '2019-09-29',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
  ],
  // 表头数据
  columns: [
    { prop: 'name', label: '姓名', minWidth: '100' },
    { prop: 'date', label: '日期', minWidth: '180' },
    {
      prop: 'status',
      label: 'render方式',
      minWidth: '220',
      //  render: val => {
      //    let label
      //    switch (val) {
      //      case '1':
      //        label = '待办'
      //        break
      //      case '2':
      //        label = '待提交'
      //        break
      //      case '3':
      //        label = '完成'
      //        break
      //    }
      //    return <div>{label}</div>
      //  }
    },
    { prop: 'date1', label: '日期22', minWidth: '180' },
    {
      prop: 'address',
      label: '地址',
      minWidth: '220',
    },
  ],
}
</script>
```

:::

### 某列 作用域插槽渲染

:::demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="某列插槽渲染"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      >
        <!-- 插槽渲染 -->
        <template #date1="{ scope }">
          <div>{{ scope.row.date1 }}</div>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
const table = {
  // 接口返回数据
  data: [
    {
      id: '1',
      date: '2019-09-25',
      date1: '2019-09-26',
      name: '张三',
      status: '2',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '3',
      date: '2019-09-26',
      date1: '2019-09-28',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '4',
      date: '2019-09-26',
      date1: '2019-09-29',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
  ],
  // 表头数据
  columns: [
    { prop: 'name', label: '姓名', minWidth: '100' },
    { prop: 'date', label: '日期', minWidth: '180' },
    {
      prop: 'status',
      label: 'render方式',
      minWidth: '220',
      //  render: val => {
      //    let label
      //    switch (val) {
      //      case '1':
      //        label = '待办'
      //        break
      //      case '2':
      //        label = '待提交'
      //        break
      //      case '3':
      //        label = '完成'
      //        break
      //    }
      //    return <div>{label}</div>
      //  }
    },
    { prop: 'date1', label: '插槽渲染', minWidth: '180', slotName: 'date1' },
    {
      prop: 'address',
      label: '地址',
      minWidth: '220',
    },
  ],
}
</script>
```

:::

### 自定义表头渲染

:::demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="自定义表头渲染"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      >
        <!-- 插槽渲染 -->
        <template #date1="{ scope }">
          <div>{{ scope.row.date1 }}</div>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
const table = {
  // 接口返回数据
  data: [
    {
      id: '1',
      date: '2019-09-25',
      date1: '2019-09-26',
      name: '张三',
      status: '2',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '3',
      date: '2019-09-26',
      date1: '2019-09-28',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '4',
      date: '2019-09-26',
      date1: '2019-09-29',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
  ],
  // 表头数据
  columns: [
    { prop: 'name', label: '姓名', minWidth: '100' },
    {
      prop: 'date',
      label: '自定义表头',
      minWidth: '180',
      //  renderHeader: column => {
      //    console.log(789, column)
      //    return (
      //      <div>
      //        <span style="color:red">自定义表头</span>
      //        <search style="width: 1em; height: 1em; margin-right: 8px" />
      //      </div>
      //    )
      //  }
    },
    {
      prop: 'status',
      label: 'render方式',
      minWidth: '220',
      //  render: val => {
      //    let label
      //    switch (val) {
      //      case '1':
      //        label = '待办'
      //        break
      //      case '2':
      //        label = '待提交'
      //        break
      //      case '3':
      //        label = '完成'
      //        break
      //    }
      //    return <div>{label}</div>
      //  }
    },
    { prop: 'date1', label: '插槽渲染', minWidth: '180', slotName: 'date1' },
    {
      prop: 'address',
      label: '地址',
      minWidth: '220',
    },
  ],
}
</script>
```

:::

### 动态显示隐藏列且可以拖动排序

:::demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="动态显示隐藏列且可以拖动排序"
        :table="table"
        name="Vuepress2Docs"
        columnSetting
        :columns="table.columns"
        :isShowPagination="false"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
let table = {
  // 接口返回数据
  data: [
    {
      id: '1',
      date: '2019-09-25',
      date1: '2019-09-26',
      name: '张三',
      status: '2',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '3',
      date: '2019-09-26',
      date1: '2019-09-28',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '4',
      date: '2019-09-26',
      date1: '2019-09-29',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
  ],
  // 表头数据
  columns: [
    { prop: 'name', label: '姓名', minWidth: '100' },
    { prop: 'date', label: '日期', minWidth: '180' },
    { prop: 'status', label: '状态', minWidth: '80' },
    { prop: 'address', label: '地址', minWidth: '220' },
  ],
}
</script>
```

:::

### 单元格编辑功能

:::demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="单元格编辑功能"
        :table="state.table"
        :columns="state.table.columns"
        :isShowPagination="false"
        :listTypeInfo="state.table.listTypeInfo"
        isShowFooterBtn
        @save="save"
        @handleEvent="handleEvent"
      >
        <template #packageNumEnd="{ scope }">
          <el-input clearable v-model="scope.row[scope.column.property]" />
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
// 保存
const save = (tableData) => {
  console.log('最终Table数据', tableData)
}
// 编辑单元格监听事件
const handleEvent = (type, val, index) => {
  console.log(
    `自己标识编辑单元格event值：${type}---修改后的值：${val}----当前所在行：${index}`
  )
}

let state = reactive({
  table: {
    // 接口返回数据
    data: [],
    // 表头数据
    columns: [
      {
        prop: 'area',
        label: '装炉位置',
        minWidth: '120',
        canEdit: true,
        configEdit: {
          label: '装炉位置',
          type: 'select-arr',
          editComponent: 'el-select',
          list: 'furnaceAreaList',
          arrLabel: 'dictLabel',
          arrKey: 'dictValue',
          event: '装炉位置area',
        },
      },
      {
        prop: 'layer',
        label: '装炉层',
        minWidth: '120',
        canEdit: true,
        configEdit: {
          label: '装炉层',
          type: 'select-arr',
          editComponent: 'el-select',
          list: 'furnaceLayerList',
          arrLabel: 'dictLabel',
          arrKey: 'dictValue',
          // event: '装炉层layer',
        },
      },
      {
        prop: 'isTail',
        label: '是否尾包',
        minWidth: '60',
        canEdit: true,
        configEdit: {
          label: '是否尾包',
          type: 'checkbox',
          editComponent: 'el-checkbox',
        },
      },
      {
        prop: 'packageNumStart',
        label: '开始编号',
        minWidth: '100',
        canEdit: true,
        configEdit: {
          label: '开始编号',
          type: 'input',
          editComponent: 'el-input',
        },
      },
      {
        prop: 'packageNumEnd',
        label: '使用插槽',
        minWidth: '100',
        canEdit: true,
        configEdit: {
          label: '使用插槽',
          type: 'input',
          editSlotName: 'packageNumEnd',
          // editComponent: 'el-input',
        },
      },
      { prop: 'startDate', label: '生产日期', minWidth: '100' },
      { prop: 'endDate', label: '出炉日期', minWidth: '100' },
      {
        prop: 'singleWeight',
        label: '单包重量（吨）',
        minWidth: '160',
        canEdit: true,
        configEdit: {
          label: '单包重量（吨）',
          type: 'input',
          editComponent: 'el-input-number',
          event: 'singleWeight',
        },
      },
    ],
    listTypeInfo: {
      furnaceAreaList: [
        {
          dictLabel: '炉头',
          dictValue: '1',
        },
        {
          dictLabel: '炉中',
          dictValue: '2',
        },
        {
          dictLabel: '炉尾',
          dictValue: '3',
        },
      ],
      furnaceLayerList: [
        {
          dictLabel: '上层',
          dictValue: '1',
        },
        {
          dictLabel: '中层',
          dictValue: '2',
        },
        {
          dictLabel: '下层',
          dictValue: '3',
        },
      ],
    },
  },
})

let resData = [
  {
    area: '1',
    singleWeight: 1.0,
    endDate: '2022-06-06',
    updateBy: 'jiangyx',
    createByName: '姜宇轩',
    remark: null,
    isDeleted: false,
    packageNumStart: 1,
    packageNumEnd: 3,
    createTime: '2022-06-06 09:44:17',
    isTail: false,
    startDate: '2022-06-06',
    workOrderBatchRecordId: 96,
    layer: '1',
    id: 104,
    updateByName: '姜宇轩',
    updateTime: '2022-06-06 11:05:49',
    code: 'FJSMH1000106',
    isPrint: true,
    ids: [2228, 2229, 2230],
  },
  {
    area: '2',
    singleWeight: 1.0,
    endDate: '2022-06-06',
    updateBy: 'libowen',
    createByName: '李博文',
    remark: null,
    isDeleted: false,
    packageNumStart: 1,
    packageNumEnd: 5,
    createTime: '2022-06-08 08:37:34',
    isTail: false,
    startDate: '2022-06-06',
    workOrderBatchRecordId: 96,
    layer: '2',
    id: 105,
    updateByName: '李博文',
    updateTime: '2022-06-08 08:37:34',
    code: 'FJSMH1000106',
    isPrint: true,
    ids: [2231, 2232, 2233, 2234, 2235],
  },
  {
    area: '3',
    singleWeight: 1.0,
    endDate: '2022-06-06',
    updateBy: 'libowen',
    createByName: '李博文',
    remark: null,
    isDeleted: false,
    packageNumStart: 1,
    packageNumEnd: 5,
    createTime: '2022-06-08 08:53:43',
    isTail: false,
    startDate: '2022-06-06',
    workOrderBatchRecordId: 96,
    layer: '3',
    id: 106,
    updateByName: '李博文',
    updateTime: '2022-06-08 08:53:43',
    code: 'FJSMH1000106',
    isPrint: true,
    ids: [2236, 2237, 2238, 2239, 2240],
  },
]
state.table.data = resData
</script>
```

:::

### 单元格单独编辑

:::demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="单元格单独编辑"
        :table="state.table"
        :columns="state.table.columns"
        :isShowPagination="false"
        :listTypeInfo="state.table.listTypeInfo"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { ref, reactive, toRefs } from 'vue'
// 保存
const save = (row: any) => {
  const { labelInfoId, labelScanLogId, equipmentCode, weight } = row
  const obj = {
    labelInfoId,
    labelScanLogId,
    equipmentCode,
    weight,
  }
  console.log('最终变化的数据', obj)

  state.table.columns.map(
    (item: { label: string; canEdit: boolean; prop: string }) => {
      if (item.label == '生产设备') {
        item.canEdit = false
        item.prop = 'equipmentName'
      }
      if (item.label == '重量') {
        item.canEdit = false
      }
    }
  )
  state.table.operator.map((val: { text: string; disabled: boolean }) => {
    if (val.text == '编辑') {
      val.disabled = false
    }
  })
  row.isEdit = false
}
// 取消
const cancel = (row: any) => {
  row.isEdit = false
  state.table.operator.map((val: { text: string; disabled: boolean }) => {
    if (val.text == '编辑') {
      val.disabled = false
    }
  })
  state.table.columns.map(
    (item: { label: string; canEdit: boolean; prop: string }) => {
      if (item.label == '生产设备') {
        item.canEdit = false
        item.prop = 'equipmentName'
      }
      if (item.label == '重量') {
        item.canEdit = false
      }
    }
  )
}
// 修改
const edit = (row: any) => {
  row.isEdit = true
  state.table.operator.map((val: { text: string; disabled: boolean }) => {
    if (val.text == '编辑') {
      val.disabled = true
    }
  })
  state.table.columns.map(
    (item: { label: string; canEdit: boolean; prop: string }) => {
      if (item.label == '生产设备') {
        item.canEdit = true
        item.prop = 'equipmentCode'
      }
      if (item.label == '重量') {
        item.canEdit = true
      }
    }
  )
}

let state = reactive({
  table: {
    // 接口返回数据
    data: [],
    columns: [
      { prop: 'workOrderNo', label: '工单号', minWidth: '160' },
      { prop: 'workStepName', label: '工序', minWidth: '100' },
      { prop: 'materialName', label: '物料', minWidth: '140' },
      { prop: 'materialSpecs', label: '规格', minWidth: '140' },
      { prop: 'batchNo', label: '物料批次', minWidth: '180' },
      { prop: 'labelCode', label: '包号', minWidth: '220' },
      {
        prop: 'weight',
        label: '重量',
        minWidth: '180',
        canEdit: false,
        configEdit: {
          label: '重量',
          type: 'input',
          editComponent: 'el-input-number',
          event: 'weight',
          bind: (scope: { row: { isEdit: any } }) => {
            return {
              controls: false,
              disabled: scope.row.isEdit ? false : true,
              min: 0,
              max: 9999,
              precision: 2,
            }
          },
        },
      },
      {
        prop: 'equipmentName',
        label: '生产设备',
        minWidth: '200',
        canEdit: false,
        configEdit: {
          label: '生产设备',
          type: 'select-arr',
          editComponent: 'el-select',
          list: 'equipmentList',
          arrLabel: 'equipmentName',
          arrKey: 'equipmentCode',
          bind: (scope: { row: { isEdit: any } }) => {
            return {
              disabled: scope.row.isEdit ? false : true,
            }
          },
        },
      },
      {
        prop: 'scanType',
        label: '工位类型',
        minWidth: '110',
        // render: (text: any) => {
        //   let val = ''
        //   switch (text) {
        //     case 5:
        //       val = '上料工位'
        //       break
        //     case 6:
        //       val = '下料工位'
        //       break
        //   }
        //   return <span>{val}</span>
        // },
      },
      { prop: 'createBy', label: '操作人', minWidth: '120' },
      { prop: 'team', label: '班组', minWidth: '100' },
      { prop: 'createTime', label: '操作时间', minWidth: '160' },
      { prop: 'updateBy', label: '修改人', minWidth: '120' },
      { prop: 'updateTime', label: '修改时间', minWidth: '160' },
    ],
    listTypeInfo: {
      equipmentList: [
        {
          id: 77,
          equipmentGroupId: 12,
          equipmentCode: '0-A-jzescj-0005',
          equipmentName: '1#电捕',
          deptName: '石墨电极厂',
        },
        {
          id: 78,
          equipmentGroupId: 12,
          equipmentCode: '0-A-jzescj-0006',
          equipmentName: '2#电捕',
          deptName: '石墨电极厂',
        },
        {
          id: 79,
          equipmentGroupId: 12,
          equipmentCode: '0-A-jzescj-0007',
          equipmentName: '3#电捕',
          deptName: '石墨电极厂',
        },
      ],
    },
    operator: [
      {
        text: '编辑',
        disabled: false,
        show: { key: 'isEdit', val: [false] },
        fun: edit,
      },
      {
        text: '保存',
        fun: save,
        show: { key: 'isEdit', val: [true] },
      },
      {
        text: '取消',
        fun: cancel,
        show: { key: 'isEdit', val: [true] },
      },
    ],
    operatorConfig: {
      fixed: 'right', // 固定列表右边（left则固定在左边）
      width: 160,
      label: '操作',
    },
  },
})

let resData = [
  {
    workOrderNo: '20221214',
    workStepName: '粉碎',
    materialName: '针状焦',
    materialSpecs: '0-40nm',
    batchNo: '20221214-1214',
    labelCode: '20221214_FS_01',
    weight: 350.0,
    equipmentName: '1#电捕',
    scanType: 6,
    createBy: '负极材料员工',
    team: '甲班',
    createTime: '2022-12-14 15:44:50',
    updateBy: null,
    updateTime: null,
    equipmentCode: '0-A-jzescj-0005',
    labelInfoId: 338,
    labelScanLogId: 753,
    equipmentGroupId: 12,
    stepNum: 1,
    duty: '白班',
    workOrderStepId: 171,
    exceptionType: null,
  },
  {
    workOrderNo: '20221214',
    workStepName: '粉碎',
    materialName: '负极材料',
    materialSpecs: '0-60nm',
    batchNo: '2022',
    labelCode: '2022_04',
    weight: 1.0,
    equipmentName: '2#电捕',
    scanType: 5,
    createBy: '负极材料员工',
    team: '甲班',
    createTime: '2022-12-14 15:42:26',
    updateBy: '陈文',
    updateTime: '2023-04-26 11:23:42',
    equipmentCode: '0-A-jzescj-0006',
    labelInfoId: 104,
    labelScanLogId: 752,
    equipmentGroupId: 12,
    stepNum: 1,
    duty: '白班',
    workOrderStepId: 171,
    exceptionType: null,
  },
  {
    workOrderNo: '221024-02',
    workStepName: '粉碎1',
    materialName: '负极材料',
    materialSpecs: '0-60nm',
    batchNo: 'S102402',
    labelCode: 'S102402_01',
    weight: 50.0,
    equipmentName: '1#电捕',
    scanType: 5,
    createBy: '负极材料员工',
    team: '甲班',
    createTime: '2022-10-24 14:45:56',
    updateBy: null,
    updateTime: null,
    equipmentCode: '0-A-jzescj-0005',
    labelInfoId: 330,
    labelScanLogId: 742,
    equipmentGroupId: 10,
    stepNum: 1,
    duty: '白班',
    workOrderStepId: 169,
    exceptionType: null,
  },
  {
    workOrderNo: '221024-01',
    workStepName: '粉碎1',
    materialName: '负极材料',
    materialSpecs: '0-60nm',
    batchNo: 'S1024',
    labelCode: 'S1024_01',
    weight: 50.0,
    equipmentName: '1#电捕',
    scanType: 5,
    createBy: '负极材料员工',
    team: '甲班',
    createTime: '2022-10-24 14:38:20',
    updateBy: null,
    updateTime: null,
    equipmentCode: '0-A-jzescj-0005',
    labelInfoId: 326,
    labelScanLogId: 739,
    equipmentGroupId: 10,
    stepNum: 1,
    duty: '白班',
    workOrderStepId: 167,
    exceptionType: null,
  },
  {
    workOrderNo: '220816-01',
    workStepName: '整形',
    materialName: '针状焦',
    materialSpecs: '0-40nm',
    batchNo: '220816-01-0816',
    labelCode: '220816-01_FS_07',
    weight: 50.0,
    equipmentName: '3#电捕',
    scanType: 5,
    createBy: '负极材料员工',
    team: '乙班',
    createTime: '2022-09-02 15:25:13',
    updateBy: null,
    updateTime: null,
    equipmentCode: '0-A-jzescj-0007',
    labelInfoId: 319,
    labelScanLogId: 735,
    equipmentGroupId: 12,
    stepNum: 2,
    duty: '白班',
    workOrderStepId: 141,
    exceptionType: null,
  },
]
resData.map((item: any) => {
  item.isEdit = false
})
state.table.data = resData
</script>
```

:::

### TTable 参数配置

---

#### 1、代码示例

```html
<t-table
  :table="table"
  :columns="table.columns"
  @size-change="handlesSizeChange"
  @page-change="handlesCurrentChange"
/>
```

#### 2、配置参数（Table Attributes）

| 参数                    | 说明                                                                           | 类型         | 默认值  |
| :---------------------- | :----------------------------------------------------------------------------- | :----------- | :------ |
| table                   | 表格数据对象                                                                   | Object       | {}      |
| ---data                 | 展示数据                                                                       | Array        | []      |
| ---toolbar              | 表格外操作栏选中表格某行，可以将其数据传出                                     | Array        | []      |
| ---operator             | 表格内操作栏数据                                                               | Array        | []      |
| -------show             | 表格内操作栏根据状态显示                                                       | Object       | -       |
| -------noshow           | 表格内操作栏根据多种状态不显示                                                 | Array        | -       |
| ---operatorConfig       | 表格内操作栏样式                                                               | Object       | -       |
| ---firstColumn          | 表格首列(序号 index,复选框 selection）排列                                     | object       | -       |
| ---total                | 数据总条数                                                                     | Number       | -       |
| ---pageSize             | 页数量                                                                         | Number       | -       |
| ---currentPage          | 是否需要显示切换页条数                                                         | Number       | -       |
| columns                 | 表头信息                                                                       | Array        | []      |
| ----sort                | 排序 （设置：sort:true）                                                       | Boolean      | false   |
| ----renderHeader        | 列标题 Label 区域渲染使用的 Function(val) 可以用 jsx 方式                      | Function     | -       |
| ----bind                | el-table-column Attributes                                                     | Object       | -       |
| ----noShowTip           | 是否换行 （设置：noShowTip:true）                                              | Boolean      | false   |
| ----slotName            | 插槽显示此列数据（其值是具名作用域插槽                                         | String       | -       |
| ----------param         | 具名插槽获取此行数据必须用解构接收{scope}.row 是当前行数据 }                   | Object       | -       |
| ----canEdit             | 是否开启单元格编辑功能                                                         | Boolean      | false   |
| ----configEdit          | 表格编辑配置（开启编辑功能有效）                                               | Object       | -       |
| ----------label         | placeholder 显示                                                               | String       | -       |
| ----------editComponent | 组件名称可直接指定全局注册的组件，也可引入'element/abtd'如：'a-input/el-input' | String       | -       |
| ----------bind          | 第三方 UI 的 Attributes，如 el-input 中的 clearable 清空功能                   | Object       | -       |
| ----------event         | 触发 handleEvent 事件的标志                                                    | String       | -       |
| ----------type          | 下拉或者复选框显示（select-arr/select-obj/checkbox）                           | String       | -       |
| ----------list          | 下拉选择数据源名称                                                             | String       | -       |
| ----------arrLabel      | type:select-arr 时对应显示的中文字段                                           | String       | -       |
| ----------arrKey        | type:select-arr 时对应显示的数字字段                                           | String       | -       |
| ----filters             | 字典过滤                                                                       | Object       | -       |
| ----------list          | listTypeInfo 里面对应的下拉数据源命名                                          | String       | -       |
| ----------key           | 数据源的 key 字段                                                              | String       | 'value' |
| ----------label         | 数据源的 label 字段                                                            | String       | 'label' |
| listTypeInfo            | 下拉选择数据源                                                                 | Object       | -       |
| footer                  | 底部操作区（默认隐藏，使用插槽展示“保存”按钮）                                 | slot         | -       |
| isShowFooterBtn         | 是否显示保存按钮                                                               | Boolean      | false   |
| title                   | 表格左上标题                                                                   | String /slot | -       |
| isShowPagination        | 是否显示分页(默认显示分页)                                                     | Boolean      | true    |
| isTableColumnHidden     | 是否开启合计行隐藏复选框/单选框                                                | Boolean      | false   |
| isCopy                  | 是否允许双击单元格复制                                                         | Boolean      | false   |
| rowClickRadio           | 是否开启点击整行选中单选框                                                     | Boolean      | true    |
| columnSetting           | 是否显示设置（隐藏/显示列）                                                    | Boolean      | false   |
| name                    | 与 columnSetting 配合使用标记隐藏/显示列唯一性                                 | String       | title   |

#### 3、events 其他事件按照 el-table 直接使用（如 sort-change 排序事件）

| 事件名      | 说明             | 返回值                                        |
| :---------- | :--------------- | :-------------------------------------------- |
| page-change | 当前页码         | 当前选中的页码                                |
| save        | 保存按钮         | 编辑后的所有数据                              |
| handleEvent | 单个输入触发事件 | configEdit 中的 event 值和对应输入的 value 值 |
| radioChange | 单选选中事件     | 返回当前选中的整行数据                        |

#### 4、Methods 方法

| 事件名             | 说明                         | 参数 |
| :----------------- | :--------------------------- | :--- |
| clearSelection     | 用于多选表格，清空用户的选择 | -    |
| clearSort          | 清空排序条件                 | -    |
| toggleRowSelection | 取消某一项选中项             | -    |
