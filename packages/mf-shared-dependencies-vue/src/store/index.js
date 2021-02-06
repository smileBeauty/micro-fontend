/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'

import { http, parseUrlWithArgs, Message } from '../utils'
import { Login } from '../config/apis'

import { LOGIN_ACTION, LOGOUT_ACTION } from './actions'
import { LOGIN_STATUS_MUTATION } from './mutations'
import { LOGIN_STATUS_GETTER, USER_INFO_GETTER } from './getters'

import { StorageService } from '../services'

Vue.use(Vuex)

const LOGIN_STATE = 'LOGIN_STATE'
const TOKEN_STATE = 'TOKEN_STATE'
const USERNAME_STATE = 'USERNAME_STATE'

const USER_INFO_MUTATION = 'USER_INFO_MUTATION'

export const store = new Vuex.Store({
  state: {
    [LOGIN_STATE]: false,
    [TOKEN_STATE]: '',
    [USERNAME_STATE]: ''
  },
  mutations: {
    [LOGIN_STATUS_MUTATION] (state, status) {
      state[LOGIN_STATE] = status
    },
    [USER_INFO_MUTATION] (state, { userName, token }) {
      state[TOKEN_STATE] = token
      state[USERNAME_STATE] = userName

      StorageService.setItem(TOKEN_STATE, token)
      StorageService.setItem(USERNAME_STATE, userName)
    }
  },
  actions: {
    async [LOGIN_ACTION] (context, { username, password }) {
      try {
        // const res = await http.get(parseUrlWithArgs(Login, { username, password }))
        const res = { data: { success: true } }
        const success = res.data.success
        if (success) {
          context.commit(LOGIN_STATUS_MUTATION, true)
          context.commit(USER_INFO_MUTATION, res.data)
        } else {
          Message.error(res.data.message)
        }
      } catch (e) {}
    },

    [LOGOUT_ACTION] (context) {
      context.commit(LOGIN_STATUS_MUTATION, false)
      context.commit(USER_INFO_MUTATION, {})
      StorageService.clear(TOKEN_STATE)
      StorageService.clear(USERNAME_STATE)
    }
  },
  getters: {
    [LOGIN_STATUS_GETTER] (state, _, rootState) {
      return state[LOGIN_STATE]
    },
    [USER_INFO_GETTER] (state) {
      return {
        [TOKEN_STATE]: state[TOKEN_STATE],
        [USERNAME_STATE]: state[USERNAME_STATE]
      }
    }
  }
})

const token = StorageService.getItem(TOKEN_STATE)
const userName = StorageService.getItem(USERNAME_STATE)

if (token && userName) {
  store.commit(USER_INFO_MUTATION, {
    token,
    userName
  })
  store.commit(LOGIN_STATUS_MUTATION, true)
}

export { TOKEN_STATE, USERNAME_STATE }
export * from './actions'
export * from './mutations'
export * from './getters'
