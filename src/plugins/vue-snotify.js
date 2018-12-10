// Place the following into its own module file for easy import.
import Vue from 'vue'
import Snotify, { SnotifyPosition } from 'vue-snotify'

const options = {
  toast: {
    position: SnotifyPosition.centerTop,
  },
}

Vue.use(Snotify, options)
