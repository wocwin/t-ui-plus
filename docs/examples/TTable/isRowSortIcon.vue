<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        tableTitle="行--拖拽排序第一列显示拖拽图标"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
        :isRowSort="isRowSort"
        :isRowSortIcon="isRowSortIcon"
        row-key="id"
        @rowSort="rowSort"
      >
        <template #toolbar>
          <el-button
            type="primary"
            @click="()=>{isRowSort = !isRowSort,isRowSortIcon = !isRowSortIcon}"
          >{{ isRowSort&&isRowSortIcon ? "关闭拖拽" : "开启拖拽" }}</el-button>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
const isRowSort = ref(true)
const isRowSortIcon = ref(true)

let table = ref<TableTypes.Table>({
  // 接口返回数据
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
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "3",
      date: "2019-09-26",
      date1: "2019-09-28",
      name: "张三2",
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "4",
      date: "2019-09-26",
      date1: "2019-09-29",
      name: "张三3",
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
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
const rowSort = (list: any, oldIndex: number, newIndex: number) => {
  console.log("行拖拽后的数据---", list)
  console.log("行拖拽前---index", oldIndex)
  console.log("行拖拽后---index", newIndex)
}
</script>
