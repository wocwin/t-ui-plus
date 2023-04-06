# 查询条件组件

---

### 基础用法

::: demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        :opts="opts"
        @submit="conditionEnter"
        @handleEvent="handleEvent"
        :btnResetBind="{ size: 'small' }"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
let state = reactive({
  queryData: {
    userName: null, // 登录名
    phonenumber: null, // 手机号码
    workshopNum: null,
    date: null,
    date1: null,
  },
  listTypeInfo: {
    sexList: [
      {
        dictLabel: '前纺一车间',
        dictValue: 'W1',
      },
      {
        dictLabel: '前纺二车间',
        dictValue: 'W2',
      },
    ],
  },
})
const opts = computed(() => {
  return {
    userName: {
      label: '登录名称',
      comp: 'el-input',
    },
    phonenumber: {
      label: '手机号码',
      comp: 'el-input',
    },
    workshopNum: {
      label: '车间',
      comp: 'el-select',
      changeEvent: 'change',
      type: 'select-arr',
      list: 'sexList',
      listTypeInfo: state.listTypeInfo,
    },
    date1: {
      label: '日期',
      comp: 'el-date-picker',
      bind: {
        valueFormat: 'YYYY-MM-DD',
      },
    },
    date: {
      label: '装炉时间',
      comp: 'el-date-picker',
      span: 2,
      event: 'date',
      bind: {
        rangeSeparator: '-',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'YYYY-MM-DD',
        type: 'daterange',
      },
    },
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, phonenumber, workshopNum, date, date1 } = state.queryData
  console.log(444, userName, phonenumber, date1)
  return {
    userName,
    workshopNum,
    phonenumber,
    date1,
    beginDate: date && date[0] ? date[0] : null,
    endDate: date && date[1] ? date[1] : null,
  }
})
// 查询条件change事件
const handleEvent = (type, val) => {
  // console.log(111, type, val)
  switch (type) {
    case 'date':
      console.log('获取event==date的数据', val)
      break
  }
}
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log('最终参数', getQueryData.value)
}
</script>
```

:::

### 收起&展开——默认展开

::: demo 通过设置`isExpansion`

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        :opts="opts"
        @submit="conditionEnter"
        @handleEvent="handleEvent"
        isExpansion
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
let state = reactive({
  queryData: {
    userName: null, // 登录名
    phonenumber: null, // 手机号码
    workshopNum: null,
    date: null,
    date1: null,
  },
  listTypeInfo: {
    sexList: [
      {
        dictLabel: '前纺一车间',
        dictValue: 'W1',
      },
      {
        dictLabel: '前纺二车间',
        dictValue: 'W2',
      },
    ],
  },
})
const opts = computed(() => {
  return {
    userName: {
      label: '登录名称',
      comp: 'el-input',
    },
    phonenumber: {
      label: '手机号码',
      comp: 'el-input',
    },
    workshopNum: {
      label: '车间',
      comp: 'el-select',
      changeEvent: 'change',
      type: 'select-arr',
      list: 'sexList',
      listTypeInfo: state.listTypeInfo,
    },
    date1: {
      label: '日期',
      comp: 'el-date-picker',
      bind: {
        valueFormat: 'YYYY-MM-DD',
      },
    },
    date: {
      label: '装炉时间',
      comp: 'el-date-picker',
      span: 2,
      event: 'date',
      bind: {
        rangeSeparator: '-',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'YYYY-MM-DD',
        type: 'daterange',
      },
    },
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, phonenumber, workshopNum, date, date1 } = state.queryData
  console.log(444, userName, phonenumber, date1)
  return {
    userName,
    workshopNum,
    phonenumber,
    date1,
    beginDate: date && date[0] ? date[0] : null,
    endDate: date && date[1] ? date[1] : null,
  }
})
// 查询条件change事件
const handleEvent = (type, val) => {
  // console.log(111, type, val)
  switch (type) {
    case 'date':
      console.log('获取event==date的数据', val)
      break
  }
}
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log('最终参数', getQueryData.value)
}
</script>
```

:::

### Tsx 用法

::: demo 案例暂不支持 tsx 方式`labelRender: () => {return <label style="color:red">装炉时间</label>}`，但实际项目可以这样使用

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        :opts="opts"
        @submit="conditionEnter"
        @handleEvent="handleEvent"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { computed, reactive } from 'vue'
let state = reactive({
  queryData: {
    userName: null, // 登录名
    phonenumber: null, // 手机号码
    workshopNum: null,
    date: null,
    date1: null,
  },
  listTypeInfo: {
    sexList: [
      {
        dictLabel: '前纺一车间',
        dictValue: 'W1',
      },
      {
        dictLabel: '前纺二车间',
        dictValue: 'W2',
      },
    ],
  },
})
const opts = computed(() => {
  return {
    userName: {
      label: '登录名称',
      comp: 'el-input',
    },
    phonenumber: {
      label: '手机号码',
      comp: 'el-input',
    },
    workshopNum: {
      label: '车间',
      comp: 'el-select',
      changeEvent: 'change',
      type: 'select-arr',
      list: 'sexList',
      listTypeInfo: state.listTypeInfo,
    },
    date1: {
      label: '日期',
      comp: 'el-date-picker',
      bind: {
        valueFormat: 'YYYY-MM-DD',
      },
    },
    date: {
      // labelRender: () => {
      //   return <label style="color:red">装炉时间</label>
      // },
      label: '装炉时间',
      comp: 'el-date-picker',
      span: 2,
      event: 'date',
      bind: {
        rangeSeparator: '-',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'YYYY-MM-DD',
        type: 'daterange',
      },
    },
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, phonenumber, workshopNum, date, date1 } = state.queryData
  console.log(444, userName, phonenumber, date1)
  return {
    userName,
    workshopNum,
    phonenumber,
    date1,
    beginDate: date && date[0] ? date[0] : null,
    endDate: date && date[1] ? date[1] : null,
  }
})
// 查询条件change事件
const handleEvent = (type, val) => {
  // console.log(111, type, val)
  switch (type) {
    case 'date':
      console.log('获取event==date的数据', val)
      break
  }
}
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log('最终参数', getQueryData.value)
}
</script>
```

:::

### 输入框插槽使用用法

::: demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        :opts="opts"
        @submit="conditionEnter"
        @handleEvent="handleEvent"
      >
        <template #date1="{ param }">
          <el-date-picker
            v-model="param.date1"
            type="date"
            placeholder="请选择日期"
            value-format="YYYY-MM-DD"
          />
        </template>
      </t-query-condition>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
let state = reactive({
  queryData: {
    userName: null, // 登录名
    phonenumber: null, // 手机号码
    workshopNum: null,
    date: null,
    date1: null,
  },
  listTypeInfo: {
    sexList: [
      {
        dictLabel: '前纺一车间',
        dictValue: 'W1',
      },
      {
        dictLabel: '前纺二车间',
        dictValue: 'W2',
      },
    ],
  },
})
const opts = computed(() => {
  return {
    userName: {
      label: '登录名称',
      comp: 'el-input',
    },
    phonenumber: {
      label: '手机号码',
      comp: 'el-input',
    },
    workshopNum: {
      label: '车间',
      comp: 'el-select',
      changeEvent: 'change',
      type: 'select-arr',
      list: 'sexList',
      listTypeInfo: state.listTypeInfo,
    },
    date1: {
      label: '插槽使用',
      slotName: 'date1',
      // comp: 'el-date-picker',
      // bind: {
      //   valueFormat: 'YYYY-MM-DD'
      // }
    },
    date: {
      label: '装炉时间',
      comp: 'el-date-picker',
      span: 2,
      event: 'date',
      bind: {
        rangeSeparator: '-',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'YYYY-MM-DD',
        type: 'daterange',
      },
    },
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, phonenumber, workshopNum, date, date1 } = state.queryData
  console.log(444, userName, phonenumber, date1)
  return {
    userName,
    workshopNum,
    phonenumber,
    date1,
    beginDate: date && date[0] ? date[0] : null,
    endDate: date && date[1] ? date[1] : null,
  }
})
// 查询条件change事件
const handleEvent = (type, val) => {
  // console.log(111, type, val)
  switch (type) {
    case 'date':
      console.log('获取event==date的数据', val)
      break
  }
}
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log('最终参数', getQueryData.value)
}
</script>
```

:::

### 结合 TSelect 使用

::: demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        labelWidth="130px"
        :opts="opts"
        @submit="conditionEnter"
        @handleEvent="handleEvent"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { computed, reactive } from 'vue'
let state = reactive({
  queryData: {
    userName: null, // 登录名
    phonenumber: null, // 手机号码
    workshopNum: null,
    workshopNum2: null,
    date: null,
    date1: null,
  },
  sexList: [
    {
      label: '前纺一车间',
      key: 'W1',
    },
    {
      label: '前纺二车间',
      key: 'W2',
    },
  ],
  multipleList: [
    {
      name: '前纺一车间',
      id: 'W1',
    },
    {
      name: '前纺二车间',
      id: 'W2',
    },
    {
      name: '前纺三车间',
      id: 'W3',
    },
    {
      name: '前纺四车间',
      id: 'W4',
    },
  ],
})
const opts = computed(() => {
  return {
    userName: {
      label: '登录名称',
      comp: 'el-input',
    },
    phonenumber: {
      label: '手机号码',
      comp: 'el-input',
    },
    workshopNum: {
      label: 't-select单选使用',
      comp: 't-select',
      defaultVal: 'W1',
      bind: {
        optionSource: state.sexList,
      },
    },
    date1: {
      label: '日期',
      comp: 'el-date-picker',
      bind: {
        valueFormat: 'YYYY-MM-DD',
      },
    },
    workshopNum2: {
      label: 't-select多选使用',
      placeholder: '请多选',
      span: 2,
      comp: 't-select',
      bind: {
        valueKey: 'id',
        labelKey: 'name',
        multiple: true,
        optionSource: state.multipleList,
      },
    },

    date: {
      label: '装炉时间',
      comp: 'el-date-picker',
      span: 2,
      event: 'date',
      bind: {
        rangeSeparator: '-',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'YYYY-MM-DD',
        type: 'daterange',
      },
    },
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, phonenumber, workshopNum, date, date1, workshopNum2 } =
    state.queryData
  console.log(444, userName, phonenumber, date1)
  return {
    userName,
    workshopNum,
    phonenumber,
    workshopNum2,
    date1,
    beginDate: date && date[0] ? date[0] : null,
    endDate: date && date[1] ? date[1] : null,
  }
})
// 查询条件change事件
const handleEvent = (type, val) => {
  // console.log(111, type, val)
  switch (type) {
    case 'date':
      console.log('获取event==date的数据', val)
      break
  }
}
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log('最终参数', getQueryData.value)
}
</script>
```

:::

### 按钮操作使用

::: demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        :opts="opts"
        @submit="conditionEnter"
        @handleEvent="handleEvent"
      >
        <template #querybar>
          <el-button type="danger">导出</el-button>
        </template>
      </t-query-condition>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
let state = reactive({
  queryData: {
    userName: null, // 登录名
    phonenumber: null, // 手机号码
    workshopNum: null,
    date: null,
    date1: null,
  },
  listTypeInfo: {
    sexList: [
      {
        dictLabel: '前纺一车间',
        dictValue: 'W1',
      },
      {
        dictLabel: '前纺二车间',
        dictValue: 'W2',
      },
    ],
  },
})
const opts = computed(() => {
  return {
    userName: {
      label: '登录名称',
      comp: 'el-input',
    },
    phonenumber: {
      label: '手机号码',
      comp: 'el-input',
    },
    workshopNum: {
      label: '车间',
      comp: 'el-select',
      changeEvent: 'change',
      type: 'select-arr',
      list: 'sexList',
      listTypeInfo: state.listTypeInfo,
    },
    date1: {
      label: '日期',
      comp: 'el-date-picker',
      bind: {
        valueFormat: 'YYYY-MM-DD',
      },
    },
    date: {
      label: '装炉时间',
      comp: 'el-date-picker',
      span: 2,
      event: 'date',
      bind: {
        rangeSeparator: '-',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'YYYY-MM-DD',
        type: 'daterange',
      },
    },
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, phonenumber, workshopNum, date, date1 } = state.queryData
  console.log(444, userName, phonenumber, date1)
  return {
    userName,
    workshopNum,
    phonenumber,
    date1,
    beginDate: date && date[0] ? date[0] : null,
    endDate: date && date[1] ? date[1] : null,
  }
})
// 查询条件change事件
const handleEvent = (type, val) => {
  // console.log(111, type, val)
  switch (type) {
    case 'date':
      console.log('获取event==date的数据', val)
      break
  }
}
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log('最终参数', getQueryData.value)
}
</script>
```

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
