import { mfMode, getCon, store, LOGIN_ACTION, Vue, singleSpaVue, i18n, components } from 'mf-shared-dependencies-vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const vueOptions = {
  i18n,
  el: getCon(),
  router,
  components,
  render: h => h(App)
}

// 判断当前页面使用singleSpa应用,不是就渲染
if (!mfMode()) {
  // 自动登录
  store.dispatch(LOGIN_ACTION, { username: 'dev', password: '7ki4ffznaZ' }).then(_ => {
    delete vueOptions.el
    new Vue(vueOptions).$mount('#app')
  })
}

// singleSpaVue包装一个vue微前端服务对象
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: vueOptions
})

export const bootstrap = vueLifecycles.bootstrap
export const mount = vueLifecycles.mount
export const unmount = vueLifecycles.unmount
