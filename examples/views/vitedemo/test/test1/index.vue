<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="装炉记录列表"
        :table="state.table"
        :columns="state.table.columns"
        @size-change="handlesSizeChange"
        @page-change="handlesCurrentChange"
      >
        <!-- 表格外按钮toolbar插槽 -->
        <template #toolbar>
          <el-button size="default" type="primary" @click="handleEditTable"
            >新增</el-button
          >
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import data from './data.json'
import data2 from './data2.json'
import { toRefs, reactive, onBeforeMount } from 'vue'
const viewDetail = (val: any) => {
  console.log('查看', val)
}
const edit = (val: any) => {
  console.log('编辑', val)
}
const nullify = (val: any) => {
  console.log('作废', val)
}
const furnaceCharging = (val: any) => {
  console.log('装炉', val)
}
const comeOut = (val: any) => {
  console.log('去出炉', val)
}
const alteration = (val: any) => {
  console.log('变更', val)
}
const rollback = (val: any) => {
  console.log('回退', val)
}
let state = reactive<any>({
  table: {
    total: 0,
    currentPage: 1,
    pageSize: 10,
    firstColumn: { type: 'index', label: '序列' }, // 显示序列号
    data: [],
    // 表格内操作列
    operator: [
      {
        text: '查看',
        fun: viewDetail,
        show: { key: 'roastingRecordState', val: [3, 4, 5, 6] }
      },
      {
        text: '编辑',
        fun: edit,
        show: { key: 'roastingRecordState', val: [1, 2] }
      },
      {
        text: '作废',
        fun: nullify,
        show: { key: 'roastingRecordState', val: [1, 2] }
      },
      {
        text: '装炉',
        fun: furnaceCharging,
        show: { key: 'roastingRecordState', val: [1, 2] }
      },
      {
        text: '去出炉',
        fun: comeOut,
        show: { key: 'roastingRecordState', val: [3, 4] }
      },
      {
        text: '变更',
        fun: alteration,
        show: { key: 'roastingRecordState', val: [3] }
      },
      {
        text: '回退',
        fun: rollback,
        show: { key: 'roastingRecordState', val: [3] }
      }
    ],
    // 操作列样式
    operatorConfig: {
      fixed: 'right', // 固定列表右边（left则固定在左边）
      width: 220,
      label: '操作'
    },
    columns: [
      { prop: 'jobNo', label: '编号', minWidth: '120' },
      { prop: 'roastingRecordStateLabel', label: '状态', minWidth: '80' },
      { prop: 'loadTime', label: '装炉日期', minWidth: '100' },
      { prop: 'unloadTime', label: '出炉日期', minWidth: '100' },
      { prop: 'ringFurnaceCode', label: '环式炉编号', minWidth: '100' },
      { prop: 'furnaceChamberCode', label: '炉室', minWidth: '80' },
      { prop: 'batchNo', label: '批号', minWidth: '80' },
      { prop: 'inNumbers', label: '装炉数量', minWidth: '80' },
      { prop: 'outNumbers', label: '出炉数量', minWidth: '80' },
      { prop: 'createBy', label: '建档人员', minWidth: '80' }
    ]
  }
})
// const { table } = toRefs(state)
console.log(123, state.table)
onBeforeMount(() => {
  getList()
})
const getList = () => {
  let res
  if (state.table.currentPage === 1) {
    res = data
  } else {
    res = data2
  }
  if (res.success) {
    state.table.data = res.data.records
    state.table.total = res.data.total
  }
}
// 选择当前展示的总页码
const handlesSizeChange = (val: any) => {
  state.table.pageSize = val
  getList()
}
// 选择当前页码
const handlesCurrentChange = (val: any) => {
  state.table.currentPage = val
  getList()
}
const handleEditTable = () => {
  console.log('新增')
}
</script>
