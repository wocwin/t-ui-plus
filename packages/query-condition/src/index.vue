<template>
  <el-form
    id="t_query_condition"
    v-bind="$attrs"
    :label-width="labelWidth"
    :form="queryState.form"
    size="default"
    class="t-query-condition"
    :style="{
      'grid-template-areas': gridAreas,
      'grid-template-columns': `repeat(${colLength}, minmax(0px, ${100 / colLength}%))`
    }"
    @submit.prevent
  >
    <el-form-item
      v-for="(opt, i) in cOpts"
      :key="i"
      :label="opt.label"
      :label-width="opt.labelWidth"
      v-bind="$attrs"
      :style="{ gridArea: i }"
      :class="[opt.className, { render_label: opt.labelRender }]"
    >
      <!-- 自定义label -->
      <template #label v-if="opt.labelRender">
        <render-comp :form="queryState.form" :render="opt.labelRender" />
      </template>
      <!-- 自定义输入框插槽 -->
      <template v-if="opt.slotName">
        <slot :name="opt.slotName" :param="queryState.form" :scope="queryState.form"></slot>
      </template>
      <template v-if="opt.isSelfCom">
        <component
          :is="opt.comp"
          :ref="opt.comp === 't-select-table' ? (el: any) => handleRef(el, i) : ''"
          v-model="queryState.form[opt.dataIndex]"
          :placeholder="opt.placeholder || getPlaceholder(opt)"
          v-bind="
            typeof opt.bind == 'function'
              ? opt.bind(queryState.form)
              : { clearable: true, filterable: true, ...$attrs, ...opt.bind }
          "
          :style="{ width: opt.width || '100%' }"
          @change="handleEvent({ type: opt.event, val: queryState.form[opt.dataIndex] })"
          v-on="cEvent(opt)"
        />
      </template>
      <component
        v-if="!opt.isSelfCom && !opt.slotName"
        :is="opt.comp"
        v-bind="
          typeof opt.bind == 'function'
            ? opt.bind(queryState.form)
            : { clearable: true, filterable: true, ...$attrs, ...opt.bind }
        "
        :placeholder="opt.placeholder || getPlaceholder(opt)"
        @change="handleEvent({ type: opt.event, val: queryState.form[opt.dataIndex] })"
        v-on="cEvent(opt)"
        v-model="queryState.form[opt.dataIndex]"
      >
        <component
          :is="compChildName(opt)"
          v-for="(value, key, index) in selectListType(opt)"
          :key="index"
          :disabled="value.disabled"
          :label="compChildLabel(opt, value)"
          :value="compChildValue(opt, value, key)"
          >{{ compChildShowLabel(opt, value) }}</component
        >
      </component>
    </el-form-item>
    <el-form-item
      v-if="Object.keys(cOpts).length > 0"
      label-width="0"
      style="grid-area: submit_btn"
      :class="[
        'btn',
        { flex_end: cellLength % colLength === 0 },
        { btn_flex_end: Object.keys(cOpts).length === 4 || cellLength > 3 }
      ]"
    >
      <template v-if="isFooter">
        <slot name="footerBtn" />
        <template v-if="!slots.footerBtn">
          <el-button
            class="btn_check"
            @click="checkHandle"
            v-bind="{ type: 'primary', ...queryAttrs }"
            :loading="loading"
            >{{ queryAttrs.btnTxt }}</el-button
          >
          <el-button v-if="reset" class="btn_reset" v-bind="resetAttrs" @click="resetHandle">
            {{ resetAttrs.btnTxt }}
          </el-button>
          <slot name="querybar"></slot>
          <el-button
            v-if="originCellLength > maxVisibleRows * colLength && showOpen"
            @click="open = !open"
            link
          >
            {{ open ? packUpTxt : unfoldTxt }}
            <el-icon v-if="open">
              <ArrowUp />
            </el-icon>
            <el-icon v-else>
              <ArrowDown />
            </el-icon>
          </el-button>
          <more-choose
            :isDropDownSelectMore="isDropDownSelectMore"
            :moreCheckList="moreCheckList"
            :popoverAttrsBind="popoverAttrsBind"
            @getCheckList="event => emits('getCheckList', event)"
          />
        </template>
      </template>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="TQueryCondition">
import RenderComp from "./renderComp.vue"
import MoreChoose from "./moreChoose.vue"
import { computed, ref, watch, useSlots, onMounted, reactive } from "vue"
import { useComputed } from "./useComputed"
const {
  compChildName,
  selectListType,
  compChildLabel,
  compChildValue,
  compChildShowLabel,
  getPlaceholder,
  getColLength
} = useComputed()
import { queryProps } from "./useProps"
const props = defineProps(queryProps)
const slots = useSlots()
// 判断是否使用了某个插槽
const isShow = (name: string) => {
  return Object.keys(slots).includes(name)
}
const popoverAttrsBind = computed(() => {
  return {
    showTxt: "更多",
    title: "所有条件",
    allTxt: "全选",
    reverseTxt: "反选",
    clearTxt: "清空",
    ...props.popoverAttrs
  }
})
// 初始化表单数据
let queryState = reactive({
  form: Object.keys(props.opts).reduce((acc: any, field: any) => {
    acc[field] = props.opts[field].defaultVal ?? null
    return acc
  }, {})
})
let colLength = ref(4)
let showOpen = ref(false)

let open = ref(false)

// 查询按钮配置
const queryAttrs = computed(() => {
  return {
    btnTxt: "查询",
    ...props.btnCheckBind
  }
})
// 重置按钮配置
const resetAttrs = computed(() => {
  return { btnTxt: "重置", ...props.btnResetBind }
})
const originCellLength = computed(() => {
  let length = 0
  Object.keys(props.opts).forEach(key => {
    let span = props.opts[key].span || 1
    if ((length % colLength.value) + span > colLength.value) {
      length += colLength.value - (length % colLength.value)
    }
    length += span
  })
  return length
})
const cOpts = computed(() => {
  let renderSpan = 0
  return Object.keys(props.opts).reduce((acc: any, field: any) => {
    let opt = {
      ...props.opts[field]
    }
    // 收起、展开操作
    if (showOpen.value) {
      renderSpan += opt.span ?? 1
      if (!open.value && renderSpan - 1 >= props.maxVisibleRows * colLength.value) {
        return acc
      }
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
  const fields = Object.keys(cOpts.value)
  let rowIndex = 0
  let rowSpan = 0
  const areas: any = [[]]
  for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
    const field = fields[fieldIndex]
    const opt = cOpts.value[field]
    const span = Math.min(opt.span ?? 1, Math.min(colLength.value, 4)) // 最大4
    if (rowSpan + span > colLength.value) {
      while (rowSpan < colLength.value) {
        areas[rowIndex].push(".")
        rowSpan += 1
      }
      rowSpan = 0
      areas[++rowIndex] = []
    }
    rowSpan += span
    for (let index = 0; index < span; index++) {
      areas[rowIndex].push(field)
    }
  }
  if (areas[rowIndex].length === colLength.value) {
    areas.push(Array(colLength.value).fill("submit_btn"))
  } else {
    while (areas[rowIndex].length < colLength.value) {
      areas[rowIndex].push("submit_btn")
    }
  }
  return areas.reduce((acc: string, cur: any[]) => {
    acc += `'${cur.join(" ")}'\n`
    return acc
  }, "")
})
// 引用第三方事件
const cEvent = computed(() => {
  return (opt: { eventHandle: any; comp: string | string[] }) => {
    // console.log('opt--', opt)
    let event = { ...opt.eventHandle }
    let changeEvent = {} as any
    Object.keys(event).forEach(v => {
      changeEvent[v] = (e: any) => {
        if (
          opt.comp.includes("select") ||
          opt.comp.includes("picker") ||
          opt.comp.includes("date")
        ) {
          event[v] && event[v](e, queryState.form)
        } else {
          if (e) {
            event[v] && event[v](e, queryState.form)
          } else {
            event[v] && event[v](queryState.form)
          }
        }
      }
    })
    return { ...changeEvent }
  }
})
// 初始化表单数据
const initForm = (opts: any, keepVal = false) => {
  return Object.keys(opts).reduce((acc: any, field) => {
    if (keepVal && queryState.form) {
      acc[field] = queryState.form[field] ?? opts[field].defaultVal ?? null
    } else {
      acc[field] = opts[field].defaultVal ?? null
    }
    return acc
  }, {})
}
const emits = defineEmits(["handleEvent", "submit", "reset", "getCheckList"])
// 下拉选择表格组件 ref
const tselecttableref: any = ref({})
// 下拉选择表格组件 动态ref
const handleRef = (el: any, key: any) => {
  if (el) {
    tselecttableref.value[`tselecttableref-${key}`] = el
  }
}
// 重置
const resetHandle = () => {
  queryState.form = initForm(props.opts)
  // 获取所有下拉选择表格组件
  const refList = Object.keys(tselecttableref.value).filter(item =>
    item.includes("tselecttableref")
  )
  if (refList.length > 0 && tselecttableref.value) {
    refList.map(val => {
      // console.log('9999', val)
      tselecttableref.value[val].clear()
    })
  }
  emits("reset", queryState.form)
  checkHandle("reset")
}
// 重置数据
const resetData = () => {
  queryState.form = initForm(props.opts)
  // 获取所有下拉选择表格组件
  const refList = Object.keys(tselecttableref.value).filter(item =>
    item.includes("tselecttableref")
  )
  if (refList.length > 0 && tselecttableref.value) {
    refList.map(val => {
      // console.log('9999', val)
      tselecttableref.value[val].clear()
    })
  }
}

// 查询条件change事件
const handleEvent = (
  { isChange = false, type, val }: { isChange?: boolean; type: string; val: any },
  dataIndex?: string
) => {
  if (!isChange) {
    emits("handleEvent", type, val, queryState.form)
  } else if (dataIndex) {
    queryState.form[dataIndex] = val
  }
}

// 查询
const checkHandle = (flagText: any = false) => {
  emits("submit", queryState.form, flagText)
}

onMounted(() => {
  // 是否显示展开按钮
  if (props.isShowOpen) {
    showOpen.value = true
  } else {
    showOpen.value = false
  }
  // 默认展开
  if (props.isExpansion) {
    open.value = true
  } else {
    open.value = false
  }
  if (props.isShowWidthSize) {
    colLength.value = props.widthSize
  } else {
    colLength.value = getColLength()
  }
  if (props.boolEnter) {
    document.onkeyup = e => {
      // console.log(7777, e)
      let key = e.keyCode
      let pagination = document.querySelectorAll(".el-pagination")
      let isPaginationInputFocus = false
      if (pagination) {
        pagination.forEach(ele => {
          let paginationInputList = ele.getElementsByTagName("input")
          let paginationInput = paginationInputList[paginationInputList.length - 1]
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
  // 使用自定义按钮插槽默认展开所有查询条件
  if (isShow("footerBtn") || !props.isFooter) {
    // console.log("使用自定义按钮插槽默认展开所有查询条件", props.isFooter)
    open.value = true
  }
  // 以下拉方式展示更多条件禁用展开&收起功能
  if (props.isDropDownSelectMore) {
    open.value = true
    showOpen.value = false
  }
})
watch(
  () => props.widthSize,
  val => {
    colLength.value = val
  }
)
watch(
  () => props.opts,
  opts => {
    queryState.form = initForm(opts, !props.configChangedReset)
  },
  { deep: true }
)

// 暴露方法出去
defineExpose({
  queryState,
  props,
  colLength,
  resetData,
  resetHandle,
  checkHandle,
  handleEvent
})
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
      // justify-content: flex-end;
      align-items: center;
      overflow: visible !important;
    }
  }

  .btn {
    .el-form-item__content {
      display: flex;
      // justify-content: flex-end;
    }
    .more_dropdown_icon {
      margin-left: 10px;
      cursor: pointer;
    }
  }

  .btn_flex_end {
    .el-form-item__content {
      justify-content: flex-end;
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
