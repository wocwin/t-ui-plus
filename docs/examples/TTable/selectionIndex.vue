<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="第一列显示复选框和序列号"
        ref="selectionTable"
        :table="table"
        :columns="table.columns"
        @selection-change="selectionChange"
        :isShowPagination="false"
        show-summary
        :summary-method="getSummaries"
      >
        <template #toolbar>
          <el-button
            size="default"
            type="danger"
            @click="toggleSelection([table.data[1], table.data[2]])"
            >点击选中第二第三项</el-button
          >
          <el-button size="default" type="primary" :disabled="ids.length < 1" @click="cancelSelect"
            >取消选中</el-button
          >
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { ref, reactive } from "vue"
// 获取ref
const selectionTable: any = ref<HTMLElement | null>(null)
const toggleSelection = (rows?: any) => {
  if (rows) {
    rows.forEach(row => {
      selectionTable.value!.toggleRowSelection(row, true)
    })
  } else {
    selectionTable.value!.clearSelection()
  }
}
const ids = ref([])
let table = reactive<TableTypes.Table>({
  firstColumn: [{ type: "selection", fixed: true }, { type: "index" }],
  // 接口返回数据
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
    {
      prop: "status",
      label: "状态",
      minWidth: "80"
    },
    { prop: "num", label: "数量", minWidth: "80" },
    { prop: "address", label: "地址", minWidth: "220" }
  ]
})
const getSummaries = (param: any) => {
  const { columns, data } = param
  const sums: any = []
  columns.forEach((column: any, index: number) => {
    if (index === 0) {
      sums[index] = "合计"
      return
    }
    const values = data.map((item: any) =>
      Number(item[column.property === "num" ? column.property : ""])
    )
    if (!values.every((value: any) => isNaN(value))) {
      sums[index] = values.reduce((prev: any, curr: any) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] += " 个"
    } else {
      sums[index] = ""
    }
  })
  return sums
}
// 选择复选框
const selectionChange = (val: any) => {
  console.log("选择复选框", val)
  ids.value = val
}
// 取消选中
const cancelSelect = () => {
  console.log("取消选中", selectionTable.value)
  if (ids.value.length > 0) {
    console.log("取消选中222", selectionTable.value)
    selectionTable.value.clearSelection()
  }
}
</script>
