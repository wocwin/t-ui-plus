# 安装

::: tip 提示

@wocwin/t-ui-plus 基于 vue3 + ts + Element-plus 再次封装的基础组件

:::

## Install

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:no-line-numbers
yarn add @wocwin/t-ui-plus -S
```

  </CodeGroupItem>

  <CodeGroupItem title="npm" active>

```bash:no-line-numbers
npm install @wocwin/t-ui-plus -S
```

  </CodeGroupItem>
</CodeGroup>

## Usage

```js
// main.ts
import TuiPlus from '@wocwin/t-ui-plus'

const app = createApp(App)
app.use(TuiPlus)
app.mount('#app')
```
