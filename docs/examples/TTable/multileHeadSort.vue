<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        table-title="多级表头排序"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
        sortable="custom"
        @sort-change="sortChangeHandler"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
let table = ref<TableTypes.Table>({
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
      date: "2019-09-26",
      date1: "2019-09-27",
      name: "张三1",
      status: "3",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "3",
      date: "2019-09-27",
      date1: "2019-09-28",
      name: "张三2",
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "4",
      date: "2019-09-28",
      date1: "2019-09-29",
      name: "张三3",
      status: "4",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    }
  ],
  columns: [
    {
      prop: "name",
      label: "一级表头",
      minWidth: "300",
      children: [
        {
          prop: "name",
          label: "姓名",
          minWidth: "100"
        },
        {
          prop: "date",
          label: "日期",
          minWidth: "200"
        },
        {
          prop: "date",
          label: "二级表头",
          minWidth: "180",
          children: [
            { prop: "status", label: "类型", minWidth: "100" },
            {
              prop: "date",
              label: "日期",
              minWidth: "180"
            }
          ]
        }
      ]
    },
    {
      prop: "date",
      label: "第三级表头",
      minWidth: "420",
      children: [
        { prop: "address", label: "地址22", minWidth: "260" },
        { prop: "date", label: "日期", minWidth: "180" }
      ]
    },
    { prop: "address", label: "地址", minWidth: "220" },
    { prop: "date1", label: "日期", minWidth: "180" }
  ]
})
const sortChangeHandler = ({ column, prop, order }) => {
  console.log("sortChangeHandler", column, prop, order)
}
</script>
