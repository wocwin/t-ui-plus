<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="表格--筛选功能"
        ref="selectionTable"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
// 获取ref
const selectionTable: any = ref<HTMLElement | null>(null)
const filters = [
  { text: "2019-09-25", value: "2019-09-25" },
  { text: "2019-09-26", value: "2019-09-26" },
  { text: "2019-09-27", value: "2019-09-27" },
  { text: "2019-09-28", value: "2019-09-28" }
]
const filterHandler = (value: string, row: any, column: any) => {
  const property = column["property"]
  return row[property] === value
}
let table = reactive<TableTypes.Table>({
  data: [
    {
      id: "1",
      date: "2019-09-25",
      name: "张三",
      status: "2",
      address: "广东省广州市天河区"
    },
    {
      id: "2",
      date: "2019-09-27",
      name: "张三1",
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "3",
      date: "2019-09-28",
      name: "张三2",
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "4",
      date: "2019-09-26",
      name: "张三3",
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    }
  ],
  columns: [
    {
      prop: "date",
      label: "日期",
      minWidth: "180",
      bind: { filters, "filter-method": filterHandler }
    },
    { prop: "name", label: "姓名", minWidth: "100" },
    { prop: "status", label: "状态", minWidth: "80" },
    { prop: "address", label: "地址", minWidth: "220" }
  ]
})
</script>
