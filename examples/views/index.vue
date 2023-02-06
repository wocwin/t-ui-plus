<template>
  <div class="home">
    <h1>欢迎vite+vue3+ts+pinia+element-plus+qiankun项目</h1>
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
    <hr />
    <el-icon :size="30" color="red">
      <Edit />
    </el-icon>
  </div>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() as any
// 获取列表数据
const getList = async () => {
  const res = await proxy.$api.materialList()
  console.log('proxy', res)
  if (res?.success) {
    console.log('获取接口数据', res.data.records)
  }
}
// getList()
</script>
<style lang="scss" scoped>
.home {
  background-color: #eee;
  height: 100vh;
}
</style>
