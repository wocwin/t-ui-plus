<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-radio v-model="value" :options="options" />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('1')
const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
])
</script>
