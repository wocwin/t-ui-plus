import { RootState } from './types'
const getters = {
  visitedViews: (state: RootState) => state.tagsView.visitedViews,
  cachedViews: (state: RootState) => state.tagsView.cachedViews,
  sidebar: (state: RootState) => state.app.sidebar,
  size: (state: RootState) => state.app.size,
  device: (state: RootState) => state.app.device,
  token: (state: RootState) => state.user.token,
  avatar: (state: RootState) => state.user.avatar,
  name: (state: RootState) => state.user.name,
  nickName: (state: RootState) => state.user.nickName,
  roles: (state: RootState) => state.user.roles,
  permissions: (state: RootState) => state.user.permissions,
  parentPath: (state: RootState) => state.permission.parentPath,
  permission_routes: (state: RootState) => state.permission.routes,
  permission_sysMenu: (state: RootState) => state.permission.sysMenu
}
export default getters
