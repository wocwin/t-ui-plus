<template>
  <section class="t_layout_page_item" :class="{ page_item_no_margin: isNoMargin }">
    <slot />
  </section>
</template>
<script setup lang="ts" name="TLayoutPageItem">
defineOptions({
  name: "TLayoutPageItem"
})
defineProps({
  isNoMargin: {
    type: Boolean,
    default: false
  }
})
</script>
