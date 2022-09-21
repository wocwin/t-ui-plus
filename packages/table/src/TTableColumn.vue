<template>
  <el-table-column :prop="item.prop" :label="item.label" :type="item.type" :align="item.align || 'center'"
    :min-width="item['min-width'] || item.minWidth || item.width" :fixed="item.fixed">
    <template v-for="(val,index) of item.children">
      <t-table-column v-if="val.children" :key="index" :item="val"></t-table-column>
      <el-table-column v-else :prop="val.prop" :label="val.label"
        :min-width="val['min-width'] || val.minWidth || val.width" :sortable="val.sort"
        :render-header="val.renderHeader||val.headerRequired" :align="val.align || 'center'" :fixed="val.fixed"
        :show-overflow-tooltip="val.noShowTip?val.noShowTip:true" v-bind="{...val.bind,...$attrs}">
        <template #default="scope">
          <!-- render渲染 -->
          <template v-if="val.render">
            <render-col :column="val" :row="scope.row" :render="val.render" :index="scope.$index" />
          </template>
          <!-- 自定义插槽 -->
          <template v-if="val.slotName">
            <slot :name="val.slotName" :param="scope"></slot>
          </template>
          <!-- 单个单元格编辑 -->
          <template v-if="val.canEdit">
            <single-edit-cell :canEdit="val.canEdit" :configEdit="val.configEdit"
              v-model="scope.row[scope.column.property]" :prop="val.prop" :record="scope"
              @handleEvent="(event,model) => $emit('handleEvent',event,model,scope.$index)" v-bind="$attrs"
              ref="editCell">
              <slot v-if="val.configEdit&&val.configEdit.editSlotName" :name="val.configEdit.editSlotName"
                :scope="scope" />
            </single-edit-cell>
          </template>
          <div v-if="!val.render&&!val.slotName&&!val.canEdit">{{scope.row[val.prop]}}</div>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>
<script lang="ts">
export default {
  name: 'TTableColumn'
}
</script>
<script setup lang="ts">
import SingleEditCell from './singleEditCell.vue'
import RenderCol from './renderCol.vue'
defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    },
    required: true
  }
})

</script>
