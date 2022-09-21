<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'RenderHeader',
  props: {
    render: Function,
    column: {
      type: Object,
      default: null
    }
  },
  render(ctx) {
    return ctx.render(ctx?.column)
  }
})
</script>
