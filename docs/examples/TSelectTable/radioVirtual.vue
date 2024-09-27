<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-select-table
        :table="table"
        :columns="table.columns"
        :max-height="400"
        useVirtual
        :virtualShowSize="20"
        placeholder="请选择（虚拟滚动--单选）"
        :keywords="{ label: 'name', value: 'id' }"
        @radioChange="(...args) => radioChange(args, '单选')"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue"
const table = ref({
  data: [] as any[],
  columns: [
    { label: "物料编号", minWidth: "100px", prop: "code" },
    { label: "物料名称", minWidth: "149px", prop: "name" },
    { label: "规格", minWidth: "149px", prop: "spec" },
    { label: "单位", minWidth: "110px", prop: "unitName" }
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
    name: `物料名称${i + 1}`,
    spec: `物料规格 ${i + 1}`,
    unitName: `吨 ${i + 1}`
  }))
  table.value.data = tableData
}
const radioChange = (args, type) => {
  console.log("单选--传给后台的值", args, type)
}
</script>
