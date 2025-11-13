<template>
  <template v-if="!Array.isArray(table.firstColumn) && table.firstColumn">
    <el-table-column
      v-if="table.firstColumn.type === 'selection'"
      v-bind="{
        type: 'selection',
        width: table.firstColumn.width || 55,
        label: table.firstColumn.label,
        fixed: table.firstColumn.fixed,
        align: table.firstColumn.align || align || 'center',
        'reserve-selection': table.firstColumn.isPaging || false,
        selectable: table.firstColumn.selectable,
        ...table.firstColumn.bind
      }"
    />
    <el-table-column
      v-else
      v-bind="{
        type: table.firstColumn.type,
        width: table.firstColumn.width || 55,
        label:
          table.firstColumn.label ||
          (table.firstColumn.type === 'radio' && t('plus.table.fistColumn.radio')) ||
          (table.firstColumn.type === 'index' && t('plus.table.fistColumn.label')) ||
          (table.firstColumn.type === 'expand' && '') ||
          '',
        fixed: table.firstColumn.fixed,
        align: table.firstColumn.align || align || 'center',
        ...table.firstColumn.bind
      }"
    >
      <template #default="scope" v-if="table.firstColumn.type !== 'selection'">
        <el-radio
          v-if="table.firstColumn.type === 'radio'"
          v-model="localRadio"
          :label="scope.$index + 1"
          :disabled="scope.row.isRadioDisabled"
          @click.stop
          @change="radioHandleChange(scope.row, scope.$index + 1)"
        ></el-radio>
        <template v-if="table.firstColumn.type === 'index'">
          <span v-if="isPaginationCumulative && isShowPagination">
            {{ (table.currentPage - 1) * table.pageSize + scope.$index + 1 }}
          </span>
          <span v-else>{{ scope.$index + 1 }}</span>
        </template>
        <template v-if="table.firstColumn.type === 'expand'">
          <slot name="expand" :scope="scope"></slot>
        </template>
      </template>
    </el-table-column>
  </template>
  <template v-if="Array.isArray(table.firstColumn)">
    <template v-for="(item, index) in table.firstColumn">
      <el-table-column
        :key="index + 1"
        v-if="item.type === 'selection'"
        v-bind="{
          type: 'selection',
          width: item.width || 55,
          label: item.label,
          fixed: item.fixed,
          align: item.align || align || 'center',
          'reserve-selection': item.isPaging || false,
          selectable: item.selectable,
          ...item.bind
        }"
      />
      <el-table-column
        v-else
        :key="index + 'k'"
        v-bind="{
          type: item.type,
          width: item.width || 55,
          label:
            item.label ||
            (item.type === 'radio' && t('plus.table.fistColumn.radio')) ||
            (item.type === 'index' && t('plus.table.fistColumn.label')) ||
            (item.type === 'expand' && '') ||
            '',
          fixed: item.fixed,
          align: item.align || align || 'center',
          ...item.bind
        }"
      >
        <template #default="scope" v-if="item.type !== 'selection'">
          <el-radio
            v-if="item.type === 'radio'"
            v-model="localRadio"
            :label="scope.$index + 1"
            :disabled="scope.row.isRadioDisabled"
            @click.stop
            @change="radioHandleChange(scope.row, scope.$index + 1)"
          ></el-radio>
          <template v-if="item.type === 'index'">
            <span v-if="isPaginationCumulative && isShowPagination">
              {{ (table.currentPage - 1) * table.pageSize + scope.$index + 1 }}
            </span>
            <span v-else>{{ scope.$index + 1 }}</span>
          </template>
          <template v-if="item.type === 'expand'">
            <slot name="expand" :scope="scope"></slot>
          </template>
        </template>
      </el-table-column>
    </template>
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useLocale } from "@t-ui-plus/hooks"
const { t } = useLocale()
const props = defineProps<{
  table: any
  radioVal: any
  align: string
  isPaginationCumulative: boolean
  isShowPagination: boolean
}>()
const emit = defineEmits(["radioChange", "update:radioVal"])

const localRadio = computed({
  get: () => props.radioVal,
  set: (val: any) => {
    emit("update:radioVal", val)
  }
})
const radioHandleChange = (row: any, index: any) => {
  emit("radioChange", row, index)
}
</script>
