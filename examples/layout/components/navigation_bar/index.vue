<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="appStore.sidebar.opened" class="hamburger-container"
      @toggle-click="toggleSideBar" />
    <BreadCrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <el-tooltip content="全屏预览" effect="dark" placement="left">
          <screenfull class="full_screen right-menu-item hover-effect" />
        </el-tooltip>
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="hover">
        <div class="avatar-wrapper">
          <div>{{nickName}}
            <el-icon>
              <ArrowDown />
            </el-icon>
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="setting=true">
              <span style="display:block;">布局设置</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <settings v-if="setting" />
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from './BreadCrumb.vue'
import Hamburger from './Hamburger.vue'
import Screenfull from './Screenfull.vue'
import Settings from '../settings/index.vue'
// import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import useAppStore from '@/store/modules/app'
import useUserStore from '@/store/modules/user'
import useSettingsStore from '@/store/modules/settings'
import useTagViewsStore from '@/store/modules/tagViews'
import { ElMessageBox } from 'element-plus'

const appStore = useAppStore()
const userStore = useUserStore()
const device = computed(() => {
  return appStore.device.toString()
})
const nickName = computed(() => {
  return userStore.nickName
})
const setting = computed({
  get() {
    return useSettingsStore().showSettings
  },
  set(val) {
    useSettingsStore().getChangeSetting({
      key: 'showSettings',
      value: val
    })
  }
})

function toggleSideBar() {
  appStore.toggleSideBar(false)
}
function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.FedLogOut()
    // window.location.href = qiankunWindow.__POWERED_BY_QIANKUN__
    //   ? '/'
    //   : '/vitedemo/'
    window.location.href = '/'
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .full_screen {
      display: flex;
      align-items: center;
    }

    .avatar-container {
      line-height: 42px;
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        cursor: pointer;
      }
    }
  }
}
</style>
