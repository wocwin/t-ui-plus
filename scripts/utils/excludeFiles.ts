// 基础
const excludes = [
  'node_modules',
  '__tests__',
  'dist',
  'packages/eslint-config',
  'packages/utils',
  'packages/theme-chalk',
  'packages/resolver'
]

export const excludeFiles = (files: string[]) => {
  return files.filter(path => ![...excludes].some(exclude => path.includes(exclude)))
}
