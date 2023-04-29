<template>
  <section class="t_layout_page_item">
    <slot />
  </section>
</template>
<script lang="ts">
export default {
  name: 'TLayoutPageItem'
}
</script>

<style lang="scss" scoped>
.t_layout_page_item {
  margin: 8px;
  padding: 16px;
  background: var(--el-bg-color);
  border-radius: 4px;
}
</style>