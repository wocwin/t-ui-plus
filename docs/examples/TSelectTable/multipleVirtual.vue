<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-select-table
        :table="table"
        :columns="table.columns"
        :max-height="400"
        :keywords="{ label: 'name', value: 'id' }"
        multiple
        :virtualShowSize="50"
        placeholder="请选择（虚拟滚动--多选）"
        useVirtual
        @selectionChange="selectionChange"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue"
let table = ref({
  data: [] as any,
  columns: [
    { label: "物料编号", width: "100px", prop: "code" },
    { label: "物料名称", width: "149px", prop: "name" },
    { label: "规格", width: "149px", prop: "spec" },
    { label: "单位", width: "110px", prop: "unitName" }
  ]
})
onMounted(() => {
  initDate()
})
const initDate = () => {
  table.value.data = []
  const tableData = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    code: i + 1,
    name: `物料名称${i}`,
    spec: `物料规格 ${i}`,
    unitName: `吨 ${i}`
  }))
  table.value.data = tableData
}
const selectionChange = (val, ids) => {
  console.log("复选框", val)
  console.log("复选框--id", ids)
}
</script>
