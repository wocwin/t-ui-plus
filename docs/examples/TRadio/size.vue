<template>
  <t-layout-page>
    <t-layout-page-item>
      <div>
        <t-radio v-model="value" :options="options" size="large" />
      </div>
      <div style="margin-top: 20px">
        <t-radio v-model="value" :options="options" size="default" />
      </div>
      <div style="margin-top: 20px">
        <t-radio v-model="value" :options="options" size="small" />
      </div>
      <div style="margin-top: 20px">
        <t-radio v-model="value" :options="options" size="small" disabled />
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('export')
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
