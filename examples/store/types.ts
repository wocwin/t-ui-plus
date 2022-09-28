import { UserState } from './modules/user/types'
import { PermissionState } from './modules/permission/types'
import { TagsViewState } from './modules/tagViews/types'
import { SettingsState } from './modules/settings/types'
export interface RootState {
  tagViews: any
  settings: SettingsState
  app: any
  user: UserState
  permission: PermissionState
  tagsView: TagsViewState
}
