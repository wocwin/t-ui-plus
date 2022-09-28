<template>
  <div id="app">
    <div class="env_tag" v-if="ENV !== 'production'">{{ ENV }}</div>
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  provide,
  nextTick,
  reactive,
  toRefs,
  computed
} from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    const ENV = computed(() => {
      return process.env.NODE_ENV
    })
    const state = reactive({
      isRouterAlive: false,
      reload() {
        state.isRouterAlive = false
        nextTick(() => {
          state.isRouterAlive = true
        })
      }
    })
    provide('reload', state.reload())
    // 防止第一次按enter键刷新网页
    document.onkeydown = e => {
      if (e && e.keyCode === 13) {
        // 如果提供了事件对象，则这是一个非IE浏览器
        if (e.preventDefault) {
          e.preventDefault()
        } else if (window.event) {
          // IE中阻止函数器默认动作的方式
          window.event.returnValue = false
        }
      }
    }
    return {
      ENV,
      ...toRefs(state)
    }
  }
})
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
  font-family: '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
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
