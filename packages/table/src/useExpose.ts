import { ref } from "vue"

export function useExpose() {
  // 获取el-table ref
  const TTable = ref<HTMLElement | any>(null)
  // 清空复选框
  const clearSelection = () => {
    return TTable.value.clearSelection()
  }
  // 返回当前选中的行
  const getSelectionRows = () => {
    return TTable.value.getSelectionRows()
  }
  // 取消某一项选中项
  const toggleRowSelection = (row: any, selected = false) => {
    return TTable.value.toggleRowSelection(row, selected)
  }
  // 全部选中
  const toggleAllSelection = () => {
    return TTable.value.toggleAllSelection()
  }
  // 用于可扩展的表格或树表格，如果某行被扩展，则切换。 使用第二个参数，您可以直接设置该行应该被扩展或折叠。
  const toggleRowExpansion = (row: any, expanded: any) => {
    return TTable.value.toggleRowExpansion(row, expanded)
  }
  // 用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态。
  const setCurrentRow = (row: any) => {
    return TTable.value.setCurrentRow(row)
  }
  // 清空排序条件
  const clearSort = () => {
    return TTable.value.clearSort()
  }
  // 传入由columnKey 组成的数组以清除指定列的过滤条件。 如果没有参数，清除所有过滤器
  const clearFilter = (columnKey: any) => {
    return TTable.value.clearFilter(columnKey)
  }
  //  Table 进行重新布局
  const doLayout = (columnKey: any) => {
    return TTable.value.doLayout(columnKey)
  }
  //  手动排序表格。 参数 prop 属性指定排序列，order 指定排序顺序。
  const sort = (prop: string, order: string) => {
    return TTable.value.sort(prop, order)
  }
  //  滚动到一组特定坐标。
  const scrollTo = (options: any, yCoord: any) => {
    return TTable.value.scrollTo(options, yCoord)
  }
  //  设置垂直滚动位置
  const setScrollTop = (top: any) => {
    return TTable.value.setScrollTop(top)
  }
  //  设置水平滚动位置
  const setScrollLeft = (left: any) => {
    return TTable.value.setScrollLeft(left)
  }
  return {
    TTable,
    clearSelection,
    getSelectionRows,
    toggleRowSelection,
    toggleAllSelection,
    toggleRowExpansion,
    setCurrentRow,
    clearSort,
    clearFilter,
    doLayout,
    sort,
    scrollTo,
    setScrollTop,
    setScrollLeft,
  }
}