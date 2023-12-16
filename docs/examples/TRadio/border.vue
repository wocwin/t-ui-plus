<template>
  <t-layout-page>
    <t-layout-page-item>
      <div>
        <t-radio v-model="value" :options="options" size="large" border />
      </div>
      <div style="margin-top: 20px">
        <t-radio v-model="value" :options="options" size="default" border />
      </div>
      <div style="margin-top: 20px">
        <t-radio v-model="value" :options="options" size="small" border />
      </div>
      <div style="margin-top: 20px">
        <t-radio
          v-model="value"
          :options="options"
          size="small"
          disabled
          border
        />
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('1')
const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
])
</script>
