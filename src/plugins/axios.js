import Vue from 'vue'
import apiList from '../api'

const axiosInstaller = Vue => {
  if (axiosInstaller.installed) return
  axiosInstaller.installed = true

  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return apiList
      },
    },
  })
}
Vue.use(axiosInstaller)
