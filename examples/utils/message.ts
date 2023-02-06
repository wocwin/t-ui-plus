// 重置message，防止重复点击重复弹出message弹框
import { ElMessage, MessageOptions } from 'element-plus'

let messageInstance: any = null
const arr: string[] = ['success', 'warning', 'info', 'error', '']

arr.forEach((type: any) => {
  DoneMessage[type] = (options: MessageOptions) => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return DoneMessage(options)
  }
})

export default function DoneMessage(options: MessageOptions) {
  if (messageInstance) {
    messageInstance.close();
  }
  messageInstance = ElMessage(options);
  return messageInstance
}
