<template>
  <component :is="comp" v-bind="typeof bind == 'function' ? bind(form) : {clearable:true,filterable:true,...bind}"
    :placeholder="placeholder||getPlaceholder(opt)" v-on="cEvent" v-model="value">
    <!-- <OptComponent v-for="(cOpt, i) in child" :key="i" v-bind="cOpt" :value="cOpt.value" /> -->
    <component :is="compChildName(opt)" v-for="(value, key, index) in selectListType(opt)" :key="index"
      :disabled="value.disabled" :label="compChildLabel(opt,value)" :value="compChildValue(opt,value,key)">
      {{compChildShowLabel(opt,value)}}</component>
  </component>
</template>
<script setup lang="ts" name="OptComponent">
import { computed } from 'vue'
const props = defineProps({
  dataIndex: {
    type: String,
    default: ''
  },
  form: {
    type: Object,
    default: () => { }
  },
  opt: {
    type: Object,
    default: () => { }
  },
  bind: {
    type: [Object, Function]
  },
  event: {
    type: Object,
    default: () => { }
  },
  comp: {
    type: [String, Object],
    default: ''
  },
  child: {
    type: Array as unknown as any[],
    default: () => ([])
  },
  placeholder: {
    type: String
  },
  value: {
    type: [String, Number, Array, Date, Boolean],
    default: ''
  },
  changeEvent: {
    type: String,
    default: 'input'
  }
})
const emits = defineEmits(['change'])
const cEvent = computed(() => {
  let event = { ...props.event }
  let changeEvent = {}
  if (props.changeEvent) {
    changeEvent[props.changeEvent] = (v: any) => {
      event[props.changeEvent] && event[props.changeEvent](v)
      emits('change', v, props.dataIndex)
    }
  }
  return { ...event, ...changeEvent }
})
// 子组件名称
const compChildName = computed(() => {
  return (opt: any) => {
    switch (opt.type) {
      case 'checkbox':
        return 'el-checkbox'
      case 'radio':
        return 'el-radio'
      case 'select-arr':
      case 'select-obj':
        return 'el-option'
    }
  }
})
// 下拉数据
const selectListType = computed(() => {
  return (opt: any) => {
    if (opt.listTypeInfo) {
      return opt.listTypeInfo[opt.list]
    } else {
      return []
    }
  }
})
// 子子组件label
const compChildLabel = computed(() => {
  return (opt: any, value: { [x: string]: any; value: any; }) => {
    switch (opt.type) {
      case 'radio':
      case 'checkbox':
        return value.value
      case 'el-select-multiple':
      case 'select-arr':
        return value[opt.arrLabel || 'dictLabel']
      case 'select-obj':
        return value
    }
  }
})
// 子子组件value
const compChildValue = computed(() => {
  return (opt: any, value: { [x: string]: any; value: any; }, key: any) => {
    switch (opt.type) {
      case 'radio':
      case 'checkbox':
        return value.value
      case 'el-select-multiple':
      case 'select-arr':
        return value[opt.arrKey || 'dictValue']
      case 'select-obj':
        return key
    }
  }
})
// 子子组件文字展示
const compChildShowLabel = computed(() => {
  return (opt: any, value: { [x: string]: any; label: any; }) => {
    switch (opt.type) {
      case 'radio':
      case 'checkbox':
        return value.label
      case 'el-select-multiple':
      case 'select-arr':
        return value[opt.arrLabel || 'dictLabel']
      case 'select-obj':
        return value
    }
  }
})
// placeholder的显示
const getPlaceholder = (row: any) => {
  let placeholder
  if (row.comp && typeof row.comp == 'string') {
    if (row.comp.includes('input')) {
      placeholder = '请输入' + row.label
    } else if (row.comp.includes('select') || row.comp.includes('date')) {
      placeholder = '请选择' + row.label
    } else {
      placeholder = row.label
    }
  }
  return placeholder
}
</script>
