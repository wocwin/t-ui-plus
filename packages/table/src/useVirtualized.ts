import { nextTick, ref } from "vue"
import type { Ref } from "vue"
export function useVirtualized() {
  // 渲染实际高度的容器
  const actualHeightContainerEl = ref<HTMLElement | any>(null)
  // 用于偏移的元素选择器
  const translateContainerEl = ref<HTMLElement | any>(null)
  // 滚动容器的元素选择器
  const scrollContainerEl = ref<HTMLElement | any>(null)
  // 所有数据
  const saveDATA: Ref<any[]> = ref([])
  // 缓存已渲染元素的高度
  const RenderedItemsCache: any = {}
  // 获取dom元素
  const getDom = () => {
    actualHeightContainerEl.value = document.querySelector(".t_table_use_virtual .el-scrollbar__view")
    translateContainerEl.value = document.querySelector(".t_table_use_virtual .el-table__body")
    scrollContainerEl.value = document.querySelector(".t_table_use_virtual .el-scrollbar__wrap")
  }
  // 获取缓存高度，无缓存，取配置项的 itemHeight
  const getItemHeightFromCache = (index: number | string) => {
    const val = RenderedItemsCache[index]
    return val === void 0 ? 50 : val
  }
  // 更新实际高度
  const updateActualHeight = () => {
    let actualHeight = 0
    saveDATA.value.forEach((_, i) => {
      actualHeight += getItemHeightFromCache(i)
    })
    actualHeightContainerEl.value!.style.height = actualHeight + "px"
  }
  // 更新偏移值
  const updateOffset = (offset: number) => {
    if (translateContainerEl.value && translateContainerEl.value.style) {
      translateContainerEl.value!.style.transform = `translateY(${offset}px)`
    }
  }
  // 更新已渲染列表项的缓存高度
  const updateRenderedItemCache = (index: number) => {
    // 当所有元素的实际高度更新完毕，就不需要重新计算高度
    const shouldUpdate = Object.keys(RenderedItemsCache).length < saveDATA.value.length
    if (!shouldUpdate) return
    nextTick(() => {
      // 获取所有列表项元素
      const Items: HTMLElement[] = Array.from(document.querySelectorAll(".t_table_use_virtual .el-table__row"))
      // 进行缓存
      Items.forEach(el => {
        if (!RenderedItemsCache[index]) {
          RenderedItemsCache[index] = el.offsetHeight
        }
        index++
      })
      // 更新实际高度
      updateActualHeight()
    })
  }
  return { scrollContainerEl, updateRenderedItemCache, updateOffset, getDom, getItemHeightFromCache, saveDATA }
}