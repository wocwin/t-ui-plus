<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-select placeholder="多选禁用" v-model="selectVlaue" :optionSource="stepList" valueCustom="label"
        @change="selectChange" multiple />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts" name="Multiple">
import { ref, onMounted } from 'vue'
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
    { label: '单选禁用项1', id: undefined },
    { label: '单选禁用项2', id: undefined },
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
const selectChange = (val: any) => {
  console.log('selectChange', val, selectVlaue.value)
}
</script>
