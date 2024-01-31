<script lang="ts" setup>
declare let AMap: any
import { onUnmounted, ref, nextTick, toRefs, watch } from 'vue'
import { ElMessage } from 'element-plus'

interface Props {
  modelValue: [number, number, string] | [number, number, string] | []
  options?: {
    // 缩放层级
    zoom?: number
    // 是否可缩放
    zoomEnable?: boolean
    // 是否可拖拽移动
    dragEnable?: boolean
  }
  disabled?: boolean
  size?: 'large' | 'default' | 'small'
  placeholder?: string
  top?: string
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  options: () => ({
    zoom: 10,
    zoomEnable: true,
    dragEnable: true,
  }),
  disabled: false,
  size: 'default',
  placeholder: '请选择坐标',
  top: '8vh',
  width: '75%',
})

const emits = defineEmits(['update:modelValue', 'change'])

const { modelValue, disabled, options } = toRefs(props)

let map: any = null
let marker: any = null

const dialogVisible = ref(false)
const keyword = ref('')
let geocoder: any = null

// 地图选中数据
const model = ref<any>([])

// 打开选择器
const handleOpenDialog = async () => {
  if (disabled.value) return
  dialogVisible.value = true
  await nextTick()

  // 回显数据
  model.value = JSON.parse(JSON.stringify(modelValue.value))
  initMap()
}

// 经纬度转换文字
const regeoCode = (lnglat) => {
  geocoder.getAddress(lnglat, (status, result) => {
    if (status === 'complete' && result.regeocode) {
      keyword.value = result.regeocode.formattedAddress
      // 赋值
      model.value = [...lnglat, keyword.value]
    } else {
      ElMessage.error(result)
    }
  })
}

// 实例化点标记
const addMarker = (lnglat: [number, number], name?: string) => {
  marker = new AMap.Marker({
    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
    position: lnglat,
    offset: new AMap.Pixel(-13, -30),
    imageSize: new AMap.Size(20, 20),
  })
  marker.setMap(map)
  if (name) {
    keyword.value = name
    // 赋值
    model.value = [...lnglat, name]
    return
  }
  regeoCode(lnglat)
}

// 关键字改变
const inputChange = () => {
  model.value = []
  marker?.setMap(null)
  marker = null
}

const clearMarker = () => {
  marker?.setMap(null)
  marker = null
}

// 关键字选中
const handleSelect = (item) => {
  keyword.value = item.name
  //回调函数
  //实例化PlaceSearch
  let placeSearch = new AMap.PlaceSearch({
    pageSize: 10, //每页显示多少行
    pageIndex: 1, //显示的下标从那个开始
    city: item.adcode, //城市
    map: map, //显示地图
    panel: 'map-search-result', //服务显示的面板
    autoFitView: true,
  })

  // 显示搜索结果元素
  document
    .querySelector('#map-search-result')
    ?.setAttribute('style', 'display:block')

  placeSearch.search(keyword.value)

  // 元素点击事件
  const elClickFn = (e) => {
    clearMarker()
    const { name, location } = e.data
    addMarker([location.lng, location.lat], name)
  }

  placeSearch.on('markerClick', elClickFn)
  placeSearch.on('listElementClick', elClickFn)
}

// 初始化地图
const initMap = () => {
  if (!AMap) {
    throw new Error('请引入高德资源')
  }
  map = new AMap.Map('container', {
    // 设置地图容器id
    viewMode: '2D', // 是否为3D地图模式
    ...options.value,
  })
  geocoder = new AMap.Geocoder()
  // 初始化
  if (model.value && model.value.length >= 2) {
    const lnglat = model.value.slice(0, 2)
    addMarker(lnglat, model.value[2])
    map.setCenter(lnglat) //传入经纬度移动地图的方法
  }
  map.on('click', (e) => {
    clearMarker()
    const { lng, lat } = e.lnglat || {}
    model.value = [lng, lat]
    addMarker([lng, lat])
  })
}

// 自动填充
const querySearch = (queryString: string, cb: any) => {
  if (!queryString) {
    return cb([])
  }

  AMap.plugin('AMap.AutoComplete', () => {
    const autoComplete = new AMap.Autocomplete()
    autoComplete.search(queryString, (status, result) => {
      if (status === 'error') {
        cb([])
        return ElMessage.error(result)
      }
      // 搜索成功时，result即是对应的匹配数据
      try {
        cb(result.tips || [])
      } catch (error) {
        cb([])
      }
    })
  })
}

// 确认选择
const handleConfirm = () => {
  emits('update:modelValue', model.value)
  emits('change', model.value)
  dialogVisible.value = false
}

const clearValue = () => {
  emits('update:modelValue', [])
  emits('change', [])
}

onUnmounted(() => {
  map?.destroy()
})
</script>

<template>
  <div class="t_map">
    <el-input
      class="map-input"
      :placeholder="placeholder"
      readonly
      :size="size"
      :disabled="disabled"
      v-model="modelValue[2]"
      @click="handleOpenDialog"
    >
      <template #suffix v-if="!disabled">
        <el-icon v-if="modelValue[2]" class="input-close-icon" @click="clearValue">
          <CircleClose />
        </el-icon>
      </template>
    </el-input>
    <el-dialog
      v-model="dialogVisible"
      title="请选择坐标"
      :width="width"
      :top="top"
      :close-on-click-modal="false"
    >
      <div class="map-container" v-if="dialogVisible">
        <el-autocomplete
          v-model="keyword"
          :disabled="disabled"
          placeholder="请输入关键字选择地点"
          class="map-container-search"
          :debounce="700"
          style="margin-bottom: 15px; width: 100%"
          clearable
          @input="inputChange"
          :fetch-suggestions="querySearch"
          @select="handleSelect"
          @keyup="handleSelect({ name: keyword })"
          :validate-event="false"
        >
          <template #default="{ item }">
            {{ item.name }}
            <span class="district">{{ item.district }}</span>
          </template>
        </el-autocomplete>
        <div class="map-container-inner">
          <div id="container"></div>
          <div id="map-search-result"></div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" :disabled="disabled" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.map-input {
  &:hover,
  &:focus-within {
    .input-close-icon {
      display: block;
    }
  }
}
.input-close-icon {
  cursor: pointer;
  display: none;
}
.map-container {
  min-height: 500px;
  .map-container-inner {
    position: relative;
    #container {
      position: relative;
      width: 100%;
      height: 500px;
      :deep(.amap-marker) img {
        width: 25px;
        height: 34px;
      }
    }
    #map-search-result {
      display: none;
      position: absolute;
      right: -5px;
      top: 0;
      width: 30%;
      height: 500px;
      overflow-y: auto;
    }
  }
}

.district {
  margin-left: 10px;
  font-size: 12px;
  color: #ccc;
}
</style>
