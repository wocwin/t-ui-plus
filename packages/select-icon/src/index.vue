<template>
  <div class="t_select_icon">
    <el-input
      ref="inputRef"
      v-model="valueIcon"
      v-bind="attrs"
      @clear="clearIcon"
      @click="
        () => {
          ;(dialogVisible = true), (inputValue = '')
        }
      "
    >
      <template #append v-if="isShowIcon">
        <el-button :icon="customIcons[modelValue]" />
      </template>
    </el-input>
    <el-dialog v-model="dialogVisible" :title="attrs.dialogTitle" draggable :width="attrs.width">
      <el-input
        v-model="inputValue"
        v-if="isShowSearch"
        :placeholder="attrs.searchPlaceholder"
        clearable
        :prefix-icon="Icons.Search"
      />
      <el-scrollbar v-if="Object.keys(iconsList).length">
        <div class="icon-list">
          <div
            v-for="item in iconsList"
            :key="item"
            class="icon-item"
            :class="{ 'icon-active': item.name == valueIcon }"
            @click="selectIcon(item)"
          >
            <component :is="item"></component>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </el-scrollbar>
      <el-empty :description="attrs.emptyDescription" v-else />
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="TSelectIcon">
import { ref, computed, useAttrs } from "vue"
import * as Icons from "@element-plus/icons-vue"

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  prefixIcon: {
    type: String,
    default: "Search"
  },
  selectBind: Object,
  isShowSearch: {
    type: Boolean,
    default: true
  },
  isShowIcon: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(["update:modelValue", "select"])
// v-model简写
let valueIcon = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    // console.log("v-model简写", val);
    emit("update:modelValue", val)
  }
})
const $attrs: any = useAttrs()
const attrs = computed(() => {
  const selectBind = {
    "prefix-icon": customIcons[props.prefixIcon],
    placeholder: "请选择图标",
    dialogTitle: "请选择图标",
    searchPlaceholder: "搜索图标",
    emptyDescription: "未搜索到您要找的图标",
    clearable: true,
    width: "50%",
    ...props.selectBind
  }
  return { ...$attrs, ...selectBind }
})
// open Dialog
const dialogVisible = ref(false)

// 选择图标
const selectIcon = (item: any) => {
  dialogVisible.value = false
  valueIcon.value = item.name
  emit("update:modelValue", item.name)
  emit("select", item.name)
}

// 清空图标
const inputRef = ref()
const clearIcon = () => {
  valueIcon.value = ""
  emit("update:modelValue", "")
  setTimeout(() => inputRef.value.blur(), 0)
}

// 监听搜索框值
const inputValue = ref("")
const customIcons: { [key: string]: any } = Icons
const iconsList = computed((): { [key: string]: any } => {
  if (!inputValue.value) return Icons
  let result: { [key: string]: any } = {}
  for (const key in customIcons) {
    if (key.toLowerCase().indexOf(inputValue.value.toLowerCase()) > -1)
      result[key] = customIcons[key]
  }
  return result
})
</script>

<style scoped lang="scss">
.t_select_icon {
  width: 100%;
  .el-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: var(--el-text-color-regular);
    :deep(.el-icon) {
      color: var(--el-color-primary);
    }
  }
  :deep(.el-dialog__body) {
    padding: 25px 20px 20px;
    .el-input {
      margin-bottom: 10px;
    }
    .icon-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, 115px);
      justify-content: space-evenly;
      max-height: 60vh;
      .icon-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 42px;
        padding: 20px 30px;
        cursor: pointer;
        transition: all 0.2s;
        svg {
          width: 30px;
          height: 30px;
        }
        &:hover {
          transform: scale(1.3);
        }
        &.icon-active {
          color: var(--el-color-primary);
        }
        span {
          margin-top: 5px;
          line-height: 20px;
          text-align: center;
        }
      }
    }
  }
}
</style>
