<template>
  <div class="t_adaptive_page">
    <div
      :style="{ width: isShow('leftContent') ? `${leftWidth}px` : '0px' }"
      v-if="isShow('leftContent')"
      class="left_content"
    >
      <div class="left_tree">
        <slot name="leftContent" />
      </div>
    </div>
    <t-layout-page class="right_content" :style="pageStyle">
      <t-layout-page-item class="table_search" :style="queryPageStyle" v-if="$attrs.opts">
        <t-query-condition v-bind="$attrs" ref="TQueryConditionPage">
          <template v-for="(index, name) in slots" #[name]="data">
            <slot :name="name" v-bind="data" />
          </template>
        </t-query-condition>
      </t-layout-page-item>
      <slot name="content" />
      <t-layout-page-item
        class="table_main"
        :class="{ 't_table_self-filling': isTTableSelfFilling }"
        :style="tablePageStyle"
      >
        <t-table
          v-bind="{ columnSetting, name, ...$attrs }"
          :isSlotToolbar="isShow('toolbar')"
          :isSlotTitle="isShow('title')"
          ref="TTablePage"
        >
          <template v-for="(index, name) in slots" #[name]="data">
            <slot :name="name" v-bind="data" />
          </template>
        </t-table>
      </t-layout-page-item>
      <slot />
    </t-layout-page>
    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
import TLayoutPage from "../../layout-page/src/index.vue"
import TLayoutPageItem from "../../layout-page-item/src/index.vue"
import TTable from "../../table/src/index.vue"
import TQueryCondition from "../../query-condition/src/index.vue"
import { getCurrentInstance, onMounted, ref, useSlots } from "vue"

defineOptions({
  name: "TAdaptivePage"
})

export interface TAdaptivePageProps {
  leftWidth?: number
  pageStyle?: Record<string, string>
  columnSetting?: boolean
  name?: string // 表格开启columnSetting后，设置缓存数据唯一标识
  queryPageStyle?: Record<string, string>
  tablePageStyle?: Record<string, string>
  isTTableSelfFilling?: boolean
}

withDefaults(defineProps<TAdaptivePageProps>(), {
  leftWidth: 260,
  pageStyle: () => ({}),
  columnSetting: false,
  name: "",
  queryPageStyle: () => ({}),
  tablePageStyle: () => ({}),
  isTTableSelfFilling: false
})

const slots = useSlots()

const isShow = (name: string) => {
  return Object.keys(slots).includes(name)
}

const instance = getCurrentInstance() as any
const TQueryConditionPage = ref<InstanceType<typeof TQueryCondition> | null>(null)
const TTablePage = ref<InstanceType<typeof TTable> | null>(null)

onMounted(() => {
  const exposedObj = {
    ...TQueryConditionPage.value?.$.exposed,
    ...TTablePage.value?.$.exposed
  }
  const entries = Object.entries(exposedObj)
  for (const [key, value] of entries) {
    instance.exposed[key] = value
  }
})

defineExpose({ ...instance.exposed, TQueryConditionPage, TTablePage })
</script>

<style lang="scss" scoped>
.t_adaptive_page {
  display: flex;
  align-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .left_content {
    background: var(--el-bg-color);
    margin: 8px;
    margin-right: 0;
    .left_tree {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 10px;
      overflow-y: auto;
    }
  }
  .right_content {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .table_main {
      flex: 1;
      overflow-y: auto;
      width: 100%;
      height: 100vh;
      .t-table {
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }
    }
    .t_table_self-filling {
      .t-table {
        :deep(.el-table) {
          height: 100vh;
        }
      }
    }
  }
}
</style>
