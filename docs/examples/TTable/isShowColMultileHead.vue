<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="多级表头动态显示隐藏列"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      >
        <template #toolbar>
          <t-button @click="isShowHandler">{{ isShow ? "隐藏日期列" : "显示日期列" }}</t-button>
          <t-button @click="isShowHandler1">{{ isShow ? "隐藏地址列" : "显示地址列" }}</t-button>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
const isShow = ref(true)
const isChildShow = ref(true)
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
      name: "张三1",
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "4",
      date: "2019-09-26",
      date1: "2019-09-29",
      name: "张三1",
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    }
  ],
  // 表头数据
  columns: [
    { prop: "name", label: "姓名", minWidth: "100" },
    {
      prop: "",
      label: "动态显示隐藏列",
      minWidth: "180",
      isShowCol: () => isShow.value,
      children: [{ prop: "date", label: "日期", minWidth: "180" }]
    },
    {
      prop: "",
      label: "三级表头",
      minWidth: "300",
      children: [
        { prop: "status", label: "状态", minWidth: "80" },
        { prop: "address", label: "地址", minWidth: "220", isShowCol: () => isChildShow.value }
      ]
    }
  ]
})
const isShowHandler = () => {
  isShow.value = !isShow.value
}
const isShowHandler1 = () => {
  isChildShow.value = !isChildShow.value
}
</script>
