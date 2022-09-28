import store from '@/store'
import { Directive } from 'vue'

export const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding
    const roles = store.state.user.roles
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some((role: any) => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.style.display = 'none'
      }
    } else {
      throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    }
  }
}
