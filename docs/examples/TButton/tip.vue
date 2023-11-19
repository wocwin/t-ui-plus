<template>
  <t-layout-page class="t_button_demo">
    <t-layout-page-item>
      <t-button style="font-size: 28px" tip="编辑" icon="Edit" />
      <t-button tip="删除" icon="Delete" />
      <t-button tip="primary" icon="Search" />
      <t-button type="primary" tip="primary" icon="Edit" />
      <t-button type="success" tip="success" icon="Check" />
      <t-button type="info" tip="info" icon="Message" />
      <t-button type="warning" tip="warning" icon="Star" />
      <t-button type="danger" tip="danger" icon="Delete" />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
</script>
