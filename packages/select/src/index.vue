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
    <template v-for="(index, name) in slots" v-slot:[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template v-if="!useVirtual">
      <el-checkbox
        v-if="multiple && !isShowPagination"
        v-model="selectChecked"
        @change="selectAll"
        class="all_checkbox"
        >全选</el-checkbox
      >
      <el-option
        v-for="(item, index) in optionSource"
        :key="index + 'i'"
        :label="customLabel ? customLabelHandler(item) : item[labelCustom]"
        :value="returnObject ? item : item[valueCustom]"
        :disabled="item.disabled"
      >
        <template v-for="(index, name) in slots" v-slot:[name]="data">
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
            ...$attrs,
            ...paginationOption.bind
          }"
        />
      </div>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from "vue"
defineOptions({
  name: "TSelect"
})
export interface TSelectProps {
  modelValue: string | number | Array<any> | Record<string, any> | undefined
  multiple?: boolean
  width?: string
  valueCustom?: string
  labelCustom?: string
  customLabel?: string
  optionSource?: Array<any>
  filterable?: boolean
  isShowPagination?: boolean
  paginationOption?: {
    pageSize?: number
    currentPage?: number
    pagerCount?: number
    total?: number
    layout?: string
    bind?: Record<string, any>
  }
  useVirtual?: boolean
  returnObject?: boolean
}
const props = withDefaults(defineProps<TSelectProps>(), {
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
  returnObject: false
})
const tselectRef = ref()
const filteredOptionsCount = ref(1)
const slots = useSlots()
// 抛出事件
const emits = defineEmits(["update:modelValue", "change", "input", "select-input"])
const handlesSelectInput = (e: any) => {
  if (props.filterable) {
    // console.log("handlesSelectInput---tselectRef", tselectRef.value.filteredOptionsCount)
    filteredOptionsCount.value = tselectRef.value.filteredOptionsCount
  }
  emits("select-input", e.target.value)
}
// vue3 v-model简写
let childSelectedValue: any = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    // console.log("childSelectedValue", val)
    emits("update:modelValue", val)
  }
})
const handlesChange = (val: any) => {
  // console.log(val)
  emits("change", val)
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
</script>
<style lang="scss" scoped>
.t_select {
  .el-select-dropdown {
    .all_checkbox {
      margin-left: 20px;
    }
  }
}
</style>
