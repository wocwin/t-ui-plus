<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'RenderCol',
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render(ctx) {
    // console.log(111, ctx)
    const params: any = {
      row: ctx.row,
      index: ctx.index,
    }
    if (ctx.column) params.column = ctx.column
    return ctx.render(ctx?.row[ctx?.column?.prop], ctx.row, ctx.index)
  }
})
</script>
