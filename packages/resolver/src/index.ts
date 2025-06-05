import type { ComponentResolver, SideEffectsInfo, ComponentInfo } from "unplugin-vue-components"

function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, " $1").trim()
  return result.split(" ").join("-").toLowerCase()
}

export interface TuiPlusResolverOptions {
  /**
   * @default false
   */
  ssr?: boolean
  /**
   * import style css or less with components
   *
   * @default 'css'
   */
  importStyle?: boolean | "css" | "scss"

  /**
   * exclude component name, if match do not resolve the name
   */
  exclude?: RegExp

  /**
   * a list of component names that have no styles, so resolving their styles file should be prevented
   */
  noStylesComponents?: string[]
}

function getSideEffects(
  name: string,
  options: TuiPlusResolverOptions,
  module: "es" | "lib"
): SideEffectsInfo | undefined {
  const { importStyle } = options
  const filename = kebabCase(name)
  const noPrefixFilename = filename.replace("t-", "")

  const componentsFolder = `t-ui-plus/${module}/components/${noPrefixFilename}/style`

  if (importStyle === "scss") {
    return `${componentsFolder}/index`
  } else if (importStyle === "css") {
    return `${componentsFolder}/css`
  }
}

function resolveComponent(
  name: string,
  options: TuiPlusResolverOptions
): ComponentInfo | undefined {
  /**
   * exclude
   */
  if (options.exclude && name.match(options.exclude)) return
  /**
   * Exclusion of non-compliance with the t-ui-plus naming convention
   */
  if (!name.match(/^Plus[A-Z]/)) return

  /**
   * module
   */
  const module = options.ssr ? "lib" : "es"

  return {
    name,
    from: `t-ui-plus/${module}`,
    sideEffects: getSideEffects(name, options, module)
  }
}

export function TuiPlusResolver(options: TuiPlusResolverOptions = {}): ComponentResolver {
  let optionsResolved: TuiPlusResolverOptions
  function resolveOptions() {
    if (optionsResolved) return optionsResolved
    optionsResolved = {
      importStyle: "css",
      ssr: false,
      exclude: undefined,
      noStylesComponents: options.noStylesComponents || [],
      ...options
    }
    return optionsResolved
  }

  return (name: string) => {
    const options = resolveOptions()
    if ([...(options.noStylesComponents as string[])].includes(name)) {
      /**
       * Components without styles, importStyle default is `false`
       */
      return resolveComponent(name, { ...options, importStyle: false })
    } else {
      return resolveComponent(name, options)
    }
  }
}
