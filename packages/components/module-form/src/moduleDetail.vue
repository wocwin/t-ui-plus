<template>
  <div class="t_detail">
    <el-collapse v-model="defaultActiveKey">
      <el-collapse-item
        v-for="(val, index) in descData"
        :class="{
          noTitle: !val.title,
          disabledStyle: val.disabled,
          title_bold: titleBold
        }"
        :key="index"
        :name="val.name"
        :disabled="val.disabled"
      >
        <template #title>
          {{ val.title }}
          <div class="t_btn" v-if="val.btn">
            <slot :name="val.btn"></slot>
          </div>
        </template>
        <template v-if="val.slotName">
          <slot :name="val.slotName"></slot>
        </template>
        <t-detail :descData="val.data" v-bind="attrs">
          <template v-for="(_index, name) in slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
          </template>
        </t-detail>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from "vue"
defineOptions({
  name: "ModuleDetail"
})
const props: any = defineProps({
  descData: {
    type: Object,
    default: () => ({})
  },
  // 是否Title文字加粗
  titleBold: {
    type: Boolean,
    default: false
  }
})
const slots = useSlots()
const attrs: any = useAttrs()
const defaultActiveKey = computed({
  get() {
    // console.log(333, Object.keys(props.descData))
    return Object.keys(props.descData)
  },
  set(val) {
    return val
  }
})
</script>
