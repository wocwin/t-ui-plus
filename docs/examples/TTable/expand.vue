<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="展开行"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      >
        <template #expand="{ scope }">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <el-tab-pane label="姓名" name="name">
              <div>姓名：{{ scope.row.name }}</div>
              <t-select
                placeholder="请选择工序"
                v-model="selectVlaue"
                :optionSource="stepList"
                valueCustom="label"
                @change="selectChange"
                width="200px"
            /></el-tab-pane>
            <el-tab-pane label="日期" name="date">
              <div>日期：{{ scope.row.date }}</div>
            </el-tab-pane>
            <el-tab-pane label="状态" name="status">
              <div>状态：{{ scope.row.status }}</div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import { ref } from 'vue'
let table = {
  firstColumn: { type: 'expand', fixed: true },
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
  columns: [
    { prop: 'name', label: '姓名', minWidth: '100' },
    { prop: 'date', label: '日期', minWidth: '180' },
    { prop: 'status', label: '状态', minWidth: '80' },
    { prop: 'address', label: '地址', minWidth: '220' },
  ],
}
const activeName = ref('name')
const selectVlaue = ref<any>()
const stepList = [
  { label: '开始' },
  { label: 'POSUI' },
  { label: '11' },
  { label: 'GX123' },
  { label: '烘干破碎' },
  { label: '车间仓库' },
  { label: 'ui3333' },
  { label: 'hhh333' },
]
const selectChange = (val: any) => {
  console.log('selectChange', val, selectVlaue.value)
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
