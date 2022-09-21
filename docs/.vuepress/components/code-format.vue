<template>
  <div class="code-format" :class="{ hover: hovering }" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta">
      <div class="description" v-if="slots.default">
        <slot></slot>
      </div>
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
    <div class="code-format-control" ref="control" :class="{ 'is-fixed': fixedControl }"
      @click="isExpanded = !isExpanded">
      <transition name="arrow-slide">
        <i :class="[iconClass, { hovering: hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
      <div class="control-button-container">
        <el-button v-show="isExpanded" ref="copyButton" size="small" type="text" class="control-button copy-button"
          @click.stop="copyCode">复制代码</el-button>
      </div>
    </div>
  </div>
</template>

<!-- <script>
export default {
  name: 'CodeFormat'
}
</script> -->
<script setup lang="ts">
import { ref, useSlots, computed, onUnmounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
const slots = useSlots()
const hovering = ref(false)
const isExpanded = ref(false)
const fixedControl = ref(false)
const scrollParent: any = ref(null)
const meta: any = ref<HTMLElement | null>(null)
const iconClass = computed(() => {
  return isExpanded.value ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
})
const controlText = computed(() => {
  return isExpanded.value ? '隐藏代码' : '显示代码'
})
const codeArea: any = computed(() => {
  return document.getElementsByClassName('meta')[0]
})
const getCodeAreaHeight = () => {
  if (document.getElementsByClassName('description').length > 0) {
    return (
      document.getElementsByClassName('description')[0].clientHeight +
      document.getElementsByClassName('highlight')[0].clientHeight +
      20
    );
  }
  return document.getElementsByClassName('highlight')[0].clientHeight;
}
const setCodeAreaHeight = () => {
  codeArea.style.height = isExpanded.value
    ? `${getCodeAreaHeight() + 1}px`
    : '0';
}
const copyCode = () => {
  const pre = document.querySelectorAll('pre')[0]
  pre.setAttribute('contenteditable', 'true')
  pre.focus()
  document.execCommand('selectAll', false, undefined)
  const copied = document.execCommand('copy')
  if (copied) {
    pre.removeAttribute('contenteditable')
    ElMessage.success('复制成功！')
  } else {
    ElMessage.error('复制失败！')
  }
}
const scrollHandler = () => {
  const { top, bottom, left } = meta.getBoundingClientRect();
  fixedControl.value =
    bottom > document.documentElement.clientHeight &&
    top + 44 <= document.documentElement.clientHeight;
}
const removeScrollHandler = () => {
  scrollParent.value && scrollParent.value.removeEventListener('scroll', scrollHandler)
}
watch(
  () => isExpanded,
  (val) => {
    // console.log(111, val)
    setCodeAreaHeight()
    if (!val) {
      fixedControl.value = false
      removeScrollHandler()
      return
    }
    setTimeout(() => {
      scrollParent.value = window
      scrollParent.value && scrollParent.value.addEventListener('scroll', scrollHandler)
      scrollHandler()
    }, 200)
  }
)
onUnmounted(() => {
  removeScrollHandler()
})
</script>
<style lang="scss">
.code-format {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: 0.2s;

  &.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }

  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }

  .demo-button {
    float: right;
  }

  .source {
    padding: 15px 15px 5px 15px;
  }

  .meta {
    background-color: #fafafa;
    border-top: solid 1px #eaeefb;
    overflow: hidden;
    height: 0;
    transition: height 0.5s;
  }

  .description {
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;

    p {
      margin: 0;
      line-height: 26px;
    }

    code {
      color: #5e6d82;
      background-color: #e6effb;
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
    }
  }

  .highlight {
    pre {
      margin: 0;
    }

    code.hljs {
      margin: 0;
      border: none;
      max-height: none;
      border-radius: 0;

      &::before {
        content: none;
      }
    }
  }

  .code-format-control {
    border-top: solid 1px #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;

    &.is-fixed {
      position: fixed;
      bottom: 0;
      width: 1068px;
      z-index: 1;
    }

    i {
      font-size: 16px;
      line-height: 44px;
      transition: 0.3s;

      &.hovering {
        transform: translateX(-40px);
      }
    }

    >span {
      position: absolute;
      transform: translateX(-30px);
      font-size: 14px;
      line-height: 44px;
      transition: 0.3s;
      display: inline-block;
    }

    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }

    & .text-slide-enter,
    & .text-slide-leave-active {
      opacity: 0;
      transform: translateX(10px);
    }

    .qr_code {
      line-height: 26px;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 14px;
      padding-left: 15px;
      padding-right: 25px;
    }

    .control-button {
      line-height: 26px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 14px;
      padding-left: 5px;
      padding-right: 25px;
    }
  }

  @media (max-width: 1500px) {
    .code-format-control {
      &.is-fixed {
        width: 916px;
      }
    }
  }

  @media (max-width: 1300px) {
    .code-format-control {
      &.is-fixed {
        width: 840px;
      }
    }
  }

  @media (max-width: 1200px) {
    .code-format-control {
      &.is-fixed {
        width: 770px;
      }
    }
  }

  table {
    margin: 0;
    display: table;
  }

  th,
  td,
  tr {
    border: 0;
  }
}

.el-popper {
  table {
    margin: 0;
    display: table;
  }

  th,
  td,
  tr {
    border: 0;
  }

  tr:nth-child(2n) {
    background: none;
  }
}
</style>
