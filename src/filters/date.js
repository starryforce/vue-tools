import Vue from 'vue'

Vue.filter('date', function(value) {
  if (!value) return ''
  try {
    return value.replace(/-/g, '.').split(' ')[0]
  } catch (error) {
    return value
  }
})
