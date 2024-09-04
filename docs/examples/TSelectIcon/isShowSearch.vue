<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-select-icon v-model="iconValue" @select="changeSelect" :isShowSearch="false" />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from "vue"
const iconValue = ref("")
const changeSelect = (val: string) => {
  console.log(`选择的值:${val};v-model值：${iconValue.value}`)
}
</script>
