import { http } from '../utils'
import { QueryValueset } from '../config/apis'

// 获取值集
const getValuesetsByCodes = (codes) => {
  return http.post(QueryValueset, {
    data: {
      filterFields: [
        { fieldName: 'code', conditionOperator: '=', relationship: 'AND', value: codes },
        { fieldName: 'status', conditionOperator: '=', relationship: 'AND', value: ['2'] }]
    }
  }).then(res => Array.isArray(res.data) ? res.data : [])
}

// 将值集中的值转成下拉用的option
const getOptionsByCodes = async (codes) => {
  const vals = await getValuesetsByCodes(codes)
  console.log(vals)
  return vals.map(val => {
    const values = val.values || []
    return {
      ...val,
      options: values.filter(value => value.enable).map(value => ({ label: value.value, value: value.code }))
    }
  })
}

export const ValuesetService = {
  getValuesetsByCodes,
  getOptionsByCodes
}
