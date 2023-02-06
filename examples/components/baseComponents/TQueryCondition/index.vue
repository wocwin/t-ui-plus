<template>
  <el-form id="t_query_condition" v-bind="$attrs" :label-width="labelWidth" :form="state.form" size="default"
    class="t-query-condition"
    :style="{'grid-template-areas': gridAreas, 'grid-template-columns': `repeat(${colLength}, minmax(220px, ${100 / colLength}%))`}"
    @submit.prevent>
    <el-form-item v-for="(opt, i) in cOpts" :key="i" :label="opt.label" :label-width="opt.labelWidth" v-bind="$attrs"
      :style="{gridArea: i}" :class="[opt.className,{'render_label':opt.labelRender}]">
      <!-- 自定义label -->
      <template #label v-if="opt.labelRender">
        <render-comp :form="state.form" :render="opt.labelRender" />
      </template>
      <!-- 自定义输入框插槽 -->
      <template v-if="opt.slotName">
        <slot :name="opt.slotName" :param="state.form"></slot>
      </template>
      <component v-if="!opt.slotName" :is="opt.comp"
        v-bind="typeof opt.bind == 'function' ? opt.bind(state.form) : {clearable:true,filterable:true,...$attrs,...opt.bind}"
        :placeholder="opt.placeholder||getPlaceholder(opt)" @change="handleEvent(opt.event, state.form[opt.dataIndex])"
        v-model="state.form[opt.dataIndex]">
        <template v-if="!opt.comp.includes('date')">
          <component :is="compChildName(opt)" v-for="(value, key, index) in selectListType(opt)" :key="index"
            :disabled="value.disabled" :label="compChildLabel(opt,value)" :value="compChildValue(opt,value,key)">
            {{compChildShowLabel(opt,value)}}
          </component>
        </template>
      </component>
    </el-form-item>
    <el-form-item v-if="Object.keys(cOpts).length > 0" label-width="0" style="grid-area: submit_btn"
      :class="{'flex_end': cellLength % colLength === 0}">
      <el-button type="primary" size="default" class="btn_check" @click="checkHandle" :loading="loading">查询</el-button>
      <el-button v-if="reset" class="btn_reset" size="default" @click="resetHandle">重置</el-button>
      <slot name="querybar"></slot>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts" name="TQueryCondition">
import RenderComp from './renderComp.vue'
import { computed, ref, watch, onMounted, reactive } from 'vue'
const props = defineProps({
  opts: {
    type: Object,
    required: true,
    default: () => ({})
  },
  labelWidth: {
    type: String,
    default: '110px'
  },
  loading: {
    type: Boolean,
    default: false
  },
  reset: {
    type: Boolean,
    default: true
  },
  boolEnter: {
    type: Boolean,
    default: true
  }
})
// 初始化表单数据
let state = reactive({
  form: Object.keys(props.opts).reduce((acc: any, field: any) => {
    acc[field] = props.opts[field].defaultVal || null
    return acc
  }, {})
})
let colLength = ref(0)
const cOpts = computed(() => {
  return Object.keys(props.opts).reduce((acc: any, field: any) => {
    let opt = {
      ...props.opts[field]
    }
    opt.dataIndex = field
    acc[field] = opt
    return acc
  }, {})
})
const cellLength: any = computed(() => {
  // 占用单元格长度
  let length = 0
  Object.keys(props.opts).forEach(key => {
    let span = props.opts[key].span > 4 ? 4 : props.opts[key].span || 1
    length += span
  })
  return length
})
const gridAreas = computed(() => {
  // grid布局按钮位置
  let template = "'. . . .'"
  switch (colLength.value) {
    case 3:
      template = "'. . .'"
      break
    case 2:
      template = "'. .'"
      break
  }
  let areas = [template]
  Object.keys(props.opts).forEach(key => {
    // 根据控件描述注定占用多少列及顺序
    let span = 1
    if (props.opts[key].span > 1 || props.opts[key].span <= 2) {
      // 最多占用2列
      span = props.opts[key].span
    }
    // 计算剩余多少未占用的位置
    let count = 0
    let scrstr = areas[areas.length - 1]
    while (scrstr.indexOf('.') !== -1) {
      scrstr = scrstr.replace(/\./, '')
      count++
    }
    // 若剩余位置不足以放下下一个控件
    if (count < span) {
      areas.push(template)
    }
    let i = 0
    while (i < span) {
      areas[areas.length - 1] = areas[areas.length - 1].replace(/\./, key)
      i++
    }
  })
  // 若控件正好占满一行时，补充多一列放置btn
  if (areas[areas.length - 1].indexOf('.') === -1) {
    areas.push(template)
  }
  if (cellLength.value % colLength.value === 0) {
    // 正好占满一行
    areas[areas.length - 1] = areas[areas.length - 1].replace(
      /\.'$/,
      "submit_btn'"
    )
  } else {
    areas[areas.length - 1] = areas[areas.length - 1].replace(
      /\./,
      'submit_btn'
    )
  }
  return (areas + '').replace(/,/g, '')
})
// 初始化表单数据
const initForm = (opts: any, keepVal = false) => {
  return Object.keys(opts).reduce((acc, field) => {
    if (keepVal && state.form) {
      acc[field] = state.form[field]
    } else if (opts[field].defaultVal) {
      acc[field] = opts[field].defaultVal
    } else {
      acc[field] = null
    }
    return acc
  }, {})
}
const getColLength = () => {
  // 行列数
  const width = window.innerWidth
  let colLength = 4
  if (width > 768 && width < 1280) {
    colLength = 3
  } else if (width <= 768) {
    colLength = 2
  }
  return colLength
}
const emits = defineEmits(['handleEvent', 'submit', 'reset'])
// 重置
const resetHandle = () => {
  state.form = initForm(props.opts)
  emits('reset', state.form)
  checkHandle('reset')
}
// 查询条件change事件
const handleEvent = (type: any, val: any) => {
  emits('handleEvent', type, val, state.form)
}
// 查询
const checkHandle = (flagText: any = false) => {
  emits('submit', state.form, flagText)
}
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
  // console.log(77, row.date)
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
onMounted(() => {
  colLength.value = getColLength()
  if (props.boolEnter) {
    document.onkeyup = e => {
      // console.log(7777, e)
      let key = e.keyCode
      let pagination = document.querySelectorAll('.el-pagination')
      let isPaginationInputFocus = false
      if (pagination) {
        pagination.forEach(ele => {
          let paginationInputList = ele.getElementsByTagName('input')
          let paginationInput =
            paginationInputList[paginationInputList.length - 1]
          // 判断是否有分页器筛选输入框获取焦点
          if (paginationInput === document.activeElement) {
            isPaginationInputFocus = true
          }
        })
      }
      if (isPaginationInputFocus) {
        return
      }
      if (key === 13) {
        checkHandle()
      }
    }
  }
})
watch(
  () => props.opts,
  (opts, oldValue) => {
    state.form = initForm(opts, true)
  }
)

</script>

<style lang="scss">
.t-query-condition.el-form {
  position: relative;
  display: grid;
  gap: 2px 8px;
  margin-bottom: -7px;
  text-align: left;

  .el-select,
  .el-date-editor,
  .ant-calendar-picker {
    width: 100%;
  }

  .flex_end {
    grid-area: submit_btn;
    margin-top: 2px;

    .el-form-item__content {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      overflow: visible !important;
    }
  }

  .el-form-item {
    display: flex;
    margin-bottom: 6px;

    .el-form-item__label {
      flex-shrink: 0;
      min-width: 60px;
      padding-left: 8px;
    }

    .el-form-item__content {
      flex-grow: 1;
      // overflow: hidden;
      margin-left: 0 !important;
    }
  }

  .render_label {
    .el-form-item__label {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      &::before {
        margin-top: 1px;
      }
    }
  }

  .btn_check {
    position: relative;
    top: -1px;
  }

  .btn_reset {
    position: relative;
    top: -1px;
    margin-left: 8px;
  }
}
</style>
