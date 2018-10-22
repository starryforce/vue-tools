import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
// Translation provided by Vuetify (javascript)
import zhHans from 'vuetify/es5/locale/zh-Hans'

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
  theme: {
    primary: '#1EB1AD', // 贝卡品牌色加深版
    secondary: '#57C5C2', // 贝卡品牌色
  },
})
