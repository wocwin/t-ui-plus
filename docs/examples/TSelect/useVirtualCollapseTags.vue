<template>
  <t-layout-page>
    <t-layout-page-item>
      <div>use collapse-tags</div>
      <t-select
        placeholder="请选择(虚拟列表--多选选)"
        v-model="selectVlaue1"
        :optionSource="stepList"
        useVirtual
        collapse-tags
        multiple
        @change="selectChange($event,'1')"
      />
    </t-layout-page-item>
    <t-layout-page-item>
      <div>use collapse-tags-tooltip</div>
      <t-select
        placeholder="请选择(虚拟列表--多选选)"
        v-model="selectVlaue2"
        :optionSource="stepList"
        useVirtual
        collapse-tags
        collapse-tags-tooltip
        multiple
        @change="selectChange($event,'2')"
      />
    </t-layout-page-item>
    <t-layout-page-item>
      <div>use max-collapse-tags</div>
      <t-select
        placeholder="请选择(虚拟列表--多选选)"
        v-model="selectVlaue3"
        :optionSource="stepList"
        useVirtual
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="3"
        multiple
        @change="selectChange($event,'3')"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts" name="useVirtual">
import { ref } from 'vue'
const selectVlaue1 = ref<any>()
const selectVlaue2 = ref<any>()
const selectVlaue3 = ref<any>()
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const stepList = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}))
const selectChange = (val: any, type) => {
  console.log(
    `selectChange--selectVlaue${type}`,
    val
  )
}
</script>
