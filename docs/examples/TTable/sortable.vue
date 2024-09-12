<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="自定义排序--指定姓名是'张三3'的行不需要排序"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
        sortable="custom"
        @sort-change="sortChange"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
const table = ref<TableTypes.Table>({
  data: [
    {
      id: "1",
      date: "2019-09-25",
      date1: "2019-09-26",
      name: "张三",
      status: "2",
      address: "广东省广州市天河区"
    },
    {
      id: "2",
      date: "2019-09-27",
      date1: "2019-09-27",
      name: "张三1",
      status: "1",
      address: "广东省广州市天河区2"
    },
    {
      id: "3",
      date: "2019-09-28",
      date1: "2019-09-28",
      name: "张三2",
      status: "1",
      address: "广东省广州市天河区3"
    },
    {
      id: "4",
      date: "2019-09-29",
      date1: "2019-09-29",
      name: "张三3",
      status: "1",
      address: "广东省广州市天河区4"
    }
  ],
  // 表头数据
  columns: [
    { prop: "name", label: "姓名", minWidth: "100" },
    { prop: "date", label: "日期", minWidth: "180" },
    { prop: "status", label: "状态", minWidth: "80" },
    { prop: "address", label: "地址", minWidth: "220" }
  ]
})
// 自定义排序规则
const sortChange = val => {
  // console.log("自定义排序", val)
  // 不参与排序的数组
  let freeGood: any = []
  // 参与排序的数组
  let elseFree: any = []
  // fieldName 为对应列的prop
  let fieldName = val.prop
  let sortingType = val.order
  // 降序
  if (sortingType === "descending") {
    table.value.data.forEach(item => {
      // console.log("降序", item)
      // 在整个tableData中找到不参与排序的所有数据
      if (item.name == "张三3") {
        // 不参与排序的所有数据加到数组中
        freeGood.push(item)
      } else {
        // 参与排序的数据
        elseFree.push(item)
      }
    })
    table.value.data = elseFree.sort((a, b) => {
      // console.log(555, typeof a[fieldName])
      if (typeof a[fieldName] === "string") {
        return b[fieldName].localeCompare(a[fieldName])
      } else if (typeof a[fieldName] === "number") {
        return b[fieldName] - a[fieldName]
      }
    })
    // console.log("降序--", freeGood)
    table.value.data = [...table.value.data, ...freeGood]
  } else {
    table.value.data.forEach(item => {
      if (item.name == "张三3") {
        freeGood.push(item)
      } else {
        elseFree.push(item)
      }
    })
    table.value.data = elseFree.sort((a, b) => {
      if (typeof a[fieldName] === "string") {
        return a[fieldName].localeCompare(b[fieldName])
      } else if (typeof a[fieldName] === "number") {
        return a[fieldName] - b[fieldName]
      }
    })
    table.value.data = [...table.value.data, ...freeGood]
  }
}
</script>
