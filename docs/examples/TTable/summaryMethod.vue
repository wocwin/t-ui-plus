<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="自定义表尾合计"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
        show-summary
        :summary-method="summaryMethod"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { ref } from "vue"
const table = ref<TableTypes.Table>({
  data: [
    {
      id: "1",
      date: "2019-09-25",
      date1: "2019-09-26",
      name: "张三",
      status: "2",
      num: 1,
      address: "广东省广州市天河区"
    },
    {
      id: "2",
      date: "2019-09-26",
      date1: "2019-09-27",
      name: "张三1",
      status: "1",
      num: 2,
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "3",
      date: "2019-09-26",
      date1: "2019-09-28",
      name: "张三1",
      status: "1",
      num: 3,
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "4",
      date: "2019-09-26",
      date1: "2019-09-29",
      name: "张三1",
      status: "1",
      num: 4,
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    }
  ],
  // 表头数据
  columns: [
    { prop: "name", label: "姓名", minWidth: "100" },
    { prop: "date", label: "日期", minWidth: "180" },
    { prop: "status", label: "状态", minWidth: "80" },
    { prop: "num", label: "数量", minWidth: "80" },
    { prop: "address", label: "地址", minWidth: "220" }
  ]
})
const summaryMethod = ({ columns, data }) => {
  const sums: any = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "总价"
      return
    }
    const values = data.map(item => Number(item[column.property === "num" ? column.property : ""]))
    if (!values.every(value => isNaN(value))) {
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] += " 元"
    } else {
      sums[index] = ""
    }
  })

  return sums
}
</script>
