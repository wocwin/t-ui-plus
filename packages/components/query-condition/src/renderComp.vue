<template>
  <component :is="renderComponent" />
</template>
<script lang="ts" setup>
defineOptions({
  name: "RenderComp"
})
const props: any = defineProps({
  render: Function,
  form: Object
})
const renderComponent = () => {
  return props.render(props?.form)
}
</script>
