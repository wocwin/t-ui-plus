<template>
  <div v-if="isExt" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-bind="$attrs" />
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang='ts'>
import { isExternal } from '@/utils/validate'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  props: {
    iconClass: {
      type: String,
      required: true,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const iconClass = props.iconClass
    const className = props.className

    const isExt = computed(() => isExternal(iconClass))
    const iconName = computed(() => `#icon-${iconClass}`)
    const svgClass = computed(() => {
      if (className) {
        return 'svg-icon ' + className
      } else {
        return 'svg-icon'
      }
    })
    const styleExternalIcon = computed(() => ({
      mask: `url(${iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${iconClass}) no-repeat 50% 50%`
    }))
    return { isExt, iconName, svgClass, styleExternalIcon }
  }
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
