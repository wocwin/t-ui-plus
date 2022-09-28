<template>
  <el-drawer
    title="设置"
    v-model="showSettings"
    size="300px"
    direction="rtl"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="close"
  >
    <div class="drawer-container">
      <div>
        <h3 class="drawer-title">系统布局配置</h3>
        <div class="drawer-item">
          <span>显示 Tags-View</span>
          <el-switch v-model="showTagsView" class="drawer-switch" />
        </div>

        <div class="drawer-item">
          <span>显示侧边栏 Logo</span>
          <el-switch v-model="showSidebarLogo" class="drawer-switch" />
        </div>

        <div class="drawer-item">
          <span>固定 Header</span>
          <el-switch v-model="fixedHeader" class="drawer-switch" />
        </div>
        <!-- <div class="drawer-item">
        <span>侧边栏文字主题色</span>
        <el-switch v-model="sidebarTextTheme" class="drawer-switch" />
        </div>-->
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import store from '@/store'
import { defineComponent, reactive, toRefs, watch, ref } from 'vue'
export default defineComponent({
  components: {},
  setup() {
    // const showSettings = ref(false)
    const state = reactive({
      showSettings: store.state.settings.showSettings,
      fixedHeader: store.state.settings.fixedHeader,
      showTagsView: store.state.settings.showTagsView,
      showSidebarLogo: store.state.settings.showSidebarLogo,
      sidebarTextTheme: store.state.settings.sidebarTextTheme
    })
    // const openSetting = () => {
    //   showSettings.value = true
    // }
    const close = () => {
      store.dispatch('settings/getChangeSetting', {
        key: 'showSettings',
        value: false
      })
    }
    watch(
      () => state.fixedHeader,
      value => {
        store.dispatch('settings/getChangeSetting', {
          key: 'fixedHeader',
          value
        })
      }
    )
    watch(
      () => state.showTagsView,
      value => {
        store.dispatch('settings/getChangeSetting', {
          key: 'showTagsView',
          value
        })
      }
    )
    watch(
      () => state.showSidebarLogo,
      value => {
        console.log(value)

        store.dispatch('settings/getChangeSetting', {
          key: 'showSidebarLogo',
          value
        })
      }
    )
    watch(
      () => state.sidebarTextTheme,
      value => {
        store.dispatch('settings/getChangeSetting', {
          key: 'sidebarTextTheme',
          value
        })
      }
    )
    return {
      // openSetting,
      close,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
