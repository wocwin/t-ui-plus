<template>
  <div class="t_module_form" :style="{ marginBottom: footer !== null ? '60px' : '' }">
    <div class="scroll_wrap">
      <!-- 头部 -->
      <el-page-header
        v-if="!isShowHeader && (title || titleSlot)"
        :title="title"
        @back="back"
        :class="{
          noContent: !subTitle,
          isShowBack: isShowBack
        }"
      >
        <template #title v-if="titleSlot">
          <slot name="title"></slot>
        </template>
        <template #content>
          <div class="sub_title">{{ subTitle }}</div>
          <div class="extra">
            <slot name="extra"></slot>
          </div>
        </template>
      </el-page-header>
      <!-- 表单页面 -->
      <module-form v-if="handleType === 'edit'" v-bind="$attrs" ref="tForm">
        <template v-for="(index, name) in slots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </module-form>
      <!-- 详情页面 -->
      <module-detail v-else v-bind="$attrs">
        <template v-for="(index, name) in slots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </module-detail>
      <!-- tabs -->
      <div
        class="tabs"
        v-if="tabs.length"
        :style="{ 'margin-top': isTabMargin ? `${tabMarginNum}px` : 0 }"
      >
        <el-tabs v-if="tabs && tabs.length > 1" v-model="activeName" @tab-change="tabsChange">
          <el-tab-pane v-for="tab in tabs" :key="tab.key" :name="tab.key" :label="tab.title">
            <slot :name="tab.key"></slot>
          </el-tab-pane>
        </el-tabs>
        <slot v-else :name="tabs && tabs[0].key"></slot>
      </div>
      <slot name="default"></slot>
    </div>
    <!-- 按钮 -->
    <footer class="handle_wrap" v-if="footer !== null">
      <slot name="footer" />
      <div v-if="!slots.footer">
        <el-button @click="back" v-bind="cancelAttrs">{{ cancelAttrs.btnTxt }}</el-button>
        <el-button
          v-bind="saveAttrs"
          v-if="handleType === 'edit'"
          @click="saveHandle"
          :loading="loading"
          >{{ saveAttrs.btnTxt }}</el-button
        >
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, useAttrs, useSlots, nextTick, computed } from "vue"
import ModuleDetail from "./moduleDetail.vue"
import ModuleForm from "./moduleForm.vue"
defineOptions({
  name: "TModuleForm"
})
export interface TModuleFormProps {
  handleType?: "edit" | "desc"
  isShowHeader?: boolean
  titleSlot?: boolean
  isShowBack?: boolean
  isGoBackEvent?: boolean
  btnSaveBind?: Record<string, any>
  btnCancelBind?: Record<string, any>
  isTabMargin?: boolean
  tabMarginNum?: number
  footer?: any
  title?: string
  subTitle?: string
  tabs?: Array<{ key: string; title: string }>
  submit?: (form: Record<string, any>) => Promise<boolean>
}

const props = withDefaults(defineProps<TModuleFormProps>(), {
  handleType: "edit",
  isShowHeader: false,
  titleSlot: false,
  isShowBack: false,
  isGoBackEvent: false,
  btnSaveBind: () => ({}),
  btnCancelBind: () => ({}),
  isTabMargin: false,
  tabMarginNum: 10,
  title: "",
  subTitle: "",
  tabs: () => [],
  submit: async () => false
})
const attrs: any = useAttrs()
const slots = useSlots()
const activeName = ref(props.tabs && props.tabs[0]?.key)
const loading = ref(false)
// 保存按钮配置
const saveAttrs = computed(() => {
  return {
    type: "primary",
    btnTxt: "保存",
    ...props.btnSaveBind
  }
})
// 取消按钮配置
const cancelAttrs = computed(() => {
  return { btnTxt: "取消", ...props.btnCancelBind }
})
// 获取ref
const tForm: any = ref<HTMLElement | null>(null)

// 抛出事件
const emits = defineEmits(["validateError", "back", "tabsChange"])
// 点击保存
const saveHandle = async () => {
  let form: Record<string, any> = {}
  let formError: Record<string, any> = {}
  let formOpts: Record<string, any> = {}
  let successLength = 0
  loading.value = true
  // 过滤非插槽表单
  Object.keys(attrs.formOpts).forEach(key => {
    if (attrs.formOpts[key].opts) {
      formOpts[key] = attrs.formOpts[key]
    }
  })
  Object.keys(formOpts).forEach(async formIndex => {
    const { valid, formData } = await tForm.value.getChildRef(formIndex).selfValidate()
    if (valid) {
      successLength = successLength + 1
      form[formIndex] = attrs.formOpts[formIndex].opts.formData
    }
  })
  setTimeout(async () => {
    if (successLength === Object.keys(formOpts).length) {
      // 所有表单都校验成功
      const isSuccess = await props.submit(form)
      if (isSuccess) {
        // 成功
        back()
      }
    } else {
      // 校验失败抛出事件
      Object.keys(formOpts).forEach(key => {
        if (Object.keys(form).length > 0) {
          Object.keys(form).map(val => {
            if (key !== val) {
              formError[key] = formOpts[key]
            }
          })
        } else {
          formError[key] = formOpts[key]
        }
      })
      emits("validateError", formError)
    }
    loading.value = false
  }, 300)
}
// 点击头部返回或者取消
const back = () => {
  if (props.isShowBack) {
    return
  }
  emits("back")
  if (!props.isGoBackEvent) {
    history.go(-1)
  }
}
// 获取默认选中tab
const setSelectedTab = (key: any) => {
  activeName.value = key
}
// 切换tab
const tabsChange = (tab: any) => {
  emits("tabsChange", tab)
}
// 清空表单
const resetFormFields = () => {
  let formOpts: Record<string, any> = {}
  // 过滤非插槽表单
  Object.keys(attrs.formOpts).forEach(key => {
    if (attrs.formOpts[key].opts) {
      formOpts[key] = attrs.formOpts[key]
    }
  })
  Object.keys(formOpts).forEach(formIndex => {
    tForm.value.getChildRef(formIndex).resetFields()
  })
}
// 清空校验规则
const clearValidate = () => {
  let formOpts: Record<string, any> = {}
  // 过滤非插槽表单
  Object.keys(attrs.formOpts).forEach(key => {
    if (attrs.formOpts[key].opts) {
      formOpts[key] = attrs.formOpts[key]
    }
  })
  Object.keys(formOpts).forEach(formIndex => {
    tForm.value.getChildRef(formIndex).clearValidate()
  })
}
const updateFormFields = () => {
  let formOpts: Record<string, any> = {}
  // 过滤非插槽表单
  Object.keys(attrs.formOpts).forEach(key => {
    if (attrs.formOpts[key].opts) {
      formOpts[key] = attrs.formOpts[key]
    }
  })
  Object.keys(formOpts).forEach(formIndex => {
    tForm.value.getChildRef(formIndex).updateFields(false)
  })
}
// 暴露方法出去
defineExpose({
  clearValidate,
  resetFormFields,
  updateFormFields,
  setSelectedTab,
  saveHandle
})
</script>
<style lang="scss">
.t_module_form {
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: 100%;
  text-align: left;
  background-color: var(--el-bg-color-page);
  overflow: auto;
  .scroll_wrap {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    .el-page-header {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--el-text-color-primary);
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5;
      list-style: none;
      -webkit-font-feature-settings: "tnum";
      font-feature-settings: "tnum";
      position: relative;
      padding: 16px 24px;
      background-color: var(--el-bg-color);
      .el-page-header__breadcrumb {
        margin: 0;
      }
      .el-page-header__left {
        color: var(--el-text-color-primary);
        align-items: center;
        margin: 0;
        width: 100%;
        .el-icon-back {
          font-weight: bold;
        }
        .el-page-header__title {
          font-size: 18px;
          font-weight: bold;
        }
      }
      .el-page-header__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 60%;
        .sub_title {
          flex: 30%;
        }
        .extra {
          flex: 70%;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
    .noContent {
      .el-page-header__left {
        .el-divider {
          display: none;
        }
      }
    }
    // 是否显示返回箭头
    .isShowBack {
      .el-page-header__left {
        .el-page-header__icon {
          display: none;
        }
      }
    }
    .t_form {
      .el-collapse-borderless {
        background-color: var(--el-bg-color);
        .noTitle {
          .el-collapse-header {
            display: none;
          }
        }
        .el-collapse-item {
          background-color: var(--el-bg-color);
          margin-top: 10px;
          border: none;
          &:first-child {
            margin-top: 0;
          }
          .el-collapse-header {
            border-bottom: 1px solid var(--el-border-color);
          }
          .el-collapse-content-box {
            padding: 16px;
          }
        }
      }
    }
    .tabs {
      padding: 0;
      margin: 0;
      .el-tabs {
        .el-tabs__header {
          margin: 0;
          padding: 0 10px;
          background-color: var(--el-bg-color);
        }
        .el-tabs__nav-wrap {
          &::after {
            height: 1px;
          }
        }
      }
    }
  }
  .handle_wrap {
    position: fixed;
    z-index: 4;
    right: 0;
    bottom: 0px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: var(--el-bg-color);
    border-top: 1px solid var(--el-border-color);
    text-align: right;
    width: 100%;
    .el-button:last-child {
      margin-right: 15px;
    }
  }
}
</style>
