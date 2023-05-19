<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="单元格编辑--键盘事件功能"
        :table="state.table"
        :columns="state.table.columns"
        :isShowPagination="false"
        :listTypeInfo="state.table.listTypeInfo"
        isShowFooterBtn
        isKeyup
        @save="save"
        @handleEvent="handleEvent"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
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

let state: any = reactive({
  table: {
    // 接口返回数据
    data: [],
    // 表头数据
    columns: [
      {
        prop: 'area1',
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
        prop: 'layer1',
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
        prop: 'isTail1',
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
        prop: 'packageNumStart1',
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
        prop: 'packageNumEnd1',
        label: '结束编号',
        minWidth: '100',
        canEdit: true,
        configEdit: {
          label: '结束编号',
          type: 'input',
          editComponent: 'el-input',
        },
      },
      { prop: 'startDate', label: '生产日期', minWidth: '100' },
      { prop: 'endDate', label: '出炉日期', minWidth: '100' },
      {
        prop: 'singleWeight1',
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
    area1: '',
    singleWeight: 1.0,
    endDate: '2022-06-06',
    updateBy: 'jiangyx',
    createByName: '姜宇轩',
    remark: null,
    isDeleted: false,
    packageNumStart1: null,
    packageNumEnd1: null,
    createTime: '2022-06-06 09:44:17',
    isTail: false,
    startDate: '2022-06-06',
    workOrderBatchRecordId: 96,
    layer1: '',
    id: 104,
    updateByName: '姜宇轩',
    updateTime: '2022-06-06 11:05:49',
    code: 'FJSMH1000106',
    isPrint: true,
    ids: [2228, 2229, 2230],
  },
  {
    area1: '',
    singleWeight: 1.0,
    endDate: '2022-06-06',
    updateBy: 'libowen',
    createByName: '李博文',
    remark: null,
    isDeleted: false,
    packageNumStart1: null,
    packageNumEnd1: null,
    createTime: '2022-06-08 08:37:34',
    isTail: false,
    startDate: '2022-06-06',
    workOrderBatchRecordId: 96,
    layer1: '',
    id: 105,
    updateByName: '李博文',
    updateTime: '2022-06-08 08:37:34',
    code: 'FJSMH1000106',
    isPrint: true,
    ids: [2231, 2232, 2233, 2234, 2235],
  },
  {
    area1: '',
    singleWeight: 1.0,
    endDate: '2022-06-06',
    updateBy: 'libowen',
    createByName: '李博文',
    remark: null,
    isDeleted: false,
    packageNumStart1: null,
    packageNumEnd1: null,
    createTime: '2022-06-08 08:53:43',
    isTail: false,
    startDate: '2022-06-06',
    workOrderBatchRecordId: 96,
    layer1: '',
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
