
import { store, Vue, Vuex } from 'mf-shared-dependencies-vue'

import { GET_MENU_ACTION, ACTIVE_TOP_MENU_ACTION, ACTIVE_LEFT_MENU_ACTION } from './actions'
import { TOP_MENU_LIST_GETTER, TOP_MENU_GETTER, LEFT_MENU_GETTER, MENU_URL_MAP_GETTER } from './getters'

Vue.use(Vuex)

// 接口数据转前端数据
function generateMenu (menus) {
  const generateAppMenu = (menu) => {
    return {
      id: menu.code,
      title: menu.name,
      i18n: menu.name,
      type: menu.formCode ? 'item' : 'collapse',
      url: menu.url,
      icon: menu.icon,
      children: menu.child.map(child => generateAppMenu(child))
    }
  }
  const topNav = []
  const leftNavMap = {}
  for (const menu of menus) {
    topNav.push({ id: menu.code, title: menu.name, url: menu.url })
    leftNavMap[menu.url] = generateAppMenu(menu)
  }

  return {
    topNav,
    leftNavMap
  }
}

function generateUrlMenuMap (menus) {
  const map = {}
  const iterator = (items) => {
    for (const item of items) {
      if (item.url) {
        const url = item.url.startsWith('/') ? item.url : '/' + item.url
        map[url] = item
      }
      if (Array.isArray(item.child)) {
        iterator(item.child)
      }
    }
  }
  iterator(menus)
  return map
}

const MODULE_NAME = 'PLATFORM'

// private 从接口返回的导航数据
const MENU_STATE = 'MENU_STATE'

// private 转化后的顶部导航数据
const TOP_MENU_LIST_STATE = 'TOP_MENU_LIST_STATE'

// private 转化后的做菜单数据
const LEFT_MENU_MAP_STATE = 'LEFT_MENU_MAP_STATE'

// private 激活的顶部导航
const TOP_MENU_STATE = 'TOP_MENU_STATE'

// private 激活的左侧菜单
const LEFT_MENU_STATE = 'LEFT_MENU_STATE'

// private { [url: string]: menu }
const MENU_URL_MAP_STATE = 'MENU_URL_MAP_STATE'

// private 导航数据更新
const MENU_STATE_MUTATION = 'MENU_STATE_MUTATION'

// private 顶部被激活导航更新
const TOP_MENU_MUTATION = 'TOP_MENU_MUTATION'

// private 左侧被激活导航更新
const LEFT_MENU_MUTATION = 'LEFT_MENU_MUTATION'

// 注册应用级store
store.registerModule(MODULE_NAME, {
  state: {
    [MENU_STATE]: [],
    [TOP_MENU_LIST_STATE]: [],
    [LEFT_MENU_STATE]: {},
    [TOP_MENU_STATE]: {},
    [LEFT_MENU_MAP_STATE]: {},
    [MENU_URL_MAP_STATE]: {}
  },
  mutations: {
    [MENU_STATE_MUTATION] (state, menus) {
      const { leftNavMap, topNav } = generateMenu(menus)
      state[MENU_STATE] = menus
      state[TOP_MENU_LIST_STATE] = topNav
      state[LEFT_MENU_MAP_STATE] = leftNavMap
      state[MENU_URL_MAP_STATE] = generateUrlMenuMap(menus)
    },

    [TOP_MENU_MUTATION] (state, topNav) {
      state[TOP_MENU_STATE] = topNav
    },

    [LEFT_MENU_MUTATION] (state, leftNav) {
      state[LEFT_MENU_STATE] = leftNav
    }
  },
  actions: {
    async [GET_MENU_ACTION] ({ state, rootState, commit }) {
      // if (!rootState[TOKEN_STATE]) {
      //   return commit(MENU_STATE_MUTATION, [])
      // }
      // const res = await http.get(parseUrlWithArgs(QueryMenu, { token: rootState[TOKEN_STATE] }))
      // const menus = Array.isArray(res.data) ? res.data : []
      const menus = [
        {
          id: 'user',
          code: 'user',
          name: 'user',
          url: '/user',
          title: 'user',
          icon: 'user',
          child: [
            {
              id: 'user-example-1',
              code: 'user-example-1',
              name: 'user-example-1',
              url: 'user/user-example-1',
              title: 'user-example-1',
              icon: 'user-example-1',
              child: []
            },
            {
              id: 'user-example-2',
              code: 'user-example-2',
              name: 'user-example-2',
              url: 'user/user-example-2',
              title: 'user-example-2',
              icon: 'user-example-2',
              child: []
            }
          ]
        },
        {
          id: 'customer',
          code: 'customer',
          name: 'customer',
          url: '/customer',
          title: 'customer',
          icon: 'customer',
          child: [
            {
              id: 'customer-example-1',
              code: 'customer-example-1',
              name: 'customer-example-1',
              url: 'customer/customer-example-1',
              title: 'customer-example-1',
              icon: 'customer-example-1',
              child: []
            },
            {
              id: 'customer-example-2',
              code: 'customer-example-2',
              name: 'customer-example-2',
              url: 'customer/customer-example-2',
              title: 'customer-example-2',
              icon: 'customer-example-2',
              child: []
            }
          ]
        }
      ]
      commit(MENU_STATE_MUTATION, menus)
    },

    [ACTIVE_TOP_MENU_ACTION] ({ commit, state }, topNav = {}) {
      const url = topNav.url
      const leftNav = state[LEFT_MENU_MAP_STATE][url]
      if (url && leftNav) {
        commit(LEFT_MENU_MUTATION, leftNav)
      }
      commit(TOP_MENU_MUTATION, topNav)
    },

    [ACTIVE_LEFT_MENU_ACTION] ({ commit }, leftNav) {
      commit(LEFT_MENU_MUTATION, leftNav)
    }
  },
  getters: {
    [TOP_MENU_LIST_GETTER] (state) {
      return state[TOP_MENU_LIST_STATE]
    },
    [TOP_MENU_GETTER] (state) {
      return state[TOP_MENU_STATE]
    },
    [LEFT_MENU_GETTER] (state) {
      return state[LEFT_MENU_STATE]
    },
    [MENU_URL_MAP_GETTER] (state) {
      return state[MENU_URL_MAP_STATE]
    }
  }
})

// public
export * from './actions'
export * from './mutations'
export * from './getters'
