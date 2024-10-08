<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-select
        placeholder="选中值将以对象形式返回"
        v-model="selectVlaue"
        :optionSource="stepList"
        value-key="id"
        returnObject
        valueCustom="id"
        @change="selectChange"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts" name="Single">
import { ref } from "vue"
type Option = {
  id: number
  label: string
}
const selectVlaue = ref<Option>()
const stepList = [
  { label: "开始", id: 1 },
  { label: "POSUI", id: 2 },
  { label: "11", id: 3 },
  { label: "GX123", id: 4 },
  { label: "烘干破碎", id: 5 },
  { label: "车间仓库", id: 6 },
  { label: "ui3333", id: 7 },
  { label: "hhh333", id: 8 }
]
const selectChange = (val: Option) => {
  console.log("selectChange", val, selectVlaue.value)
}
</script>
