<template>
  <component
    :is="!useVirtual ? 'el-select' : 'el-select-v2'"
    popper-class="t_select"
    ref="tselectRef"
    v-model="childSelectedValue"
    :options="!useVirtual ? null : optionSource"
    :style="{ width: width || '100%' }"
    @change="handlesChange"
    @input="handlesSelectInput"
    v-bind="{
      clearable: true,
      filterable: filterable,
      multiple: multiple,
      ...$attrs
    }"
  >
    <template v-for="(_index, name) in slots" v-slot:[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template v-if="!useVirtual">
      <el-checkbox
        v-if="multiple && !isShowPagination"
        v-model="selectChecked"
        @change="selectAll"
        class="all_checkbox"
        >{{ selectAllTxt }}</el-checkbox
      >
      <el-option
        v-for="(item, index) in mergedOptions"
        :key="index + 'i'"
        :label="customLabel ? customLabelHandler(item) : item[labelCustom]"
        :value="returnObject ? item : item[valueCustom]"
        :disabled="item.disabled"
      >
        <template v-for="(_index, name) in slots" v-slot:[name]="data">
          <slot :name="name" v-bind="data" />
        </template>
      </el-option>
      <div class="t_select__pagination" v-if="isShowPagination && filteredOptionsCount > 0">
        <el-pagination
          v-model:current-page="paginationOption.currentPage"
          v-model:page-size="paginationOption.pageSize"
          :layout="paginationOption.layout || 'total, prev, pager, next, jumper'"
          :pager-count="paginationOption.pagerCount"
          :total="paginationOption.total"
          @input.stop="(e: any) => emits('input', e.target.value)"
          v-bind="{
            size: 'small',
            background: true,
            ...paginationOption.bind,
            ...$attrs
          }"
        />
      </div>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, useSlots, watch, onMounted } from "vue"
import type { TSelectProps } from "./type"
defineOptions({
  name: "TSelect"
})

const props = withDefaults(defineProps<TSelectProps>(), {
  modelValue: undefined,
  multiple: false,
  valueCustom: "key",
  labelCustom: "label",
  customLabel: "",
  optionSource: () => [],
  filterable: true,
  isShowPagination: false,
  paginationOption: () => ({
    pageSize: 6,
    currentPage: 1,
    pagerCount: 5,
    total: 0
  }),
  useVirtual: false,
  returnObject: false,
  isCached: true,
  isRadioEchoLabel: true,
  radioSelectValLabel: "",
  selectAllTxt: "全选"
})
const tselectRef = ref()
const filteredOptionsCount = ref(1)
const slots = useSlots()
// 抛出事件
const emits = defineEmits(["update:modelValue", "change", "input", "select-input"])
// vue3 v-model简写
const childSelectedValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits("update:modelValue", val)
  }
})

// 当前页数据
const currentOptions = ref(props.optionSource)
// 缓存已选数据 { value: { label, value } }
const cachedOptions = ref(new Map())
// 合并后的选项列表（当前页数据 + 已选缓存）
const mergedOptions = computed(() => {
  const currentValues =
    (currentOptions.value.length > 0 &&
      currentOptions.value.map(item => item[props.valueCustom])) ||
    []
  const cached = Array.from(cachedOptions.value.values()).filter(
    item => !currentValues.includes(item[props.valueCustom])
  )
  return props.isShowPagination && props.isCached
    ? [...currentOptions.value, ...cached]
    : [...currentOptions.value]
})
watch(
  () => props.optionSource,
  newVal => {
    currentOptions.value = newVal || []
    // console.log("newVal---watch", newVal)
    // 缓存已选数据
    newVal.length > 0 &&
      newVal.forEach(item => {
        const isObject = typeof childSelectedValue.value === "object"
        const condition = isObject
          ? Array.isArray(childSelectedValue.value) &&
            childSelectedValue.value.includes(item[props.valueCustom])
          : childSelectedValue.value === item[props.valueCustom]

        if (condition) {
          cachedOptions.value.set(item[props.valueCustom], item)
        }
      })
  }
)
watch(
  () => props.radioSelectValLabel,
  val => {
    if (val && props.isRadioEchoLabel && !props.multiple && props.isShowPagination) {
      childSelectedValue.value = val
    }
  },
  { deep: true }
)
onMounted(() => {
  // 缓存已选数据
  currentOptions.value.forEach(item => {
    const isObject = typeof childSelectedValue.value === "object"
    const condition = isObject
      ? Array.isArray(childSelectedValue.value) &&
        childSelectedValue.value.includes(item[props.valueCustom])
      : childSelectedValue.value === item[props.valueCustom]

    if (condition) {
      cachedOptions.value.set(item[props.valueCustom], item)
    }
  })
  if (
    props.radioSelectValLabel &&
    props.isRadioEchoLabel &&
    !props.multiple &&
    props.isShowPagination
  ) {
    childSelectedValue.value = props.radioSelectValLabel
  }
})
const handlesSelectInput = (e: any) => {
  if (props.filterable) {
    // console.log("handlesSelectInput---tselectRef", tselectRef.value.filteredOptionsCount)
    filteredOptionsCount.value = tselectRef.value.filteredOptionsCount
  }
  emits("select-input", e.target.value)
}

const handlesChange = (value: any) => {
  // console.log(val)
  // 更新缓存
  if (Array.isArray(value)) {
    const newCache = new Map()
    value.forEach(val => {
      const item = mergedOptions.value.find(opt => opt[props.valueCustom] === val)
      if (item) newCache.set(val, item)
    })
    cachedOptions.value = newCache
  } else {
    const item = mergedOptions.value.find(opt => opt[props.valueCustom] === value)
    cachedOptions.value = item ? new Map([[value, item]]) : new Map()
  }
  emits("change", value)
}
// 设置全选
const selectChecked = computed({
  get() {
    const _deval: any = props.modelValue
    const list = props.optionSource.filter((item: { disabled: any }) => {
      return !item.disabled
    })
    return _deval?.length === list.length
  },
  set(val: any) {
    const list = props.optionSource.filter((item: { disabled: any }) => {
      return !item.disabled
    })
    return val?.length === list.length
  }
})
// 点击全选
const selectAll = (val: any) => {
  let options = JSON.parse(JSON.stringify(props.optionSource))
  // 数据源过滤禁用选项
  options = options.filter((item: { disabled: any }) => {
    return !item.disabled
  })
  if (val) {
    const selectedAllValue = options.map((item: { [x: string]: any }) => {
      return item[props.valueCustom]
    })
    emits("update:modelValue", selectedAllValue)
  } else {
    emits("update:modelValue", null)
  }
}
// 自定义label显示
const customLabelHandler = (_item: any) => {
  let fun = new Function("_item", "return " + props.customLabel)
  return fun(_item)
}
// 清空
const clear = () => {
  emits("update:modelValue", null)
}
defineExpose({ clear })
</script>
