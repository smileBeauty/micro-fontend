import axios from 'axios'

import { Message } from '../utils/message'
import { store, TOKEN_STATE, LOGOUT_ACTION } from '../store'

const RESPONSE_STATUS = {
  SUCCESS: 'success',
  TOKENINVALID: 'tokeninvalid'
}

function parseUrlWithArgs (url, args = {}) {
  const reg = /{([a-zA-Z0-9]*)}/
  while (reg.exec(url)) {
    const match = reg.exec(url)
    const key = match[1]
    const val = args[key]
    const placeholder = match[0]
    url = url.replace(new RegExp(placeholder), val)
  }
  return url
}

const http = axios.create({
  baseURL: ''
})

// Add a request interceptor
http.interceptors.request.use(function (config) {
  // Do something before request is sent

  // Merge common params
  const data = config.data
  if (data) {
    config.data = Object.assign({
      ak: 'string',
      language: 'zh_CN',
      parentCode: 'string',
      sign: 'string',
      sk: 'string',
      token: store.state[TOKEN_STATE]
    }, data)
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const data = response.data
  if (data && data.code !== RESPONSE_STATUS.SUCCESS) {
    Message.error(data.data)
    if (data.code === RESPONSE_STATUS.TOKENINVALID) {
      store.dispatch(LOGOUT_ACTION)
    }
    throw new Error(data.data)
  }
  return response.data
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  Message.error('维护中，请稍后再试')
  return Promise.reject(error)
})

export { http, parseUrlWithArgs }
