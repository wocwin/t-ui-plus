<template>
  <ClientOnly>
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <div class="docs-example-showcase">
        <AppAsyncComponent />
      </div>
      <el-divider class="m-0" />

      <div class="docs-example-btns">
        <el-tooltip content="在 Playground 中编辑">
          <el-icon :size="size" class="op-btn" @click="handleEditPlayground">
            <svg
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              width="1.2em"
              height="1.2em"
              data-v-5d9e4641=""
            >
              <path
                d="M16 2v2h-1v3.243c0 1.158.251 2.301.736 3.352l4.282 9.276A1.5 1.5 0 0 1 18.656 22H5.344a1.5 1.5 0 0 1-1.362-2.129l4.282-9.276A7.994 7.994 0 0 0 9 7.243V4H8V2h8zm-2.612 8.001h-2.776c-.104.363-.23.721-.374 1.071l-.158.361L6.125 20h11.749l-3.954-8.567a9.978 9.978 0 0 1-.532-1.432zM11 7.243c0 .253-.01.506-.029.758h2.058a8.777 8.777 0 0 1-.021-.364L13 7.243V4h-2v3.243z"
              ></path>
            </svg>
          </el-icon>
        </el-tooltip>
        <el-tooltip content="复制代码">
          <el-icon :size="size" class="op-btn"><CopyDocument v-copy="content" /></el-icon>
        </el-tooltip>
        <el-tooltip :content="show ? '收起源代码' : '查看源代码'">
          <el-icon :size="size" @click="handleToggle" class="op-btn">
            <View />
          </el-icon>
        </el-tooltip>
      </div>
      <ElCollapseTransition>
        <div v-show="show" class="docs-example-language-vue language-vue">
          <div class="content">
            <highlightjs language="js" :code="decoded"></highlightjs>
          </div>
          <div class="line-numbers-wrapper">
            <template v-for="item in total" :key="item">
              <span class="line-number">
                {{ item }}
              </span>
              <br />
            </template>
          </div>
        </div>
      </ElCollapseTransition>
      <Transition name="el-fade-in-linear">
        <div v-show="show" class="example-float-control" @click="handleToggle">
          <ElIcon :size="16">
            <CaretTop />
          </ElIcon>
          <span>隐藏源代码</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { CopyDocument, View, CaretTop } from "@element-plus/icons-vue"
import { getComponent } from "../../utils/getComponent"
import { getPlaygroundEncoded } from "../../utils"

const editPlaygroundUrl = "https://wocwin.github.io/wocwin-playground/"
// const editPlaygroundUrl = 'http://127.0.0.1:3332'

// 自动加载 asyncRouter 文件夹下所有的异步路由
const moduleFiles = import.meta.glob("../../../examples/**/*.vue", {
  eager: true
})

const props = defineProps<{
  source: string
  path: string
  rawSource: string
  description?: string
}>()

const show = ref(false)
const total = ref(0)
const size = 16

const AppAsyncComponent = getComponent(moduleFiles, props.path)

const decodedDescription = computed(() => decodeURIComponent(props.description!))
const handleToggle = () => {
  show.value = !show.value
}

const decoded = computed(() => decodeURIComponent(props.source))
const content = computed(() => decodeURIComponent(props.rawSource))

// add line-number
const tem = content.value.split("\r\n")
total.value = tem.length

// 去Playground编辑
const handleEditPlayground = () => {
  const encoded = getPlaygroundEncoded(props.rawSource)
  const url = `${editPlaygroundUrl}#${encoded}`
  window.open(url, "_blank")
}
</script>

<style lang="scss" scoped>
.example {
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  margin-top: 10px;
  .docs-example-showcase {
    background-color: var(--el-bg-color-page);
    .t_module_form_demo {
      background-color: var(--el-bg-color-page);
      :deep(.t_layout_page_item) {
        padding: 0;
        .t_module_form {
          overflow: hidden;
          margin: 0 !important;
          .handle_wrap {
            position: inherit;
          }
        }
      }
    }
  }
  .m-0 {
    margin: 0;
  }
  .docs-example-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }
  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--el-border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--el-bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
  .content {
    padding-left: 32px;
  }

  .line-numbers-wrapper {
    border-color: #dcdfe6;
    line-height: 1.4;
    padding-top: 11px;
    user-select: none;
    .line-number {
      color: #aaa;
      line-height: 1.4;
    }
  }
}
</style>
