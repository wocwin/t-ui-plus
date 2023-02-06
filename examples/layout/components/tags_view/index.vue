<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link v-for="tag in visitedViews" ref="tag" :key="tag.path" :class="isActive(tag) ? 'active' : ''"
        :data-path="tag.path" :to="{path: tag.path, query: tag.query}" tag="span" class="tags-view-item"
        @click.middle="!isAffix(tag)?closeSelectedTag(tag):''" @contextmenu.prevent="openMenu(tag, $event)">
        {{ tag.meta.title }}
        <span class v-if="lastTagShow&&!isAffix(tag)" @click.prevent.stop="closeSelectedTag(tag)">
          <close class="el-icon-close" style="width: 1em; height: 1em;vertical-align: middle;" />
        </span>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left: left+'px', top: top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script lang="ts">
import path from 'path-browserify'
import useTagViewsStore from '@/store/modules/tagViews'
import usePermissionStore from '@/store/modules/permission'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onBeforeMount,
  reactive,
  ref,
  toRefs,
  watch,
  inject
} from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
// import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import ScrollPane from './ScrollPane.vue'
export default defineComponent({
  components: {
    ScrollPane
  },
  setup() {
    const router = useRouter()
    const instance = getCurrentInstance()
    const currentRoute = useRoute()
    const scrollPaneRef = ref(null)
    const { ctx } = instance as any
    const reload: any = inject('reload')
    const toLastView = (visitedViews: any, view: any) => {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView !== undefined && latestView.fullPath !== undefined) {
        router.push(latestView.fullPath).catch(err => {
          console.warn(err)
        })
      } else {
        // Default redirect to the home page if there is no tags-view, adjust it if you want
        // if (view.name === 'Dashboard') {
        //   // to reload home page
        //   router.push({ path: '/redirect' + view.fullPath }).catch(err => {
        //     console.warn(err)
        //   })
        // } else {
        // window.location.href = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/' : '/vitedemo/'
        window.location.href = '/'
        // }
      }
    }
    const visitedViews = computed(() => {
      return useTagViewsStore().visitedViews.filter(v => {
        return v?.title !== '首页'
      })
    })
    const routes = computed(() => usePermissionStore().routes)
    const state = reactive({
      visible: false,
      lastTagShow: true, // 是否 是最后一个tag
      top: 0,
      left: 0,
      selectedTag: {} as any,
      affixTags: [] as any[],
      isActive: (route: any) => {
        state.lastTagShow = !(visitedViews.value.length === 1)
        return route.path === currentRoute.path
      },
      isAffix: (tag: any) => {
        return tag.meta && tag.meta.affix
      },
      refreshSelectedTag: (view: any) => {
        useTagViewsStore().delCachedView(view).then(() => {
          // const { fullPath } = view
          // nextTick(() => {
          //   router.replace({ path: '/redirect' + fullPath }).catch(err => {
          //     console.warn(err)
          //   })
          // })
          reload()
          state.closeMenu()
        })
      },
      closeSelectedTag: (view: any) => {
        useTagViewsStore().delView(view)
        if (state.isActive(view)) {
          toLastView(useTagViewsStore().visitedViews, view)
          state.closeMenu()
        }
      },
      closeOthersTags: () => {
        if (
          state.selectedTag.fullPath !== currentRoute.path &&
          state.selectedTag.fullPath !== undefined
        ) {
          router.push(state.selectedTag.fullPath).catch(err => {
            console.log(err)
          })
        }
        useTagViewsStore().delOthersViews(state.selectedTag as any)
        state.closeMenu()
      },
      // 关闭所有标签
      closeAllTags: (view: any) => {
        useTagViewsStore().delAllViews(view).then(({ visitedViews }: any) => {
          if (state.affixTags.some(tag => tag.path === view.path)) {
            return
          }
          toLastView(visitedViews, view)
          state.closeMenu()
        })
      },
      openMenu: (tag: any, e: MouseEvent) => {
        const menuMinWidth = 105
        const offsetLeft = ctx.$el.getBoundingClientRect().left // container margin left
        const offsetWidth = ctx.$el.offsetWidth // container width
        const maxLeft = offsetWidth - menuMinWidth // left boundary
        const left = e.clientX - offsetLeft + 15 // 15: margin right
        if (left > maxLeft) {
          state.left = maxLeft
        } else {
          state.left = left
        }
        state.top = e.clientY
        state.visible = true
        state.selectedTag = tag
      },
      closeMenu: () => {
        state.visible = false
      },
      handleScroll: () => {
        state.closeMenu()
      }
    })

    const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
      let tags: any[] = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }

        if (route.children) {
          const childTags = filterAffixTags(route.children, route.path)
          if (childTags.length >= 1) {
            tags = tags.concat(childTags)
          }
        }
      })
      return tags
    }

    const initTags = () => {
      state.affixTags = filterAffixTags(routes.value)
      for (const tag of state.affixTags) {
        // Must have tag name
        if (tag.name) {
          useTagViewsStore().addVisitedView(tag as any)
        }
      }
    }

    const addTags = () => {
      if (currentRoute.name) {
        state.lastTagShow = true
        useTagViewsStore().addView(currentRoute)
      }
      return false
    }

    const moveToCurrentTag = () => {
      nextTick(() => {
        for (const r of visitedViews.value) {
          if (r.path === currentRoute.path) {
            // scrollPaneRef.value.moveToTarget(r)
            ; (scrollPaneRef.value as any).moveToTarget(r)
            // when query is different then update
            if (r.fullPath !== currentRoute.fullPath) {
              useTagViewsStore().updateVisitedView(currentRoute)
            }
          }
        }
      })
    }
    watch(
      () => currentRoute.name,
      () => {
        addTags()
        moveToCurrentTag()
      }
    )
    // life cricle
    onBeforeMount(() => {
      initTags()
      addTags()
    })

    return {
      visitedViews,
      routes,
      reload,
      scrollPaneRef,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
// Reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
