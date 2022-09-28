/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.gif' {
  export const gif: any
}

declare let __webpack_public_path__

interface Window {
  __POWERED_BY_QIANKUN__?: boolean
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string
}
// declare module 'vue'
declare module '*.scss'
declare module '*.js'
declare module 'quill'
declare module 'js-cookie'
interface GlobalType {
  baseUrlDev: string;
  indexPath: string;
  isHighInterface: string;
  logoBgUrl: string;
  cmsName: string;
  logoUrl: string;
  loginLeftImgUrl: string;
}

interface Window {
  globalVar: GlobalType;
}
