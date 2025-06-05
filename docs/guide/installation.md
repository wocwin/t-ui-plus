
# 安装

## 使用包管理器 <el-tag  effect="dark">推荐</el-tag>

**建议您使用包管理器 ([pnpm](https://pnpm.io/)<el-tag  effect="dark">推荐</el-tag> ， [yarn](https://classic.yarnpkg.com/lang/en/)，[npm](https://www.npmjs.com/)) 安装 @wocwin/t-ui-plus**。

::: code-group

```sh [pnpm]
pnpm install @wocwin/t-ui-plus -S
```

```sh [yarn]
yarn add @wocwin/t-ui-plus
```

```sh [npm]
npm install @wocwin/t-ui-plus    -S
```

:::


## 浏览器直接引入

直接通过浏览器的 HTML 标签导入 @wocwin/t-ui-plus，然后就可以使用全局变量 `TuiPlus` 了。

根据不同的 CDN 提供商有不同的引入方式， 我们在这里以[unpkg](https://unpkg.com) 和 [jsDelivr](https://jsdelivr.com) 举例。 你也可以使用其它的 CDN 供应商。

### unpkg

```html{10,12}
<head>
  <!-- 导入element-plus样式 -->
  <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
  <!-- 导入vue3 -->
  <script src="//unpkg.com/vue@3"></script>
  <!-- 导入element-plus -->
  <script src="//unpkg.com/element-plus"></script>

  <!-- 导入t-ui-plus样式 -->
  <link rel="stylesheet" href="//unpkg.com/@wocwin/t-ui-plus/index.css" />
  <!--导入t-ui-plus"  -->
  <script src="//unpkg.com/@wocwin/t-ui-plus"></script>
</head>
```

### jsDelivr

```html{10,12}
<head>
  <!-- 导入element-plus样式 -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/element-plus/dist/index.css" />
  <!-- 导入vue3 -->
  <script src="//cdn.jsdelivr.net/npm/vue@3"></script>
  <!-- 导入element-plus -->
  <script src="//cdn.jsdelivr.net/npm/element-plus"></script>

  <!-- 导入t-ui-plus样式 -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/@wocwin/t-ui-plus/index.css" />
  <!--导入t-ui-plus"  -->
  <script src="//cdn.jsdelivr.net/npm/@wocwin/t-ui-plus"></script>
</head>
```

::: warning 注意
默认使用最新版本，使用时建议加上版本号 如使用`0.0.1`版本，防止因版本导致应用出现问题。
:::




