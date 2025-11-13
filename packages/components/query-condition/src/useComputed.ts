import { computed } from "vue"

export function useComputed() {
  // 子组件名称
  const compChildName = computed(() => {
    return (opt: any) => {
      switch (opt.type) {
        case "checkbox":
          return "el-checkbox"
        case "radio":
          return "el-radio"
        case "select-arr":
        case "select-obj":
          return "el-option"
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
    return (opt: { type: any; arrLabel: any }, value: { [x: string]: any; value: any }) => {
      switch (opt.type) {
        case "radio":
        case "checkbox":
          return value[opt.arrLabel || "label"]
        case "el-select-multiple":
        case "select-arr":
          return value[opt.arrLabel || "label"]
        case "select-obj":
          return value
      }
    }
  })
  // 子子组件value
  const compChildValue = computed(() => {
    return (opt: { type: any; arrKey: any }, value: { [x: string]: any; value: any }, key: any) => {
      switch (opt.type) {
        case "radio":
        case "checkbox":
          return value[opt.arrKey || "key"]
        case "el-select-multiple":
        case "select-arr":
          return value[opt.arrKey || "key"]
        case "select-obj":
          return key
      }
    }
  })
  // 子子组件文字展示
  const compChildShowLabel = computed(() => {
    return (opt: { type: any; arrLabel: any }, value: { [x: string]: any; label: any }) => {
      switch (opt.type) {
        case "radio":
        case "checkbox":
          return value[opt.arrLabel || "label"]
        case "el-select-multiple":
        case "select-arr":
          return value[opt.arrLabel || "label"]
        case "select-obj":
          return value
      }
    }
  })
  const getColLength = () => {
    // 行列数
    const width = window.innerWidth
    let colLength = 4
    if (width > 1000 && width < 1280) {
      colLength = 3
    } else if (width > 768 && width <= 1000) {
      colLength = 2
    } else if (width <= 768) {
      colLength = 1
    }
    return colLength
  }
  return {
    compChildName,
    selectListType,
    compChildLabel,
    compChildValue,
    compChildShowLabel,
    getColLength
  }
}
