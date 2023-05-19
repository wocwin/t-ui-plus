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
