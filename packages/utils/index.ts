/**
 * @param func 函数
 * @param delay 防抖时间
 * @param immediate 是否立即执行
 * @param resultCallback
 */
type Func = (...args: any[]) => any

export function debounce(
  func: Func,
  delay: number = 500,
  immediate?: boolean,
  resultCallback?: Func
) {
  let timer: null | ReturnType<typeof setTimeout> = null
  let isInvoke = false
  const _debounce = function (this: unknown, ...args: any[]) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)
      if (immediate && !isInvoke) {
        try {
          const result = func.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)
        } catch (e) {
          reject(e)
        }
        isInvoke = true
      } else {
        timer = setTimeout(() => {
          try {
            const result = func.apply(this, args)
            if (resultCallback) resultCallback(result)
            resolve(result)
          } catch (e) {
            reject(e)
          }
          isInvoke = false
          timer = null
        }, delay)
      }
    })
  }
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    isInvoke = false
    timer = null
  }
  return _debounce
}

/**
 * @param func
 * @param interval
 * @param options
 * leading:初始 trailing:结尾
 */
export function throttle(
  func: Func,
  interval: number,
  options = { leading: false, trailing: true }
) {
  let timer: null | ReturnType<typeof setTimeout> = null
  let lastTime = 0
  const { leading, trailing } = options
  const _throttle = function (this: unknown, ...args: any[]) {
    const nowTime = Date.now()
    if (!lastTime && !leading) lastTime = nowTime
    const remainTime = interval - (nowTime - lastTime)
    if (remainTime <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      lastTime = nowTime
      func.apply(this, args)
    }
    if (trailing && !timer) {
      timer = setTimeout(() => {
        lastTime = !leading ? 0 : Date.now()
        timer = null
        func.apply(this, args)
      }, remainTime)
    }
  }
  _throttle.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    lastTime = 0
  }
  return _throttle
}
