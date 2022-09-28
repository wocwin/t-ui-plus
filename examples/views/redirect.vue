<script lang='ts'>
import { defineComponent, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Redirect',
  setup() {
    const { params, query } = useRoute()
    const { path } = params
    useRouter().replace({ path: '/' + path, query })
  },
  render() {
    return h('div')
  },
})
</script>
