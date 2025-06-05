<template>
  <component :is="renderComponent" />
</template>
<script lang="ts" setup>
defineOptions({
  name: "RenderTooltip"
})
const props: any = defineProps({
  render: Function,
  item: Object
})
const renderComponent = () => {
  return props.render(props?.item)
}
</script>
