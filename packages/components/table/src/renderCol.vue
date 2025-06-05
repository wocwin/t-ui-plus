<template>
  <component :is="renderComponent" />
</template>
<script lang="ts" setup>
defineOptions({
  name: "RenderCol"
})
const props: any = defineProps({
  row: Object,
  render: Function,
  index: Number,
  column: {
    type: Object,
    default: null
  }
})
const renderComponent = () => {
  return props.render(props?.row[props?.column?.prop], props.row, props.index)
}
</script>
