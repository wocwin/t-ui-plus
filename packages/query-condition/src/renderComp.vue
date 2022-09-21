<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'RenderComp',
  props: {
    render: Function,
    form: Object
  },
  render(ctx) {
    return ctx.render(ctx?.form)
  }
})
</script>
