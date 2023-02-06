import Cookies from 'js-cookie'
class Keys {
  static sidebarStatusKey = 'vue3-vite-sidebarStatusKey'
  static sizeKey = 'vue3-vite-sizeKey'
  static tokenKey = 'authorization'
  static aseKey = 'vue3-vite-key'
}
export const getSidebarStatus = () => Cookies.get(Keys.sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(Keys.sidebarStatusKey, sidebarStatus)

export const getSize = () => Cookies.get(Keys.sizeKey)
export const setSize = (size: string) => Cookies.set(Keys.sizeKey, size)

export const getToken = () => Cookies.get(Keys.tokenKey)
export const setToken = (token: string) => Cookies.set(Keys.tokenKey, token)
export const removeToken = () => Cookies.remove(Keys.tokenKey)
