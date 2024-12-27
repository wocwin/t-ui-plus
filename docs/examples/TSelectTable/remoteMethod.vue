<template>
  <t-layout-page>
    <t-layout-page-item style="display: flex">
      <t-select-table
        ref="selectTable"
        :table="table"
        :columns="table.columns"
        :max-height="400"
        :keywords="{ label: 'name', value: 'id' }"
        @radioChange="radioChange"
        remote
        :remote-method="remoteMethod"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue"
const selectTable = ref()
const table = ref({
  data: [] as { id: number; code: number; name: string; spec: string; unitName: string }[],
  columns: [
    { label: "物料编号", width: "100px", prop: "code" },
    { label: "物料名称", width: "149px", prop: "name" },
    { label: "规格", width: "149px", prop: "spec" },
    { label: "单位", width: "110px", prop: "unitName" }
  ]
})
const tableData = [
  { id: 1, code: 1, name: "物料名称1", spec: "物料规格1", unitName: "吨" },
  { id: 2, code: 2, name: "物料名称2", spec: "物料规格2", unitName: "吨" },
  { id: 3, code: 3, name: "物料名称3", spec: "物料规格3", unitName: "吨" },
  { id: 4, code: 4, name: "物料名称4", spec: "物料规格4", unitName: "吨" },
  { id: 5, code: 5, name: "物料名称5", spec: "物料规格5", unitName: "吨" },
  { id: 6, code: 6, name: "物料名称6", spec: "物料规格6", unitName: "吨" },
  { id: 7, code: 7, name: "物料名称7", spec: "物料规格7", unitName: "吨" },
  { id: 8, code: 8, name: "物料名称8", spec: "物料规格8", unitName: "吨" },
  { id: 9, code: 9, name: "物料名称9", spec: "物料规格9", unitName: "吨" }
]
interface TableData {
  id: number
  code: number
  name: string
  spec: string
  unitName: string
}

const list = ref<TableData[]>([])
const radioChange = val => {
  console.log("单选--传给后台的值", val)
}
onMounted(() => {
  list.value = tableData
})
const remoteMethod = (query: string) => {
  if (query) {
    setTimeout(() => {
      table.value.data = list.value.filter(item => {
        return item.name.toLowerCase().includes(query.toLowerCase())
      })
    }, 200)
  } else {
    table.value.data = []
  }
}
</script>
