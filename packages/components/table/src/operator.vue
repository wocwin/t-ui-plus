<template>
  <!-- 操作按钮 -->
  <el-table-column
    v-if="table.operator"
    v-bind="{
      fixed: table.operatorConfig?.fixed,
      label: table.operatorConfig?.label || '操作',
      'min-width': table.operatorConfig?.minWidth,
      width: table.operatorConfig?.width,
      align: table.operatorConfig?.align || align,
      ...table.operatorConfig?.bind
    }"
    class-name="operator"
  >
    <template #default="scope">
      <div class="operator_btn" :style="table.operatorConfig?.style">
        <template v-for="(item, index) in table.operator">
          <template v-if="!item.isMore">
            <el-button
              :key="index"
              @click="item.fun && item.fun(scope.row, scope.$index, tableData)"
              v-bind="{
                type: 'primary',
                link: true,
                text: true,
                size: 'small',
                ...item.bind
              }"
              :disabled="item.isDisabled && item.isDisabled(scope.row, item)"
              v-if="checkIsShow(scope, item)"
            >
              <template v-if="item.render">
                <render-col
                  :column="item"
                  :row="scope.row"
                  :render="item.render"
                  :index="scope.$index"
                />
              </template>
              <span v-if="!item.render">{{ item.text }}</span>
            </el-button>
          </template>
        </template>
        <template v-if="hasMoreOper()">
          <el-dropdown v-bind="hasMoreBind" class="oper_more_dropdown">
            <span class="more_dropdown-link">
              <el-button
                v-bind="{
                  type: 'primary',
                  link: true,
                  text: true,
                  size: 'small',
                  ...hasMoreBind.btnBind
                }"
              >
                {{ hasMoreBind.btnTxt || "更多" }}
                <el-icon v-if="hasMoreBind.isShowArrwIcon">
                  <ArrowDown />
                </el-icon>
              </el-button>
            </span>
            <template #dropdown>
              <el-dropdown-menu v-bind="hasMoreBind.menuBind" class="oper_more_dropdown_menu">
                <template v-for="(item, index) in table.operator">
                  <el-dropdown-item
                    v-if="item.isMore"
                    @click="item.fun && item.fun(scope.row, scope.$index, tableData)"
                    :key="'more_' + index"
                    v-bind="{
                      disabled: item.isDisabled && item.isDisabled(scope.row, item),
                      ...item.itemBind
                    }"
                  >
                    <el-button
                      :key="index"
                      v-bind="{
                        link: true,
                        text: true,
                        size: 'small',
                        ...item.bind
                      }"
                      v-if="checkIsShow(scope, item)"
                    >
                      <template v-if="item.render">
                        <render-col
                          :column="item"
                          :row="scope.row"
                          :render="item.render"
                          :index="scope.$index"
                        />
                      </template>
                      <span v-if="!item.render">{{ item.text }}</span>
                    </el-button>
                  </el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </div>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue"
import { ArrowDown } from "@element-plus/icons-vue"
import RenderCol from "@t-ui-plus/components/table/src/renderCol.vue"
const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  table: { type: Object, default: () => {} },
  btnPermissions: {
    type: Array,
    default: () => []
  },
  align: {
    type: String,
    default: "center"
  }
})
defineOptions({
  name: "Operator"
})

// 是否显示表格操作按钮
const checkIsShow = (
  scope: { row: { [s: string]: unknown } | ArrayLike<unknown> | any },
  item: {
    noshow: any
    show: { val: string | any[]; key: string | number }
    hasPermi: any
    field: string | number
    isField: string | number
  }
) => {
  let isNoshow = false
  if (item.noshow) {
    // 解决双重判断循环递归
    let nushowFun = JSON.parse(JSON.stringify(item.noshow))
    // 双重判断
    nushowFun.map((rs: { isShow: string; val: string | any[]; key: string | number }) => {
      rs.isShow =
        typeof rs.val === "string"
          ? rs.val === "isHasVal"
            ? scope.row[rs.key]
              ? "true"
              : "false"
            : "true"
          : rs.val.includes(scope.row[rs.key])
          ? "false"
          : "true"
    })
    isNoshow = nushowFun.every((key: { isShow: string }) => {
      return key.isShow === "true"
    })
  } else {
    isNoshow = true
  }
  // 单独判断
  let isShow = !item.show || item.show.val.includes(scope.row[item.show.key])
  // 按钮权限
  let isPermission = item.hasPermi ? props.btnPermissions?.includes(item.hasPermi) : true
  // table页面合计
  let totalTxt = Object.values(scope.row).every(key => {
    return key !== "当页合计"
  })
  // table页面合计
  let totalTxt1 = Object.values(scope.row).every(key => {
    return key !== "全部合计"
  })
  return (
    isShow &&
    isNoshow &&
    !scope.row[item.field] &&
    (item.isField ? scope.row[item.isField] : true) &&
    totalTxt &&
    totalTxt1 &&
    isPermission
  )
}
// 更多下拉配置
const $attrs = useAttrs()
const hasMoreBind: any = computed(() => {
  const btnBind = { type: "primary", link: true, text: true, size: "small" } // 按钮属性
  const menuBind = {} // 下拉menu属性
  const setBind = {
    btnTxt: "更多",
    isShowArrwIcon: true, // 是否显示下拉箭头
    ...menuBind, // 下拉menu属性
    ...btnBind, // 按钮属性
    ...props.table.operatorConfig.dropdownBind // 下拉属性
  }
  return { ...$attrs, ...setBind }
})
// 判断操作是否显示最多
const hasMoreOper = () => {
  return props.table.operator.some((item: { isMore: boolean }) => item.isMore === true)
}
</script>
