<template>
  <t-layout-page class="t_button_demo">
    <t-layout-page-item>
      <t-map
        v-model="data"
        placeholder="请选择坐标"
      ></t-map>
      <div style="margin-top: 10px;">modelValue：{{ data }}</div>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const data = ref([])
</script>
