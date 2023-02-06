<template>
  <div>
    <!-- <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="toggle" /> -->
    <el-icon :size="22" @click="toggle"><FullScreen /></el-icon>
  </div>
</template>

<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'
const {toggle } = useFullscreen()
</script>
