<template>
  <ClientOnly>
    <el-tooltip raw-content effect="light" trigger="click">
      <template #content>
        <code class="docs-tip-code">
          {{ content }}
        </code>
      </template>
      <el-icon :size="16" class="docs-tip-icon"><Warning /></el-icon>
    </el-tooltip>
  </ClientOnly>
</template>

<script lang="ts" setup name="TTip">
import { Warning } from "@element-plus/icons-vue"

defineProps({
  content: {
    type: String,
    default: ""
  }
})
</script>

<style lang="scss" scoped>
.docs-tip-code {
  color: #101010;
  background-color: #fff;
}
.docs-tip-icon {
  vertical-align: middle;
  color: #409eda;
  cursor: pointer;
}
</style>
