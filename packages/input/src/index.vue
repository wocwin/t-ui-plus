<template>
  <el-tooltip effect="dark" placement="bottom-start" v-if="isTip && !showThousands">
    <template #content>
      {{ currencyFilter(modelValue) }}<br />
      {{ digitUppercase(modelValue) }}
    </template>
    <el-input
      v-model="internalValue"
      v-bind="{ placeholder, clearable: true, ...$attrs }"
      @blur="handleBlur"
    >
      <template v-for="(index, name) in slots" v-slot:[name]="data">
        <slot :name="name" v-bind="data" />
      </template>
      <template #append v-if="$slots.append || inputType === 'amount'">
        <span v-if="inputType === 'amount'">{{ appendTitle }}</span>
        <slot v-else name="append" />
      </template>
    </el-input>
  </el-tooltip>
  <el-input
    v-model="internalValue"
    v-bind="{ placeholder, clearable: true, ...$attrs }"
    @blur="handleBlur"
    v-else
  >
    <template v-for="(index, name) in slots" v-slot:[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #append v-if="$slots.append || inputType === 'amount'">
      <span v-if="inputType === 'amount'">{{ appendTitle }}</span>
      <slot v-else name="append" />
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"
import { computed, useSlots } from "vue"
export interface TInputProps {
  modelValue: string | number
  placeholder?: string
  decimalLimit?: number
  inputType?: "text" | "amount" | "decimal" | "phone" | "integer" | "idCard"
  appendTitle?: string
  showThousands?: boolean
  isTip?: boolean
  isShowErrorTip?: boolean
}

defineOptions({
  name: "TInput"
})

const props = withDefaults(defineProps<TInputProps>(), {
  modelValue: "",
  placeholder: "请输入",
  decimalLimit: 2,
  inputType: "text",
  appendTitle: "元",
  showThousands: false,
  isTip: false,
  isShowErrorTip: true
})

const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void
}>()

const slots = useSlots()
let internalValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits("update:modelValue", val)
  }
})

const handleBlur = () => {
  let formattedValue = internalValue.value

  const formatValue = (value: any, formatter: (val: any) => any) => {
    if (formatter) {
      return formatter(value)
    }
    return value
  }

  switch (props.inputType) {
    case "amount":
    case "decimal":
      formattedValue = formatValue(Number(internalValue.value), value =>
        formatAmount(value, props.decimalLimit)
      )
      break
    case "phone":
      formattedValue = formatValue(internalValue.value.toString(), validatePhone)
      break
    case "integer":
      formattedValue = formatValue(internalValue.value.toString(), validateInteger)
      break
    case "idCard":
      formattedValue = formatValue(internalValue.value.toString(), validateIdCard)
      break
    default:
      formattedValue = internalValue.value
  }

  internalValue.value = formattedValue
}

// 手机号码校验
const validatePhone = (value: string) => {
  const phoneReg = /^1[3456789]\d{9}$/
  if (phoneReg.test(value)) {
    return value
  } else {
    props.isShowErrorTip && ElMessage.error("请输入正确的手机号码")
    return ""
  }
}
// 身份证号码校验
const validateIdCard = (value: string) => {
  const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (idCardReg.test(value)) {
    return value
  } else {
    props.isShowErrorTip && ElMessage.error("请输入正确的身份证号码")
    return ""
  }
}
// 整数校验
const validateInteger = (value: string) => {
  const integerReg = /^\d+$/
  if (integerReg.test(value)) {
    return value
  } else {
    props.isShowErrorTip && ElMessage.error("请输入正确的整数")
    return ""
  }
}
// 小数、金额类型转换
const formatAmount = (value: number, decimalLimit: number) => {
  if (!value) {
    props.isShowErrorTip &&
      ElMessage.error(`请输入正确的${props.inputType == "amount" ? "金额" : "数字"}`)
    return ""
  }
  // 格式化千分号
  if (props.showThousands) {
    const val = value
      .toFixed(decimalLimit)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return val
  } else {
    return value.toFixed(decimalLimit)
  }
}
/**
 * 数字金额格式过滤 10000 => "￥10,000.00"
 * @param {number} num 被转换数字
 * @param {number} n 保留小数位
 */
const currencyFilter = (num: any, n: number = 2) => {
  const reg = /((^[1-9]\d*)|^0)(\.\d+)?$/
  if (!reg.test(num)) {
    return ""
  } else {
    n = n > 0 && n <= 20 ? n : 2
    if (num || num === 0) {
      num = parseFloat((num + "").replace(/^\d\.-/g, "")).toFixed(n) + ""
      const l = num.split(".")[0].split("").reverse()
      const r = num.split(".")[1]
      let t = ""
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? "," : "")
      }
      return num ? "￥ " + t.split("").reverse().join("") + "." + r : ""
    } else {
      return ""
    }
  }
}
/**
 * 数字金额格式过滤(转汉字大写) 12000.34 => "壹万贰千叁角肆分"
 * @param {number} num 被转换数字
 */
const digitUppercase = (num: any) => {
  const reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
  if (!reg.test(num)) {
    return "请输入正确的金额格式"
  } else {
    let fraction = ["角", "分"]
    let digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]
    let unit = [
      ["元", "万", "亿", "兆"],
      ["", "拾", "佰", "仟"]
    ]
    let head = num < 0 ? "欠" : ""
    num = Math.abs(num)
    let s = ""
    fraction.forEach((item, index) => {
      s += (digit[Math.floor(num * 10 * Math.pow(10, index)) % 10] + item).replace(/零./, "")
    })
    s = s || "整"
    num = Math.floor(num)
    for (let i = 0; i < unit[0].length && num > 0; i++) {
      let p = ""
      for (let j = 0; j < unit[1].length && num > 0; j++) {
        p = digit[num % 10] + unit[1][j] + p
        num = Math.floor(num / 10)
      }
      s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s
    }
    return (
      head +
      s
        .replace(/(零.)*零元/, "元")
        .replace(/(零.)+/g, "零")
        .replace(/^整$/, "零元整")
    )
  }
}
</script>
