<template>
  <t-layout-page class="t_button_demo">
    <t-layout-page-item>
      <t-radio :options="options">导出</t-radio>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const options = ref([
  {
    label: '导出',
    value: 'export',
  },
  {
    label: '导入',
    value: 'import',
  },
])
</script>
