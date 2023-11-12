<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-select-table
        :table="table"
        :columns="table.columns"
        :max-height="400"
        :keywords="{ label: 'name', value: 'id' }"
        @radioChange="radioChange"
        :tableWidth="1000"
        isShowQuery
        multiple
        isShowBlurBtn
        :btnBind="{color:'#626aef',icon:'Edit'}"
        :opts="opts"
        @submit="conditionEnter"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue'
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
  list: [
    {
      value: '1',
      label: 'Level one 1',
      children: [
        {
          value: '1-1',
          label: 'Level two 1-1',
          children: [
            {
              value: '1-1-1',
              label: 'Level three 1-1-1',
            },
          ],
        },
      ],
    },
    {
      value: '2',
      label: 'Level one 2',
      children: [
        {
          value: '2-1',
          label: 'Level two 2-1',
          children: [
            {
              value: '2-1-1',
              label: 'Level three 2-1-1',
            },
          ],
        },
        {
          value: '2-2',
          label: 'Level two 2-2',
          children: [
            {
              value: '2-2-1',
              label: 'Level three 2-2-1',
            },
          ],
        },
      ],
    },
    {
      value: '3',
      label: 'Level one 3',
      children: [
        {
          value: '3-1',
          label: 'Level two 3-1',
          children: [
            {
              value: '3-1-1',
              label: 'Level three 3-1-1',
            },
          ],
        },
        {
          value: '3-2',
          label: 'Level two 3-2',
          children: [
            {
              value: '3-2-1',
              label: 'Level three 3-2-1',
            },
          ],
        },
      ],
    },
  ],
})
const opts = computed(() => {
  return {
    workshopNum: {
      label: '车间',
      comp: 'el-select',
      type: 'select-arr',
      list: 'sexList',
      listTypeInfo: state.listTypeInfo,
      span: 2,
    },
    date: {
      label: '日期',
      comp: 'el-date-picker',
      span: 2,
      bind: {
        valueFormat: 'YYYY-MM-DD',
      },
    },
    date1: {
      label: '日期组件使用',
      comp: 't-date-picker',
      span: 2,
      bind: {
        type: 'daterange',
        isPickerOptions: true,
      },
    },
    userName: {
      label: '树形下拉',
      comp: 'el-tree-select',
      span: 2,
      bind: {
        'check-strictly': true,
        data: state.list,
      },
    },
    phonenumber: {
      label: '手机号码',
      comp: 'el-input',
      span: 2,
    },
  }
})
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log('点击查询按钮', data)
}
const radioChange = (row) => {
  console.log('单选--传给后台的值', row)
}
</script>
