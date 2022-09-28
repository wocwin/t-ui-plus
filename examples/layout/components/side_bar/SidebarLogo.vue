
<template>
  <div class="sidebar-logo-container" :class="{'collapse': collapse}">
    <transition name="sidebarLogoFade">
      <div v-if="false" key="collapse" class="sidebar-logo-link" @click="goIndex">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
      </div>
      <div v-else key="expand" class="sidebar-logo-link" @click="goIndex">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
const title = require('../../../../package.json').description
const logo = require('@/assets/logo/logo.png')
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    // const title = settings.title
    const state = reactive({
      goIndex: () => {
        window.location.href = window.__POWERED_BY_QIANKUN__ ? '/' : '/webdemo'
      }
    })
    return {
      title,
      logo,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~@/styles/_variables.scss';
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: $menuBg;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 0px;
      border-radius: 50%;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 12px;
    }
  }
}
</style>
