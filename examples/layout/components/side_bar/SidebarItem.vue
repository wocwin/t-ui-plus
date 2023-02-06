<template>
  <div v-if="!item.hidden">
    <!--only on child show el-menu -->
    <template v-if="hasOneShowingChild(item.children, item)">
      <el-menu-item
        :key="onlyOneChild.path"
        :index="onlyOneChild.path"
        :route="onlyOneChild.path"
        :class="{ 'submenu-title-noDropdown': !isNested }"
      >
        <svg-icon :icon-class="onlyOneChild.meta && onlyOneChild.meta.icon" />
        <template #title>
          <span class="menu-title">{{ onlyOneChild.meta && onlyOneChild.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <el-sub-menu v-else ref="subMenu" :index="item.path" popper-append-to-body>
      <template v-if="item.meta" #title>
        <svg-icon :icon-class="item.meta && item.meta.icon" />
        <span class="menu-title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nested="true"
        :item="child"
        :base-path="child.path"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>
<script lang="ts">
import path from 'path-browserify'
import { defineComponent, ref, toRef } from 'vue'
import SidebarItemLink from './SidebarItemLink.vue'
import { isExternal } from '@/utils/validate'
export default defineComponent({
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNested: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  components: {
    SidebarItemLink
  },
  setup(props) {
    // 是否只有一个孩子
    const onlyOneChild = ref()
    // 析构获取 props 属性 basePath
    // const basePath = toRef(props, 'basePath')
    /**
     * @description 展示只有一个孩子的情况
     */
    const hasOneShowingChild = (children: any[], parent: any) => {
      // console.log(111, children)
      // console.log(222, parent)
      // RouteRecordRaw 只能在meta中配置额外属性，过滤是否展示路由；
      if (!children) {
        children = []
      }
      const showingChildren = children.filter(item => {
        // 如果meta 配置隐藏该路由，则返回false;
        if (item?.hidden) {
          return false
        }
        onlyOneChild.value = item
        return true
      })
      // 判断当前路由，是否有孩子children，以及孩子个数；
      if (showingChildren.length === 1) {
        return true
      }
      // 如果没有孩子，则展示父级路由；
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, noShowingChildren: true }
        return true
      }
      return false
    }
    const resolvePath = (routePath: any, routeQuery: any) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      if (routeQuery) {
        let query = JSON.parse(routeQuery)
        return {
          path: path.resolve(props.basePath, routePath),
          query
        }
      }
      return path.resolve(props.basePath, routePath)
    }
    const hasTitle = (title: any) => {
      if (title.length > 5) {
        return title
      } else {
        return ''
      }
    }
    return {
      onlyOneChild,
      resolvePath,
      hasTitle,
      hasOneShowingChild
    }
  }
})
</script>
