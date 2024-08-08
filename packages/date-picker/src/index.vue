<template>
  <div class="t-date-picker" ref="DatePicker">
    <el-date-picker
      :type="type"
      v-model="time"
      :shortcuts="state.dateOptions"
      @change="dateChange"
      v-bind="attrsBind"
    >
      <template v-for="(index, name) in slots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </el-date-picker>
  </div>
</template>
<script setup lang="ts" name="TDatePicker">
import { computed, useAttrs, useSlots, watch, reactive, ref } from "vue"
import type { PropType } from "vue"
const props = defineProps({
  modelValue: {
    type: [String, Date, Array]
  },
  // 日期范围是否显示00:00:00 23:59:59时分秒
  plusTime: {
    type: Boolean,
    default: false
  },
  // 时间类型
  /***
   * week周；month月；year年；dates多个日期；months多个月；years多个年；daterange日期范围；monthrange月份范围
   * datetime日期和时间点;datetimerange日期和时间点范围
   */
  type: {
    type: String as PropType<
      | "date"
      | "week"
      | "month"
      | "year"
      | "dates"
      | "months"
      | "years"
      | "daterange"
      | "monthrange"
      | "datetime"
      | "datetimerange"
    >,
    validator: (value: string) =>
      [
        "date",
        "week",
        "month",
        "year",
        "dates",
        "months",
        "years",
        "daterange",
        "monthrange",
        "datetime",
        "datetimerange"
      ].includes(value),
    default: "date"
  },
  // 快捷配置
  shortcuts: {
    type: Array
  },
  // 是否开启快捷方式
  isPickerOptions: {
    type: Boolean,
    default: false
  }
})
// 抛出事件
const emits = defineEmits(["update:modelValue", "change"])

const $attrs: any = useAttrs()
const slots = useSlots()
// vue3 v-model简写
let time: any = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    // console.log(777, val)
    emits("update:modelValue", val)
  }
})
const DatePicker = ref()
const attrsBind = computed(() => {
  const baseAttrs = {
    date: { "value-format": "YYYY-MM-DD", placeholder: "请选择日期" },
    dates: { "value-format": "YYYY-MM-DD", placeholder: "请选择日期" },
    week: { format: "YYYY 第 ww 周", placeholder: "请选择周" },
    month: { "value-format": "YYYY-MM", format: "YYYY-MM", placeholder: "请选择月" },
    months: { "value-format": "YYYY-MM", format: "YYYY-MM", placeholder: "请选择月" },
    year: { "value-format": "YYYY", format: "YYYY", placeholder: "请选择年" },
    years: { "value-format": "YYYY", format: "YYYY", placeholder: "请选择年" },
    daterange: {
      "value-format": "YYYY-MM-DD",
      "range-separator": "~",
      "start-placeholder": "请选择开始日期",
      "end-placeholder": "请选择结束日期"
    },
    monthrange: {
      "value-format": "YYYY-MM",
      "range-separator": "~",
      "start-placeholder": "请选择开始月份",
      "end-placeholder": "请选择结束月份"
    },
    datetime: {
      format: "YYYY-MM-DD HH:mm:ss",
      "value-format": "YYYY-MM-DD HH:mm:ss",
      placeholder: "请选择日期时间"
    },
    datetimerange: {
      format: "YYYY-MM-DD HH:mm:ss",
      "value-format": "YYYY-MM-DD HH:mm:ss",
      "range-separator": "~",
      "start-placeholder": "请选择开始日期",
      "end-placeholder": "请选择结束日期"
    }
  }
  const typeAttrs = baseAttrs[props.type] || {}
  return {
    ...typeAttrs,
    ...$attrs
  }
})

const state = reactive({
  dateOptions: props.shortcuts
})
// 获取快捷配置
const getShortcuts = (type: any) => {
  const shortcuts = {
    date: [
      { text: "今天", value: new Date() },
      { text: "昨天", value: () => subtractDays(new Date(), 1) },
      { text: "一周前", value: () => subtractDays(new Date(), 7) }
    ],
    daterange: [
      { text: "最近一周", value: () => [subtractDays(new Date(), 7), new Date()] },
      { text: "最近一个月", value: () => [subtractDays(new Date(), 30), new Date()] },
      { text: "最近三个月", value: () => [subtractDays(new Date(), 90), new Date()] }
    ],
    monthrange: [
      { text: "本月", value: [new Date(), new Date()] },
      { text: "今年至今", value: () => [new Date(new Date().getFullYear(), 0), new Date()] },
      { text: "最近六个月", value: () => [subtractMonths(new Date(), 6), new Date()] }
    ],
    datetime: [
      { text: "今天", value: new Date() },
      { text: "昨天", value: () => subtractDays(new Date(), 1) },
      { text: "一周前", value: () => subtractDays(new Date(), 7) }
    ],
    datetimerange: [
      { text: "最近一周", value: () => [subtractDays(new Date(), 7), new Date()] },
      { text: "最近一个月", value: () => [subtractDays(new Date(), 30), new Date()] },
      { text: "最近三个月", value: () => [subtractDays(new Date(), 90), new Date()] }
    ]
  }

  return shortcuts[type] || []
}
const subtractDays = (date: Date, days: number) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() - days)
  return newDate
}
const subtractMonths = (date: Date, months: number) => {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() - months)
  return newDate
}

const dateChange = (val: any[]) => {
  if (props.type === "daterange" && val) {
    let startTime = val[0]
    let endTime = val[1]
    if (props.plusTime) {
      startTime = startTime + " 00:00:00"
      endTime = endTime + " 23:59:59"
    }
    time.value = [startTime, endTime]
    emits("change", [startTime, endTime])
    DatePicker.value.getElementsByClassName("el-range-input")[0].blur()
    DatePicker.value.getElementsByClassName("el-range-input")[1].blur()
  } else {
    emits("change", val)
    if (props.type.includes("range")) {
      DatePicker.value.getElementsByClassName("el-range-input")[0].blur()
      DatePicker.value.getElementsByClassName("el-range-input")[1].blur()
    } else {
      DatePicker.value.getElementsByClassName("el-input__inner")[0].blur()
    }
  }
}
if (props.isPickerOptions) {
  state.dateOptions = getShortcuts(props.type)
}
// watch(
//   () => props.value,
//   (val) => {
//     // console.log(111, val)
//     time.value = val
//   },
//   { deep: true }
// )
watch(
  () => props.shortcuts,
  val => {
    if (props.isPickerOptions) {
      let shortcuts = getShortcuts(props.type)
      state.dateOptions = shortcuts
    } else {
      state.dateOptions = val
    }
  },
  { deep: true }
)
// 暴露方法出去
defineExpose({ state })
</script>
<style lang="scss" scoped>
.t-date-picker {
  width: 100%;
}
</style>
