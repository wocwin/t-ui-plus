<template>
  <div ref="TLayoutPageRef" class="t_layout_page" @scroll="(e:any) => scrollTop = e.target.scrollTop">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, onActivated, reactive, toRefs, ref } from 'vue'
export default defineComponent({
  name: 'TLayoutPage',
  props: {
    keepScrollDisabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const TLayoutPageRef = ref(null)
    const state = reactive({
      scrollTop: 0
    })
    onActivated(() => {
      if (!props.keepScrollDisabled) {
        ;(TLayoutPageRef.value as any).scrollTop = state.scrollTop
      }
    })
    return {
      TLayoutPageRef,
      ...toRefs(state)
    }
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
</style>