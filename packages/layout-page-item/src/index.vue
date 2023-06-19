<template>
  <section class="t_layout_page_item" @scroll="(e: any) => scrollTop = e.target.scrollTop">
    <slot />
  </section>
</template>
<script lang="ts">
export default {
  name: 'TLayoutPageItem'
}
</script>
<script setup lang="ts">
import { onActivated, ref } from 'vue'
const props = defineProps({
  keepScrollDisabled: {
    type: Boolean,
    default: false
  }
})
const TLayoutPageRef = ref(null)
const scrollTop = ref(0)
onActivated(() => {
  if (!props.keepScrollDisabled) {
    ; (TLayoutPageRef.value as any).scrollTop = scrollTop
  }
})
</script>
<style lang="scss" scoped>
.t_layout_page_item {
  margin: 8px;
  padding: 16px;
  background: var(--el-bg-color);
  border-radius: 4px;
}
</style>