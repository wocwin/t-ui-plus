<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-select placeholder="单选禁用" v-model="selectVlaue" :optionSource="stepList" valueCustom="label"
        @change="selectChange" width="200px" />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts" name="singleDisabled">
import { onMounted, ref } from 'vue'
const selectVlaue = ref<any>()
const stepList: any = ref([])
onMounted(() => {
  getData()
})
const getData = () => {
  let list = [
    { label: '开始', id: 1 },
    { label: 'POSUI', id: 2 },
    { label: '11', id: 3 },
    { label: 'GX123', id: 4 },
    { label: '烘干破碎', id: 5 },
    { label: '单选禁用项', id: undefined },
    { label: '车间仓库', id: 6 },
    { label: 'ui3333', id: 7 },
    { label: 'hhh333', id: 8 },
  ]
  list.map((item: any) => {
    if (item.id === undefined) {
      item.disabled = true
    }
  })
  stepList.value = list
}
// 选中值发生变化时触发
const selectChange = (val: any) => {
  console.log('selectChange', val, selectVlaue.value)
}
</script>
