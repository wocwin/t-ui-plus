<template>
  <div id="app">
    <div class="env_tag" v-if="ENV !== 'production'">{{ ENV }}</div>
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const ENV = computed(() => {
  return import.meta.env.VITE_APP_ENV
})
const isRouterAlive = ref(true)
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)
</script>
<style lang="scss">
body {
  background-color: #f6f6f6 !important;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  font-variant: tabular-nums;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;

  .env_tag {
    position: absolute;
    z-index: 901;
    top: 0;
    right: 0;
    padding: 0 6px;
    background-color: red;
    border-radius: 0 0 0 4px;
    color: #fff;
    font-size: 12px;
  }
}
</style>
