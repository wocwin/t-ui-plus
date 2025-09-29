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
    <el-dialog
      v-model="dialogVisible"
      :title="attrs.dialogTitle"
      draggable
      :width="attrs.width"
      class="t_select_icon_dialog"
    >
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

<script setup lang="ts">
import { ref, computed, useAttrs } from "vue"
import * as Icons from "@element-plus/icons-vue"
defineOptions({
  name: "TSelectIcon"
})
export interface TSelectIconProps {
  modelValue: any
  prefixIcon?: string
  selectBind?: Record<string, any>
  isShowSearch?: boolean
  isShowIcon?: boolean
}
const props = withDefaults(defineProps<TSelectIconProps>(), {
  modelValue: "",
  prefixIcon: "Search",
  selectBind: () => ({}),
  isShowSearch: true,
  isShowIcon: true
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
defineExpose({ clearIcon })
</script>
