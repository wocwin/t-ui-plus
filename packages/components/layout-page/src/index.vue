<template>
  <div
    ref="TLayoutPageRef"
    class="t_layout_page"
    :class="{ layout_page_no_margin: isNoMargin }"
    @scroll="(e:any) => scrollTop = e.target.scrollTop"
  >
    <slot />
    <div class="back_to_top" v-if="showGoTopButton">
      <div v-if="isShowGoTopButton" @click="backToTop">
        <el-icon v-bind="{ size: 24, ...$attrs }"><CaretTop /></el-icon>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onActivated, onMounted, ref, watch } from "vue"
import { CaretTop } from "@element-plus/icons-vue"
defineOptions({
  name: "TLayoutPage"
})
export interface TLayoutPageProps {
  keepScrollDisabled?: boolean
  isNoMargin?: boolean
  showGoTopButton?: boolean
  scrollToTop?: number
}

const props = withDefaults(defineProps<TLayoutPageProps>(), {
  keepScrollDisabled: false,
  isNoMargin: false,
  showGoTopButton: true,
  scrollToTop: 100
})
const isShowGoTopButton = ref(false)

const TLayoutPageRef = ref(null)
const scrollTop = ref(0)
watch(
  () => scrollTop.value,
  newVal => {
    if (newVal > props.scrollToTop) {
      isShowGoTopButton.value = true
    } else {
      isShowGoTopButton.value = false
    }
  }
)
const backToTop = () => {
  scrollTop.value = 0
  ;(TLayoutPageRef.value as any).scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
onMounted(() => {
  const pageItems = (TLayoutPageRef.value as any).querySelectorAll(".t_layout_page_item")
  if (pageItems.length === 2) {
    pageItems[0].style.marginBottom = "8px"
  }
  if (pageItems.length > 2) {
    pageItems.forEach((item: any) => {
      item.style.marginBottom = "8px"
    })
    pageItems[pageItems.length - 1].style.marginBottom = "0"
  }
})

onActivated(() => {
  if (!props.keepScrollDisabled) {
    ;(TLayoutPageRef.value as any).scrollTop = scrollTop
  }
})
</script>
