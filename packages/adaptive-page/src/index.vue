<template>
  <t-layout-page class="t_adaptive_page">
    <t-layout-page-item class="table_search">
      <t-query-condition v-bind="$attrs">
        <template v-for="(index, name) in slots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"/>
        </template>
      </t-query-condition>
    </t-layout-page-item>
    <t-layout-page-item class="table_main">
      <t-table v-bind="$attrs">
        <template v-for="(index, name) in slots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"/>
        </template>
      </t-table>
    </t-layout-page-item>
    <slot />
  </t-layout-page>
</template>

<script setup lang="ts" name="TAdaptivePage">
import TLayoutPage from '../../layout-page/src/index.vue'
import TLayoutPageItem from '../../layout-page-item/src/index.vue'
import TTable from '../../table/src/index.vue'
import TQueryCondition from '../../query-condition/src/index.vue'
import { useSlots } from 'vue'
const slots = useSlots()
</script>
<style lang="scss" scoped>
.t_adaptive_page {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .table_main {
    flex: 1;
    overflow-y: auto;
    .t-table {
      display: flex;
      flex: 1;
      flex-direction: column;
      width: 100%;
      height: 100%;
      :deep(.el-table) {
        height: fit-content;
        overflow: auto;
      }
    }
  }
}
</style>
