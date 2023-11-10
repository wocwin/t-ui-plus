<template>
  <t-layout-page>
    <t-select
      placeholder="请选择(虚拟列表--多选)"
      v-model="selectVlaue"
      :optionSource="stepList"
      useVirtual
      multiple
      @change="selectChange"
    />
  </t-layout-page>
</template>
<script setup lang="ts" name="useVirtual">
import { ref } from 'vue'
const selectVlaue = ref<any>()
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const stepList = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}))
const selectChange = (val: any) => {
  console.log('selectChange', val, selectVlaue.value)
}
</script>
