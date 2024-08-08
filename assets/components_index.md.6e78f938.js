import{_ as s,o as n,c as a,M as l}from"./chunks/framework.2d9b22a0.js";const p="/t-ui-plus/assets/error.a8385dbb.png",h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"components/index.md","filePath":"components/index.md","lastUpdated":1719918463000}'),o={name:"components/index.md"},e=l(`<h3 id="快速上手" tabindex="-1">快速上手 <a class="header-anchor" href="#快速上手" aria-label="Permalink to &quot;快速上手&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">提示</p><p>@wocwin/t-ui-plus 基于 vue3 + ts + Element-plus 再次封装的基础组件</p></div><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@wocwin/t-ui-plus</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-S</span></span>
<span class="line"><span style="color:#E1E4E8;">&amp;</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@wocwin/t-ui-plus</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-S</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@wocwin/t-ui-plus</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-S</span></span>
<span class="line"><span style="color:#24292E;">&amp;</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@wocwin/t-ui-plus</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-S</span></span></code></pre></div><h3 id="全局使用" tabindex="-1">全局使用 <a class="header-anchor" href="#全局使用" aria-label="Permalink to &quot;全局使用&quot;">​</a></h3><blockquote><h4 id="前提条件-使用项目必须全局注册-element-plus-组件库" tabindex="-1">前提条件：使用项目必须全局注册 Element-plus 组件库 <a class="header-anchor" href="#前提条件-使用项目必须全局注册-element-plus-组件库" aria-label="Permalink to &quot;前提条件：使用项目必须全局注册 Element-plus 组件库&quot;">​</a></h4></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// main.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createApp } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vue&quot;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./App.vue&quot;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ElementPlus </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;element-plus&quot;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;element-plus/dist/index.css&quot;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;element-plus/theme-chalk/dark/css-vars.css&quot;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> locale </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;element-plus/es/locale/lang/zh-cn&quot;</span></span>
<span class="line"><span style="color:#6A737D;">// element-plus图标</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> ElementPlusIconsVue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@element-plus/icons-vue&quot;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> TuiPlus </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@wocwin/t-ui-plus&quot;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@wocwin/t-ui-plus/lib/style.css&quot;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">app</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createApp</span><span style="color:#E1E4E8;">(App)</span></span>
<span class="line"><span style="color:#6A737D;">// 注册所有图标</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">component</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">of</span><span style="color:#E1E4E8;"> Object.</span><span style="color:#B392F0;">entries</span><span style="color:#E1E4E8;">(ElementPlusIconsVue)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  app.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(key, component)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 注册ElementPlus</span></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(ElementPlus, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  locale </span><span style="color:#6A737D;">// 语言设置</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// size: Cookies.get(&#39;size&#39;) || &#39;medium&#39; // 尺寸设置</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(TuiPlus)</span></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;#app&quot;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// main.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createApp } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vue&quot;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./App.vue&quot;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ElementPlus </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;element-plus&quot;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;element-plus/dist/index.css&quot;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;element-plus/theme-chalk/dark/css-vars.css&quot;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> locale </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;element-plus/es/locale/lang/zh-cn&quot;</span></span>
<span class="line"><span style="color:#6A737D;">// element-plus图标</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> ElementPlusIconsVue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@element-plus/icons-vue&quot;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> TuiPlus </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@wocwin/t-ui-plus&quot;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@wocwin/t-ui-plus/lib/style.css&quot;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">app</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createApp</span><span style="color:#24292E;">(App)</span></span>
<span class="line"><span style="color:#6A737D;">// 注册所有图标</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">key</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">component</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">of</span><span style="color:#24292E;"> Object.</span><span style="color:#6F42C1;">entries</span><span style="color:#24292E;">(ElementPlusIconsVue)) {</span></span>
<span class="line"><span style="color:#24292E;">  app.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(key, component)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 注册ElementPlus</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(ElementPlus, {</span></span>
<span class="line"><span style="color:#24292E;">  locale </span><span style="color:#6A737D;">// 语言设置</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// size: Cookies.get(&#39;size&#39;) || &#39;medium&#39; // 尺寸设置</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(TuiPlus)</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;#app&quot;</span><span style="color:#24292E;">)</span></span></code></pre></div><h3 id="按需引入" tabindex="-1">按需引入 <a class="header-anchor" href="#按需引入" aria-label="Permalink to &quot;按需引入&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 在main.js中按下引入</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@wocwin/t-ui-plus/lib/style.css&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// 单个.vue文件引入</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;ts&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  import {TDetail, TForm} from &quot;@wocwin/t-ui-plus&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 在main.js中按下引入</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@wocwin/t-ui-plus/lib/style.css&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// 单个.vue文件引入</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;ts&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  import {TDetail, TForm} from &quot;@wocwin/t-ui-plus&quot;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h3 id="全部组件如下" tabindex="-1">全部组件如下 <a class="header-anchor" href="#全部组件如下" aria-label="Permalink to &quot;全部组件如下&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">TLayoutPage, </span><span style="color:#6A737D;">// 布局页面</span></span>
<span class="line"><span style="color:#E1E4E8;">TLayoutPageItem, </span><span style="color:#6A737D;">// 布局页面子项</span></span>
<span class="line"><span style="color:#E1E4E8;">TAdaptivePage, </span><span style="color:#6A737D;">// 一屏组件（继承TTable 及 TQueryCondition 组件的所有属性、事件、插槽、方法）</span></span>
<span class="line"><span style="color:#E1E4E8;">TQueryCondition, </span><span style="color:#6A737D;">// 查询条件</span></span>
<span class="line"><span style="color:#E1E4E8;">TTable, </span><span style="color:#6A737D;">// 表格</span></span>
<span class="line"><span style="color:#E1E4E8;">TForm, </span><span style="color:#6A737D;">// 表单</span></span>
<span class="line"><span style="color:#E1E4E8;">TSelectTable, </span><span style="color:#6A737D;">// 下拉选择表格</span></span>
<span class="line"><span style="color:#E1E4E8;">TSelect, </span><span style="color:#6A737D;">// 下拉选择</span></span>
<span class="line"><span style="color:#E1E4E8;">TDetail, </span><span style="color:#6A737D;">// 详情</span></span>
<span class="line"><span style="color:#E1E4E8;">TButton, </span><span style="color:#6A737D;">// 防抖按钮</span></span>
<span class="line"><span style="color:#E1E4E8;">TStepWizard, </span><span style="color:#6A737D;">// 步骤条</span></span>
<span class="line"><span style="color:#E1E4E8;">TTimerBtn, </span><span style="color:#6A737D;">// 定时按钮</span></span>
<span class="line"><span style="color:#E1E4E8;">TModuleForm, </span><span style="color:#6A737D;">// 模块表单/详情</span></span>
<span class="line"><span style="color:#E1E4E8;">TDatePicker, </span><span style="color:#6A737D;">// 日期选择器</span></span>
<span class="line"><span style="color:#E1E4E8;">TRadio, </span><span style="color:#6A737D;">// 单选</span></span>
<span class="line"><span style="color:#E1E4E8;">TCheckbox, </span><span style="color:#6A737D;">// 多选</span></span>
<span class="line"><span style="color:#E1E4E8;">TChart, </span><span style="color:#6A737D;">// 图表</span></span>
<span class="line"><span style="color:#E1E4E8;">TTabs </span><span style="color:#6A737D;">// 标签页</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">TLayoutPage, </span><span style="color:#6A737D;">// 布局页面</span></span>
<span class="line"><span style="color:#24292E;">TLayoutPageItem, </span><span style="color:#6A737D;">// 布局页面子项</span></span>
<span class="line"><span style="color:#24292E;">TAdaptivePage, </span><span style="color:#6A737D;">// 一屏组件（继承TTable 及 TQueryCondition 组件的所有属性、事件、插槽、方法）</span></span>
<span class="line"><span style="color:#24292E;">TQueryCondition, </span><span style="color:#6A737D;">// 查询条件</span></span>
<span class="line"><span style="color:#24292E;">TTable, </span><span style="color:#6A737D;">// 表格</span></span>
<span class="line"><span style="color:#24292E;">TForm, </span><span style="color:#6A737D;">// 表单</span></span>
<span class="line"><span style="color:#24292E;">TSelectTable, </span><span style="color:#6A737D;">// 下拉选择表格</span></span>
<span class="line"><span style="color:#24292E;">TSelect, </span><span style="color:#6A737D;">// 下拉选择</span></span>
<span class="line"><span style="color:#24292E;">TDetail, </span><span style="color:#6A737D;">// 详情</span></span>
<span class="line"><span style="color:#24292E;">TButton, </span><span style="color:#6A737D;">// 防抖按钮</span></span>
<span class="line"><span style="color:#24292E;">TStepWizard, </span><span style="color:#6A737D;">// 步骤条</span></span>
<span class="line"><span style="color:#24292E;">TTimerBtn, </span><span style="color:#6A737D;">// 定时按钮</span></span>
<span class="line"><span style="color:#24292E;">TModuleForm, </span><span style="color:#6A737D;">// 模块表单/详情</span></span>
<span class="line"><span style="color:#24292E;">TDatePicker, </span><span style="color:#6A737D;">// 日期选择器</span></span>
<span class="line"><span style="color:#24292E;">TRadio, </span><span style="color:#6A737D;">// 单选</span></span>
<span class="line"><span style="color:#24292E;">TCheckbox, </span><span style="color:#6A737D;">// 多选</span></span>
<span class="line"><span style="color:#24292E;">TChart, </span><span style="color:#6A737D;">// 图表</span></span>
<span class="line"><span style="color:#24292E;">TTabs </span><span style="color:#6A737D;">// 标签页</span></span></code></pre></div><h3 id="t-ui-plus-组件-volar-类型提示" tabindex="-1">T-ui-plus 组件 Volar 类型提示 <a class="header-anchor" href="#t-ui-plus-组件-volar-类型提示" aria-label="Permalink to &quot;T-ui-plus 组件 Volar 类型提示&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 需要在使用的项目的tsconfig.json文件中添加以下</span></span>
<span class="line"><span style="color:#E1E4E8;">compilerOptions：{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;types&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;@wocwin/t-ui-plus/components.d.ts&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 需要在使用的项目的tsconfig.json文件中添加以下</span></span>
<span class="line"><span style="color:#24292E;">compilerOptions：{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;types&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;@wocwin/t-ui-plus/components.d.ts&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="🔨-vue3-vite-项目中安装引入报如下错误的解决方法" tabindex="-1">🔨 Vue3 + Vite 项目中安装引入报如下错误的解决方法 <a class="header-anchor" href="#🔨-vue3-vite-项目中安装引入报如下错误的解决方法" aria-label="Permalink to &quot;🔨 Vue3 + Vite 项目中安装引入报如下错误的解决方法&quot;">​</a></h3><blockquote><h4 id="把项目的-vite-版本升级到-4" tabindex="-1">把项目的 vite 版本升级到 4+ <a class="header-anchor" href="#把项目的-vite-版本升级到-4" aria-label="Permalink to &quot;把项目的 vite 版本升级到 4+&quot;">​</a></h4></blockquote><img src="`+p+`"><h3 id="docs-文档结构目录" tabindex="-1">docs 文档结构目录 <a class="header-anchor" href="#docs-文档结构目录" aria-label="Permalink to &quot;docs 文档结构目录&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">├─ examples               # VPDemo组件自动解析此文件夹下的所有.vue文件</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ components             # .md文件</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ public                 # 静态资源文件</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ .vitepress</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ config              # 插件配置</span></span>
<span class="line"><span style="color:#e1e4e8;">|  │  ├─ global.ts        # 全局变量定义</span></span>
<span class="line"><span style="color:#e1e4e8;">|  │  └─ plugins.ts       # 自定义.md文件渲染</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ theme               # 主题配置</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ utils               # 文档展开隐藏代码高亮</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ vitepress</span></span>
<span class="line"><span style="color:#e1e4e8;">|  │  ├─ vp-demo          # VPDemo组件源码</span></span>
<span class="line"><span style="color:#e1e4e8;">|  │  ├─ style            # VPDemo组件样式</span></span>
<span class="line"><span style="color:#e1e4e8;">|  │  └─ index.ts         # 暴露VPDemo组件</span></span>
<span class="line"><span style="color:#e1e4e8;">│  └─ config.ts           # vitepress配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ index.md               # 文档home页面</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ tsconfig.json          # typescript 全局配置</span></span>
<span class="line"><span style="color:#e1e4e8;">└─ vite.config.ts         # vite 全局配置文件（支持tsx）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">├─ examples               # VPDemo组件自动解析此文件夹下的所有.vue文件</span></span>
<span class="line"><span style="color:#24292e;">├─ components             # .md文件</span></span>
<span class="line"><span style="color:#24292e;">├─ public                 # 静态资源文件</span></span>
<span class="line"><span style="color:#24292e;">├─ .vitepress</span></span>
<span class="line"><span style="color:#24292e;">│  ├─ config              # 插件配置</span></span>
<span class="line"><span style="color:#24292e;">|  │  ├─ global.ts        # 全局变量定义</span></span>
<span class="line"><span style="color:#24292e;">|  │  └─ plugins.ts       # 自定义.md文件渲染</span></span>
<span class="line"><span style="color:#24292e;">│  ├─ theme               # 主题配置</span></span>
<span class="line"><span style="color:#24292e;">│  ├─ utils               # 文档展开隐藏代码高亮</span></span>
<span class="line"><span style="color:#24292e;">│  ├─ vitepress</span></span>
<span class="line"><span style="color:#24292e;">|  │  ├─ vp-demo          # VPDemo组件源码</span></span>
<span class="line"><span style="color:#24292e;">|  │  ├─ style            # VPDemo组件样式</span></span>
<span class="line"><span style="color:#24292e;">|  │  └─ index.ts         # 暴露VPDemo组件</span></span>
<span class="line"><span style="color:#24292e;">│  └─ config.ts           # vitepress配置文件</span></span>
<span class="line"><span style="color:#24292e;">├─ index.md               # 文档home页面</span></span>
<span class="line"><span style="color:#24292e;">├─ tsconfig.json          # typescript 全局配置</span></span>
<span class="line"><span style="color:#24292e;">└─ vite.config.ts         # vite 全局配置文件（支持tsx）</span></span></code></pre></div><h3 id="git-提交规范-pr-提交规范" tabindex="-1">Git 提交规范（PR 提交规范） <a class="header-anchor" href="#git-提交规范-pr-提交规范" aria-label="Permalink to &quot;Git 提交规范（PR 提交规范）&quot;">​</a></h3><ul><li><code>ci</code>: ci 配置文件和脚本的变动;</li><li><code>chore</code>: 构建系统或辅助工具的变动;</li><li><code>fix</code>: 代码 BUG 修复;</li><li><code>feat</code>: 新功能;</li><li><code>perf</code>: 性能优化和提升;</li><li><code>refactor</code>: 仅仅是代码变动，既不是修复 BUG 也不是引入新功能;</li><li><code>style</code>: 代码格式调整，可能是空格、分号、缩进等等;</li><li><code>docs</code>: 文档变动;</li><li><code>test</code>: 补充缺失的测试用例或者修正现有的测试用例;</li><li><code>revert</code>: 回滚操作;</li></ul><h3 id="vue2-基础组件" tabindex="-1">vue2 基础组件 <a class="header-anchor" href="#vue2-基础组件" aria-label="Permalink to &quot;vue2 基础组件&quot;">​</a></h3><blockquote><p>基于 vue2 + Element-ui 和 ant-design-vue 二次封装的基础组件</p></blockquote><hr><h4 id="vue2-基础组件文档地址" tabindex="-1"><a href="https://wocwin.github.io/t-ui/" target="_blank" rel="noreferrer">Vue2 基础组件文档地址</a> <a class="header-anchor" href="#vue2-基础组件文档地址" aria-label="Permalink to &quot;[Vue2 基础组件文档地址](https://wocwin.github.io/t-ui/)&quot;">​</a></h4><hr><h4 id="vue2-基础组件码云地址" tabindex="-1"><a href="https://gitee.com/wocwin/t-ui" target="_blank" rel="noreferrer">Vue2 基础组件码云地址</a> <a class="header-anchor" href="#vue2-基础组件码云地址" aria-label="Permalink to &quot;[Vue2 基础组件码云地址](https://gitee.com/wocwin/t-ui)&quot;">​</a></h4><hr><h4 id="vue2-基础组件-github-地址" tabindex="-1"><a href="https://github.com/wocwin/t-ui" target="_blank" rel="noreferrer">Vue2 基础组件 GitHub 地址</a> <a class="header-anchor" href="#vue2-基础组件-github-地址" aria-label="Permalink to &quot;[Vue2 基础组件 GitHub 地址](https://github.com/wocwin/t-ui)&quot;">​</a></h4>`,28),t=[e];function c(r,i,y,E,u,d){return n(),a("div",null,t)}const F=s(o,[["render",c]]);export{h as __pageData,F as default};
