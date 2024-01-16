<template>
  <t-layout-page class="t_button_demo">
    <t-layout-page-item>
      <t-map
        disabled
        v-model="data"
      ></t-map>
      <div style="margin-top: 10px;">modelValue：{{ data }}</div>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const data = ref([114.27493, 22.71173, "广东省深圳市龙岗区龙岗街道龙岗街道党建主题公园八仙岭公园" ])
</script>
