<template>
  <div :class="{'has-logo': showLogo}">
    <sidebar-logo v-if="showLogo" :collapse="!isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :router="true"
        :collapse="!isCollapse"
        :unique-opened="false"
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="menuActiveTextColor"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in routes"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRaw } from 'vue'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import variables from '@/styles/_variables.scss'
import store from '@/store'
import { useRoute } from 'vue-router'
import { constantRoutes } from '@/router'
export default defineComponent({
  components: {
    SidebarItem,
    SidebarLogo
  },
  setup() {
    const route = useRoute()
    const sidebar = computed(() => {
      return store.state.app.sidebar
    })
    const routes = computed(() => {
      // return store.state.permission.routes
      return constantRoutes
    })
    // console.log(666, toRaw(store.getters.permission_routes))
    const showLogo = computed(() => {
      return store.state.settings.showSidebarLogo
    })
    const menuActiveTextColor = computed(() => {
      console.log(store.state.settings.sidebarTextTheme)
      if (store.state.settings.sidebarTextTheme) {
        return store.state.settings.theme
      } else {
        return variables.menuActiveText
      }
    })
    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta !== null || meta !== undefined) {
        if (meta.activeMenu) {
          return meta.activeMenu
        }
      }
      return path
    })
    const isCollapse = computed(() => {
      return sidebar.value.opened
    })
    return {
      sidebar,
      routes,
      showLogo,
      menuActiveTextColor,
      variables,
      activeMenu,
      isCollapse
    }
  }
})
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
  .el-scrollbar__view {
    height: 100%;
  }
  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }
    &.is-horizontal {
      display: none;
    }
  }
}
</style>
<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}
.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}
.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
