<template>
  <component :is="linkProps(to)">
    <slot />
  </component>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { isExternal } from '@/utils/validate'
export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup() {
    // methods
    const linkProps = (url: string) => {
      if (isExternal(url)) {
        console.log(3999833)
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
    return {
      linkProps
    }
  }
})
</script>

