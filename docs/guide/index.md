# 简介

::: tip 提示

@wocwin/t-ui-plus 基于 vue3 + ts + Element-plus 再次封装的基础组件

:::

## 组件列表

| 组件名称                 | 说明                                                                                                                                                       |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TLayoutPage              | 布局页面                                                                                                                                                   |
| TLayoutPageItem          | 布局页面子项                                                                                                                                               |
| TAdaptivePage            | [一屏组件](https://wocwin.github.io/t-ui-plus/components/TAdaptivePage/base.html?_blank)（继承TTable 及 TQueryCondition 组件的所有属性、事件、插槽、方法） |
| TQueryCondition          | [条件查询组件](https://wocwin.github.io/t-ui-plus/components/TQueryCondition/base.html?_blank)                                                             |
| TTable                   | [表格组件](https://wocwin.github.io/t-ui-plus/components/TTable/base.html?_blank)                                                                          |
| Virtualized TTable       | [虚拟列表](https://wocwin.github.io/t-ui-plus/components/TTableVirtual/base.html?_blank)                                                                   |
| TForm                    | [表单组件](https://wocwin.github.io/t-ui-plus/components/TForm/base.html?_blank)                                                                           |
| TSelectTable             | [下拉选择表格组件](https://wocwin.github.io/t-ui-plus/components/TSelectTable/base.html?_blank)                                                            |
| Virtualized TSelectTable | [下拉选择虚拟表格组件](https://wocwin.github.io/t-ui-plus/components/multipleVirtual/base.html?_blank)                                                     |
| TSelectIcon              | [图标选择组件](https://wocwin.github.io/t-ui-plus/components/TSelectIcon/base.html?_blank)                                                                 |
| TSelect                  | [下拉选择组件](https://wocwin.github.io/t-ui-plus/components/TSelect/base.html?_blank)                                                                     |
| TDetail                  | [详情组件](https://wocwin.github.io/t-ui-plus/components/TDetail/base.html?_blank)                                                                         |
| TButton                  | [防抖按钮组件](https://wocwin.github.io/t-ui-plus/components/TButton/base.html?_blank)                                                                     |
| TStepWizard              | [步骤条组件](https://wocwin.github.io/t-ui-plus/components/TStepWizard/base.html?_blank)                                                                   |
| TTimerBtn                | 定时按钮组件                                                                                                                                               |
| TModuleForm              | [模块表单/详情组件](https://wocwin.github.io/t-ui-plus/components/TModuleForm/base.html?_blank)                                                            |
| TDatePicker              | [日期选择器组件](https://wocwin.github.io/t-ui-plus/components/TDatePicker/base.html?_blank)                                                               |
| TRadio                   | [单选组件](https://wocwin.github.io/t-ui-plus/components/TRadio/base.html?_blank)                                                                          |
| TCheckbox                | [多选组件](https://wocwin.github.io/t-ui-plus/components/TCheckbox/base.html?_blank)                                                                       |
| TChart                   | [图表组件](https://wocwin.github.io/t-ui-plus/components/TChart/base.html?_blank)                                                                          |
| TTabs                    | [标签页组件](https://wocwin.github.io/t-ui-plus/components/TTabs/base.html?_blank)                                                                         |
| TSelectIcon              | [图标选择组件](https://wocwin.github.io/t-ui-plus/components/TSelectIcon/base.html?_blank)                                                                 |



## docs 文档结构目录

```
├─ examples               # VPDemo组件自动解析此文件夹下的所有.vue文件
├─ components             # .md文件
├─ guide                  # 安装指南
├─ public                 # 静态资源文件
├─ .vitepress
│  ├─ plugins              # 插件配置
|  │  └─ mdPlugin.ts       # 自定义.md文件渲染
│  ├─ theme               # 主题配置
|  │  ├─ components        # demo组件
|  │  └─ directives       # copy指令
|  │  └─ styles           # 样式
│  ├─ utils               # 公共方法
│  └─ config.ts           # vitepress配置文件
├─ index.md               # 文档home页面
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 全局配置文件（支持tsx）
```

## Git 提交规范（PR 提交规范）

- `ci`: ci 配置文件和脚本的变动;
- `chore`: 构建系统或辅助工具的变动;
- `fix`: 代码 BUG 修复;
- `feat`: 新功能;
- `perf`: 性能优化和提升;
- `refactor`: 仅仅是代码变动，既不是修复 BUG 也不是引入新功能;
- `style`: 代码格式调整，可能是空格、分号、缩进等等;
- `docs`: 文档变动;
- `test`: 补充缺失的测试用例或者修正现有的测试用例;
- `revert`: 回滚操作;

## vue2 基础组件

> 基于 vue2 + Element-ui 和 ant-design-vue 二次封装的基础组件

---

#### [Vue2 基础组件文档地址](https://wocwin.github.io/t-ui/)

---

#### [Vue2 基础组件码云地址](https://gitee.com/wocwin/t-ui)

---

#### [Vue2 基础组件 GitHub 地址](https://github.com/wocwin/t-ui)