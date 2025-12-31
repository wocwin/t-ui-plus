<template>
  <el-tooltip v-if="showTooltip" effect="dark" placement="bottom-start">
    <template #content>
      <div>{{ currencyFilter(modelValue) }}</div>
      <div>{{ digitUppercase(modelValue) }}</div>
    </template>
    <el-input v-model="internalValue" v-bind="inputProps" @blur="handleBlur">
      <template v-for="(_, name) in slots" :key="name" v-slot:[name]="data">
        <slot :name="name" v-bind="data" />
      </template>
      <template #append v-if="showAppend">
        <span v-if="inputType === 'amount'">{{ appendTitleText }}</span>
        <slot v-else name="append" />
      </template>
    </el-input>
  </el-tooltip>
  <el-input v-else v-model="internalValue" v-bind="inputProps" @blur="handleBlur">
    <template v-for="(_, name) in slots" :key="name" v-slot:[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #append v-if="showAppend">
      <span v-if="inputType === 'amount'">{{ appendTitleText }}</span>
      <slot v-else name="append" />
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"
import { computed, useSlots, useAttrs } from "vue"
import { useLocale } from "@t-ui-plus/hooks"
import type { TInputSelfProps as TInputProps } from "./type"

defineOptions({
  name: "TInput"
})

const { t } = useLocale()
const attrs = useAttrs()
const props = withDefaults(defineProps<TInputProps>(), {
  modelValue: "",
  placeholder: "",
  decimalLimit: 2,
  inputType: "text",
  appendTitle: "",
  showThousands: false,
  isTip: false,
  isShowErrorTip: false,
  customErrorTip: ""
})

const emits = defineEmits<{
  (e: "update:modelValue", value: string | number | null): void
}>()

const slots = useSlots()

// 常量
const REGEX = {
  INTEGER: /^\d+$/,
  PHONE: /^1[3456789]\d{9}$/,
  ID_CARD: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  NUMBER: /((^[1-9]\d*)|^0)(\.\d+)?$/,
  NUMBER_DECIMAL: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
} as const

const CHINESE = {
  DIGITS: ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"],
  FRACTIONS: ["角", "分"],
  UNITS: [
    ["元", "万", "亿", "兆"],
    ["", "拾", "佰", "仟"]
  ]
} as const

// 计算属性
const showTooltip = computed(() => props.isTip && !props.showThousands)
const showAppend = computed(() => slots.append || props.inputType === "amount")
const placeholderText = computed(() => props.placeholder || t("plus.input.placeholder"))
const appendTitleText = computed(() => props.appendTitle || t("plus.input.appendTitle"))
const inputProps = computed(() => ({
  placeholder: placeholderText.value,
  clearable: true,
  ...attrs
}))

// 获取当前输入类型的正则表达式
const getInputRegex = (): RegExp | null => {
  if (props.inputType instanceof RegExp) {
    return props.inputType
  }
  switch (props.inputType) {
    case "integer":
      return REGEX.INTEGER
    case "phone":
      return REGEX.PHONE
    case "idCard":
      return REGEX.ID_CARD
    default:
      return null
  }
}

const internalValue = computed({
  get() {
    if (props.inputType === "integer" && props.modelValue != null) {
      return typeof props.modelValue === "number" ? String(props.modelValue) : props.modelValue
    }
    return props.modelValue ?? ""
  },
  set(val: string | number | null) {
    if (props.inputType === "integer") {
      if (!val || val === "") {
        emits("update:modelValue", null)
      } else {
        const str = String(val)
        const regex = getInputRegex()
        emits("update:modelValue", regex?.test(str) ? Number(str) : str)
      }
    } else {
      emits("update:modelValue", val ?? "")
    }
  }
})

// 通用验证函数
const validate = (value: string, pattern: RegExp, errorKey?: string): string | null => {
  if (pattern.test(value)) return value
  if (props.isShowErrorTip) {
    const errorMsg =
      props.customErrorTip || (errorKey ? t(errorKey) : t("plus.input.validateError"))
    ElMessage.error(errorMsg)
  }
  return null
}

// 格式化函数
const formatAmount = (value: number): string => {
  if (!value) {
    if (props.isShowErrorTip) {
      const msg =
        t("plus.input.format") +
        (props.inputType === "amount" ? t("plus.input.amount") : t("plus.input.numbers"))
      ElMessage.error(msg)
    }
    return ""
  }
  const fixed = value.toFixed(props.decimalLimit)
  return props.showThousands ? fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : fixed
}

const currencyFilter = (num: number | string | null, n = 2): string => {
  if (!REGEX.NUMBER.test(String(num)) || (num == null && num !== 0)) return ""
  const n2 = n > 0 && n <= 20 ? n : 2
  const numStr = parseFloat(String(num).replace(/^\d\.-/g, "")).toFixed(n2)
  const [int, dec] = numStr.split(".")
  return `￥ ${int.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${dec}`
}

const digitUppercase = (num: number | string | null): string => {
  if (!REGEX.NUMBER_DECIMAL.test(String(num))) return t("plus.input.digitUppercase")
  const isNegative = Number(num) < 0
  let absNum = Math.abs(Number(num))
  let result = ""

  // 小数部分
  CHINESE.FRACTIONS.forEach((fraction, index) => {
    const digit = Math.floor(absNum * 10 * Math.pow(10, index)) % 10
    result += (CHINESE.DIGITS[digit] + fraction).replace(/零./, "")
  })
  result = result || "整"

  // 整数部分
  let integerPart = Math.floor(absNum)
  for (let i = 0; i < CHINESE.UNITS[0].length && integerPart > 0; i++) {
    let section = ""
    for (let j = 0; j < CHINESE.UNITS[1].length && integerPart > 0; j++) {
      section = CHINESE.DIGITS[integerPart % 10] + CHINESE.UNITS[1][j] + section
      integerPart = Math.floor(integerPart / 10)
    }
    result = section.replace(/(零.)*零$/, "").replace(/^$/, "零") + CHINESE.UNITS[0][i] + result
  }

  return (
    (isNegative ? "欠" : "") +
    result
      .replace(/(零.)*零元/, "元")
      .replace(/(零.)+/g, "零")
      .replace(/^整$/, "零元整")
  )
}

// 失焦处理
const handleBlur = (): void => {
  const val = internalValue.value
  let formatted: string | number | null = val

  // 处理自定义正则
  if (props.inputType instanceof RegExp) {
    formatted = validate(String(val || ""), props.inputType) ?? ""
    internalValue.value = formatted
    return
  }

  switch (props.inputType) {
    case "amount":
    case "decimal":
      formatted = formatAmount(Number(val))
      break
    case "phone":
      formatted = validate(String(val || ""), REGEX.PHONE, "plus.input.validatePhone") ?? ""
      break
    case "integer": {
      const result = validate(String(val || ""), REGEX.INTEGER, "plus.input.validateInteger")
      formatted = result ? Number(result) : null
      break
    }
    case "idCard":
      formatted = validate(String(val || ""), REGEX.ID_CARD, "plus.input.validateIdCard") ?? ""
      break
  }

  internalValue.value = formatted
}
</script>