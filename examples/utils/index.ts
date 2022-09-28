// 返回项目路径
export function getNormalPath(p: any) {
  if (p.length === 0 || !p || p == 'undefined') {
    return p
  }
  let res = p.replace('//', '/')
  if (res[res.length - 1] === '/') {
    return res.slice(0, res.length - 1)
  }
  return res
}
/**
 * 表格时间格式化
 */
export function formatDate(cellValue) {
  if (cellValue == null || cellValue === '') {
    return ''
  }
  const date = new Date(cellValue)
  const year = date.getFullYear()
  const month =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return (
    year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  )
}

export function isprice(value) {
  return !/^\d{1,8}(\.\d{1,6})*$/.test(value)
}

export function isMobile() {
  // const rect = body.getBoundingClientRect()
  // return rect.width - 1 < WIDTH
  return /Android|webOS|iPhone|iPod|BlackBerry|SymbianOS|HarmonyOS|iPad/i.test(
    navigator.userAgent
  )
}

// 将16进制颜色转为rgba
export function colorRgba(str: string, opacity: number) {
  let sColor = str.toLowerCase()
  if (sColor) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let index = 1; index < 4; index += 1) {
        sColorNew += sColor
          .slice(index, index + 1)
          .concat(sColor.slice(index, index + 1))
      }
      sColor = sColorNew
    }
    // 处理六位的颜色值
    const sColorChange: number[] = []
    for (let i = 1; i < 7; i += 2) {
      // tslint:disable-next-line
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    return 'rgba(' + sColorChange.join(',') + ',' + opacity + ')'
  } else {
    return sColor
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) {
      s++
    } else if (code > 0x7ff && code <= 0xffff) {
      s += 2
    }
    if (code >= 0xdc00 && code <= 0xdfff) {
      i--
    }
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray: any[] = []
  for (const item of actual) {
    if (item) {
      newArray.push(item)
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) {
    return ''
  }
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) {
        return ''
      }
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout
  let args
  let context
  let timestamp
  let result

  const later = () => {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) {
          context = args = null
        }
      }
    }
  }
  // tslint:disable-next-line
  return function(...args) {
    // @ts-ignore
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) {
      result = func.apply(context, args)
      // @ts-ignore
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  // tslint:disable-next-line
  const randomNum = parseInt((1 + Math.random()) * 65536 + '') + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className += ' ' + cls
  }
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function makeMap(str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  // tslint:disable-next-line
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  // tslint:disable-next-line
  return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val]
}

export const exportDefault = 'export default '

export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

// 将树形数据转联级选择器
export function getOptiopns(datas) {
  return datas.map(item => {
    const obj: any = {}
    if (item.children.length > 0) {
      obj.children = getOptiopns(Array.from(item.children))
    }
    obj.label = item.label
    obj.value = item.value
    obj.key = item.key
    return obj
  })
}

// 判断邮箱地址是否正确
export function checkEmail() {
  return [
    {
      validator: (rule, value, callback) => {
        if (value !== '') {
          if (
            !/^[a-zA-Z0-9_.-]+\@+[0-9a-zA-Z]+\.(com|com.cn|edu|hk|cn|net)$/.test(
              value
            )
          ) {
            callback(new Error('邮箱地址格式有误，请重填'))
          } else if (value.toString().length > 50) {
            callback(new Error('长度在 1 到 50 个字符'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 判断微信格式是否正确
export function checkWechan() {
  return [
    {
      validator: (rule, value, callback) => {
        if (value !== '') {
          if (!/^([-_a-zA-Z0-9]{5,19})+$/.test(value)) {
            callback(new Error('微信账号格式有误，请重填'))
          } else if (
            value.toString().length > 20 ||
            value.toString().length < 6
          ) {
            callback(new Error('长度在 6 到 20 个字符'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 判断电话类型
export function isPhone(value) {
  return !/^1(3|4|5|7|8)\d{9}$/.test(value)
}
// 判断邮箱类型
export function isEmail(value) {
  return !/^[a-zA-Z0-9_.-]+\@+[0-9a-zA-Z]+\.(com|com.cn|edu|hk|cn|net)$/.test(
    value
  )
}
export function isWetNo(value) {
  return !/^([-_a-zA-Z0-9]{5,19})+$/.test(value)
}

// 浮点数乘法精度丢失问题
export function numMulti(num1, num2) {
  let baseNum = 0
  try {
    baseNum += num1.toString().split('.')[1].length
  } catch (e) {}
  try {
    baseNum += num2.toString().split('.')[1].length
  } catch (e) {}
  return (
    (Number(num1.toString().replace('.', '')) *
      Number(num2.toString().replace('.', ''))) /
    Math.pow(10, baseNum)
  )
}
// 浮点数加法精度丢失问题
export function numAdds(arg1, arg2) {
  // 要相加的两个数
  let r1
  let r2
  let m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return ((arg1 * m + arg2 * m) / m).toFixed(4)
}
export function numAdd(arg1, arg2) {
  // 要相加的两个数
  let r1
  let r2
  let m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}
// 判断时间是否存在
export function isDate(date) {
  return date ? date.replace('T', ' ') : ''
}
// 输入框只能输入数字
export function inputNumber(value) {
  return value.replace(/[^\d]/g, '')
}
// 输入框只能输入正数负数和小数
export function inputNumbers(value) {
  return value.replace(/[^\-?\d.]/g, '')
}
// 判断电话号码格式是否正确
export function checkPhone(type = 1) {
  return [
    {
      validator: (rule, value, callback) => {
        if (type === 1) {
          if (value !== '') {
            if (!/^1(3|4|5|7|8)\d{9}$/.test(value)) {
              callback(new Error('手机号码格式有误，请重填'))
            } else {
              callback()
            }
          } else {
            callback()
          }
        } else {
          if (!/^1(3|4|5|7|8)\d{9}$/.test(value)) {
            callback(new Error('手机号码格式有误，请重填'))
          } else {
            callback()
          }
        }
      },
      trigger: 'blur'
    }
  ]
}

// 节流
export function throttle(func, wait, immediately = true) {
  let previous
  let timeout
  if (immediately) {
    previous = 0
  }
  // tslint:disable-next-line
  return function() {
    // @ts-ignore
    const context = this
    const args = arguments
    if (immediately) {
      // 时间戳版(触发即立即执行)
      const now = Date.now()
      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    } else {
      if (!timeout) {
        // 定时器版(触发待指定时间后执行)
        timeout = setTimeout(() => {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  }
}
