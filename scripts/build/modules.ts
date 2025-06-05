import { resolve } from 'path'
import consola from 'consola'
import { rollup, Plugin } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import vuePlugin from '@vitejs/plugin-vue'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import dts from 'vite-plugin-dts'
import cssnano from 'cssnano'
import type { OutputOptions, ModuleFormat } from 'rollup'
import { pcOutput, pcRoot, pkgRoot, TSCONFIG_PATH, DTS_OUT_DIR } from '../utils/paths'
import { target, writeBundlesFunction, pathRewriter, cssResolver } from '../utils'
import { externalModules, excludeFiles } from '../utils/main'
import {
  TuiPlusAlias,
  TuiPlusExternal,
  TuiPlusClearConsole
} from '../utils/plugin'

const buildConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: resolve(pcOutput, 'es')
    }
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: resolve(pcOutput, 'lib')
    }
  }
}
const buildConfigEntries = Object.entries(buildConfig)

const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )

  const getBundle = async (options: OutputOptions) => {
    const plugins = [
      TuiPlusClearConsole(),
      TuiPlusExternal(options),
      TuiPlusAlias(),
      vuePlugin({ isProduction: true }) as Plugin,
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts']
      }),
      commonjs(),
      esbuild({
        sourceMap: false,
        target: target,
        loaders: {
          '.vue': 'ts'
        }
      }),
      postcss({
        namedExports: true,
        extract: true,
        plugins: [autoprefixer(), cssnano()]
      })
    ]

    const config = {
      input,
      external: externalModules,
      plugins:
        options.format === 'esm'
          ? [
              ...plugins,
              dts({
                entryRoot: pkgRoot,
                tsconfigPath: TSCONFIG_PATH,
                outDir: DTS_OUT_DIR,
                staticImport: true,
                insertTypesEntry: false,
                cleanVueFileName: false,
                copyDtsFiles: false,
                strictOutput: true,
                exclude: [
                  resolve(pkgRoot, 'eslint-config'),
                  resolve(pkgRoot, 'utils'),
                  resolve(pkgRoot, 'resolver'),
                  resolve(pkgRoot, 'theme-chalk')
                ],
                resolvers: [cssResolver],
                beforeWriteFile: (filePath: string, content: string) => {
                  let tempPath = filePath
                  let code = pathRewriter(content)
                  // packages/t-ui-plus
                  if (filePath.includes('dist/types/t-ui-plus')) {
                    tempPath = filePath.replace('dist/types/t-ui-plus', 'dist/types')
                  }
                  // */style/index   */style/css
                  if (filePath.includes('style/index') || filePath.includes('style/css')) {
                    code = JSON.parse(content)
                  }
                  return {
                    filePath: tempPath,
                    content: code
                  }
                }
              })
            ]
          : plugins,
      treeshake: false
    }
    return await rollup(config)
  }

  await writeBundlesFunction(
    getBundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format as ModuleFormat,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: pcRoot,
        sourcemap: false,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
  consola.success('Successfully build into modules!')
}

export default [buildModules()]
