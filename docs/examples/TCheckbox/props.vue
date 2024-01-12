<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-checkbox
        v-model="value"
        :options="options"
        :props="{ label: 'name', value: 'id', disabled: 'isSelected' }"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
const options = ref([
  { id: '2016-05-02', name: '上海市普陀区金沙江路 1518 弄', isSelected: false },
  { id: '2016-05-04', name: '上海市普陀区金沙江路 1517 弄', isSelected: false },
  { id: '2016-05-01', name: '上海市普陀区金沙江路 1519 弄', isSelected: false },
  { id: '2016-05-03', name: '上海市普陀区金沙江路 1516 弄', isSelected: true },
])
</script>
