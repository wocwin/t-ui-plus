<template>
  <el-select
    popper-class="t_select"
    v-model="childSelectedValue"
    :style="{ width: width || '100%' }"
    v-bind="{ clearable: true, filterable: true, ...$attrs }"
    :multiple="multiple"
    @change="selectChange"
  >
    <el-checkbox
      v-if="multiple"
      v-model="selectChecked"
      @change="selectAll"
      class="all_checkbox"
      >全选</el-checkbox
    >
    <el-option
      v-for="(item, index) in optionSource"
      :key="index + 'i'"
      :label="item[labelKey]"
      :value="item[valueKey]"
    ></el-option>
  </el-select>
</template>
<script lang="ts">
export default {
  name: 'TSelect'
}
</script>
<script setup lang="ts">
import { computed, watch, ref } from 'vue'
const props = defineProps({
  modelValue: {
    type: [String, Number, Array]
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false
  },
  // 选择框宽度
  width: {
    type: String
  },
  // 传入的option数组中，要作为最终选择项的键值key
  valueKey: {
    type: String,
    default: 'key'
  },
  // 传入的option数组中，要作为显示项的键值名称
  labelKey: {
    type: String,
    default: 'label'
  },
  // 下拉框组件数据源
  optionSource: {
    type: Array as unknown as any[],
    default: () => []
  }
})
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
  }
})
// 设置全选
const selectChecked: any = ref(false)
// 点击全选
const selectAll = (val: any) => {
  const options = JSON.parse(JSON.stringify(props.optionSource))
  if (val) {
    const selectedAllValue = options.map(item => {
      return item[props.valueKey]
    })
    emits('update:modelValue', selectedAllValue)
  } else {
    emits('update:modelValue', null)
  }
}
// 多选时，判断全选框是否选中
const selectChange = (val: any) => {
  // console.log('selectChange', val)
  if (props.multiple) {
    if (val.length === props.optionSource.length) {
      selectChecked.value = true
    } else {
      selectChecked.value = false
    }
  }
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
