<template>
  <section class="t_layout_page_item">
    <slot />
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TLayoutPageItem'
})
</script>
<style lang="scss" scoped>
.t_layout_page_item {
  margin: 8px;
  padding: 16px;
  background: #fff;
  border-radius: 4px;
}
</style>