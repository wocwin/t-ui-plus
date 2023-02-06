<template>
  <div class="single_edit_cell" :class="{'edit-enabled-cell': canEdit}">
    <!-- 编辑组件自定义插槽 -->
    <template v-if="configEdit.editSlotName">
      <slot />
    </template>
    <component v-if="!configEdit.editSlotName" :is="configEdit.editComponent||'el-input'" v-model="record.row[prop]"
      :type="configEdit.type" :placeholder="configEdit.placeholder||getPlaceholder(configEdit)" ref="parentCom"
      @change="handleEvent(configEdit.event, record.row[prop],configEdit.editComponent)"
      :style="{width: configEdit.width||'100%'}"
      v-bind="typeof configEdit.bind == 'function' ? configEdit.bind(record) : {clearable:true,filterable:true,...configEdit.bind}">
      <!-- 前置文本 -->
      <template #prepend v-if="configEdit.prepend">{{ configEdit.prepend }}</template>
      <!-- 后置文本 -->
      <template #append v-if="configEdit.append">{{ configEdit.append }}</template>
      <!-- 子组件自定义插槽 -->
      <!-- <template v-if="configEdit.childSlotName">
        <slot />
      </template>-->
      <component :is="compChildName(configEdit)" v-for="(value, key, index) in listTypeInfo[configEdit.list]"
        :key="index" :disabled="value.disabled" :label="compChildLabel(configEdit,value)"
        :value="compChildValue(configEdit,value,key)">{{compChildShowLabel(configEdit,value)}}</component>
    </component>
  </div>
</template>
<script setup lang="ts" name="SingleEditCell">
import { computed } from 'vue'
defineProps({
  /** 编辑配置项说明
   * label: '爱好', // placeholder显示
   * editComponent: 'el-select', // 组件
   * type: 'select-arr', // option显示
   * list: 'hobbyList', // 下拉选择数据源
   * arrLabel: 'label', // 下拉选择中文显示
   * arrKey: 'value' // 下拉选择number显示（最终传后台）
   * bind:{} // 组件衍生属性（即第三方组件属性）
   */
  configEdit: {
    type: Object,
    default: () => ({})
  },
  // 下拉选择数据源
  listTypeInfo: {
    type: Object,
    default: () => ({})
  },
  // 是否显示tip
  isShowTips: {
    type: Boolean,
    default: true
  },
  // 是否开启编辑
  canEdit: {
    type: Boolean,
    default: false
  },
  value: {
    type: [String, Number, Object, Array, Date, Boolean]
  },
  record: {
    type: Object,
    default: {}
  },
  prop: {
    type: String,
    default: ''
  }
})
// 抛出事件
const emits = defineEmits(['handleEvent'])
// 子组件名称
const compChildName = computed(() => {
  return (configEdit: any) => {
    switch (configEdit.type) {
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
// 子子组件label
const compChildLabel = computed(() => {
  return (configEdit: any, value: { [x: string]: any; value: any; }) => {
    switch (configEdit.type) {
      case 'radio':
      case 'checkbox':
        return value.value
      case 'el-select-multiple':
      case 'select-arr':
        return value[configEdit.arrLabel || 'dictLabel']
      case 'select-obj':
        return value
    }
  }
})
// 子子组件value
const compChildValue = computed(() => {
  return (configEdit: any, value: { [x: string]: any; value: any; }, key: any) => {
    switch (configEdit.type) {
      case 'radio':
      case 'checkbox':
        return value.value
      case 'el-select-multiple':
      case 'select-arr':
        return value[configEdit.arrKey || 'dictValue']
      case 'select-obj':
        return key
    }
  }
})
// 子子组件文字展示
const compChildShowLabel = computed(() => {
  return (configEdit: any, value: { [x: string]: any; label: any; }) => {
    switch (configEdit.type) {
      case 'radio':
      case 'checkbox':
        return value.label
      case 'el-select-multiple':
      case 'select-arr':
        return value[configEdit.arrLabel || 'dictLabel']
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
// 绑定的相关事件
const handleEvent = (type: any, val: any, editCom: any) => {
  // console.log('组件', type, val, editCom)
  emits('handleEvent', type, val)
}
</script>
<style lang="scss">
.edit-enabled-cell {
  cursor: pointer;
}
</style>
