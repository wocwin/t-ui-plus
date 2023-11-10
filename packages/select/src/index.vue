<template>
  <component
    :is="!useVirtual ? 'el-select' : 'el-select-v2'"
    popper-class="t_select"
    v-model="childSelectedValue"
    :options="!useVirtual ? null : optionSource"
    :style="{ width: width || '100%' }"
    v-bind="{
      clearable: true,
      filterable: true,
      multiple:multiple,
      ...$attrs,
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
      >全选</el-checkbox>
      <el-option
        v-for="(item, index) in optionSource"
        :key="index + 'i'"
        :label="customLabel ? customLabelHandler(item) : item[labelCustom]"
        :value="item[valueCustom]"
      ></el-option>
      <div class="t_select__pagination" v-if="isShowPagination">
        <el-pagination
          v-model:current-page="paginationOption.currentPage"
          v-model:page-size="paginationOption.pageSize"
          :layout="
            paginationOption.layout || 'total, prev, pager, next, jumper'
          "
          :pager-count="paginationOption.pagerCount"
          :total="paginationOption.total"
          v-bind="{
            small: true,
            background: true,
            ...$attrs,
            ...paginationOption.bind,
          }"
        />
      </div>
    </template>
  </component>
</template>

<script setup lang="ts" name="TSelect">
import { computed, useSlots } from 'vue'
const props: any = defineProps({
  modelValue: {
    type: [String, Number, Array],
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 选择框宽度
  width: {
    type: String,
  },
  // 传入的option数组中，要作为最终选择项的键值key
  valueCustom: {
    type: String,
    default: 'key',
  },
  // 传入的option数组中，要作为显示项的键值名称
  labelCustom: {
    type: String,
    default: 'label',
  },
  // 是否自定义设置下拉label
  customLabel: {
    type: String,
  },
  // 下拉框组件数据源
  optionSource: {
    type: Array as unknown as any[],
    default: () => [],
  },
  // 是否显示分页
  isShowPagination: {
    type: Boolean,
    default: false,
  },
  // 分页配置
  paginationOption: {
    type: Object,
    default: () => {
      return {
        pageSize: 6, // 每页显示条数
        currentPage: 1, // 当前页
        pagerCount: 5, // 按钮数，超过时会折叠
        total: 0, // 总条数
      }
    },
  },
  // 是否开启虚拟列表
  useVirtual: {
    type: Boolean,
    default: false,
  },
})
const slots = useSlots()
// 抛出事件
const emits = defineEmits(['update:modelValue'])
// vue3 v-model简写
let childSelectedValue: any = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    // console.log(777, val)
    emits('update:modelValue', val)
  },
})
// 设置全选
const selectChecked = computed({
  get() {
    const _deval: any = props.modelValue
    return _deval?.length === props.optionSource.length
  },
  set(val: any) {
    return val?.length === props.optionSource.length
  },
})
// 点击全选
const selectAll = (val: any) => {
  const options = JSON.parse(JSON.stringify(props.optionSource))
  if (val) {
    const selectedAllValue = options.map((item) => {
      return item[props.valueCustom]
    })
    emits('update:modelValue', selectedAllValue)
  } else {
    emits('update:modelValue', null)
  }
}
// 自定义label显示
const customLabelHandler = (item) => {
  return eval(props.customLabel)
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
