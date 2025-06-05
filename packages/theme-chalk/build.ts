import path from "path"
import { writeFile, mkdir, access } from "fs/promises"
import autoprefixer from "autoprefixer"
import postcss from "postcss"
import postcssNested from "postcss-nested"
import { compile } from "sass"
import cssnano from "cssnano"
import glob from "fast-glob"
import { copy } from "fs-extra"
import { consola } from "consola"

const pcOutput = path.resolve("../../dist/t-ui-plus")

const isDev = process.env.T_UI_PLUS_THEME_CHALK_DEV === "true"

const resolve = (...dir: string[]) => path.resolve(__dirname, ...dir)
const styleRoot = resolve("./src")
const distFolder = path.resolve(__dirname, "dist")
const distBundle = path.resolve(pcOutput, "theme-chalk")

const main = async () => {
  /**
   * 加载./src下所有scss文件
   */
  const files = await glob([`*.scss`], {
    cwd: resolve(styleRoot),
    absolute: true
  })

  /**
   * 生成./dist文件夹
   */
  try {
    await access(distFolder)
  } catch (error) {
    await mkdir(distFolder)
  }

  for (const item of files) {
    const content = compile(item)
    const { name } = path.parse(item)
    const plugins = [postcssNested as any, autoprefixer]

    // 生产环境开启压缩
    if (!isDev) {
      plugins.push(cssnano)
    }

    const result = await postcss(plugins).process(content.css, { from: undefined })
    const filename = name === "index" ? "index.css" : `t-${name}.css`
    await writeFile(resolve(distFolder, filename), result.css)
  }

  /**
   * 复制./src的文件到 ./dist/src
   */
  await copy(styleRoot, resolve(distFolder, "src"))

  /**
   * 复制打包后的文件./dist到/dist/t-ui-plus/theme-chalk
   */
  await copy(distFolder, resolve(distBundle))

  /**
   * 复制打包后的./dist/index.css文件到/dist/t-ui-plus/index.css
   */
  await copy(resolve(distFolder, "index.css"), resolve(pcOutput, "index.css"))
}

main()
  .then(() => {
    consola.success(`Successfully build theme-chalk!`)
  })
  .catch(err => {
    consola.error(err)
  })
