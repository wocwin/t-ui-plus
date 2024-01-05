<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="复选框"
        ref="selectionTable"
        :table="state.table"
        :columns="state.table.columns"
        @selection-change="selectionChange"
        :isShowPagination="false"
      >
        <template #toolbar>
          <el-button
            size="default"
            type="danger"
            @click="toggleSelection([state.table.data[1], state.table.data[2]])"
            >点击选中第二第三项</el-button
          >
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
// 获取ref
const selectionTable: any = ref<HTMLElement | null>(null)
const toggleSelection = (rows?: any) => {
  if (rows) {
    rows.forEach((row) => {
      selectionTable.value!.toggleRowSelection(row, true)
    })
  } else {
    selectionTable.value!.clearSelection()
  }
}
let state = reactive({
  ids: [],
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
      { prop: 'status', label: '状态', minWidth: '80' },
      { prop: 'address', label: '地址', minWidth: '220' },
    ],
  },
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
