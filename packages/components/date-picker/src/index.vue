<template>
  <div class="t-date-picker" ref="DatePicker">
    <el-date-picker
      :type="type"
      v-model="time"
      :shortcuts="state.dateOptions"
      @change="dateChange"
      v-bind="attrsBind"
    >
      <template v-for="(_index, name) in slots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </el-date-picker>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots, watch, reactive, ref } from "vue"
import type { TDatePickerSelfProps as TDatePickerProps } from "./type"
import { useLocale } from "@t-ui-plus/hooks"
defineOptions({
  name: "TDatePicker"
})

const props = withDefaults(defineProps<TDatePickerProps>(), {
  plusTime: false,
  type: "date",
  isPickerOptions: false
})

const emits = defineEmits<{
  (e: "update:modelValue", val: any): void
  (e: "change", val: any): void
}>()
const { t } = useLocale()
const attrs = useAttrs() as Record<string, any>
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
    date: { "value-format": "YYYY-MM-DD", placeholder: t("plus.datepicker.date") },
    dates: { "value-format": "YYYY-MM-DD", placeholder: t("plus.datepicker.dates") },
    week: { format: "YYYY 第 ww 周", placeholder: t("plus.datepicker.week") },
    month: {
      "value-format": "YYYY-MM",
      format: "YYYY-MM",
      placeholder: t("plus.datepicker.month")
    },
    months: {
      "value-format": "YYYY-MM",
      format: "YYYY-MM",
      placeholder: t("plus.datepicker.months")
    },
    year: { "value-format": "YYYY", format: "YYYY", placeholder: t("plus.datepicker.year") },
    years: { "value-format": "YYYY", format: "YYYY", placeholder: t("plus.datepicker.years") },
    daterange: {
      "value-format": "YYYY-MM-DD",
      "range-separator": "~",
      "start-placeholder": t("plus.datepicker.startDatePlaceholder"),
      "end-placeholder": t("plus.datepicker.endDatePlaceholder")
    },
    monthrange: {
      "value-format": "YYYY-MM",
      "range-separator": "~",
      "start-placeholder": t("plus.datepicker.startMonthPlaceholder"),
      "end-placeholder": t("plus.datepicker.endMonthPlaceholder")
    },
    datetime: {
      format: "YYYY-MM-DD HH:mm:ss",
      "value-format": "YYYY-MM-DD HH:mm:ss",
      placeholder: t("plus.datepicker.datetime")
    },
    datetimerange: {
      format: "YYYY-MM-DD HH:mm:ss",
      "value-format": "YYYY-MM-DD HH:mm:ss",
      "range-separator": "~",
      "start-placeholder": t("plus.datepicker.startTimePlaceholder"),
      "end-placeholder": t("plus.datepicker.endTimePlaceholder")
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
      { text: t("plus.datepicker.shortcutsDate.today"), value: new Date() },
      {
        text: t("plus.datepicker.shortcutsDate.yesterday"),
        value: () => subtractDays(new Date(), 1)
      },
      {
        text: t("plus.datepicker.shortcutsDate.lastWeek"),
        value: () => subtractDays(new Date(), 7)
      }
    ],
    daterange: [
      {
        text: t("plus.datepicker.shortcutsDaterange.pastWeek"),
        value: () => [subtractDays(new Date(), 7), new Date()]
      },
      {
        text: t("plus.datepicker.shortcutsDaterange.pastMonth"),
        value: () => [subtractDays(new Date(), 30), new Date()]
      },
      {
        text: t("plus.datepicker.shortcutsDaterange.pastThreeMonths"),
        value: () => [subtractDays(new Date(), 90), new Date()]
      }
    ],
    monthrange: [
      { text: t("plus.datepicker.shortcutsMonthrange.thisMonth"), value: [new Date(), new Date()] },
      {
        text: t("plus.datepicker.shortcutsMonthrange.thisYear"),
        value: () => [new Date(new Date().getFullYear(), 0), new Date()]
      },
      {
        text: t("plus.datepicker.shortcutsMonthrange.pastSixMonths"),
        value: () => [subtractMonths(new Date(), 6), new Date()]
      }
    ],
    datetime: [
      { text: t("plus.datepicker.shortcutsDatetime.today"), value: new Date() },
      {
        text: t("plus.datepicker.shortcutsDatetime.yesterday"),
        value: () => subtractDays(new Date(), 1)
      },
      {
        text: t("plus.datepicker.shortcutsDatetime.lastWeek"),
        value: () => subtractDays(new Date(), 7)
      }
    ],
    datetimerange: [
      {
        text: t("plus.datepicker.shortcutsDatetimerange.pastWeek"),
        value: () => [subtractDays(new Date(), 7), new Date()]
      },
      {
        text: t("plus.datepicker.shortcutsDatetimerange.pastMonth"),
        value: () => [subtractDays(new Date(), 30), new Date()]
      },
      {
        text: t("plus.datepicker.shortcutsDatetimerange.pastThreeMonths"),
        value: () => [subtractDays(new Date(), 90), new Date()]
      }
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
    DatePicker.value.getElementsByClassName("el-range-input")[0]?.blur()
    DatePicker.value.getElementsByClassName("el-range-input")[1]?.blur()
  } else {
    emits("change", val)
    if (props.type.includes("range")) {
      DatePicker.value.getElementsByClassName("el-range-input")[0]?.blur()
      DatePicker.value.getElementsByClassName("el-range-input")[1]?.blur()
    } else {
      DatePicker.value.getElementsByClassName("el-input__inner")[0]?.blur()
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
// 监听时间变化
const clear = () => {
  emits("update:modelValue", null)
}
// 暴露方法出去
defineExpose({ state, clear })
</script>
