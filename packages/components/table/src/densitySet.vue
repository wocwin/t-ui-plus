<template>
  <el-dropdown trigger="click" popper-class="density_set">
    <el-button v-bind="densityBind">
      <template #icon>
        <el-icon
          :size="densityBind.iconSize"
          :color="densityBind.iconColor"
          class="density_set__toolbar__icon"
        >
          <svg
            viewBox="0 0 1024 1024"
            focusable="false"
            data-icon="column-height"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M840 836H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm0-724H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zM610.8 378c6 0 9.4-7 5.7-11.7L515.7 238.7a7.14 7.14 0 00-11.3 0L403.6 366.3a7.23 7.23 0 005.7 11.7H476v268h-62.8c-6 0-9.4 7-5.7 11.7l100.8 127.5c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H548V378h62.8z"
            />
          </svg>
        </el-icon>
      </template>
      {{ densityBind.btnTxt }}
    </el-button>
    <template #dropdown>
      <div class="density_set_list">
        <el-button
          v-for="item in buttonNameDensity"
          :key="item.size"
          :plain="defaultSize !== item.size"
          type="primary"
          size="small"
          @click="handleClickDensity(item.size)"
        >
          {{ unref(item.text) }}
        </el-button>
      </div>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { computed, unref, useAttrs } from "vue"
import type { ComputedRef } from "vue"
import type { ComponentSize } from "element-plus/es/constants"
import { useLocale } from "@t-ui-plus/hooks"
const { t } = useLocale()
defineOptions({
  name: "DensitySet"
})

export interface ButtonNameDensity {
  size: ComponentSize
  text: string | ComputedRef<string>
}
export interface DensitySetProps {
  defaultSize?: ComponentSize
  densitySetBind?: Record<string, any>
}
const emit = defineEmits<{
  (e: "clickDensity", size: ComponentSize): void
}>()
const props = withDefaults(defineProps<DensitySetProps>(), {
  defaultSize: "default",
  densitySetBind: () => ({})
})
const attrs = useAttrs()
const densityBind = computed(() => {
  const densitySetBind = {
    btnTxt: t("plus.table.density"),
    ...props.densitySetBind
  }
  return { size: "default", iconSize: 18, iconColor: "", ...attrs, ...densitySetBind }
})
const buttonNameDensity: ButtonNameDensity[] = [
  {
    size: "default",
    text: computed(() => t("plus.table.default"))
  },
  {
    size: "large",
    text: computed(() => t("plus.table.loose"))
  },
  {
    size: "small",
    text: computed(() => t("plus.table.compact"))
  }
]
const handleClickDensity = (size: ComponentSize) => {
  emit("clickDensity", size)
}
</script>
