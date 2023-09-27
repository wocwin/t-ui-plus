<template>
  <div
    ref="TLayoutPageRef"
    class="t_layout_page"
    :class="{ layout_page_no_margin: isNoMargin }"
    @scroll="(e:any) => scrollTop = e.target.scrollTop"
  >
    <slot />
  </div>
</template>
<script setup lang="ts" name="TLayoutPage">
import { onActivated, ref } from 'vue'
const props = defineProps({
  keepScrollDisabled: {
    type: Boolean,
    default: false,
  },
  isNoMargin: {
    type: Boolean,
    default: false,
  },
})
const TLayoutPageRef = ref(null)
const scrollTop = ref(0)
onActivated(() => {
  if (!props.keepScrollDisabled) {
    ;(TLayoutPageRef.value as any).scrollTop = scrollTop
  }
})
</script>
<style lang="scss" scoped>
.t_layout_page {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.layout_page_no_margin {
  padding: 0;
}
</style>
