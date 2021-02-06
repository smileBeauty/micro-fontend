import * as cron from 'cron-validator'
/**
 * 验证code是否符合规范
 * @param code 编码
 */
export function validCode (code) {
  return /^[A-Z0-9-_]+$/.test(code)
}
/**
 * 验证platformShortCode是否符合规范
 * @param platformShortCode 缩写
 */
export function validUserArchiveCode (userArchiveCode) {
  return /^[A-Za-z0-9]+$/.test(userArchiveCode)
}
/**
   * 验证name是否包含特殊字符
   * @param name 名称
   */
export function validName (name) {
  const regEn = /[=`\\~!@&#$%^*+<>?:"{},.\\/;'[\]\s]/im
  const regCn = /[·！#&￥——：……；“”‘、，| [\]]/im
  return !(regEn.test(name) || regCn.test(name))
}
/**
 * 日期定义中日期定义校验
 * @param val 输入的参数
 */
export function dataDefinition (val) {
  const array = val.split(' ')
  if ([3, 4].includes(array.length)) {
    // const value =  val.padStart(6,'* ')
    // const param = value + '' + val
    array.unshift('*', '*', '*')
    const value = array.join(' ')
    return cron.isValidCron(value, { alias: false, allowBlankDay: false, seconds: false })
  }
  return true
}
/**
   * 列表中判断是否已存在
   * @param val 匹配的值
   * @param list 列表
   * @param key 字段名
   */
export function existsInList (val, list, key) {
  return !!(list.filter(item => item[key] === val).length > 1)
}

/**
 * 列表中参数是对象的时候判断是否已存在
 * @param val 匹配的值
 * @param list 列表
 * @param key 对象名
 * @param code 字段名
 */
export function existsInObjectList (val, list, key, code) {
  if (list[0][key]) {
    return !!(list.filter(item => item[key].code === val.code).length > 1)
  }
}

/**
   * 校验是否比0大
   * @param num 数字
   */
export function largeThenZero (num) {
  return num > 0
}

/**
   * 验证platformShortCode是否符合规范
   * @param platformShortCode 缩写
   */
export function validCodePlatform (platformShortCode) {
  return /^[A-Z0-9]+$/.test(platformShortCode)
}

/**
   * 验证电话号码是否符合规范
   * @param tel 缩写
   */
export function validTel (tel) {
  return /^1[3456789]\d{9}$/.test(tel)
}

/**
   * 验证邮箱是否符合规范
   * @param email 缩写
   */
export function validEmail (email) {
  return /^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email)
}

/**
 * 验证是否是 00001~10000格式
 * @param value 流水
 */
export function validateSerialNum (value) {
  if (value) {
    if (value.includes('~')) {
      if (value.split('~')[0].length === value.split('~')[1].length) {
        return /^(#*[0-9])$/.test(value.split('~')[0])
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
