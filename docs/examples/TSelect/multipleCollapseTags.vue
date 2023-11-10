<template>
  <t-layout-page>
    <t-layout-page-item>
      <div>use collapse-tags</div>
      <t-select
        placeholder="请选择(多选)"
        v-model="selectVlaue1"
        :optionSource="stepList"
        valueCustom="label"
        collapse-tags
        multiple
        @change="selectChange($event,'1')"
      />
    </t-layout-page-item>
    <t-layout-page-item>
      <div>use collapse-tags-tooltip</div>
      <t-select
        placeholder="请选择(多选)"
        v-model="selectVlaue2"
        :optionSource="stepList"
        valueCustom="label"
        collapse-tags
        collapse-tags-tooltip
        multiple
        @change="selectChange($event,'2')"
      />
    </t-layout-page-item>
    <t-layout-page-item>
      <div>use max-collapse-tags</div>
      <t-select
        placeholder="请选择(多选)"
        v-model="selectVlaue3"
        :optionSource="stepList"
        valueCustom="label"
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="3"
        multiple
        @change="selectChange($event,'3')"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts" name="multipleCollapseTags">
import { ref } from 'vue'
const selectVlaue1 = ref<any>()
const selectVlaue2 = ref<any>()
const selectVlaue3 = ref<any>()
const stepList = [
  { label: '开始' },
  { label: 'POSUI' },
  { label: '11' },
  { label: 'GX123' },
  { label: '烘干破碎' },
  { label: '车间仓库' },
  { label: 'ui3333' },
  { label: 'hhh333' },
]
const selectChange = (val: any, type) => {
  console.log(
    `selectChange--selectVlaue${type}`,
    val
  )
}
</script>
