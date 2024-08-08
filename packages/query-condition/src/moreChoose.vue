<template>
  <el-popover
    popper-class="t_query_condition_more"
    :bind="popoverAttrsBind"
    trigger="click"
    width="auto"
    ref="popover"
    v-if="allcheckList.length > 0"
  >
    <div class="inside_box">
      <div class="inside_box_title">
        <div>{{ popoverAttrsBind.title || "所有条件" }}</div>
        <div class="check-box">
          <el-button size="small" link @click="handlecheckAll">{{
            popoverAttrsBind.allTxt || "全选"
          }}</el-button>
          <el-button size="small" link @click="handleReset">{{
            popoverAttrsBind.clearTxt || "清空"
          }}</el-button>
          <el-button size="small" link @click="handleReverseCheck">{{
            popoverAttrsBind.reverseTxt || "反选"
          }}</el-button>
        </div>
      </div>
      <el-checkbox-group v-model="checkList" class="inside_box_main" @change="getcheck">
        <el-checkbox
          v-for="(item,index) of allcheckList"
          :key="index"
          :label="item.label"
          :value="item.label"
        ></el-checkbox>
      </el-checkbox-group>
    </div>
    <template #reference>
      <div class="more_dropdown_icon">
        <span class="out_box">{{ popoverAttrsBind.showTxt || "更多" }}</span>
        <el-icon>
          <ArrowDown />
        </el-icon>
      </div>
    </template>
  </el-popover>
</template>
<script setup lang="ts" name="MoreChoose">
import { ref, watch } from "vue"
const props = defineProps({
  // 以下拉方式展示更多条件---数据源
  moreCheckList: {
    type: Array,
    default: () => []
  },
  popoverAttrsBind: {
    type: Object,
    default: () => ({})
  }
})
// 单选选中
const checkList: any = ref([])
// 已选中
const isCheckList: any = ref([])
const allcheckList: any = ref(props.moreCheckList)
const emit = defineEmits(["getCheckList"])
watch(
  () => props.moreCheckList,
  (list: any) => {
    allcheckList.value = list
  },
  { deep: true }
)
watch(
  () => checkList,
  (nval: any, oval: any) => {
    let list: any[] = []
    oval.value.forEach((ele: any) => {
      if (!nval.value.some((val: any) => val == ele)) {
        list.push(ele)
      }
    })
    isCheckList.value.forEach((ele: any, j: string | number) => {
      if (list.filter(val => val == ele.label)[0]) {
        delete isCheckList.value[j]
      }
    })
  },
  { deep: true }
)
// 全选
const handlecheckAll = () => {
  const allList = JSON.parse(JSON.stringify(allcheckList.value))
  checkList.value = allList.map((item: any) => item.label)
  // console.log('全选', checkList.value)
  isCheckList.value = allList
  const checkObj = analysisObj(isCheckList.value)
  emit("getCheckList", checkObj)
}
// 反选
const handleReverseCheck = () => {
  const deepCheckList = JSON.parse(JSON.stringify(checkList.value))
  checkList.value = []
  isCheckList.value = [] as any
  allcheckList.value.forEach((ele: any) => {
    if (!deepCheckList.filter((item1: any) => item1 == ele.label)[0]) {
      checkList.value.push(ele.label)
      isCheckList.value.push(ele)
    }
  })
  const checkObj = analysisObj(isCheckList.value)
  // console.log('反选', checkObj)
  emit("getCheckList", checkObj)
}
// 清空
const handleReset = () => {
  // console.log('清空')
  checkList.value = []
  isCheckList.value = []
  emit("getCheckList", {})
}
// 单选
const getcheck = (val: any[]) => {
  isCheckList.value = []
  allcheckList.value.forEach((ele: { label: any }, j: any) => {
    if (val.filter(item1 => item1 == ele.label)[0]) {
      isCheckList.value.push(ele)
    }
  })
  // console.log("isCheckList---", isCheckList.value, checkList.value, val)
  const checkObj = analysisObj(isCheckList.value)
  // console.log("checkObj--222", checkObj)
  emit("getCheckList", checkObj)
}
// 格式化
const analysisObj = (val: any[]) => {
  return val.reduce((obj, item) => {
    obj[item.prop] = {
      label: item.label,
      comp: item.comp,
      bind: item.bind,
      list: item?.list,
      eventHandle: item?.eventHandle,
      changeEvent: item?.changeEvent,
      listTypeInfo: item?.listTypeInfo,
      arrLabel: item?.arrLabel,
      arrKey: item?.arrKey,
      slotName: item?.slotName,
      span: item?.span,
      type: item?.type,
      isSelfCom: (item && item.isSelfCom) || false,
      defaultVal: item?.defaultVal
    }
    return obj
  }, {})
}
</script>
<style lang="scss">
.t_query_condition_more.el-popover {
  padding: 15px;
  .inside_box {
    display: flex;
    flex-direction: column;
    .inside_box_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .inside_box_main {
      display: grid;
      grid-template-columns: repeat(2, minmax(100px, 50%));
      .el-checkbox {
        display: flex;
        align-items: center;
        .el-checkbox__label {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          min-width: 90px;
        }
      }
    }
  }
}
</style>
