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

<script setup lang="ts">
import { computed, useAttrs, useSlots, watch, reactive, ref } from "vue"

defineOptions({
  name: "TDatePicker"
})

export interface TDatePickerProps {
  modelValue: string | Date | Array<string | Date> | undefined
  plusTime?: boolean
  type?:
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
  shortcuts?: any[]
  isPickerOptions?: boolean
}

const props = withDefaults(defineProps<TDatePickerProps>(), {
  plusTime: false,
  type: "date",
  isPickerOptions: false
})

// 抛出事件
const emits = defineEmits(["update:modelValue", "change"])

const attrs = useAttrs()
const slots = useSlots()

// vue3 v-model简写
let time = computed({
  get() {
    return props.modelValue
  },
  set(val) {
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
    ...attrs
  }
})

const state = reactive({
  dateOptions: props.shortcuts
})

// 获取快捷配置
const getShortcuts = (type: string) => {
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
    let [startTime, endTime] = val
    if (props.plusTime) {
      startTime += " 00:00:00"
      endTime += " 23:59:59"
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

watch(
  () => props.shortcuts,
  val => {
    if (props.isPickerOptions) {
      state.dateOptions = getShortcuts(props.type)
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
