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

<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
const settingsStore = useSettingsStore()
const storeSettings = computed(() => settingsStore)
// const state = reactive({
//       showSettings: settingsStore.showSettings,
//       fixedHeader: settingsStore.fixedHeader,
//       showTagsView: settingsStore.showTagsView,
//       showSidebarLogo: settingsStore.showSidebarLogo,
//       sidebarTextTheme: settingsStore.sidebarTextTheme
//     })
const showSettings = computed({
  get: () => storeSettings.value.showSettings,
  set: (val) => {
    settingsStore.getChangeSetting({ key: 'showSettings', value: val })
  }
})
    /** 是否需要tagview */
const showTagsView = computed({
  get: () => storeSettings.value.showTagsView,
  set: (val) => {
    settingsStore.getChangeSetting({ key: 'showTagsView', value: val })
  }
})
/**是否需要固定头部 */
const fixedHeader = computed({
  get: () => storeSettings.value.fixedHeader,
  set: (val) => {
    settingsStore.getChangeSetting({ key: 'fixedHeader', value: val })
  }
})
/**是否需要侧边栏的logo */
const showSidebarLogo = computed({
  get: () => storeSettings.value.showSidebarLogo,
  set: (val) => {
    settingsStore.getChangeSetting({ key: 'showSidebarLogo', value: val })
  }
})
const sidebarTextTheme = computed({
  get: () => storeSettings.value.sidebarTextTheme,
  set: (val) => {
    settingsStore.getChangeSetting({ key: 'sidebarTextTheme', value: val })
  }
})
const close = () => {
      settingsStore.getChangeSetting({
        key: 'showSettings',
        value: false
      })
    }


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
