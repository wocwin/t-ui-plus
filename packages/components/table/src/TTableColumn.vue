<template>
  <el-table-column
    v-if="typeof item.isShowCol == 'function' ? item.isShowCol(item) : !item.isShowCol"
    :prop="item.prop"
    :label="item.label"
    :type="item.type"
    :align="item.align || align"
    :min-width="item['min-width'] || item.minWidth"
    :width="item.width"
    :fixed="item.fixed"
  >
    <template #header v-if="item.renderHeader">
      <render-header :column="item" :render="item.renderHeader" />
    </template>
    <template v-for="(val, index) of item.children">
      <t-table-column v-if="val.children" :key="index" :item="val" v-bind="$attrs">
        <template v-for="(_index, name) in slots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </t-table-column>
      <el-table-column
        v-else
        :key="val.prop"
        :prop="val.prop"
        :label="val.label"
        :min-width="val['min-width'] || val.minWidth"
        :width="val.width"
        :sortable="val.sortable || val.sort || sortable"
        :align="val.align || align"
        :fixed="val.fixed"
        :formatter="val.formatter"
        v-if="typeof val.isShowCol == 'function' ? val.isShowCol(val) : !val.isShowCol"
        v-bind="{ 'show-overflow-tooltip': true, ...val.bind, ...$attrs }"
      >
        <template #header v-if="val.renderHeader">
          <render-header :column="val" :render="val.renderHeader" />
        </template>
        <template #default="scope">
          <!-- render渲染 -->
          <template v-if="val.render">
            <render-col :column="val" :row="scope.row" :render="val.render" :index="scope.$index" />
          </template>
          <!-- 自定义插槽 -->
          <template v-if="val.slotNameMerge">
            <slot :name="val.slotNameMerge" :scope="scope"></slot>
          </template>
          <!-- 单个单元格编辑 -->
          <template v-if="val.canEdit">
            <single-edit-cell
              :isShowRules="false"
              :configEdit="val.configEdit"
              v-model="scope.row[val.prop]"
              :prop="val.prop"
              :scope="scope"
              @handleEvent="({ type, val }:any) => emits('handleEvent', type, val, scope.$index)"
              v-bind="$attrs"
            >
              <template v-for="(_index, name) in slots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
              </template>
            </single-edit-cell>
          </template>
          <div v-if="!val.render && !val.slotNameMerge && !val.canEdit && !val.formatter">
            {{ scope.row[val.prop] }}
          </div>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>

<script setup lang="tsx">
import SingleEditCell from "@t-ui-plus/components/table/src/singleEditCell.vue"
import RenderCol from "@t-ui-plus/components/table/src/renderCol.vue"
import RenderHeader from "@t-ui-plus/components/table/src/renderHeader.vue"
import { useSlots } from "vue"
defineOptions({
  name: "TTableColumn"
})
defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    },
    required: true
  },
  align: {
    type: String,
    default: "center"
  },
  sortable: {
    type: [Boolean, String]
  }
})
// 抛出事件
const emits = defineEmits(["handleEvent"])
// 获取所有插槽
const slots = useSlots()
</script>
