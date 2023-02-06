<template>
  <el-breadcrumb class="app-breadcremb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="'breadcrumb'+index">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { RouteLocationMatched, useRoute, useRouter } from 'vue-router'
// import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

export default defineComponent({
  setup() {
    const levelList = ref([] as any)
    const route = useRoute()
    const router = useRouter()

    // 获取面包屑
    const getBreadcrumb = () => {
      // 只展示路由中设置了meta.title的元素；
      const matched = route.matched.filter(
        (item: RouteLocationMatched) => item?.meta?.title
      )
      levelList.value = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    }

    const handleLink = (item: any) => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
        return
      }
      // window.location.href = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/' : '/vitedemo'
      window.location.href = '/'
    }
    // 在挂载阶段执行获取面包屑数组
    onMounted(() => {
      getBreadcrumb()
    })
    // watch route to get  new breadcrumb
    watch(route, () => {
      if (route.path.startsWith('/redirect/')) {
        return
      }
      getBreadcrumb()
    })
    return {
      levelList,
      handleLink
    }
  }
})
</script>
<style lang="scss" scoped>
.navbar .breadcrumb-container {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
