<template>
  <component :is="renderComponent" />
</template>
<script lang="ts" setup>
defineOptions({
  name: "RenderHeader"
})
const props: any = defineProps({
  render: Function,
  column: {
    type: Object,
    default: null
  }
})
const renderComponent = () => {
  return props.render(props?.column)
}
</script>
