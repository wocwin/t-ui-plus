<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        table-title="empty-text属性使用"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
        empty-text="empty-text属性设置：当前没有数据，请稍后再试。"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
const table = ref<TableTypes.Table>({
  data: [],
  columns: [
    { prop: "name", label: "姓名", minWidth: "100" },
    { prop: "date", label: "日期", minWidth: "180" },
    { prop: "status", label: "状态", minWidth: "80" },
    { prop: "address", label: "地址", minWidth: "220" }
  ]
})
</script>
