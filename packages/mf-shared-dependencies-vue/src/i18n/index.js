import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './en'
import zh from './zh'
import jp from './jp'

Vue.use(VueI18n)

const messages = {
  en,
  zh,
  jp
}

// 通过选项创建 VueI18n 实例
export const i18n = new VueI18n({
  locale: 'zh', // 设置地区
  messages // 设置地区信息
})

export const i18nList = [{
  key: 'en'
}, {
  key: 'zh'
}, {
  key: 'jp'
}]
