import { defineBuildConfig } from "unbuild"

export default defineBuildConfig({
  entries: ["./src/index"],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    dts: {
      respectExternal: true
    },
    esbuild: {
      minify: false
    }
  }
})
