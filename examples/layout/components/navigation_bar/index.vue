<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
      @toggle-click="toggleSideBar" />
    <breadCrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <el-tooltip content="全屏预览" effect="dark" placement="left">
          <screenfull class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="hover">
        <div class="avatar-wrapper">
          <div>{{nickName||'wocwin'}}</div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goTo('gitHub')">
              <span style="display:block;">gitHub地址</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="goTo('gitee')">
              <span style="display:block;">gitee地址</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="setting=true">
              <span style="display:block;">布局设置</span>
            </el-dropdown-item>
            <!-- <el-dropdown-item divided @click="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item> -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <settings v-if="setting" />
  </div>
</template>

<script lang="ts">
import BreadCrumb from './BreadCrumb.vue'
import Hamburger from './Hamburger.vue'
import Screenfull from './Screenfull.vue'
import Settings from '../settings/index.vue'
import { computed, reactive, toRefs, defineEmits } from 'vue'
import store from '@/store'
import { ElMessageBox } from 'element-plus'
export default {
  components: {
    BreadCrumb,
    Hamburger,
    Screenfull,
    Settings
  },
  setup() {
    const sidebar = computed(() => {
      return store.state.app.sidebar
    })
    const device = computed(() => {
      return store.state.app.device.toString()
    })
    const avatar = computed(() => {
      return store.state.user.avatar
    })
    const nickName = computed(() => {
      return store.state.user.nickName
    })
    const setting = computed({
      get() {
        return store.state.settings.showSettings
      },
      set(val) {
        store.dispatch('settings/getChangeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    })
    // const emits = defineEmits<{ (e: 'setLayout'): void }>()
    // const setLayout = () => {
    //   emits('setLayout')
    // }
    const goTo = (type) => {
      switch (type) {
        case 'gitHub':
          window.open('https://github.com/wocwin/vue3-ts-admin-template.git', '_blank')
          break
        case 'gitee':
          window.open('https://gitee.com/wocwin/vue3.2-ts-webpack-element-puls-template.git', '_blank')
          break
      }
    }
    const state = reactive({
      toggleSideBar: () => {
        store.dispatch('toggleSideBar', false)
      },
      logout: () => {
        ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('LogOut').then(() => {
            window.location.href = window.__POWERED_BY_QIANKUN__
              ? '/'
              : '/webdemo'
          })
        })
      }
    })
    return {
      goTo,
      setting,
      sidebar,
      device,
      avatar,
      nickName,
      ...toRefs(state)
    }
  }
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
