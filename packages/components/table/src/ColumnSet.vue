<template>
  <el-dropdown trigger="click" popper-class="column_set">
    <el-button v-bind="columnBind">{{ columnBind.btnTxt }}</el-button>
    <template #dropdown>
      <div class="title" v-if="columnBind.isShowTitle">{{ columnBind.title }}</div>
      <el-dropdown-menu>
        <el-dropdown-item :divided="columnBind.isShowTitle">
          <el-tree
            ref="treeRef"
            class="t_table_column_setting_dropdown"
            :data="state.columnSet"
            node-key="prop"
            :props="{ label: 'label', children: 'children', disabled: 'checkBoxDisabled' }"
            show-checkbox
            draggable
            default-expand-all
            check-strictly
            :allow-drag="allowDrag"
            :allow-drop="allowDrop"
            :default-checked-keys="defaultCheckedKeys"
            @check="onTreeCheck"
            @node-drop="handleDrop"
          >
          </el-tree>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { watch, onMounted, reactive, computed, useAttrs, ref } from "vue"
import { useLocale } from "@t-ui-plus/hooks"
const { t } = useLocale()
defineOptions({
  name: "ColumnSet"
})
export interface Column {
  label: string
  prop: string
  checkBoxDisabled?: boolean
  hidden?: boolean
}

export interface ColumnSetProps {
  columns: Column[]
  title?: string
  name?: string
  columnSetBind?: Record<string, any>
}

const props = withDefaults(defineProps<ColumnSetProps>(), {
  columns: () => [],
  title: "",
  name: "",
  columnSetBind: () => ({})
})
const treeRef = ref()
const $attrs: any = useAttrs()
const columnBind = computed(() => {
  const columnSetBind = {
    btnTxt: t("plus.table.columnBind.btnTxt"),
    title: t("plus.table.columnBind.title"),
    ...props.columnSetBind
  }
  return { size: "default", icon: "Setting", isShowTitle: true, ...$attrs, ...columnSetBind }
})

const emits = defineEmits(["columnSetting"])
const state = reactive({
  columnSet: [] as Column[]
})
const defaultCheckedKeys = ref<string[]>([])

const getColumnSetCache = () => {
  let value =
    localStorage.getItem(`t-ui-plus:TTable.columnSet-${props.name || props.title}`) || "[]"
  let columnOption = initColumnSet()
  let valueArr = (JSON.parse(value) as any[]) || []
  columnOption.forEach(item => {
    let findEle = valueArr.find(
      (ele: { label: any; prop: any }) => ele.label === item.label && ele.prop === item.prop
    )
    item.hidden = findEle ? findEle.hidden : false
  })
  value = JSON.stringify(valueArr.length ? valueArr : columnOption)
  return value ? JSON.parse(value) : initColumnSet()
}
const initColumnSet = () => {
  return props.columns.map((col: any) => ({
    label: col.label,
    prop: col.prop,
    checkBoxDisabled: false,
    hidden: false
  }))
}

onMounted(() => {
  state.columnSet = getColumnSetCache()
  defaultCheckedKeys.value = state.columnSet.filter(c => !c.hidden).map(c => c.prop)
  emits("columnSetting", state.columnSet)
})

watch(
  () => state.columnSet,
  val => {
    emits("columnSetting", val)
    localStorage.setItem(
      `t-ui-plus:TTable.columnSet-${props.name || props.title}`,
      JSON.stringify(val)
    )
    defaultCheckedKeys.value = state.columnSet.filter(c => !c.hidden).map(c => c.prop)
  },
  { deep: true }
)

const reSetColumnSet = () => {
  let value: any = localStorage.getItem(`t-ui-plus:TTable.columnSet-${props.name || props.title}`)
  state.columnSet = JSON.parse(value)
  defaultCheckedKeys.value = state.columnSet.filter(c => !c.hidden).map(c => c.prop)
  emits("columnSetting", state.columnSet)
}

const onTreeCheck = () => {
  // 获取最新勾选的key
  const checkedKeys = treeRef.value?.getCheckedKeys() || []
  state.columnSet.forEach(col => {
    col.hidden = !checkedKeys.includes(col.prop)
  })
  // 至少保留一个可见列
  const visibleCols = state.columnSet.filter(col => !col.hidden)
  if (visibleCols.length < 2) {
    visibleCols.forEach(col => (col.checkBoxDisabled = true))
  } else {
    state.columnSet.forEach(col => (col.checkBoxDisabled = false))
  }
}
// 限制拖拽结点
const allowDrag = () => {
  return true
}
const allowDrop = (draggingNode: any, dropNode: any, type: any) => {
  // 只允许同级节点之间的拖拽
  if (draggingNode.level !== dropNode.level) {
    return false
  }
  // 如果是同级节点，还需要判断是否是前后节点的拖拽
  if (type !== "prev" && type !== "next") {
    return false
  }
  return true
}
// 拖拽排序
const handleDrop = (draggingNode: any, dropNode: any, dropType: string, ev: Event) => {
  // 只允许拖拽到同级（禁止拖为子级）
  if (dropType === "inner") {
    ev.preventDefault()
    return
  }
  const draggingIndex = state.columnSet.findIndex(col => col.prop === draggingNode.data.prop)
  const dropIndex = state.columnSet.findIndex(col => col.prop === dropNode.data.prop)
  if (draggingIndex === -1 || dropIndex === -1) return
  const item = state.columnSet.splice(draggingIndex, 1)[0]
  if (dropType === "before") {
    // 如果拖拽项在目标项后面，直接插入；如果在前面，dropIndex要减1
    const insertIndex = draggingIndex < dropIndex ? dropIndex - 1 : dropIndex
    state.columnSet.splice(insertIndex, 0, item)
  } else if (dropType === "after") {
    state.columnSet.splice(dropIndex + 1, 0, item)
  }
}

defineExpose({
  reSetColumnSet
})
</script>
