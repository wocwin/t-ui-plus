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
        :opts="opts"
        @submit="conditionEnter"
      >
        <template #querybar>
          <el-button type="danger">导出</el-button>
        </template>
      </t-select-table>
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
    workshopNum: {
      label: '车间',
      comp: 'el-select',
      changeEvent: 'change',
      type: 'select-arr',
      list: 'sexList',
      listTypeInfo: state.listTypeInfo,
      span: 2,
      bind: {
        teleported: false,
        placement: 'right',
      },
    },
    userName: {
      label: '登录名称',
      comp: 'el-input',
      span: 2,
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
