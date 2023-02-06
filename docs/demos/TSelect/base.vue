<template>
  <t-layout-page>
    <t-select
      placeholder="请选择工序"
      v-model="selectVlaue"
      :optionSource="state.stepList"
      valueKey="label"
      @change="selectChange"
      width="200px"
    />
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
const selectVlaue = ref()
let state = reactive({
  stepList: [
    { label: '开始' },
    { label: 'POSUI' },
    { label: '11' },
    { label: 'GX123' },
    { label: '烘干破碎' },
    { label: '车间仓库' },
    { label: 'ui3333' },
    { label: 'hhh333' }
  ]
})
const selectChange = val => {
  console.log('selectChange', val, selectVlaue.value)
}
</script>
