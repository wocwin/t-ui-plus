'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
const packageName = require('./package.json').name
const name = 'vue3子应用模板' // 标题

module.exports = {
  publicPath: '/webdemo',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false, // 生成环境取消 eslint 验证
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  productionSourceMap: false,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    hotOnly: true,
    open: true, // 自动打开浏览器
    port: '8002', // 端口
    noInfo: false,
    // 可以通过设置让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: process.env.NODE_ENV === 'development',
      errors: process.env.NODE_ENV === 'development'
    },
    proxy: {
      '^/mes': {
        // target: `http://10.0.10.243:5001/mesv2`, // sit环境
        // target: `http://172.16.40.223:5504/mesv2`, // prod
        target: `http://10.0.10.243:5000/mesv2`, // 开发环境
        changeOrigin: true,
        pathRewrite: {
          '^/mes': ''
        }
      },
      // 总用户权限管理系统 http://10.0.10.240:8172/portal-user/doc.html
      '^/portal-user': {
        target: `http://10.0.10.240:8172`, // 开发
        // target: `http://10.0.10.213:8172`, // sit
        // target: `http://172.16.40.223:9011`, // prod
        changeOrigin: true,
        pathRewrite: {
          '^/portal-user': '/portal-user'
        }
      },
      // 登录校验服务器 http://10.0.10.240:8171/portal-sso/doc.html
      '^/portal-sso': {
        target: `http://10.0.10.240:8171`, // 开发环境
        // target: `http://10.0.10.213:8171`, // sit环境
        // target: `http://172.16.40.223:9010`, // prod
        changeOrigin: true,
        pathRewrite: {
          '^/portal-sso': '/portal-sso'
        }
      }
    },
    disableHostCheck: true
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss'),
      ]
    }
  },
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      entry: 'examples/main.ts',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    name,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './examples'),
        '~': path.resolve(__dirname, './packages')
      }
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${packageName}`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${packageName}`,
      filename: `[name].[hash].js`,
      chunkFilename: `[name].[hash].js`,
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        },
      ]
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // additionalData: `@import "@/styles/element-variables.scss";`
      }
    }
  },
  chainWebpack (config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 全局变量
    config.plugin('define')
      .tap(args => {
        args[0].ISPROD = process.env.NODE_ENV === 'production'
        return args
      })
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config.optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // only package third parties that are initially dependent
              },
              elementUI: {
                name: 'chunk-elementUI', // split elementUI into a single package
                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'), // can customize your rules
                minChunks: 3, //  minimum common number
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })
        }
      )
  }
}