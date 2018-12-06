import Vue from 'vue'
import '../design/quasar.styl'
import lang from 'quasar-framework/i18n/zh-hans'
// import 'quasar-framework/dist/quasar.ie.polyfills'
// import 'quasar-extras/animate'
// import 'quasar-extras/roboto-font'
// import 'quasar-extras/material-icons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/mdi'
import { Quasar, Notify } from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {},
  directives: {},
  plugins: { Notify },
  i18n: lang,
})
