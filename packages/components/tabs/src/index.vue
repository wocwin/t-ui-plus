<template>
  <div class="t_tabs">
    <el-tabs v-model="activeName" v-bind="$attrs">
      <template v-for="(_index, name) in slots" v-slot:[name]="data">
        <slot :name="name" v-bind="data" />
      </template>
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.key"
        v-bind="{
          name: tab.key,
          label: tab.title,
          ...tab.bind
        }"
      >
        <template v-for="(_index, name) in slots" v-slot:[name]="data">
          <slot :name="name" v-bind="data" />
        </template>
        <slot :name="tab.key"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import { ref, useSlots } from "vue"
defineOptions({
  name: "TTabs"
})
export interface TabItem {
  key?: string
  title?: string
  bind?: Record<string, any>
}

export interface TTabsProps {
  tabs: TabItem[]
}
const props = withDefaults(defineProps<TTabsProps>(), {
  tabs: () => []
})
const slots = useSlots()
const activeName = ref(props.tabs && props.tabs[0].key)
const emit = defineEmits(["tabsChange"])
const setSelectedTab = (key: any) => {
  activeName.value = key
}
defineExpose({
  setSelectedTab
})
</script>
