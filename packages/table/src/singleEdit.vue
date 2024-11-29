<template>
  <div @click="onFieldClick" class="single_edit_cell">
    <div class="cell-content" v-if="!editMode">
      <el-tooltip
        v-if="configEdit.isShowTips"
        class="item"
        v-bind="{
          effect: 'light',
          content: '单击可编辑',
          placement: 'top',
          ...configEdit.tipbind
        }"
      >
        <div v-if="childCom.includes(configEdit.type)">{{ childVal }}&nbsp;</div>
        <div v-else>{{ model }}&nbsp;</div>
        <slot name="content"></slot>
      </el-tooltip>
      <template v-else>
        <div v-if="childCom.includes(configEdit.type)">{{ childVal }}&nbsp;</div>
        <div v-else>{{ model }}&nbsp;</div>
        <slot name="content"></slot>
      </template>
    </div>
    <template v-if="editMode">
      <template v-if="configEdit.editSlotName">
        <div :class="[prop, 'slot_edit_name']">
          <slot :name="configEdit.editSlotName" :scope="scope" />
        </div>
      </template>
      <template v-if="configEdit.isSelfCom">
        <component
          v-if="configEdit.editComponent === 't-select-table'"
          :ref="(el:any) => handleRef(el)"
          :is="configEdit.editComponent"
          :placeholder="configEdit.placeholder || getPlaceholder(configEdit)"
          v-bind="
            typeof configEdit.bind == 'function'
              ? configEdit.bind(scope)
              : { clearable: true, filterable: true, ...configEdit.bind }
          "
          :style="{ width: configEdit.width || '100%' }"
          v-on="cEvent(configEdit, 't-select-table')"
        />
        <component
          v-else
          :is="configEdit.editComponent"
          v-model="model"
          :type="configEdit.type"
          :placeholder="configEdit.placeholder || getPlaceholder(configEdit)"
          ref="parentCom"
          v-bind="
            typeof configEdit.bind == 'function'
              ? configEdit.bind(scope)
              : { clearable: true, filterable: true, ...configEdit.bind }
          "
          @change="handleEvent(configEdit.event, model, configEdit.type)"
          :style="{ width: configEdit.width || '100%' }"
          v-on="cEvent(configEdit)"
        />
      </template>
      <component
        v-if="!configEdit.editSlotName && !configEdit.isSelfCom"
        :is="configEdit.editComponent || 'el-input'"
        v-model="model"
        :type="configEdit.type"
        :placeholder="configEdit.placeholder || getPlaceholder(configEdit)"
        :class="prop"
        ref="parentCom"
        @change="handleEvent(configEdit.event, model, configEdit.type)"
        @keyup.enter.native="onInputExit"
        @blur="onInputExit"
        v-bind="
          typeof configEdit.bind == 'function'
            ? configEdit.bind(scope)
            : { clearable: true, filterable: true, ...configEdit.bind }
        "
        :style="{ width: configEdit.width || '100%' }"
        v-on="cEvent(configEdit)"
      >
        <template v-for="(index, name) in slots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
        <template #prepend v-if="configEdit.prepend">{{ configEdit.prepend }}</template>
        <template #append v-if="configEdit.append">{{ configEdit.append }}</template>
        <slot name="editChild" />
        <div v-if="!$slots.editChild">
          <component
            :is="compChildName(configEdit)"
            v-for="(value, key, index) in listTypeInfo[configEdit.list]"
            :key="index"
            :disabled="value.disabled"
            :label="compChildLabel(configEdit, value)"
            :value="compChildValue(configEdit, value, key)"
            >{{ compChildShowLabel(configEdit, value) }}</component
          >
        </div>
      </component>
    </template>
  </div>
</template>

<script setup lang="ts" name="SingleEdit">
import { computed, nextTick, ref, watch, useSlots } from "vue"
const props = defineProps({
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
    type: Object as any,
    default: () => ({})
  },
  // 下拉选择数据源
  listTypeInfo: {
    type: Object,
    default: () => ({})
  },
  scope: {
    type: Object,
    default: () => ({})
  },
  prop: {
    type: String,
    default: "prop"
  },
  // 是否开启单击编辑
  isClickEdit: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number, Object, Array, Date]
  },
  // 列for index
  indexColumns: [String, Number]
})
// 抛出事件
const emits = defineEmits(["handleEvent", "update:modelValue"])
const slots = useSlots()
const childCom = ref(["select-arr", "checkbox", "radio", "select-obj", "el-select-multiple"])
const editMode = ref(false)
// 下拉选择表格组件 ref
const tselecttableref: any = ref({})
// 下拉选择表格组件 动态ref
const handleRef = (el: any) => {
  if (el) {
    tselecttableref.value[`tselecttableref-${props.indexColumns}`] = el
  }
}
// 重置下拉表格
const resetClickTselectTable = () => {
  // 获取所有下拉选择表格组件
  const refList = Object.keys(tselecttableref.value).filter(item =>
    item.includes("tselecttableref")
  )
  if (refList.length > 0 && tselecttableref.value) {
    refList.map(val => {
      tselecttableref.value[val].clear()
    })
  }
}
let model: any = computed({
  get() {
    return props?.modelValue
  },
  set(val) {
    emits("update:modelValue", val)
  }
})
watch(
  () => props.modelValue,
  data => {
    model.value = data
  }
)
// 引用第三方事件
const cEvent: any = computed(() => {
  return ({ eventHandle }: any, type = "") => {
    let event = { ...eventHandle }
    let changeEvent = {} as any
    Object.keys(event).forEach(v => {
      changeEvent[v] = (e: any, ids: any) => {
        if (type === "t-select-table") {
          const argument = {
            row: e,
            ids: ids,
            prop: props.prop,
            scope: props.scope
          }
          event[v] && event[v](argument)
        } else {
          if ((typeof e === "number" && e === 0) || e) {
            event[v] && event[v]({ val: e, prop: props.prop, scope: props.scope })
          } else {
            event[v] && event[v]({ prop: props.prop, scope: props.scope })
          }
        }
      }
    })
    return { ...changeEvent }
  }
})
const childVal = computed({
  get() {
    let valLabel
    let checkboxVal = [] as any
    let selcetMultiple = [] as any
    props.listTypeInfo[props.configEdit.list] &&
      props.listTypeInfo[props.configEdit.list].map((val: any) => {
        switch (props.configEdit.type) {
          case "checkbox":
          case "radio":
            if (model.value.join(",").includes(val.value)) {
              checkboxVal.push(val.label)
            }
            valLabel = checkboxVal.join(",")
            break
          case "select-arr":
            // eslint-disable-next-line eqeqeq
            if (model.value == val[props.configEdit.arrKey]) {
              valLabel = val[props.configEdit.arrLabel]
            }
            break
          case "el-select-multiple":
            if (model.value && model.value.join(",").includes(val[props.configEdit.arrKey])) {
              selcetMultiple.push(val[props.configEdit.arrLabel])
            }
            valLabel = selcetMultiple.join(",")
            break
          case "select-obj":
            valLabel = val
            break
        }
      })
    return valLabel
  },
  set(val) {
    return val
  }
})
// 子组件名称
const compChildName = computed(() => {
  return (configEdit: { type: any }) => {
    switch (configEdit.type) {
      case "checkbox":
        return "el-checkbox"
      case "radio":
        return "el-radio"
      case "el-select-multiple":
      case "select-arr":
      case "select-obj":
        return "el-option"
    }
  }
})
// 子子组件label
const compChildLabel = computed(() => {
  return (configEdit: { type: any; arrLabel: any }, value: { [x: string]: any; value: any }) => {
    switch (configEdit.type) {
      case "radio":
      case "checkbox":
        return value[configEdit.arrLabel || "label"]
      case "el-select-multiple":
      case "select-arr":
        return value[configEdit.arrLabel || "label"]
      case "select-obj":
        return value
    }
  }
})
// 子子组件value
const compChildValue = computed(() => {
  return (
    configEdit: { type: any; arrKey: any },
    value: { [x: string]: any; value: any },
    key: any
  ) => {
    switch (configEdit.type) {
      case "radio":
      case "checkbox":
        return value[configEdit.arrKey || "key"]
      case "el-select-multiple":
      case "select-arr":
        return value[configEdit.arrKey || "key"]
      case "select-obj":
        return key
    }
  }
})
// 子子组件文字展示
const compChildShowLabel = computed(() => {
  return (configEdit: { type: any; arrLabel: any }, value: { [x: string]: any; label: any }) => {
    switch (configEdit.type) {
      case "radio":
      case "checkbox":
        return value[configEdit.arrLabel || "label"]
      case "el-select-multiple":
      case "select-arr":
        return value[configEdit.arrLabel || "label"]
      case "select-obj":
        return value
    }
  }
})
const parentCom = ref<null | any>()
// 点击外层开启编辑focus
const onFieldClick = () => {
  if (props.isClickEdit) {
    editMode.value = true
    nextTick(() => {
      let parentRef = parentCom.value
      if (parentRef && parentRef.focus) {
        parentRef.focus()
      }
    })
  }
}
const onInputExit = () => {
  editMode.value = false
}
// placeholder的显示
const getPlaceholder = (row: any) => {
  if (!row.editComponent || typeof row.editComponent !== "string") {
    return row.label
  }
  const componentType = row.editComponent.toLowerCase()
  if (componentType.includes("input")) {
    return "请输入" + row.label
  } else if (componentType.includes("select") || componentType.includes("date")) {
    return "请选择" + row.label
  }
  return row.label
}
// 绑定的相关事件
const handleEvent = (type, val, comType) => {
  // console.log("type---comType", comType)
  if (comType === "datetime") onInputExit()
  setTimeout(() => {
    // console.log("组件", type, childValue.value)
    emits("handleEvent", { type, val })
  }, 0)
}
defineExpose({ resetClickTselectTable })
</script>
<style lang="scss">
.single_edit_cell {
  cursor: pointer;
}
</style>
